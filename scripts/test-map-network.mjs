import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
const temp = mkdtempSync(join(tmpdir(), "aqua-map-test-"));
try {
  writeFileSync(
    join(temp, "island-map-v0.4.json"),
    readFileSync(new URL("../src/data/island-map-v0.4.json", import.meta.url)),
  );
  for (const [input, output] of [
    ["src/components/map/destinations.ts", "destinations.js"],
    ["src/data/map-network.ts", "network.js"],
    ["src/data/map-plan.ts", "plan.js"],
  ]) {
    const source = readFileSync(
      new URL("../" + input, import.meta.url),
      "utf8",
    ).replace(
      /(["'])\.\.\/components\/map\/destinations\1/,
      '"./destinations.js"',
    );
    writeFileSync(
      join(temp, output),
      ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
        },
      }).outputText,
    );
  }
  const { places, edges, findRoute } = await import(
    pathToFileURL(join(temp, "network.js")).href
  );
  const canonical = JSON.parse(
    readFileSync(
      new URL("../docs/data/island-map-markers-v0.4.json", import.meta.url),
      "utf8",
    ),
  );
  for (let i = 0; i < 10; i++)
    assert.deepEqual(
      places[i].point,
      [
        50 + canonical.pins[i].point[0] * 0.028,
        48 - canonical.pins[i].point[1] * 0.028,
      ],
      "Canonical orthographic pin projection",
    );
  const { footprints, pools } = await import(
    pathToFileURL(join(temp, "plan.js")).href
  );
  // Dense clearance sampling, including the road stroke's half-width.
  for (const edge of edges.filter((e) => e.mode === "walk"))
    for (let i = 1; i < edge.points.length; i++) {
      const a = edge.points[i - 1],
        b = edge.points[i],
        steps = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.08);
      for (let k = 0; k <= steps; k++) {
        const x = a[0] + ((b[0] - a[0]) * k) / steps,
          y = a[1] + ((b[1] - a[1]) * k) / steps;
        for (const r of footprints)
          assert(
            !(
              x > r.x - 0.48 &&
              x < r.x + r.w + 0.48 &&
              y > r.y - 0.48 &&
              y < r.y + r.h + 0.48
            ),
            `Building clearance: ${edge.from} → ${edge.to}, (${x},${y})`,
          );
        for (const p of pools)
          assert(
            ((x - p.x) / (p.rx + 0.48)) ** 2 +
              ((y - p.y) / (p.ry + 0.48)) ** 2 >
              1,
            `Water clearance: ${edge.from} → ${edge.to}`,
          );
      }
    }
  const known = new Set(places.map((p) => p.id));
  const stationNames = places
    .filter((p) => p.id.startsWith("stop:"))
    .map((p) => p.name.replace("Paradise Loop · ", ""))
    .sort();
  assert.deepEqual(
    stationNames,
    [
      "Paradise Boulevard",
      "Paradise Market",
      "Eden Gardens",
      "Serenity Spa",
      "Ocean Bay",
      "Adrenaline Peak",
      "Atlantis Realm",
      "Pirate’s Cove",
    ].sort(),
    "Eight documented stations, with no invented duplicate central station",
  );
  assert.equal(known.size, places.length);
  assert.equal(places.filter((p) => p.category === "zones").length, 9);
  for (const e of edges) {
    assert(known.has(e.from) && known.has(e.to));
    assert(e.weight > 0);
    assert(e.points.length >= 2);
    assert(
      e.points.every(([x, y]) => x >= 0 && x <= 100 && y >= 0 && y <= 100),
    );
    if (e.mode === "shuttle")
      assert(e.from.startsWith("stop:") && e.to.startsWith("stop:"));
  }
  assert.equal(
    edges.filter((e) => e.from === "grand-hotel" || e.to === "grand-hotel")
      .length,
    1,
    "Hotel must be a terminal access, never a shortcut",
  );
  let cases = 0;
  for (const a of places)
    for (const b of places)
      for (const mode of ["walk", "shuttle"]) {
        const route = findRoute(a.id, b.id, mode);
        assert(route, `${a.id} → ${b.id} ${mode}`);
        if (a.id === b.id) {
          assert.deepEqual(route.edges, []);
          continue;
        }
        assert.equal(route.edges[0].from, a.id);
        assert.equal(route.edges.at(-1).to, b.id);
        assert(
          route.edges.every(
            (e, i) => i === 0 || route.edges[i - 1].to === e.from,
          ),
        );
        if (mode === "walk")
          assert(route.edges.every((e) => e.mode === "walk"));
        else
          assert(
            route.edges.some((e) => e.mode === "shuttle") || route.fallback,
          );
        for (const e of route.edges) {
          const original = edges.find(
            (o) =>
              o.mode === e.mode &&
              ((o.from === e.from && o.to === e.to) ||
                (o.to === e.from && o.from === e.to)),
          );
          assert(original);
          assert.deepEqual(
            e.points,
            original.from === e.from
              ? original.points
              : [...original.points].reverse(),
          );
        }
        cases++;
      }
  assert.equal(findRoute("missing", "gateway", "walk"), null);
  assert.equal(findRoute("gateway", "missing", "shuttle"), null);
  const saved = edges.splice(0, edges.length);
  assert.equal(
    findRoute("gateway", "ocean-bay", "walk"),
    null,
    "Disconnected network",
  );
  edges.push(...saved.filter((e) => e.mode === "walk"));
  assert.equal(
    findRoute("gateway", "ocean-bay", "shuttle").fallback,
    true,
    "No shuttle: offer connected walking route",
  );
  edges.splice(0, edges.length, ...saved);
  console.log(
    `PASS map network: ${cases} origin/destination/mode combinations; edge continuity, reverse geometry, nine zones, hotel privacy, identical/unknown endpoints.`,
  );
} finally {
  rmSync(temp, { recursive: true, force: true });
}

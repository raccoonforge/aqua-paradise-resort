import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
const temp = mkdtempSync(join(tmpdir(), "aqua-map-test-"));
try {
  for (const [input, output] of [
    ["src/components/map/destinations.ts", "destinations.js"],
    ["src/data/map-network.ts", "network.js"],
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
          module: ts.ModuleKind.ES2022,
        },
      }).outputText,
    );
  }
  const { places, edges, findRoute } = await import(
    pathToFileURL(join(temp, "network.js")).href
  );
  const known = new Set(places.map((p) => p.id));
  assert.equal(known.size, places.length);
  assert.equal(places.filter((p) => p.category === "zones").length, 9);
  for (const e of edges) {
    assert(known.has(e.from) && known.has(e.to));
    assert(e.weight > 0);
    assert(e.points.length >= 2);
    assert(e.points.every(([x, y]) => x >= 0 && x <= 80 && y >= 0 && y <= 100));
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

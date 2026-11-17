const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const ctx = await b.newContext();
  const p = await ctx.newPage({ viewport: { width: 1440, height: 1000 } });
  let results = [];
  for (const route of [
    "",
    "zones",
    "attractions",
    "hotel",
    "tickets",
    "planner",
    "visit",
    "map",
  ]) {
    await p.goto("http://localhost:5174/aqua-paradise-resort/#/" + route);
    await p.waitForTimeout(200);
    const r = await new AxeBuilder({ page: p })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.push({
      route: route || "home",
      violations: r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  fs.writeFileSync(
    "docs/redesign/accessibility.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    JSON.stringify(
      results.filter((r) => r.violations.length),
      null,
      2,
    ),
  );
  process.exitCode = results.some((x) => x.violations.length) ? 1 : 0;
  await b.close();
})();

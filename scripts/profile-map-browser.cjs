// Production-browser render budget. Playwright/Chromium are optional QA tools.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage(),
      cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await cdp.send("Performance.enable");
    await page.goto(
      process.env.MAP_TEST_URL ||
        "http://localhost:5173/aqua-paradise-resort/#/map",
    );
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".pm-base [data-tree-count]").waitFor();
    const scene = await page.evaluate(() => ({
      nodes: document.querySelectorAll(".pm-base *").length,
      trees: +document.querySelector("[data-tree-count]").dataset.treeCount,
      palms: +document.querySelector("[data-palm-count]").dataset.palmCount,
    }));
    assert(scene.nodes < 1800);
    assert(scene.trees > 50 && scene.trees < 250);
    assert(scene.palms > 25);
    // Zoom changes only a wrapper transform and detail visibility; the static SVG is memoized.
    const root = await page.locator(".pm-base").elementHandle();
    await page.evaluate((el) => {
      window.mapGeometryMutations = 0;
      window.mapGeometryObserver = new MutationObserver((list) => {
        window.mapGeometryMutations += list.length;
      });
      window.mapGeometryObserver.observe(el, {
        subtree: true,
        childList: true,
        attributes: true,
      });
    }, root);
    await page.getByRole("button", { name: "Приблизить", exact: true }).click();
    await page.getByRole("button", { name: "Приблизить", exact: true }).click();
    assert.equal(
      await page.locator(".pm-world").getAttribute("data-detail"),
      "close",
    );
    const bounds = await page.locator(".pm-viewport").boundingBox(),
      x = bounds.x + bounds.width / 2,
      y = bounds.y + bounds.height / 2;
    await page.evaluate(() => {
      window.mapFrameTimes = [];
      window.mapCollect = true;
      let last;
      const tick = (t) => {
        if (last) window.mapFrameTimes.push(t - last);
        last = t;
        if (window.mapCollect) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    for (let i = 0; i < 45; i++) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [
          { x: x + Math.sin(i / 7) * 55, y: y + Math.cos(i / 9) * 30 },
        ],
      });
      await page.evaluate(() => new Promise(requestAnimationFrame));
    }
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    const frames = await page.evaluate(() => {
      window.mapCollect = false;
      window.mapGeometryObserver.disconnect();
      const t = window.mapFrameTimes.slice(3).sort((a, b) => a - b);
      return {
        count: t.length,
        p50: t[Math.floor(t.length * 0.5)],
        p95: t[Math.floor(t.length * 0.95)],
        geometryMutations: window.mapGeometryMutations,
      };
    });
    const metrics = await cdp.send("Performance.getMetrics");
    const heap =
      metrics.metrics.find((m) => m.name === "JSHeapUsedSize").value /
      1024 /
      1024;
    assert.equal(
      frames.geometryMutations,
      0,
      "Pan/zoom must not regenerate the SVG",
    );
    assert(frames.count >= 30);
    assert(
      frames.p95 < 70,
      "95th-percentile pan frame exceeds generous mobile emulation budget",
    );
    assert(heap < 80, "Unexpected JS heap growth");
    console.log(
      JSON.stringify(
        {
          viewport: "390×844 @2x",
          cpuThrottle: 4,
          ...scene,
          frames,
          jsHeapMiB: +heap.toFixed(2),
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

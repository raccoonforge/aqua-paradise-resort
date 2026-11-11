// Optional browser QA: requires Playwright and Chromium (CHROMIUM_PATH overrides executable).
// Start Vite first; MAP_TEST_URL overrides the local URL.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  fs.mkdirSync("work/map-qa", { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const errors = [];
    const page = await browser.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    const url =
      process.env.MAP_TEST_URL ||
      "http://localhost:5173/aqua-paradise-resort/#/map";
    for (const [width, height] of [
      [360, 900],
      [390, 900],
      [768, 900],
      [1280, 900],
      [1440, 900],
      [1920, 900],
      [844, 390],
      [390, 600],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(url);
      await page.reload();
      await page.locator(".pm-world .pm-base").waitFor();
      await page.evaluate(() => document.fonts.ready);

      const layout = await page.evaluate(() => {
        const map = document.querySelector(".pm-map").getBoundingClientRect(),
          world = document.querySelector(".pm-world").getBoundingClientRect();
        return {
          scroll: document.documentElement.scrollWidth,
          width: innerWidth,
          map: map.toJSON(),
          world: world.toJSON(),
          vector: !!document.querySelector(
            ".pm-world svg [data-layer=geography]",
          ),
          raster: document.querySelectorAll(".pm-page img,.pm-page svg image")
            .length,
        };
      });
      assert(layout.scroll <= width, `Horizontal overflow ${width}`);
      assert(layout.vector);
      assert.equal(
        layout.raster,
        0,
        "No raster backgrounds or SVG image embeds",
      );
      assert(
        layout.world.top >= layout.map.top - 1 &&
          layout.world.bottom <= layout.map.bottom + 1,
        `Clipped base at ${width}`,
      );
      const clearance = await page.evaluate(() => {
        const svg = document.querySelector(".pm-world .pm-base"),
          land = svg.querySelector("[data-coast]");
        const buildings = [
          ...svg.querySelectorAll('[data-obstacle="building"]'),
        ].map((r) => ({
          x: +r.getAttribute("x"),
          y: +r.getAttribute("y"),
          w: +r.getAttribute("width"),
          h: +r.getAttribute("height"),
        }));
        const water = [...svg.querySelectorAll('[data-obstacle="water"]')].map(
          (r) => ({
            x: +r.getAttribute("cx"),
            y: +r.getAttribute("cy"),
            rx: +r.getAttribute("rx"),
            ry: +r.getAttribute("ry"),
          }),
        );
        const failures = [];
        for (const group of svg.querySelectorAll("[data-road]")) {
          const path = group.querySelector("path"),
            length = path.getTotalLength();
          for (let d = 0; d <= length; d += 0.12) {
            const p = path.getPointAtLength(d);
            if (!group.hasAttribute("data-pier") && !land.isPointInFill(p))
              failures.push(`Outside land ${p.x},${p.y}`);
            if (
              buildings.some(
                (r) =>
                  p.x > r.x - 0.47 &&
                  p.x < r.x + r.w + 0.47 &&
                  p.y > r.y - 0.47 &&
                  p.y < r.y + r.h + 0.47,
              )
            )
              failures.push("Building collision");
            if (
              water.some(
                (r) =>
                  ((p.x - r.x) / (r.rx + 0.47)) ** 2 +
                    ((p.y - r.y) / (r.ry + 0.47)) ** 2 <=
                  1,
              )
            )
              failures.push("Water collision");
          }
        }
        for (const rect of svg.querySelectorAll("[data-detail-building]")) {
          const x = +rect.getAttribute("x"),
            y = +rect.getAttribute("y"),
            w = +rect.getAttribute("width"),
            h = +rect.getAttribute("height");
          for (const [cx, cy] of [
            [x, y],
            [x + w, y],
            [x, y + h],
            [x + w, y + h],
          ])
            if (!land.isPointInFill(new DOMPoint(cx, cy)))
              failures.push(`Building outside shore: ${x},${y}`);
        }
        return failures.slice(0, 5);
      });
      assert.deepEqual(clearance, [], "Rendered SVG road clearance");
      assert.equal(
        await page.locator(".pm-base [data-district]").count(),
        10,
        "Every district receives architectural detailing",
      );
      assert(
        (await page.locator(".pm-base [data-detail-building]").count()) >= 75,
      );
      assert(
        (await page.locator(".pm-base *").count()) < 1800,
        "Bound SVG element count",
      );
      assert.equal(
        await page.locator(".pm-base [data-signature]").count(),
        10,
        "A distinct silhouette for each district",
      );
      assert.equal(
        await page.locator(".pm-base [data-estate]").count(),
        10,
        "Coherent district garden grounds",
      );
      assert.equal(
        await page.locator(".pm-base [data-natural-pond]").count(),
        2,
        "Organic garden shorelines retain conservative clearance envelopes",
      );
      if (width < 768) await page.locator(".pm-sheet-toggle").click();
      const search = page.getByRole("searchbox");
      await search.fill("транспорт");
      assert.equal(await page.locator(".pm-catalog>button").count(), 11);
      await search.fill("Несуществующий объект");
      assert.equal(await page.locator(".pm-catalog>button").count(), 0);
      await page
        .getByRole("button", { name: "Сбросить поиск и фильтры" })
        .click();
      await page
        .locator(".pm-filters")
        .getByRole("button", { name: "Отель", exact: true })
        .click();
      assert.equal(await page.locator(".pm-catalog>button").count(), 1);
      assert.equal(await page.locator(".pm-pin").count(), 1);
      await page.locator(".pm-catalog>button").click();
      await page.getByRole("button", { name: "Маршрут сюда" }).click();
      await page
        .getByRole("button", { name: "Построить маршрут", exact: true })
        .click();
      assert((await page.locator(".pm-result li").count()) > 0);
      await page.getByLabel("Куда", { exact: true }).selectOption("ocean-bay");
      await page.getByText("Paradise Loop", { exact: true }).click();
      await page
        .getByRole("button", { name: "Построить маршрут", exact: true })
        .click();
      assert(
        await page
          .locator(".pm-result")
          .innerText()
          .then((t) => t.includes("Посадка") && t.includes("Выход")),
      );
      await page.screenshot({
        path: `work/map-qa/route-${width}x${height}.png`,
      });
      await page
        .locator(".pm-result")
        .getByRole("button", { name: "Сбросить маршрут" })
        .click();
      assert.equal(await page.locator(".pm-roads g").count(), 0);
      await page.getByLabel("Куда", { exact: true }).selectOption("gateway");
      await page
        .getByRole("button", { name: "Построить маршрут", exact: true })
        .click();
      assert(await page.getByText("Вы уже в выбранном месте.").isVisible());
      if (width < 768) await page.locator(".pm-sheet-toggle").click();
      await page
        .getByRole("button", { name: "Приблизить", exact: true })
        .click();
      assert.equal(
        await page.locator(".pm-controls output").innerText(),
        "125%",
      );
      await page.getByRole("button", { name: "Показать весь остров" }).click();
      assert.equal(
        await page.locator(".pm-controls output").innerText(),
        "100%",
      );
      const map = page.locator(".pm-viewport");
      await map.focus();
      await page.keyboard.press("+");
      await page.keyboard.press("ArrowRight");
      assert.equal(
        await page.locator(".pm-controls output").innerText(),
        "125%",
      );
      await page.keyboard.press("Home");
      const box = await map.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + 30);
      await page.keyboard.down("Control");
      await page.mouse.wheel(0, -100);
      await page.keyboard.up("Control");
      await page.waitForFunction(
        () =>
          document.querySelector(".pm-controls output").textContent !== "100%",
        {},
        { timeout: 3000 },
      );
      assert.notEqual(
        await page.locator(".pm-controls output").innerText(),
        "100%",
      );
      await page.getByRole("button", { name: "Показать весь остров" }).click();
      console.log(
        `PASS ${width}x${height}: fit, no overflow, search/categories, detail, hotel walking, shuttle boarding/exit, reset, same endpoints, keyboard, anchored wheel`,
      );
    }
    // Real touch events through Chromium's input pipeline.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    await page.reload();
    const cdp = await page.context().newCDPSession(page);
    const map = await page.locator(".pm-viewport").boundingBox();
    const x = map.x + map.width / 2,
      y = map.y + map.height / 2;
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [
        { x: x - 30, y },
        { x: x + 30, y },
      ],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        { x: x - 65, y: y - 10 },
        { x: x + 65, y: y + 10 },
      ],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    assert(
      parseInt(await page.locator(".pm-controls output").innerText()) > 150,
    );
    await page.getByRole("button", { name: "Показать весь остров" }).click();
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x + 60, y: y + 30 }],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    assert(
      (await page.locator(".pm-world").getAttribute("style")).includes("60px"),
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".pm-sheet-toggle").click();
    await page.screenshot({ path: "work/map-qa/touch-reduced-motion.png" });
    await page.locator(".pm-sheet-toggle").click();
    await page.getByRole("button", { name: "Показать весь остров" }).click();
    const stage = await page.locator(".pm-viewport").boundingBox();
    await page.mouse.move(stage.x + 10, stage.y + 10);
    await page.mouse.down();
    await page.mouse.move(stage.x + 65, stage.y + 35, { steps: 8 });
    await page.mouse.up();
    assert.equal(
      await page.locator(".pm-details").count(),
      0,
      "Dragging must not select a place",
    );
    await page.getByRole("button", { name: "Показать весь остров" }).click();
    await page
      .getByRole("button", { name: "Показать Eden Gardens", exact: true })
      .click();
    assert(
      await page
        .locator(".pm-details h2")
        .innerText()
        .then((t) => t === "Eden Gardens"),
    );
    await page.screenshot({ path: "work/map-qa/mobile-detail.png" });
    assert.deepEqual(errors, []);
    console.log(
      "PASS touch pinch/pan and reduced motion; no browser runtime errors",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

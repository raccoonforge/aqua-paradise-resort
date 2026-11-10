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
    for (const width of [360, 390, 768, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url);
      await page.reload();
      await page.locator(".pm-world img").waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () => document.querySelector(".pm-world img").complete,
      );
      const layout = await page.evaluate(() => {
        const map = document.querySelector(".pm-map").getBoundingClientRect(),
          world = document.querySelector(".pm-world").getBoundingClientRect();
        return {
          scroll: document.documentElement.scrollWidth,
          width: innerWidth,
          map: map.toJSON(),
          world: world.toJSON(),
          image: document.querySelector(".pm-world img").naturalWidth,
        };
      });
      assert(layout.scroll <= width, `Horizontal overflow ${width}`);
      assert(layout.image > 0);
      assert(
        layout.world.top >= layout.map.top - 1 &&
          layout.world.bottom <= layout.map.bottom + 1,
        `Clipped base at ${width}`,
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
      await page.screenshot({ path: `work/map-qa/route-${width}.png` });
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
      assert.notEqual(
        await page.locator(".pm-controls output").innerText(),
        "100%",
      );
      await page.getByRole("button", { name: "Показать весь остров" }).click();
      console.log(
        `PASS ${width}px: fit, no overflow, search/categories, detail, hotel walking, shuttle boarding/exit, reset, same endpoints, keyboard, anchored wheel`,
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

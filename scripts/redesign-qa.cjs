const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const p = await b.newPage();
  p.setDefaultTimeout(10000);
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  const results = [];
  const base = "http://localhost:5174/aqua-paradise-resort/";
  async function go(hash) {
    await p.goto(base + "#/" + hash);
    await p.waitForTimeout(250);
    await p.evaluate(() => document.fonts.ready);
  }
  async function test(name, fn) {
    try {
      await fn();
      results.push({ name, result: "PASS" });
    } catch (e) {
      results.push({ name, result: "FAIL", error: e.message });
    }
  }
  for (const width of [320, 375, 768, 1440]) {
    await p.setViewportSize({ width, height: 900 });
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
      await test(`layout ${route || "home"} ${width}`, async () => {
        await go(route);
        assert.equal(await p.locator("vite-error-overlay").count(), 0);
        const overflow = await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        );
        assert.equal(overflow, false, "horizontal overflow");
        assert.ok((await p.locator("main").first().innerText()).length > 100);
        if (width === 1440 || width === 375)
          await p.screenshot({
            path: `docs/redesign/screenshots/${route || "home"}-${width}.png`,
            fullPage: true,
          });
      });
    }
  }
  await p.setViewportSize({ width: 1440, height: 1000 });
  await test("9 worlds and home planner handoff", async () => {
    await go("");
    assert.equal(await p.locator(".world-list a").count(), 9);
    await p.getByRole("button", { name: "Адреналин", exact: true }).click();
    await p
      .getByRole("button", {
        name: "Открыть полный планировщик с этими интересами",
      })
      .click();
    assert.ok(p.url().includes("interests="));
    assert.equal(
      await p
        .getByRole("button", { name: "Адреналин", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
  });
  await test("catalog extreme + search + modal Escape", async () => {
    await go("attractions");
    await p
      .getByRole("button", { name: "Экстрим и высокие", exact: true })
      .click();
    assert.equal(
      await p.locator('button[aria-label^="Открыть подробности:"]').count(),
      9,
    );
    await p
      .getByRole("button", {
        name: "Открыть подробности: Skyfall",
        exact: true,
      })
      .click();
    assert.equal(await p.getByRole("dialog").count(), 1);
    await p.keyboard.press("Escape");
    assert.equal(await p.getByRole("dialog").count(), 0);
  });
  await test("zone deep link + ride handoff", async () => {
    await go("zones?zone=atlantis-realm&tab=attractions");
    assert.equal(await p.locator("h1").textContent(), "Atlantis Realm");
    await p
      .getByRole("button", {
        name: "Подробнее: Poseidon's Descent",
        exact: true,
      })
      .click();
    assert.ok(p.url().includes("poseidons-descent"));
    assert.equal(await p.getByRole("dialog").count(), 1);
  });
  await test("hotel categories and amenities", async () => {
    await go("hotel");
    await p.getByRole("button", { name: "Все удобства" }).first().click();
    assert.ok(
      (await p.locator("main").first().innerText()).includes("Мини-бар"),
    );
    await p.getByRole("button", { name: "Виллы", exact: true }).click();
    assert.equal(
      await p
        .getByRole("heading", { name: "Ocean View Villa", exact: true })
        .count(),
      1,
    );
  });
  await test("ticket calculator + demo checkout", async () => {
    await go("tickets");
    await p.getByLabel("Дата посещения", { exact: true }).fill("2026-12-12");
    await p
      .getByRole("button", { name: "Оформить билеты", exact: true })
      .click();
    assert.equal(await p.getByRole("dialog").count(), 1);
    assert.match(await p.getByRole("dialog").innerText(), /APR-/);
    await p.keyboard.press("Escape");
    assert.equal(await p.getByRole("dialog").count(), 0);
  });
  await test("planner generate reorder + share restore", async () => {
    await go("planner");
    await p.getByLabel("Дата посещения", { exact: true }).fill("2026-12-12");
    await p.getByRole("button", { name: "Адреналин", exact: true }).click();
    await p
      .getByRole("button", { name: "Удалить гостя 2", exact: true })
      .click();
    await p.getByRole("button", { name: /Составить|Сгенерировать/ }).click();
    await p.waitForTimeout(200);
    assert.ok(
      (await p.getByRole("button", { name: "Раньше", exact: true }).count()) >
        0,
    );
    await p.getByRole("button", { name: "Позже", exact: true }).first().click();
    await p.screenshot({
      path: "docs/redesign/screenshots/planner-generated.png",
      fullPage: true,
    });
  });
  await test("mobile menu keyboard close + focus", async () => {
    await p.setViewportSize({ width: 375, height: 812 });
    await go("");
    await p.getByRole("button", { name: "Открыть меню" }).click();
    assert.equal(await p.getByRole("dialog").count(), 1);
    await p.keyboard.press("Escape");
    assert.equal(await p.getByRole("dialog").count(), 0);
    assert.equal(
      await p
        .getByRole("button", { name: "Открыть меню" })
        .evaluate((e) => e === document.activeElement),
      true,
    );
  });
  results.push({
    name: "browser runtime errors",
    result: errors.length ? "FAIL" : "PASS",
    errors,
  });
  fs.writeFileSync(
    "docs/redesign/test-results.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    JSON.stringify(
      results.filter((x) => x.result === "FAIL"),
      null,
      2,
    ),
  );
  console.log(
    `${results.filter((x) => x.result === "PASS").length}/${results.length} passed`,
  );
  process.exitCode = results.some((x) => x.result === "FAIL") ? 1 : 0;
  await b.close();
})();

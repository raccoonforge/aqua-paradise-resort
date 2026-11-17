const { chromium } = require("playwright");
const assert = require("node:assert/strict"),
  fs = require("node:fs");
(async () => {
  let b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  let ctx = await b.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  let p = await ctx.newPage();
  p.setDefaultTimeout(6000);
  const base = "http://localhost:5174/aqua-paradise-resort/#/";
  let r = [];
  async function test(name, fn) {
    try {
      await fn();
      r.push({ name, result: "PASS" });
    } catch (e) {
      r.push({ name, result: "FAIL", error: e.message });
    }
  }
  async function go(x) {
    await p.goto(base + x);
    await p.waitForTimeout(200);
  }
  await test("ticket date and adult guard", async () => {
    await go("tickets");
    await p
      .getByRole("button", { name: "Оформить билеты", exact: true })
      .click();
    assert.equal(await p.getByRole("dialog").count(), 0);
    await p.getByLabel("Дата посещения", { exact: true }).fill("2026-12-12");
    await p
      .getByRole("button", {
        name: "Увеличить количество: Дети (4–12 лет)",
        exact: true,
      })
      .click();
    await p
      .getByRole("button", {
        name: "Уменьшить количество: Взрослые (18–59 лет)",
        exact: true,
      })
      .click();
    assert.equal(
      await p
        .getByRole("button", { name: "Оформить билеты", exact: true })
        .isDisabled(),
      true,
    );
  });
  await test("ticket tariff extra eligibility", async () => {
    await go("tickets");
    await p.getByRole("button").filter({ hasText: "Premium Pass" }).click();
    assert.equal(await p.locator("input[type=checkbox]").count(), 1);
    await p.getByRole("button").filter({ hasText: "Evening Pass" }).click();
    assert.equal(await p.locator("input[type=checkbox]").count(), 0);
  });
  await go("planner");
  await p.getByLabel("Дата посещения", { exact: true }).fill("2026-12-12");
  await p.getByRole("button", { name: "Семейный отдых", exact: true }).click();
  await p
    .getByRole("button", { name: "Сгенерировать маршрут", exact: true })
    .click();
  await test("planner share restores settings and stops", async () => {
    await p
      .getByRole("button", { name: "Скопировать ссылку на маршрут" })
      .click();
    let link = await p.evaluate(() => navigator.clipboard.readText());
    assert.ok(link.includes("state="));
    await p.goto(link);
    await p.waitForTimeout(400);
    assert.equal(
      await p
        .getByRole("heading", { name: "Ваш персональный маршрут" })
        .count(),
      1,
    );
    assert.ok(
      (await p.getByRole("button", { name: "Раньше", exact: true }).count()) >
        0,
    );
    assert.ok(
      (await p.locator("#main-content").innerText()).includes("2026-12-12"),
    );
    await p.screenshot({
      path: "docs/redesign/screenshots/planner-restored.png",
      fullPage: true,
    });
  });
  await test("planner PNG download", async () => {
    const d = p.waitForEvent("download", { timeout: 15000 });
    await p.getByRole("button", { name: "Скачать изображение" }).click();
    let file = await d;
    await file.saveAs("docs/redesign/planner-export.png");
    assert.ok(fs.statSync("docs/redesign/planner-export.png").size > 10000);
  });
  await test("planner print invocation", async () => {
    await p.evaluate(
      () =>
        (window.print = () => {
          window.printCalled = true;
        }),
    );
    await p.getByRole("button", { name: "Скачать PDF" }).click();
    assert.equal(await p.evaluate(() => window.printCalled), true);
    await p.emulateMedia({ media: "print" });
    await p.pdf({
      path: "docs/redesign/planner-print.pdf",
      format: "A4",
      printBackground: true,
    });
    await p.emulateMedia({ media: "screen" });
  });
  await test("map search reset and zoom", async () => {
    await go("map");
    await p.getByLabel("Поиск объектов", { exact: true }).fill("абракадабра");
    assert.ok(
      (await p.locator("#main-content").innerText()).includes("найден"),
    );
    await p
      .getByRole("button", { name: "Сбросить фильтры", exact: true })
      .click();
    await p.getByRole("button", { name: "Приблизить", exact: true }).click();
  });
  await test("attraction age restriction", async () => {
    await go("attractions");
    await p.getByLabel("Ваш возраст", { exact: true }).fill("8");
    assert.equal(
      await p
        .getByRole("button", {
          name: "Открыть подробности: Skyfall",
          exact: true,
        })
        .count(),
      0,
    );
  });
  fs.writeFileSync(
    "docs/redesign/extended-results.json",
    JSON.stringify(r, null, 2),
  );
  console.log(r);
  process.exitCode = r.some((x) => x.result === "FAIL") ? 1 : 0;
  await b.close();
})();

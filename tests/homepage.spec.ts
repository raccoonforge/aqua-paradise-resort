import { test, expect } from "@playwright/test";

test("complete homepage, polaroids, zones, carousel, planner and navigation", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Ты ещё не видел рай таким.",
  );
  await expect(page.locator(".hero-landscape")).toHaveJSProperty(
    "naturalWidth",
    1536,
  );
  await page.getByRole("link", { name: "Исследовать остров" }).click();
  await page.getByRole("button", { name: "Раскрыть всё" }).click();
  await expect(page.locator(".polaroid.is-spread")).toHaveCount(4);
  await expect(page.locator(".about-copy")).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect(page.getByText("600", { exact: false }).first()).toBeVisible();
  const strip = page.locator(".zone-strip");
  await expect(strip.getByRole("button")).toHaveCount(9);
  await strip.getByRole("button", { name: "03Eden Gardens" }).click();
  await expect(page.locator(".zone-copy h2")).toHaveText("Eden Gardens");
  await page
    .getByRole("button", { name: "Следующая зона", exact: true })
    .click();
  await expect(page.locator(".zone-copy h2")).toHaveText("Little Paradise");
  await page.getByRole("button", { name: "Следующий аттракцион" }).click();
  await expect(page.locator(".ride-card.active h3")).toHaveText(
    "Poseidon's Descent",
  );
  await page.locator(".ride-track").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".ride-card.active h3")).toHaveText("Stormbreaker");
  await page.getByRole("button", { name: "Адреналин", exact: true }).click();
  await page
    .getByRole("button", { name: "Семейный отдых", exact: true })
    .click();
  await expect(
    page.locator(".interest-choices button[aria-pressed=true]"),
  ).toHaveCount(2);
  await expect(
    page.getByRole("link", { name: "Открыть полный планировщик" }),
  ).toHaveAttribute("href", "/planner?interests=adrenaline,family");
  await expect(page.locator(".day-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Сбросить выбор" }).click();
  await expect(
    page.locator(".interest-choices button[aria-pressed=true]"),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  for (const img of await page.locator(".homepage img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
        ),
      )
      .toBeTruthy();
  }
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 50));
    }
    (document.activeElement as HTMLElement)?.blur();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.waitForTimeout(600);
  await page.screenshot({
    path: `${process.env.AQUA_ARTIFACT_DIR ?? "/tmp/aqua-screenshots"}/homepage-${testInfo.project.name}.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("accessible menus and map regression", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Развлечения" })
      .click();
    await expect(
      page.getByRole("dialog").getByRole("link", { name: "Тематические зоны" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Открыть меню" }),
    ).toBeFocused();
  } else {
    await page.getByRole("button", { name: "Развлечения" }).click();
    await expect(
      page.getByRole("link", { name: "Тематические зоны" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Развлечения" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
  await page.goto("/map");
  await expect(page.locator(".island-svg")).toBeVisible();
  await expect(page.locator(".map-pin")).toHaveCount(10);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: `${process.env.AQUA_ARTIFACT_DIR ?? "/tmp/aqua-screenshots"}/map-${testInfo.project.name}.png`,
    fullPage: true,
  });
});

test("reduced motion, swipe and narrow viewport", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await expect(page.locator(".hero-copy h1")).toHaveCSS(
    "animation-name",
    "none",
  );
  await page.getByRole("button", { name: "Раскрыть всё" }).click();
  await page.locator(".zone-main").dispatchEvent("touchstart", {
    touches: [{ identifier: 0, clientX: 300 }],
  });
  await page.locator(".zone-main").dispatchEvent("touchend", {
    changedTouches: [{ identifier: 0, clientX: 100 }],
  });
  await expect(page.locator(".zone-copy h2")).toHaveText("Paradise Boulevard");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("pointer drag keeps photographs and tablet layout clears the text", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const photo = page.locator(".photo-0");
  await photo.scrollIntoViewIfNeeded();
  const box = await photo.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + 80);
  await page.mouse.down();
  await page.mouse.move(box!.x + box!.width / 2 + 100, box!.y + 80, {
    steps: 5,
  });
  await page.mouse.up();
  await expect(photo).toHaveClass(/is-spread/);
  await expect(page.locator(".polaroid")).toHaveCount(4);
  await page.getByRole("button", { name: "Раскрыть всё" }).click();
  await page.setViewportSize({ width: 768, height: 960 });
  const heading = await page.locator("#about-heading").boundingBox();
  const top = await page.locator(".photo-0").boundingBox();
  const bottom = await page.locator(".photo-2").boundingBox();
  expect(top!.y + top!.height).toBeLessThan(heading!.y);
  expect(bottom!.y).toBeGreaterThan(heading!.y + heading!.height);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

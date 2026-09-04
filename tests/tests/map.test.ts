import { test, expect } from "../fixtures";

test.describe("Карта и гео-слои", { tag: "@no-auth" }, () => {
  test.beforeEach(async ({ mapPage }) => {
    await mapPage.navigate("");
  });

  test("1. UI: Проверка состава элементов управления ГИС-карты [TESTY-1068]", async ({
    mapPage,
  }) => {
    await test.step("Проверка контролов верхней панели", async () => {
      await expect(mapPage.searchInput).toBeVisible();
      await expect(mapPage.menuButton).toBeVisible();
      await expect(mapPage.routeButton).toBeVisible();
      await expect(mapPage.toggleButton).toBeVisible();
    });

    await test.step("Проверка кнопок зума, геолокации и панели слоев", async () => {
      await expect(mapPage.zoomInButton).toBeVisible();
      await expect(mapPage.zoomOutButton).toBeVisible();
      await expect(mapPage.myLocationButton).toBeVisible();

      await expect(mapPage.stopsCheckbox).toBeVisible();
      await expect(mapPage.roadsCheckbox).toBeVisible();
      await expect(mapPage.closuresCheckbox).toBeVisible();
      await expect(mapPage.accessibleCheckbox).toBeVisible();
    });
  });
});

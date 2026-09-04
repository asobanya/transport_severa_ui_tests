import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MapPage extends BasePage {
  // ===== КАРТА =====
  readonly mapCanvas: Locator;

  // ===== ЭЛЕМЕНТЫ УПРАВЛЕНИЯ =====
  readonly zoomInButton: Locator;
  readonly zoomOutButton: Locator;
  readonly myLocationButton: Locator;

  // ===== СЛОИ =====
  readonly accessibleCheckbox: Locator;
  readonly stopsCheckbox: Locator;
  readonly closuresCheckbox: Locator;
  readonly roadsCheckbox: Locator;

  constructor(page: Page) {
    super(page);

    this.mapCanvas = page.getByRole("region", {
      name: "Map",
    });

    this.zoomInButton = page.getByRole("button", {
      name: "Zoom in",
    });

    this.zoomOutButton = page.getByRole("button", {
      name: "Zoom out",
    });

    this.myLocationButton = page.getByRole("button", {
      name: "Find my location",
    });

    this.accessibleCheckbox = page.getByTitle(
      "Отобразить транспорт для маломобильных групп населения",
    );

    this.stopsCheckbox = page.getByTitle("Отобразить остановочные пункты");

    this.closuresCheckbox = page.getByTitle("Отобразить перекрытия дорог");

    this.roadsCheckbox = page.getByTitle("Отобразить дороги");
  }

  async goto(): Promise<void> {
    await this.navigate("");
  }
}

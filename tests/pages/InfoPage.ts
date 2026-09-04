import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InfoPage extends BasePage {
  readonly infoPanel: Locator;
  readonly infoTitle: Locator;
  readonly infoBody: Locator;
  readonly closeInfoButton: Locator;
  readonly transflowLink: Locator;

  constructor(page: Page) {
    super(page);

    this.infoPanel = page.locator(".sidebar").filter({ hasText: "Справка" });
    this.infoTitle = this.infoPanel.getByRole("heading", { name: "Справка" });

    // Оставляем прямой локатор без .or(), чтобы избежать нарушения strict mode
    this.infoBody = this.infoPanel.locator(".sidebar__body");

    this.closeInfoButton = this.infoPanel
      .getByRole("button", { name: /cross|закрыть/i })
      .or(this.infoPanel.locator(".close-btn"));
    this.transflowLink = this.infoPanel.getByRole("link", {
      name: /трансфлоу/i,
    });
  }

  async goto(): Promise<void> {
    await this.navigate("/info");
  }
}

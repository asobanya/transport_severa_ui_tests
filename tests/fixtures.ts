import { test as base } from "@playwright/test";
import { LoginPage, MapPage, GuidePage, InfoPage } from "@pages";

type AppFixtures = {
  loginPage: LoginPage;
  mapPage: MapPage;
  guidePage: GuidePage;
  infoPage: InfoPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  mapPage: async ({ page }, use) => {
    await use(new MapPage(page));
  },
  guidePage: async ({ page }, use) => {
    await use(new GuidePage(page));
  },
  infoPage: async ({ page }, use) => {
    await use(new InfoPage(page));
  },
});

export { expect } from "@playwright/test";

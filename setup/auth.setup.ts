import { expect, test as setup } from "@playwright/test";
import { USERS, AUTH_STORAGE_PATHS } from "../tests/data/users";
import { LoginPage } from "../tests/pages";

setup("Авторизация user-1 и сохранение сессии", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = USERS.user1;

  await loginPage.navigate("");
  await loginPage.openLoginModal();

  await expect(loginPage.loginModal).toBeVisible();

  await loginPage.login(user.email, user.password);

  const fullName = `${user.name} ${user.surname}`;

  await expect(loginPage.getMenuProfileButton(fullName)).toBeVisible();

  await page.context().storageState({
    path: AUTH_STORAGE_PATHS.user1,
  });
});

setup("Авторизация user-2 и сохранение сессии", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const user = USERS.user2;

  await loginPage.navigate("");
  await loginPage.openLoginModal();

  await expect(loginPage.loginModal).toBeVisible();

  await loginPage.login(user.email, user.password);

  const fullName = `${user.name} ${user.surname}`;

  await expect(loginPage.getMenuProfileButton(fullName)).toBeVisible();

  await page.context().storageState({
    path: AUTH_STORAGE_PATHS.user2,
  });
});

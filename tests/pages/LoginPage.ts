import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserForRegistration, createValidUser } from "../data/consts";

export class LoginPage extends BasePage {
  // ===== ОКНО АВТОРИЗАЦИИ =====
  readonly loginModal: Locator;
  readonly loginWithYandexBtn: Locator;
  readonly loginWithVkBtn: Locator;
  readonly authEmailInput: Locator;
  readonly authPasswordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly submitLoginButton: Locator;
  readonly makeAccountButton: Locator;

  // ===== ОКНО РЕГИСТРАЦИИ =====
  readonly registrationModal: Locator;
  readonly regNameInput: Locator;
  readonly regSurnameInput: Locator;
  readonly regEmailInput: Locator;
  readonly regPasswordInput: Locator;
  readonly regPasswordConfirmInput: Locator;
  readonly submitRegistrationButton: Locator;

  // ===== ВАЛИДАЦИЯ =====
  readonly regNameGroupWithError: Locator;
  readonly regSurnameGroupWithError: Locator;
  readonly regEmailGroupWithError: Locator;
  readonly regPasswordGroupWithError: Locator;
  readonly regPasswordConfirmGroupWithError: Locator;

  constructor(page: Page) {
    super(page);

    // ===== Авторизация =====

    this.loginModal = page.locator(".t-modal").filter({
      has: page.locator(".t-modal__title", {
        hasText: /^Вход$/,
      }),
    });

    this.loginWithYandexBtn = this.loginModal.getByRole("button", {
      name: /яндекс/i,
    });

    this.loginWithVkBtn = this.loginModal.getByRole("button", {
      name: /vk|вконтакте/i,
    });

    this.authEmailInput = this.loginModal.getByRole("textbox", {
      name: "Электронная почта",
    });

    this.authPasswordInput = this.loginModal.getByRole("textbox", {
      name: "Пароль",
      exact: true,
    });

    this.rememberMeCheckbox = this.loginModal.getByRole("checkbox", {
      name: "Оставаться в системе",
    });

    this.submitLoginButton = this.loginModal.getByRole("button", {
      name: "Войти",
      exact: true,
    });

    this.makeAccountButton = this.loginModal.getByText("Зарегистрируйтесь");

    // ===== Регистрация =====

    this.registrationModal = page.locator(".t-modal").filter({
      has: page.locator(".t-modal__title", {
        hasText: /^Регистрация$/,
      }),
    });

    this.regNameInput = this.registrationModal.getByRole("textbox", {
      name: "Имя *",
    });

    this.regSurnameInput = this.registrationModal.getByRole("textbox", {
      name: "Фамилия",
    });

    this.regEmailInput = this.registrationModal.getByRole("textbox", {
      name: "Электронная почта *",
    });

    this.regPasswordInput = this.registrationModal.getByRole("textbox", {
      name: "Пароль *",
      exact: true,
    });

    this.regPasswordConfirmInput = this.registrationModal.getByRole("textbox", {
      name: /повторите пароль|подтверждение пароля/i,
    });

    this.submitRegistrationButton = this.registrationModal.getByRole("button", {
      name: "Зарегистрироваться",
      exact: true,
    });

    // ===== Ошибки валидации =====

    this.regNameGroupWithError = this.registrationModal
      .locator(".t-input-group_error")
      .filter({ hasText: "Имя" });

    this.regSurnameGroupWithError = this.registrationModal
      .locator(".t-input-group_error")
      .filter({ hasText: "Фамилия" });

    this.regEmailGroupWithError = this.registrationModal
      .locator(".t-input-group_error")
      .filter({ hasText: "Электронная почта" });

    this.regPasswordGroupWithError = this.registrationModal
      .locator(".t-input-group_error")
      .filter({ hasText: "Пароль" });

    this.regPasswordConfirmGroupWithError = this.registrationModal
      .locator(".t-input-group_error")
      .filter({ hasText: /повторите пароль|подтверждение пароля/i });
  }

  // ===== ЭЛЕМЕНТЫ ФОРМ =====

  get registrationFormElements(): Locator[] {
    return [
      this.registrationModal,
      this.regNameInput,
      this.regSurnameInput,
      this.regEmailInput,
      this.regPasswordInput,
      this.regPasswordConfirmInput,
      this.submitRegistrationButton,
    ];
  }

  get loginFormElements(): Locator[] {
    return [
      this.loginModal,
      this.loginWithYandexBtn,
      this.loginWithVkBtn,
      this.authEmailInput,
      this.authPasswordInput,
      this.rememberMeCheckbox,
      this.submitLoginButton,
      this.makeAccountButton,
    ];
  }

  // ===== СОСТАВНЫЕ ДЕЙСТВИЯ =====

  async login(email: string, password: string): Promise<void> {
    await this.authEmailInput.fill(email);
    await this.authPasswordInput.fill(password);
    await this.submitLoginButton.click();
  }

  async fillRegisterForm(
    user: UserForRegistration = createValidUser(),
  ): Promise<void> {
    await this.regNameInput.fill(user.name);
    await this.regSurnameInput.fill(user.surname);
    await this.regEmailInput.fill(user.email);
    await this.regPasswordInput.fill(user.password);
    await this.regPasswordConfirmInput.fill(user.passwordConfirm);
  }

  async openLoginModal(): Promise<void> {
    await this.navigateViaMenu(this.menuAuthorizeButton);
  }

  async openRegistrationModal(): Promise<void> {
    await this.openLoginModal();
    await this.makeAccountButton.click();
  }
}

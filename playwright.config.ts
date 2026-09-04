import {
  defineConfig,
  devices,
  type ReporterDescription,
} from "@playwright/test";

import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const reporters: ReporterDescription[] = [
  ["list"],
  [
    "html",
    {
      outputFolder: "playwright-report",
      open: "never",
    },
  ],
];

if (process.env.TMS_SYNC === "true") {
  reporters.push(["./scripts/tms-reporter.ts"]);
}

const BASE_URL = process.env.BASE_URL || "https://pub-dev.transflow.ru";

export default defineConfig({
  testDir: "./tests/tests",

  timeout: 25_000,

  expect: {
    timeout: 10_000,
  },

  fullyParallel: false,

  retries: process.env.CI ? 1 : 0,

  reporter: reporters,

  use: {
    baseURL: BASE_URL,

    viewport: {
      width: 1920,
      height: 1080,
    },

    headless: true,

    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "setup",
      testDir: "./setup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "chromium-no-auth",

      grep: /@no-auth/,

      use: {
        ...devices["Desktop Chrome"],

        storageState: {
          cookies: [],
          origins: [],
        },
      },
    },

    {
      name: "chromium-user1",

      grepInvert: /@no-auth|@user2/,

      use: {
        ...devices["Desktop Chrome"],
        storageState: "setup/.auth/user1.json",
      },

      dependencies: ["setup"],
    },

    {
      name: "chromium-user2",

      grep: /@user2/,

      use: {
        ...devices["Desktop Chrome"],
        storageState: "setup/.auth/user2.json",
      },

      dependencies: ["setup"],
    },
  ],
});

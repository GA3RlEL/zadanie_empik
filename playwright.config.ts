import { defineConfig, devices } from "@playwright/test";
import { BASE_URL } from "./constants/config";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 2,
  workers: 3,
  reporter: "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    headless: false,
  },

  projects: [
    {
      name: "Desktop chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "Desktop firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "Desktop webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Android",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile iOS",
      use: { ...devices["iPhone 12"] },
    },
  ],
});

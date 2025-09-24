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
    // headless: false,
  },

  projects: [
    {
      name: "Desktop_chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "Desktop_firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "Desktop_webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile_Android",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile_iOS",
      use: { ...devices["iPhone 12"] },
    },
  ],
});

import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  outputDir: "/tmp/aqua-test-results",
  reporter: "list",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:5173",
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 960 } } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 5173 --strictPort",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
  },
});

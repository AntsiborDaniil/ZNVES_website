import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/test/**/*.unit.test.{ts,tsx}"],
    env: {
      NEXT_PUBLIC_USE_MOCKS: "true",
    },
  },
});

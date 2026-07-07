import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { shouldUseMocks } from "./src/mocks/config";
import { resetAllMockStores } from "./src/mocks/reset";
import {
  mockServer,
  resetMockServer,
  startMockServer,
  stopMockServer,
} from "./src/mocks/server";

if (shouldUseMocks()) {
  beforeAll(() => {
    startMockServer();
  });

  afterEach(() => {
    resetMockServer();
    resetAllMockStores();
  });

  afterAll(() => {
    stopMockServer();
  });
}

export { mockServer };

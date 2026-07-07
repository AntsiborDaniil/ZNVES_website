import { setupServer } from "msw/node";
import { mockHandlers } from "./handlers";

export const mockServer = setupServer(...mockHandlers);

export const startMockServer = (): void => {
  mockServer.listen({ onUnhandledRequest: "bypass" });
};

export const stopMockServer = (): void => {
  mockServer.close();
};

export const resetMockServer = (): void => {
  mockServer.resetHandlers();
};

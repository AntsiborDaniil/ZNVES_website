import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MockProvider from "../MockProvider";

const shouldUseMocksMock = vi.fn();

vi.mock("../../../mocks/config", () => ({
  shouldUseMocks: () => shouldUseMocksMock(),
}));

const stopMockWorker = vi.fn().mockResolvedValue(undefined);
const unregisterMockServiceWorker = vi.fn().mockResolvedValue(undefined);
const startMockWorker = vi.fn().mockResolvedValue(undefined);

vi.mock("../../../mocks/browser", () => ({
  stopMockWorker: (...args: unknown[]) => stopMockWorker(...args),
  unregisterMockServiceWorker: (...args: unknown[]) => unregisterMockServiceWorker(...args),
  startMockWorker: (...args: unknown[]) => startMockWorker(...args),
}));

describe("MockProvider", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  beforeEach(() => {
    shouldUseMocksMock.mockReset();
    stopMockWorker.mockClear();
    unregisterMockServiceWorker.mockClear();
    startMockWorker.mockClear();
  });

  it("unregisters mock service worker when mocks are disabled", async () => {
    shouldUseMocksMock.mockReturnValue(false);

    render(
      <MockProvider>
        <div>child</div>
      </MockProvider>
    );

    await waitFor(() => {
      expect(stopMockWorker).toHaveBeenCalledTimes(1);
      expect(unregisterMockServiceWorker).toHaveBeenCalledTimes(1);
    });
    expect(startMockWorker).not.toHaveBeenCalled();
  });

  it("starts mock worker when mocks are enabled", async () => {
    shouldUseMocksMock.mockReturnValue(true);

    render(
      <MockProvider>
        <div>child</div>
      </MockProvider>
    );

    await waitFor(() => {
      expect(startMockWorker).toHaveBeenCalledTimes(1);
    });
    expect(stopMockWorker).not.toHaveBeenCalled();
    expect(unregisterMockServiceWorker).not.toHaveBeenCalled();
  });
});

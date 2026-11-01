import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MockProvider from "../MockProvider";

const shouldUseMocksMock = vi.fn();

vi.mock("../../../lib/useMocks", () => ({
  shouldUseMocks: () => shouldUseMocksMock(),
}));

const unregisterMockServiceWorker = vi.fn().mockResolvedValue(undefined);
const startMockWorker = vi.fn().mockResolvedValue(undefined);

vi.mock("../../../mocks/unregister", () => ({
  unregisterMockServiceWorker: (...args: unknown[]) =>
    unregisterMockServiceWorker(...args),
}));

vi.mock("../../../mocks/browser", () => ({
  startMockWorker: (...args: unknown[]) => startMockWorker(...args),
}));

describe("MockProvider", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  beforeEach(() => {
    shouldUseMocksMock.mockReset();
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

    expect(screen.getByText("child")).toBeInTheDocument();

    await waitFor(() => {
      expect(unregisterMockServiceWorker).toHaveBeenCalledTimes(1);
    });
    expect(startMockWorker).not.toHaveBeenCalled();
  });

  it("starts mock worker and renders children only after ready", async () => {
    shouldUseMocksMock.mockReturnValue(true);
    let resolveStart!: () => void;
    startMockWorker.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveStart = resolve;
        })
    );

    render(
      <MockProvider>
        <div>child</div>
      </MockProvider>
    );

    expect(screen.queryByText("child")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(startMockWorker).toHaveBeenCalledTimes(1);
    });

    resolveStart();

    await waitFor(() => {
      expect(screen.getByText("child")).toBeInTheDocument();
    });
    expect(unregisterMockServiceWorker).not.toHaveBeenCalled();
  });
});

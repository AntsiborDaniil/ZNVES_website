import { afterEach, describe, expect, it, vi } from "vitest";
import { unregisterMockServiceWorker } from "../browser";

describe("unregisterMockServiceWorker", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("unregisters only mockServiceWorker registrations", async () => {
    const mockUnregister = vi.fn().mockResolvedValue(true);
    const otherUnregister = vi.fn().mockResolvedValue(true);

    vi.stubGlobal("navigator", {
      serviceWorker: {
        getRegistrations: vi.fn().mockResolvedValue([
          {
            active: { scriptURL: "http://localhost:3000/mockServiceWorker.js" },
            unregister: mockUnregister,
          },
          {
            active: { scriptURL: "http://localhost:3000/sw.js" },
            unregister: otherUnregister,
          },
        ]),
      },
    });

    await unregisterMockServiceWorker();

    expect(mockUnregister).toHaveBeenCalledTimes(1);
    expect(otherUnregister).not.toHaveBeenCalled();
  });

  it("does nothing when serviceWorker API is unavailable", async () => {
    vi.stubGlobal("navigator", {});

    await expect(unregisterMockServiceWorker()).resolves.toBeUndefined();
  });
});

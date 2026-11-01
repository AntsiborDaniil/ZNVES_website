"use client";

import { useEffect, useState, type ReactNode } from "react";
import { shouldUseMocks } from "../../lib/useMocks";

type MockProviderProps = {
  children: ReactNode;
};

declare global {
  interface Window {
    __ZNVES_USE_MOCKS__?: boolean;
  }
}

/**
 * В mock-режиме не монтируем Auth/API-зависимые children,
 * пока попытка старта MSW не завершится.
 * Auth/catalog/orders при shouldUseMocks() работают и без SW (прямой store).
 */
export default function MockProvider({ children }: MockProviderProps) {
  const mocksEnabled = shouldUseMocks();
  const [ready, setReady] = useState(!mocksEnabled);

  useEffect(() => {
    let cancelled = false;

    if (typeof window !== "undefined") {
      window.__ZNVES_USE_MOCKS__ = mocksEnabled;
    }

    if (!mocksEnabled) {
      // eslint-disable-next-line no-console
      console.log(
        "[ZNVES] mocks OFF (NEXT_PUBLIC_USE_MOCKS !== true). Real API. Check flag via window.__ZNVES_USE_MOCKS__"
      );
      void import("../../mocks/unregister").then(({ unregisterMockServiceWorker }) => {
        void unregisterMockServiceWorker();
      });
      return;
    }

    // eslint-disable-next-line no-console
    console.log(
      "[ZNVES] mocks ON — starting MSW. Flag check in console: window.__ZNVES_USE_MOCKS__"
    );

    void import("../../mocks/browser")
      .then(({ startMockWorker }) => startMockWorker())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("[ZNVES] failed to load/start MSW browser worker", error);
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [mocksEnabled]);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}

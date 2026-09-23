"use client";

import { useEffect, useState, type ReactNode } from "react";
import { shouldUseMocks } from "../../mocks/config";

type MockProviderProps = {
  children: ReactNode;
};

/**
 * В mock-режиме не монтируем Auth/API-зависимые children,
 * пока MSW не готов — иначе getCurrentUser уходит на api.znves.ru → CORS.
 */
export default function MockProvider({ children }: MockProviderProps) {
  const mocksEnabled = shouldUseMocks();
  const [ready, setReady] = useState(!mocksEnabled);

  useEffect(() => {
    let cancelled = false;

    if (!mocksEnabled) {
      void import("../../mocks/unregister").then(({ unregisterMockServiceWorker }) => {
        void unregisterMockServiceWorker();
      });
      return;
    }

    void import("../../mocks/browser")
      .then(({ startMockWorker }) => startMockWorker())
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        // Даже при ошибке старта не блокируем UI навсегда
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

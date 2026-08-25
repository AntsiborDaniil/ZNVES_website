"use client";

import { useEffect, type ReactNode } from "react";
import { shouldUseMocks } from "../../mocks/config";

type MockProviderProps = {
  children: ReactNode;
};

export default function MockProvider({ children }: MockProviderProps) {
  useEffect(() => {
    if (!shouldUseMocks()) {
      // Лёгкий unregister без импорта MSW handlers (бандл моков не тянем в prod).
      void import("../../mocks/unregister").then(({ unregisterMockServiceWorker }) => {
        void unregisterMockServiceWorker();
      });
      return;
    }

    void import("../../mocks/browser").then(({ startMockWorker }) => startMockWorker());
  }, []);

  return <>{children}</>;
}

"use client";

import { useEffect, type ReactNode } from "react";
import { shouldUseMocks } from "../../mocks/config";

type MockProviderProps = {
  children: ReactNode;
};

export default function MockProvider({ children }: MockProviderProps) {
  useEffect(() => {
    if (!shouldUseMocks()) {
      void import("../../mocks/browser").then(({ stopMockWorker, unregisterMockServiceWorker }) => {
        void stopMockWorker();
        void unregisterMockServiceWorker();
      });
      return;
    }

    void import("../../mocks/browser").then(({ startMockWorker }) => startMockWorker());
  }, []);

  return <>{children}</>;
}

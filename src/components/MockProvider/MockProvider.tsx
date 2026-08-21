"use client";

import { useEffect, type ReactNode } from "react";
import { shouldUseMocks } from "../../mocks/config";

type MockProviderProps = {
  children: ReactNode;
};

export default function MockProvider({ children }: MockProviderProps) {
  useEffect(() => {
    if (!shouldUseMocks()) {
      // Важно при переключении с mock → real: снять SW, иначе он продолжит
      // перехватывать /api/auth/* и ломать вход на боевой бэкенд.
      void import("../../mocks/browser").then(
        ({ stopMockWorker, unregisterMockServiceWorker }) => {
          void stopMockWorker().finally(() => {
            void unregisterMockServiceWorker();
          });
        }
      );
      return;
    }

    void import("../../mocks/browser").then(({ startMockWorker }) =>
      startMockWorker()
    );
  }, []);

  return <>{children}</>;
}

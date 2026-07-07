import { setupWorker } from "msw/browser";
import { mockHandlers } from "./handlers";

let worker: ReturnType<typeof setupWorker> | null = null;
let startPromise: Promise<void> | null = null;

export const startMockWorker = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  if (worker) return;

  if (!startPromise) {
    worker = setupWorker(...mockHandlers);
    startPromise = worker
      .start({
        onUnhandledRequest: "warn",
        quiet: true,
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      })
      .then(() => undefined);
  }

  await startPromise;
};

export const stopMockWorker = async (): Promise<void> => {
  if (!worker) return;
  worker.stop();
  worker = null;
  startPromise = null;
};

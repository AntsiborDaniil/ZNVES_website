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
        // Don't warn on Next assets (/_next/image, pages) — only API has handlers
        onUnhandledRequest: "bypass",
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

export const unregisterMockServiceWorker = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations
      .filter((registration) =>
        registration.active?.scriptURL.includes("mockServiceWorker.js")
      )
      .map((registration) => registration.unregister())
  );
};

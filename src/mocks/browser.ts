import { setupWorker } from "msw/browser";
import { shouldUseMocks } from "../lib/useMocks";
import { MOCK_AUTH_CODE, MOCK_DEV_USER } from "./data/account";
import { MOCK_PROMO_CODE_LIST } from "./data/promos";
import { mockHandlers } from "./handlers";
import { unregisterMockServiceWorker } from "./unregister";

export { unregisterMockServiceWorker };

let worker: ReturnType<typeof setupWorker> | null = null;
let startPromise: Promise<void> | null = null;

const logMockBanner = () => {
  const promos = MOCK_PROMO_CODE_LIST.map(
    (p) => `${p.code} (−${p.discount} ₽)`
  ).join(", ");
  // eslint-disable-next-line no-console
  console.log(
    [
      "[ZNVES mocks] Режим dev:mock активен.",
      `ЛК: ${MOCK_DEV_USER.email} / ${MOCK_DEV_USER.password}, код ${MOCK_AUTH_CODE}`,
      `Промокоды: ${promos}`,
      "Проверка флага: window.__ZNVES_USE_MOCKS__",
    ].join("\n")
  );
};

export const startMockWorker = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  if (!shouldUseMocks()) {
    await unregisterMockServiceWorker();
    return;
  }

  if (!startPromise) {
    startPromise = (async () => {
      try {
        worker = setupWorker(...mockHandlers);
        await worker.start({
          onUnhandledRequest: "bypass",
          quiet: false,
          waitUntilReady: true,
          serviceWorker: {
            url: "/mockServiceWorker.js",
            options: { scope: "/" },
          },
        });
        logMockBanner();
        // eslint-disable-next-line no-console
        console.log(
          "[ZNVES mocks] MSW service worker registered. Check Application → Service Workers."
        );
      } catch (error) {
        worker = null;
        startPromise = null;
        // eslint-disable-next-line no-console
        console.error(
          "[ZNVES mocks] MSW failed to start. Auth/catalog/promo still use in-process mocks.",
          error
        );
      }
    })();
  }

  await startPromise;
};

export const stopMockWorker = async (): Promise<void> => {
  if (!worker) return;
  worker.stop();
  worker = null;
  startPromise = null;
};

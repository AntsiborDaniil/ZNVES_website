/** Unregister MSW service worker without importing the full mock handlers bundle. */
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

  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(
          (key) =>
            key.toLowerCase().includes("msw") || key.toLowerCase().includes("mock")
        )
        .map((key) => caches.delete(key))
    );
  }
};

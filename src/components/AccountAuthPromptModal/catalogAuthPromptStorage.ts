export const CATALOG_AUTH_MODAL_DISMISS_KEY = "znves:catalog_auth_modal_dismissed";

export const isCatalogAuthModalDismissed = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CATALOG_AUTH_MODAL_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

export const dismissCatalogAuthModal = (): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CATALOG_AUTH_MODAL_DISMISS_KEY, "1");
  } catch {
    /* ignore storage errors */
  }
};

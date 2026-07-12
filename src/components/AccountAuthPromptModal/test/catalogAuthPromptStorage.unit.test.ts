import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  CATALOG_AUTH_MODAL_DISMISS_KEY,
  dismissCatalogAuthModal,
  isCatalogAuthModalDismissed,
} from "../catalogAuthPromptStorage";

describe("catalogAuthPromptStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("is not dismissed by default", () => {
    expect(isCatalogAuthModalDismissed()).toBe(false);
  });

  it("persists dismiss flag in localStorage", () => {
    dismissCatalogAuthModal();
    expect(localStorage.getItem(CATALOG_AUTH_MODAL_DISMISS_KEY)).toBe("1");
    expect(isCatalogAuthModalDismissed()).toBe(true);
  });
});

export type AccountTab = "profile" | "orders";

export const ACCOUNT_PATH = "/account";

export const ACCOUNT_PROFILE_HREF = `${ACCOUNT_PATH}?tab=profile`;
export const ACCOUNT_PROFILE_EDIT_HREF = `${ACCOUNT_PATH}?tab=profile&view=profile`;
export const ACCOUNT_ORDERS_HREF = `${ACCOUNT_PATH}?tab=orders`;

export const parseAccountTab = (value: string | null): AccountTab =>
  value === "orders" ? "orders" : "profile";

export const isProfileStandaloneView = (value: string | null): boolean =>
  value === "profile";

export type AccountNavigationOptions = {
  standaloneProfile?: boolean;
};

export const buildAccountQuery = (
  tab: AccountTab,
  options: AccountNavigationOptions = {}
): string => {
  const params = new URLSearchParams({ tab });
  if (tab === "profile" && options.standaloneProfile) {
    params.set("view", "profile");
  }
  return params.toString();
};

export const buildAccountHref = (
  tab: AccountTab,
  options: AccountNavigationOptions = {}
): string => `${ACCOUNT_PATH}?${buildAccountQuery(tab, options)}`;

type AccountRouter = {
  push: (href: string, options?: { scroll?: boolean }) => void;
  replace: (href: string, options?: { scroll?: boolean }) => void;
};

export const navigateToAccount = (
  router: AccountRouter,
  _pathname: string,
  tab: AccountTab,
  options: AccountNavigationOptions = {}
): void => {
  router.push(buildAccountHref(tab, options), { scroll: false });
};

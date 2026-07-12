export type PendingAccountAuthFlow = {
  step: "verify";
  mode: "login" | "register";
  pendingEmail: string;
  loginPassword?: string;
  resendCooldownEndsAt?: number;
};

const STORAGE_KEY = "znves:account_auth_pending";

export const getPendingAccountAuthFlow = (): PendingAccountAuthFlow | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingAccountAuthFlow;
    if (parsed?.step !== "verify" || !parsed.pendingEmail) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const savePendingAccountAuthFlow = (flow: PendingAccountAuthFlow): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
  } catch {
    /* ignore */
  }
};

export const clearPendingAccountAuthFlow = (): void => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

export const getResendCooldownRemaining = (endsAt?: number): number => {
  if (!endsAt) return 0;
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
};

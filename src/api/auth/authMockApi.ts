/**
 * Прямой mock-путь auth без fetch/MSW.
 * Нужен, потому что browser MSW + cross-origin api.znves.ru часто
 * не перехватывает запросы (SW не регистрируется / CORS).
 * Активен только при shouldUseMocks() === true.
 */
import type { AuthUser, AuthUserDeliveryData } from "./authApi";
import { AuthApiError } from "./authApiErrors";

const loadStore = () => import("../../mocks/state/authStore");

export const mockLoginUser = async (payload: {
  email: string;
  password: string;
}): Promise<void> => {
  const { startLogin } = await loadStore();
  const result = startLogin(payload);
  if (!result.ok) {
    throw new AuthApiError(result.error);
  }
};

export const mockRegisterUser = async (payload: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}): Promise<void> => {
  const { startRegistration } = await loadStore();
  const result = startRegistration(payload);
  if (!result.ok) {
    throw new AuthApiError(result.error);
  }
};

export const mockVerifyCode = async (payload: {
  email: string;
  code: string;
}): Promise<AuthUser> => {
  const { verifyCode } = await loadStore();
  const result = verifyCode(payload.email, payload.code);
  if (!result.ok) {
    throw new AuthApiError(result.error);
  }
  return result.user;
};

export const mockResendAuthCode = async (email: string): Promise<void> => {
  const { resendCode } = await loadStore();
  const result = resendCode(email);
  if (!result.ok) {
    throw new AuthApiError(result.error);
  }
};

export const mockGetCurrentUser = async (): Promise<AuthUser | null> => {
  const { getUserByToken, resolveSessionToken } = await loadStore();
  const cookie =
    typeof document !== "undefined" ? document.cookie || null : null;
  return getUserByToken(resolveSessionToken(cookie));
};

export const mockUpdateCurrentUser = async (
  payload: Partial<AuthUser>
): Promise<AuthUser> => {
  const { getUserByToken, resolveSessionToken, updateUserByToken } =
    await loadStore();
  const cookie =
    typeof document !== "undefined" ? document.cookie || null : null;
  const token = resolveSessionToken(cookie);
  const user = updateUserByToken(token, payload);
  if (!user) {
    throw new AuthApiError("Unauthorized");
  }
  return user;
};

export const mockUpdateUserDeliveryData = async (
  payload: Partial<NonNullable<AuthUser["delivery_data"]>>
): Promise<AuthUserDeliveryData> => {
  const { resolveSessionToken, updateDeliveryByToken } = await loadStore();
  const cookie =
    typeof document !== "undefined" ? document.cookie || null : null;
  const data = updateDeliveryByToken(resolveSessionToken(cookie), payload);
  if (!data) {
    throw new AuthApiError("Unauthorized");
  }
  return data;
};

export const mockChangePassword = async (payload: {
  current_password: string;
  new_password: string;
}): Promise<void> => {
  const { changePasswordByToken, resolveSessionToken } = await loadStore();
  const cookie =
    typeof document !== "undefined" ? document.cookie || null : null;
  const result = changePasswordByToken(resolveSessionToken(cookie), payload);
  if (!result.ok) {
    throw new AuthApiError(result.error);
  }
};

export const mockRequestPasswordReset = async (email: string): Promise<void> => {
  const { startPasswordReset } = await loadStore();
  startPasswordReset(email);
};

export const mockVerifyPasswordResetCode = async (
  email: string,
  code: string
): Promise<void> => {
  const { verifyPasswordReset, buildPasswordResetCookies } = await loadStore();
  const result = verifyPasswordReset(email, code);
  if (!result.ok) {
    throw new AuthApiError(result.error);
  }
  // Ставим cookie на localhost (не httpOnly) — достаточно для mock change password
  if (typeof document !== "undefined") {
    for (const line of buildPasswordResetCookies(result.token)) {
      const part = line.split(";")[0];
      if (part) document.cookie = part;
    }
  }
};

export const mockChangePasswordWithResetToken = async (
  newPassword: string
): Promise<void> => {
  const { changePasswordWithResetToken, parsePasswordResetToken } =
    await loadStore();
  const cookie =
    typeof document !== "undefined" ? document.cookie || null : null;
  const result = changePasswordWithResetToken(
    parsePasswordResetToken(cookie),
    newPassword
  );
  if (!result.ok) {
    throw new AuthApiError(result.error);
  }
};

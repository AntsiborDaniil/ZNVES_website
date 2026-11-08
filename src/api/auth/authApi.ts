import { apiUrl } from "../../lib/apiUrl";
import { shouldUseMocks } from "../../lib/useMocks";
import { AuthApiError, parseAuthApiErrorResponse } from "./authApiErrors";

export { AuthApiError, humanizeAuthErrorMessage, parseAuthApiErrorBody } from "./authApiErrors";

export const AUTH_VERIFY_SESSION_ERROR_MESSAGE =
  "Вход выполнен, но сессия не сохранилась. Попробуйте ещё раз или обновите страницу.";

const VERIFY_USER_RETRY_ATTEMPTS = 3;
const VERIFY_USER_RETRY_DELAY_MS = 150;

export interface AuthUserDeliveryData {
  cdek_full_pvz_address?: string | null;
  yandex_full_pvz_address?: string | null;
  city?: string | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  floor?: string | null;
  intercom?: string | null;
  comment?: string | null;
}

export interface AuthUser {
  username?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  delivery_data?: AuthUserDeliveryData | null;
}

const AUTH_USER_URL = apiUrl("/auth/user/");
const AUTH_USER_DELIVERY_URL = apiUrl("/auth/user/delivery-data/");
const AUTH_CHANGE_PASSWORD_URL = apiUrl("/auth/change-password/");

const REGISTER_URL = apiUrl("/auth/register/");
const REGISTER_VERIFY_URL = apiUrl("/auth/register/verify/");
const LOGIN_URL = apiUrl("/auth/login/");
const LOGIN_VERIFY_URL = apiUrl("/auth/login/verify/");
const RESEND_CODE_URL = apiUrl("/auth/register/resend-code/");
const PASSWORD_RESET_REQUEST_URL = apiUrl("/auth/password-reset/request/");
const PASSWORD_RESET_VERIFY_URL = apiUrl("/auth/password-reset/verify/");
const PASSWORD_RESET_CHANGE_URL = apiUrl("/auth/password-reset/change/");

export type RegisterPayload = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type VerifyPayload = {
  email: string;
  code: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const parseAuthUser = (data: unknown): AuthUser | null => {
  if (!data || typeof data !== "object") return null;

  const record = data as Record<string, unknown>;
  if (typeof record.email !== "string" || !record.email.trim()) return null;

  return {
    username: typeof record.username === "string" ? record.username : undefined,
    first_name: typeof record.first_name === "string" ? record.first_name : "",
    last_name: typeof record.last_name === "string" ? record.last_name : "",
    email: record.email,
    phone_number: typeof record.phone_number === "string" ? record.phone_number : "",
    delivery_data:
      record.delivery_data === null || record.delivery_data === undefined
        ? record.delivery_data
        : (record.delivery_data as AuthUserDeliveryData),
  };
};

const authJsonHeaders = async (): Promise<Record<string, string>> => {
  // CSRF bootstrap and cookie forwarding are handled by the same-origin BFF.
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  return headers;
};

const authPost = async (
  url: string,
  payload: object,
  fallback = "Не удалось выполнить запрос"
): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: await authJsonHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseAuthApiErrorResponse(response, fallback);
  }
};

const authPostVerify = async (url: string, payload: object): Promise<AuthUser> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: await authJsonHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseAuthApiErrorResponse(response, "Не удалось выполнить запрос");
  }

  const data = (await response.json()) as unknown;
  const userFromResponse = parseAuthUser(data);
  if (userFromResponse) {
    return userFromResponse;
  }

  // Бэкенд может вернуть только { detail: "Вход выполнен." } — cookie уже установлена
  const userFromProfile = await getCurrentUserWithRetry();
  if (userFromProfile) {
    return userFromProfile;
  }

  throw new AuthApiError(AUTH_VERIFY_SESSION_ERROR_MESSAGE);
};

export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  if (shouldUseMocks()) {
    const { mockRegisterUser } = await import("./authMockApi");
    await mockRegisterUser(payload);
    return;
  }
  await authPost(REGISTER_URL, payload);
};

export const verifyRegistration = async (payload: VerifyPayload): Promise<AuthUser> => {
  if (shouldUseMocks()) {
    const { mockVerifyCode } = await import("./authMockApi");
    return mockVerifyCode(payload);
  }
  return authPostVerify(REGISTER_VERIFY_URL, payload);
};

export const loginUser = async (payload: LoginPayload): Promise<void> => {
  if (shouldUseMocks()) {
    const { mockLoginUser } = await import("./authMockApi");
    await mockLoginUser(payload);
    return;
  }
  await authPost(LOGIN_URL, payload);
};

export const verifyLogin = async (payload: VerifyPayload): Promise<AuthUser> => {
  if (shouldUseMocks()) {
    const { mockVerifyCode } = await import("./authMockApi");
    return mockVerifyCode(payload);
  }
  return authPostVerify(LOGIN_VERIFY_URL, payload);
};

export const resendAuthCode = async (email: string): Promise<void> => {
  if (shouldUseMocks()) {
    const { mockResendAuthCode } = await import("./authMockApi");
    await mockResendAuthCode(email);
    return;
  }
  await authPost(RESEND_CODE_URL, { email });
};

/** Шаг 1: запрос кода сброса пароля на email */
export const requestPasswordReset = async (email: string): Promise<void> => {
  if (shouldUseMocks()) {
    const { mockRequestPasswordReset } = await import("./authMockApi");
    await mockRequestPasswordReset(email.trim());
    return;
  }
  await authPost(
    PASSWORD_RESET_REQUEST_URL,
    { email: email.trim() },
    "Не удалось отправить код"
  );
};

/** Шаг 2: проверка кода (токен сброса ставится бэкендом в httpOnly-cookie) */
export const verifyPasswordResetCode = async (
  email: string,
  code: string
): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }

  if (shouldUseMocks()) {
    const { mockVerifyPasswordResetCode } = await import("./authMockApi");
    await mockVerifyPasswordResetCode(email.trim(), code.trim());
    return;
  }

  const response = await fetch(PASSWORD_RESET_VERIFY_URL, {
    method: "POST",
    credentials: "include",
    headers: await authJsonHeaders(),
    body: JSON.stringify({ email: email.trim(), code: code.trim() }),
  });

  if (!response.ok) {
    throw await parseAuthApiErrorResponse(response, "Неверный или просроченный код");
  }
};

/** Шаг 3: смена пароля (токен из httpOnly-cookie уходит с credentials: include) */
export const changePasswordWithResetToken = async (newPassword: string): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }

  if (shouldUseMocks()) {
    const { mockChangePasswordWithResetToken } = await import("./authMockApi");
    await mockChangePasswordWithResetToken(newPassword);
    return;
  }

  const response = await fetch(PASSWORD_RESET_CHANGE_URL, {
    method: "POST",
    credentials: "include",
    headers: await authJsonHeaders(),
    body: JSON.stringify({ new_password: newPassword }),
  });

  if (!response.ok) {
    throw await parseAuthApiErrorResponse(response, "Не удалось изменить пароль");
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  if (typeof window === "undefined") {
    return null;
  }
  if (shouldUseMocks()) {
    const { mockGetCurrentUser } = await import("./authMockApi");
    return mockGetCurrentUser();
  }
  try {
    const response = await fetch(AUTH_USER_URL, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as unknown;
    return parseAuthUser(data);
  } catch {
    return null;
  }
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getCurrentUserWithRetry = async (
  attempts = VERIFY_USER_RETRY_ATTEMPTS,
  delayMs = VERIFY_USER_RETRY_DELAY_MS
): Promise<AuthUser | null> => {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const user = await getCurrentUser();
    if (user) return user;
    if (attempt < attempts - 1) {
      await sleep(delayMs * (attempt + 1));
    }
  }
  return null;
};

export type UpdateUserPayload = {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
};

export type UpdateUserDeliveryPayload = Partial<{
  cdek_full_pvz_address: string;
  yandex_full_pvz_address: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  floor: string;
  intercom: string;
  comment: string;
}>;

export const updateCurrentUser = async (
  payload: UpdateUserPayload
): Promise<AuthUser> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }
  if (shouldUseMocks()) {
    const { mockUpdateCurrentUser } = await import("./authMockApi");
    return mockUpdateCurrentUser(payload);
  }
  const response = await fetch(AUTH_USER_URL, {
    method: "PATCH",
    credentials: "include",
    headers: await authJsonHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const text = await response.text();
    let message = "Не удалось сохранить изменения";
    try {
      const json = JSON.parse(text);
      if (typeof json.detail === "string") message = json.detail;
      else if (typeof json.message === "string") message = json.message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }
  const data = (await response.json()) as unknown;
  const user = parseAuthUser(data);
  if (!user) {
    throw new Error("Некорректный ответ сервера");
  }
  return user;
};

export const updateUserDeliveryData = async (
  payload: UpdateUserDeliveryPayload
): Promise<AuthUserDeliveryData> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }
  if (shouldUseMocks()) {
    const { mockUpdateUserDeliveryData } = await import("./authMockApi");
    return mockUpdateUserDeliveryData(payload);
  }
  const response = await fetch(AUTH_USER_DELIVERY_URL, {
    method: "PATCH",
    credentials: "include",
    headers: await authJsonHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const text = await response.text();
    let message = "Не удалось сохранить адрес доставки";
    try {
      const json = JSON.parse(text) as { detail?: string; message?: string };
      if (typeof json.detail === "string") message = json.detail;
      else if (typeof json.message === "string") message = json.message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }
  const data = (await response.json()) as AuthUserDeliveryData;
  return data;
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
};

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }
  if (shouldUseMocks()) {
    const { mockChangePassword } = await import("./authMockApi");
    await mockChangePassword(payload);
    return;
  }
  const response = await fetch(AUTH_CHANGE_PASSWORD_URL, {
    method: "POST",
    credentials: "include",
    headers: await authJsonHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw await parseAuthApiErrorResponse(response, "Не удалось изменить пароль");
  }
};


/** Clear the HttpOnly session through the BFF. */
export async function logoutUser(): Promise<void> {
  if (shouldUseMocks()) {
    const { clearMockAuthSession } = await import("../../mocks/state/authStore");
    clearMockAuthSession();
    return;
  }
  await authPost(apiUrl("/auth/logout/"), {});
}

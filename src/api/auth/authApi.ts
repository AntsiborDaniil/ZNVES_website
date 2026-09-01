import { API_BASE_URL } from "../../lib/apiConfig";
import { getCsrfToken } from "../../lib/csrf";
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

const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;

const AUTH_USER_URL = `${AUTH_BASE_URL}/user/`;
const AUTH_USER_DELIVERY_URL = `${AUTH_BASE_URL}/user/delivery-data/`;
const AUTH_CHANGE_PASSWORD_URL = `${AUTH_BASE_URL}/user/change-password/`;

const REGISTER_URL = `${AUTH_BASE_URL}/register/`;
const REGISTER_VERIFY_URL = `${AUTH_BASE_URL}/register/verify/`;
const LOGIN_URL = `${AUTH_BASE_URL}/login/`;
const LOGIN_VERIFY_URL = `${AUTH_BASE_URL}/login/verify/`;
const RESEND_CODE_URL = `${AUTH_BASE_URL}/register/resend-code/`;
const PASSWORD_RESET_REQUEST_URL = `${AUTH_BASE_URL}/password-reset/request/`;
const PASSWORD_RESET_VERIFY_URL = `${AUTH_BASE_URL}/password-reset/verify/`;
const PASSWORD_RESET_CHANGE_URL = `${AUTH_BASE_URL}/password-reset/change/`;

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

const authJsonHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const csrf = getCsrfToken();
  if (csrf) {
    headers["X-CSRFToken"] = csrf;
  }
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
    headers: authJsonHeaders(),
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
    headers: authJsonHeaders(),
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
  await authPost(REGISTER_URL, payload);
};

export const verifyRegistration = async (payload: VerifyPayload): Promise<AuthUser> => {
  return authPostVerify(REGISTER_VERIFY_URL, payload);
};

export const loginUser = async (payload: LoginPayload): Promise<void> => {
  await authPost(LOGIN_URL, payload);
};

export const verifyLogin = async (payload: VerifyPayload): Promise<AuthUser> => {
  return authPostVerify(LOGIN_VERIFY_URL, payload);
};

export const resendAuthCode = async (email: string): Promise<void> => {
  await authPost(RESEND_CODE_URL, { email });
};

/** Шаг 1: запрос кода сброса пароля на email */
export const requestPasswordReset = async (email: string): Promise<void> => {
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

  const response = await fetch(PASSWORD_RESET_VERIFY_URL, {
    method: "POST",
    credentials: "include",
    headers: authJsonHeaders(),
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

  const response = await fetch(PASSWORD_RESET_CHANGE_URL, {
    method: "POST",
    credentials: "include",
    headers: authJsonHeaders(),
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
  const response = await fetch(AUTH_USER_URL, {
    method: "PATCH",
    credentials: "include",
    headers: authJsonHeaders(),
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
  const response = await fetch(AUTH_USER_DELIVERY_URL, {
    method: "PATCH",
    credentials: "include",
    headers: authJsonHeaders(),
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
  const response = await fetch(AUTH_CHANGE_PASSWORD_URL, {
    method: "POST",
    credentials: "include",
    headers: authJsonHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw await parseAuthApiErrorResponse(response, "Не удалось изменить пароль");
  }
};

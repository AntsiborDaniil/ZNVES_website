import { API_BASE_URL } from "../../lib/apiConfig";

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
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  delivery_data?: AuthUserDeliveryData;
}

const ACCESS_TOKEN_KEY = "access-token";

export const hasAccessToken = (): boolean => {
  if (typeof window === "undefined") return false;
  if (/(?:^|;\s*)access-token\s*=\s*[^;]+/.test(document.cookie)) return true;
  try {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) return true;
    if (sessionStorage.getItem(ACCESS_TOKEN_KEY)) return true;
  } catch {
    return false;
  }
  return false;
};

const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;

const AUTH_USER_URL = `${AUTH_BASE_URL}/user/`;
const AUTH_USER_DELIVERY_URL = `${AUTH_BASE_URL}/user/delivery-data/`;

const REGISTER_URL = `${AUTH_BASE_URL}/register/`;
const REGISTER_VERIFY_URL = `${AUTH_BASE_URL}/register/verify/`;
const LOGIN_URL = `${AUTH_BASE_URL}/login/`;
const LOGIN_VERIFY_URL = `${AUTH_BASE_URL}/login/verify/`;
const RESEND_CODE_URL = `${AUTH_BASE_URL}/register/resend-code/`;

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

const parseApiError = async (response: Response, fallback: string): Promise<string> => {
  const text = await response.text();
  try {
    const json = JSON.parse(text) as Record<string, unknown>;
    if (typeof json.detail === "string") return json.detail;
    if (typeof json.message === "string") return json.message;
    if (typeof json.email === "string") return json.email;
    if (Array.isArray(json.email) && typeof json.email[0] === "string") {
      return json.email[0];
    }
    if (typeof json.non_field_errors === "object" && Array.isArray(json.non_field_errors)) {
      const first = json.non_field_errors[0];
      if (typeof first === "string") return first;
    }
  } catch {
    if (text) return text;
  }
  return fallback;
};

const authPost = async (url: string, payload: object): Promise<void> => {
  if (typeof window === "undefined") {
    throw new Error("Вызов только на клиенте");
  }

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Не удалось выполнить запрос"));
  }
};

export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  await authPost(REGISTER_URL, payload);
};

export const verifyRegistration = async (payload: VerifyPayload): Promise<void> => {
  await authPost(REGISTER_VERIFY_URL, payload);
};

export const loginUser = async (payload: LoginPayload): Promise<void> => {
  await authPost(LOGIN_URL, payload);
};

export const verifyLogin = async (payload: VerifyPayload): Promise<void> => {
  await authPost(LOGIN_VERIFY_URL, payload);
};

export const resendAuthCode = async (email: string): Promise<void> => {
  await authPost(RESEND_CODE_URL, { email });
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
    const data = (await response.json()) as AuthUser;
    return data && typeof data.username === "string" ? data : null;
  } catch {
    return null;
  }
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
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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
  const data = (await response.json()) as AuthUser;
  return data;
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
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
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

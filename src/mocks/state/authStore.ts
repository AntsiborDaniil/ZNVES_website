import type { AuthUser } from "../../api/auth/authApi";
import { MOCK_AUTH_CODE, MOCK_DEV_USER } from "../config";

type PendingVerification = {
  kind: "register" | "login";
  password: string;
  profile?: {
    first_name: string;
    last_name: string;
    phone_number: string;
  };
};

type StoredUser = {
  password: string;
  user: AuthUser;
};

const users = new Map<string, StoredUser>();
const pendingVerifications = new Map<string, PendingVerification>();
const sessions = new Map<string, string>();

let sessionCounter = 0;
/** Последняя успешная сессия — fallback для browser MSW, где Set-Cookie с API-домена не ставится. */
let lastSessionToken: string | null = null;

const emailKey = (email: string): string => email.trim().toLowerCase();

const buildUsername = (email: string): string => email.split("@")[0] ?? "user";

const createAuthUser = (
  email: string,
  profile: {
    first_name: string;
    last_name: string;
    phone_number: string;
    delivery_data?: AuthUser["delivery_data"];
  }
): AuthUser => ({
  username: buildUsername(email),
  first_name: profile.first_name,
  last_name: profile.last_name,
  email: email.trim().toLowerCase(),
  phone_number: profile.phone_number,
  delivery_data: profile.delivery_data ? { ...profile.delivery_data } : {},
});

const seedDevUser = (): void => {
  const email = emailKey(MOCK_DEV_USER.email);
  if (users.has(email)) return;

  users.set(email, {
    password: MOCK_DEV_USER.password,
    user: createAuthUser(MOCK_DEV_USER.email, {
      first_name: MOCK_DEV_USER.first_name,
      last_name: MOCK_DEV_USER.last_name,
      phone_number: MOCK_DEV_USER.phone_number,
      delivery_data: { ...MOCK_DEV_USER.delivery_data },
    }),
  });
};

seedDevUser();

export const resetAuthStore = (): void => {
  users.clear();
  pendingVerifications.clear();
  sessions.clear();
  sessionCounter = 0;
  lastSessionToken = null;
  seedDevUser();
};

export const startRegistration = (payload: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}): { ok: true } | { ok: false; error: string } => {
  const email = emailKey(payload.email);

  if (users.has(email)) {
    return { ok: false, error: "Пользователь с таким email уже существует" };
  }

  pendingVerifications.set(email, {
    kind: "register",
    password: payload.password,
    profile: {
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone_number: payload.phone_number,
    },
  });

  return { ok: true };
};

export const startLogin = (payload: {
  email: string;
  password: string;
}): { ok: true } | { ok: false; error: string } => {
  const email = emailKey(payload.email);
  const stored = users.get(email);

  if (!stored || stored.password !== payload.password) {
    return { ok: false, error: "Неверный email или пароль" };
  }

  pendingVerifications.set(email, {
    kind: "login",
    password: payload.password,
  });

  return { ok: true };
};

export const resendCode = (email: string): { ok: true } | { ok: false; error: string } => {
  const key = emailKey(email);
  if (!pendingVerifications.has(key) && !users.has(key)) {
    return { ok: false, error: "Пользователь не найден" };
  }
  return { ok: true };
};

export const verifyCode = (
  email: string,
  code: string
): { ok: true; token: string; user: AuthUser } | { ok: false; error: string } => {
  const key = emailKey(email);

  if (code !== MOCK_AUTH_CODE) {
    return { ok: false, error: "Неверный код подтверждения" };
  }

  const pending = pendingVerifications.get(key);

  if (pending?.kind === "register" && pending.profile) {
    const user = createAuthUser(email, pending.profile);
    users.set(key, { password: pending.password, user });
    pendingVerifications.delete(key);
    const token = `mock-session-${++sessionCounter}`;
    sessions.set(token, key);
    lastSessionToken = token;
    return { ok: true, token, user };
  }

  const stored = users.get(key);
  if (!stored) {
    return { ok: false, error: "Сначала запросите код" };
  }

  pendingVerifications.delete(key);
  const token = `mock-session-${++sessionCounter}`;
  sessions.set(token, key);
  lastSessionToken = token;
  return { ok: true, token, user: stored.user };
};

export const getUserByToken = (token: string | null): AuthUser | null => {
  if (token) {
    const email = sessions.get(token);
    if (email) {
      return users.get(email)?.user ?? null;
    }
  }

  if (lastSessionToken && lastSessionToken !== token) {
    const email = sessions.get(lastSessionToken);
    if (email) {
      return users.get(email)?.user ?? null;
    }
  }

  return null;
};

export const updateUserByToken = (
  token: string | null,
  patch: Partial<AuthUser>
): AuthUser | null => {
  const current = getUserByToken(token);
  if (!current) return null;

  const email = emailKey(current.email);
  const stored = users.get(email);
  if (!stored) return null;

  const updated: AuthUser = {
    ...stored.user,
    ...patch,
    email: stored.user.email,
    username: stored.user.username,
  };

  stored.user = updated;
  users.set(email, stored);
  return updated;
};

export const updateDeliveryByToken = (
  token: string | null,
  patch: NonNullable<AuthUser["delivery_data"]>
): NonNullable<AuthUser["delivery_data"]> | null => {
  const current = getUserByToken(token);
  if (!current) return null;

  const email = emailKey(current.email);
  const stored = users.get(email);
  if (!stored) return null;

  stored.user = {
    ...stored.user,
    delivery_data: { ...stored.user.delivery_data, ...patch },
  };

  return stored.user.delivery_data ?? null;
};

export const changePasswordByToken = (
  token: string | null,
  payload: { current_password: string; new_password: string }
): { ok: true } | { ok: false; error: string } => {
  const current = getUserByToken(token);
  if (!current) return { ok: false, error: "Unauthorized" };

  const email = emailKey(current.email);
  const stored = users.get(email);
  if (!stored) return { ok: false, error: "Unauthorized" };

  if (stored.password !== payload.current_password) {
    return { ok: false, error: "Неверный текущий пароль" };
  }
  if (!payload.new_password || payload.new_password.length < 8) {
    return { ok: false, error: "Новый пароль должен быть не короче 8 символов" };
  }

  stored.password = payload.new_password;
  users.set(email, stored);
  return { ok: true };
};

export const parseAccessToken = (cookieHeader: string | null): string | null => {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)access-token=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
};

export const buildSessionCookies = (token: string): string[] => [
  `access-token=${encodeURIComponent(token)}; Path=/; SameSite=Lax`,
  `csrftoken=mock-csrf-token; Path=/; SameSite=Lax`,
];

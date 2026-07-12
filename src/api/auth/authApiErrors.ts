export type AuthFieldName =
  | "email"
  | "password"
  | "first_name"
  | "last_name"
  | "phone_number"
  | "code"
  | "username";

export type AuthFieldErrors = Partial<Record<AuthFieldName, string>>;

const AUTH_FIELD_KEYS = new Set<string>([
  "email",
  "password",
  "first_name",
  "last_name",
  "phone_number",
  "code",
  "username",
]);

const FIELD_LABELS: Record<AuthFieldName, string> = {
  email: "Email",
  password: "Пароль",
  first_name: "Имя",
  last_name: "Фамилия",
  phone_number: "Телефон",
  code: "Код подтверждения",
  username: "Никнейм",
};

const MESSAGE_ALIASES: Record<string, string> = {
  "this field is required.": "Заполните это поле",
  "this field may not be blank.": "Заполните это поле",
  "enter a valid email address.": "Введите корректный email",
  "user with this email already exists.": "Пользователь с таким email уже зарегистрирован",
  "a user with that email already exists.": "Пользователь с таким email уже зарегистрирован",
  "invalid credentials.": "Неверный email или пароль",
  "no active account found with the given credentials.": "Неверный email или пароль",
  "unable to log in with provided credentials.": "Неверный email или пароль",
  "incorrect verification code.": "Неверный код подтверждения",
  "invalid verification code.": "Неверный код подтверждения",
  "verification code expired.": "Срок действия кода истёк — запросите новый",
  "code expired.": "Срок действия кода истёк — запросите новый",
  "too many requests.": "Слишком много попыток — попробуйте позже",
};

export const humanizeAuthErrorMessage = (message: string): string => {
  const trimmed = message.trim();
  if (!trimmed) return trimmed;

  const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
  return MESSAGE_ALIASES[normalized] ?? trimmed;
};

const collectMessages = (value: unknown): string[] => {
  if (typeof value === "string") {
    const humanized = humanizeAuthErrorMessage(value);
    return humanized ? [humanized] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectMessages);
  }

  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(collectMessages);
  }

  return [];
};

export class AuthApiError extends Error {
  fieldErrors: AuthFieldErrors;

  constructor(message: string, fieldErrors: AuthFieldErrors = {}) {
    super(message);
    this.name = "AuthApiError";
    this.fieldErrors = fieldErrors;
  }
}

export const parseAuthApiErrorBody = (
  body: unknown,
  fallback: string
): AuthApiError => {
  const fieldErrors: AuthFieldErrors = {};
  const generalMessages: string[] = [];

  if (!body || typeof body !== "object") {
    return new AuthApiError(fallback, fieldErrors);
  }

  const record = body as Record<string, unknown>;

  if (record.detail !== undefined) {
    generalMessages.push(...collectMessages(record.detail));
  }

  if (record.message !== undefined) {
    generalMessages.push(...collectMessages(record.message));
  }

  if (record.non_field_errors !== undefined) {
    generalMessages.push(...collectMessages(record.non_field_errors));
  }

  if (record.errors !== undefined && typeof record.errors === "object") {
    const nested = record.errors as Record<string, unknown>;
    for (const [key, value] of Object.entries(nested)) {
      const messages = collectMessages(value);
      if (AUTH_FIELD_KEYS.has(key) && messages[0]) {
        fieldErrors[key as AuthFieldName] = messages[0];
      } else if (messages.length > 0) {
        generalMessages.push(...messages);
      }
    }
  }

  for (const key of Array.from(AUTH_FIELD_KEYS) as AuthFieldName[]) {
    if (record[key] === undefined || fieldErrors[key]) continue;
    const messages = collectMessages(record[key]);
    if (messages[0]) {
      fieldErrors[key] = messages[0];
    }
  }

  if (generalMessages.length > 0) {
    return new AuthApiError(generalMessages[0], fieldErrors);
  }

  const fieldKeys = Object.keys(fieldErrors) as AuthFieldName[];
  if (fieldKeys.length === 1) {
    return new AuthApiError(fieldErrors[fieldKeys[0]] ?? fallback, fieldErrors);
  }

  if (fieldKeys.length > 1) {
    const summary = fieldKeys
      .map((key) => FIELD_LABELS[key] ?? key)
      .join(", ");
    return new AuthApiError(`Проверьте поля: ${summary}`, fieldErrors);
  }

  return new AuthApiError(fallback, fieldErrors);
};

export const parseAuthApiErrorResponse = async (
  response: Response,
  fallback: string
): Promise<AuthApiError> => {
  const text = await response.text();

  if (!text) {
    if (response.status === 401) {
      return new AuthApiError("Неверный email, пароль или код подтверждения");
    }
    if (response.status === 429) {
      return new AuthApiError("Слишком много попыток — попробуйте позже");
    }
    return new AuthApiError(fallback);
  }

  try {
    const json = JSON.parse(text) as unknown;
    return parseAuthApiErrorBody(json, fallback);
  } catch {
    return new AuthApiError(humanizeAuthErrorMessage(text) || fallback);
  }
};

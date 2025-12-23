"use client";

type RegisterPayload = {
    name: string;
    surname: string;
    email: string;
    nickname: string;
    phone: string;
    password: string;
    confirmPassword: string;
    notifications: boolean;
};

type LoginPayload = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

type FetchOptions = RequestInit & { body: string };

const TOKEN_COOKIE_KEY = "znves_auth_token";
const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const REGISTER_URL = ""; // TODO: вставьте URL эндпоинта регистрации
const LOGIN_URL = ""; // TODO: вставьте URL эндпоинта логина

const setCookie = (token: string, maxAge = DEFAULT_COOKIE_MAX_AGE) => {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = `${TOKEN_COOKIE_KEY}=${encodeURIComponent(
        token
    )}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const prepareRequest = (payload: object): FetchOptions => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const message = await response
            .text()
            .catch(() => "Неизвестная ошибка сервера");
        throw new Error(message || "Не удалось выполнить запрос");
    }

    try {
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Некорректный ответ сервера");
    }
};

export const registerUser = async (payload: RegisterPayload) => {
    if (!REGISTER_URL) {
        throw new Error("Укажите URL эндпоинта регистрации в authService");
    }

    const response = await fetch(REGISTER_URL, prepareRequest(payload));
    const data = await handleResponse(response);

    if (data?.token) {
        setCookie(data.token);
    }

    return data;
};

export const loginUser = async ({ rememberMe, ...payload }: LoginPayload) => {
    if (!LOGIN_URL) {
        throw new Error("Укажите URL эндпоинта логина в authService");
    }

    const response = await fetch(LOGIN_URL, prepareRequest(payload));
    const data = await handleResponse(response);

    if (data?.token) {
        setCookie(
            data.token,
            rememberMe ? DEFAULT_COOKIE_MAX_AGE : 60 * 60 * 4 // 4 часа для сессии
        );
    }

    return data;
};

export const clearAuthCookie = () => {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = `${TOKEN_COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
};

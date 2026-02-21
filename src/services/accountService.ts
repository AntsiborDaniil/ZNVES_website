"use client";

type AccountUpdatePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nickname?: string;
};

type PasswordUpdatePayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ACCOUNT_UPDATE_URL = ""; // TODO: set profile update endpoint
const PASSWORD_UPDATE_URL = ""; // TODO: set password update endpoint

const postJson = async (url: string, payload: object) => {
  if (!url) {
    throw new Error("Укажите URL эндпоинта в accountService");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response
      .text()
      .catch(() => "Не удалось выполнить запрос");
    throw new Error(message || "Не удалось выполнить запрос");
  }

  try {
    return await response.json();
  } catch {
    return {};
  }
};

export const updateAccountDetails = async (payload: AccountUpdatePayload) =>
  postJson(ACCOUNT_UPDATE_URL, payload);

export const updatePassword = async (payload: PasswordUpdatePayload) =>
  postJson(PASSWORD_UPDATE_URL, payload);

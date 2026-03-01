import { API_BASE_URL } from "../../lib/apiConfig";

const MAILING_URL = `${API_BASE_URL}/api/mailing/`;

/**
 * Подписка на рассылку: POST /api/mailing/ с телом { email }.
 */
export const subscribeToMailing = async (email: string): Promise<void> => {
  const response = await fetch(MAILING_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email: email.trim() }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    let message = "Не удалось подписаться на рассылку";
    try {
      const json = JSON.parse(text);
      if (typeof json.detail === "string") message = json.detail;
      else if (typeof json.message === "string") message = json.message;
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }
};

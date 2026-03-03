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
      if (typeof json.detail === "string") {
        message = json.detail;
      } else if (typeof json.message === "string") {
        message = json.message;
      } else if (json.email) {
        if (Array.isArray(json.email) && typeof json.email[0] === "string") {
          message = json.email[0];
        } else if (typeof json.email === "string") {
          message = json.email;
        }
      }
    } catch {
      if (text) message = text;
    }
    throw new Error(message);
  }
};

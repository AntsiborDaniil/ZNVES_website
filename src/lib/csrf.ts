/**
 * Читает CSRF-токен из document.cookie (кука csrftoken, Django).
 * Работает только в браузере; при httpOnly куке токен нужно брать из ответа API.
 */
export function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const name = "csrftoken";
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)" + name + "\\s*=\\s*([^;]*)"));
  return match ? decodeURIComponent(match[1].trim()) : "";
}

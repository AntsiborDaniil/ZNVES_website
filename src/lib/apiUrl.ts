import { API_BASE_URL } from "./apiConfig";
import { shouldUseMocks } from "./useMocks";

/** Server rendering keeps direct public fetches; browser requests use the Next BFF. */
export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (typeof window !== "undefined" && !shouldUseMocks()) {
    return `/api/shop${normalized.replace(/\/+$/, "")}`;
  }
  return `${API_BASE_URL}/api${normalized}`;
}

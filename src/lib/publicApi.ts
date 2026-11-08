import { API_BASE_URL } from "./apiConfig";
import { shouldUseMocks } from "./useMocks";

/** Public SSR fetches remain direct. Browser catalog/home reads use the same-origin BFF. */
export function publicApiUrl(input: RequestInfo | URL): RequestInfo | URL {
  if (typeof window === "undefined" || shouldUseMocks() || (typeof input !== "string" && !(input instanceof URL))) return input;
  try {
    const url = new URL(String(input), window.location.origin);
    if (url.origin !== new URL(API_BASE_URL).origin || !/^\/api\/(catalog|home)(\/|$)/.test(url.pathname)) return input;
    return `/api/shop${url.pathname.slice(4).replace(/\/+$/, "")}${url.search}`;
  } catch { return input; }
}

export function fetchPublicApi(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers);
  if (!init?.method || init.method === "GET") headers.delete("Content-Type");
  return fetch(publicApiUrl(input), { ...init, headers });
}

/**
 * Shared CDEK OAuth token with in-memory cache (server process).
 * Avoids requesting a new token on every PVZ / calculate call.
 */

const CDEK_API = "https://api.cdek.ru/v2";

/** Refresh 60s before expiry to avoid edge races */
const EXPIRY_SKEW_MS = 60_000;
const DEFAULT_EXPIRES_IN_SEC = 3600;

type CachedToken = {
  token: string;
  expiresAt: number;
};

let cached: CachedToken | null = null;
let inflight: Promise<string> | null = null;

export function getCdekCredentials(): { clientId: string; clientSecret: string } | null {
  const clientId = (process.env.CDEK_ACCOUNT ?? process.env.CDEK_CLIENT_ID)?.trim();
  const clientSecret = (process.env.CDEK_SECURE_PASSWORD ?? process.env.CDEK_CLIENT_SECRET)?.trim();
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

export function clearCdekTokenCache(): void {
  cached = null;
  inflight = null;
}

function withTimeout(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

async function fetchCdekToken(): Promise<string> {
  const creds = getCdekCredentials();
  if (!creds) throw new Error("CDEK_ACCOUNT and CDEK_SECURE_PASSWORD must be set");

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: creds.clientId,
    client_secret: creds.clientSecret,
  });

  const { signal, clear } = withTimeout(8000);
  try {
    const res = await fetch(`${CDEK_API}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal,
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`CDEK token failed: ${res.status} ${text}`);
    }

    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data.access_token) throw new Error("CDEK token missing access_token");

    const expiresInSec =
      typeof data.expires_in === "number" && data.expires_in > 0
        ? data.expires_in
        : DEFAULT_EXPIRES_IN_SEC;

    cached = {
      token: data.access_token,
      expiresAt: Date.now() + expiresInSec * 1000,
    };
    return data.access_token;
  } finally {
    clear();
  }
}

/** Returns a cached CDEK access token, refreshing when expired or near expiry. */
export async function getCachedCdekToken(): Promise<string> {
  const now = Date.now();
  if (cached && cached.expiresAt > now + EXPIRY_SKEW_MS) {
    return cached.token;
  }

  if (inflight) return inflight;

  inflight = fetchCdekToken().finally(() => {
    inflight = null;
  });
  return inflight;
}

export { CDEK_API };

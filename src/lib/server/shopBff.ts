import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

const developmentSecret = randomBytes(32).toString("hex");
const guestLifetimeSeconds = 86400;
const privateHeaders = { "Cache-Control": "private, no-store", Vary: "Cookie" };
const sessionCookieNames = new Set(["access-token", "refresh-token", "csrftoken", "sessionid"]);
const base = () => (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.znves.ru").replace(/\/$/, "");
function key(): Buffer {
  const secret = process.env.BFF_SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && (!secret || secret.length < 32)) throw new Error("BFF_SESSION_SECRET requires 32+ characters");
  return createHash("sha256").update(secret || developmentSecret).digest();
}
const cookieName = (id: string) => `znves-order-${id}`;
export function sealGuestAccess(orderId: string, token: string): string {
  const iv = randomBytes(12), cipher = createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify({ orderId, token, expiresAt: Date.now() + guestLifetimeSeconds * 1000 })), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}
export function readGuestAccess(orderId: string, value?: string): string | null {
  if (!value) return null;
  try {
    const bytes = Buffer.from(value, "base64url"), decipher = createDecipheriv("aes-256-gcm", key(), bytes.subarray(0, 12));
    decipher.setAuthTag(bytes.subarray(12, 28));
    const data = JSON.parse(Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString());
    return data.orderId === orderId && data.expiresAt > Date.now() && typeof data.token === "string" ? data.token : null;
  } catch { return null; }
}
export function isAllowedShopPath(path: string, method: string): boolean {
  if (method === "GET" && /^(catalog(?:\/[\w.-]+){0,2}\/?|home\/?)$/.test(path)) return true;
  if (method === "GET" && /^delivery\/(cdek|yandex)\/pvz\/?$/.test(path)) return true;
  if (["GET", "POST"].includes(method) && /^delivery\/(cdek|yandex)\/calculate\/?$/.test(path)) return true;
  if (method === "POST" && /^(mailing\/?|discounts\/promo\/[^/]+\/?)$/.test(path)) return true;
  if (method === "GET" && /^order\/(csrf|my|\d+)\/?$/.test(path)) return true;
  if (method === "POST" && /^(order\/?|order\/\d+\/(pay(?:\/yandex|\/retry)?|cancel)\/?)$/.test(path)) return true;
  if (["GET", "PATCH"].includes(method) && /^auth\/user(?:\/delivery-data)?\/?$/.test(path)) return true;
  return method === "POST" && /^auth\/(register(?:\/verify|\/resend-code)?|login(?:\/verify)?|logout|token\/refresh|change-password|user\/change-password|password-reset\/(request|verify|change))\/?$/.test(path);
}
export function isTrustedMutation(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const accepted = new Set([new URL(request.url).origin]);
  if (process.env.NEXT_PUBLIC_SITE_URL) accepted.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin);
  return accepted.has(origin);
}
export function redactSecrets(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactSecrets);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([k]) => !["access_token", "refresh_token", "access", "refresh", "token", "reset_token"].includes(k)).map(([k, v]) => [k, redactSecrets(v)]));
  return value;
}
export function relayCookie(cookie: string, secure: boolean): string {
  const parts = cookie.split(";").map(p => p.trim()), first = parts.shift()!;
  return [first, ...parts.filter(p => !/^(domain|path|samesite|httponly|secure)(=|$)/i.test(p)), "Path=/", "HttpOnly", "SameSite=Lax", ...(secure ? ["Secure"] : [])].join("; ");
}
function upstreamCookies(headers: Headers): string[] {
  return typeof headers.getSetCookie === "function" ? headers.getSetCookie() : (headers.get("set-cookie") || "").split(/,(?=\s*[^;,=\s]+=)/).filter(Boolean);
}
class UpstreamSession {
  readonly cookies = new Map<string, string>();
  readonly responseCookies: string[] = [];
  constructor(readonly request: NextRequest) {
    for (const c of request.cookies.getAll()) if (sessionCookieNames.has(c.name)) this.cookies.set(c.name, c.value);
  }
  async fetch(path: string, method: string, body?: string, token?: string): Promise<Response> {
    const headers = new Headers({ Accept: "application/json" });
    if (body !== undefined) headers.set("Content-Type", "application/json");
    if (!["GET", "HEAD"].includes(method)) {
      const bootstrap = await this.fetch("order/csrf/", "GET");
      if (!bootstrap.ok) return bootstrap;
      const csrf = await responseBody(bootstrap) as { csrfToken?: unknown };
      if (typeof csrf.csrfToken !== "string" || !csrf.csrfToken) throw new Error("Missing upstream CSRF token");
      headers.set("X-CSRFToken", csrf.csrfToken);
      headers.set("Origin", process.env.NEXT_PUBLIC_SITE_URL || "https://znves.ru");
    }
    if (this.cookies.size) headers.set("Cookie", [...this.cookies].map(([k, v]) => `${k}=${v}`).join("; "));
    if (token) headers.set("X-Order-Token", token);
    const response = await fetch(`${base()}/api/${path}`, { method, headers, body, cache: "no-store", redirect: "manual", signal: AbortSignal.timeout(20000) });
    for (const c of upstreamCookies(response.headers)) {
      const first = c.split(";", 1)[0], i = first.indexOf("="), name = first.slice(0, i);
      if (!sessionCookieNames.has(name)) continue;
      if (/max-age=0(?:;|$)/i.test(c)) this.cookies.delete(name); else this.cookies.set(name, first.slice(i + 1));
      this.responseCookies.push(c);
    }
    return response;
  }
  response(data: unknown, status = 200): NextResponse {
    const response = NextResponse.json(redactSecrets(data), { status, headers: privateHeaders });
    for (const c of this.responseCookies) response.headers.append("Set-Cookie", relayCookie(c, process.env.NODE_ENV === "production" || new URL(this.request.url).protocol === "https:"));
    return response;
  }
  rememberGuest(response: NextResponse, order: Record<string, unknown>): void {
    if (typeof order.access_token !== "string" || !order.access_token || !/^\d+$/.test(String(order.id))) return;
    response.cookies.set(cookieName(String(order.id)), sealGuestAccess(String(order.id), order.access_token), { httpOnly: true, secure: process.env.NODE_ENV === "production" || new URL(this.request.url).protocol === "https:", sameSite: "lax", path: "/", maxAge: guestLifetimeSeconds });
  }
}
const maxResponseBytes = 2 * 1024 * 1024;
async function responseBody(response: Response): Promise<unknown> {
  if (Number(response.headers.get("content-length")) > maxResponseBytes) throw new Error("Upstream response too large");
  if (!response.body) return {};
  const reader = response.body.getReader(), chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxResponseBytes) { await reader.cancel(); throw new Error("Upstream response too large"); }
    chunks.push(value);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { detail: "Некорректный ответ сервера магазина." }; }
}
export function isAllowedPaymentUrl(value: unknown): boolean {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    const hosts = (process.env.PAYMENT_ALLOWED_HOSTS || "yookassa.ru,yoomoney.ru,pay.yandex.ru").split(",").map(host => host.trim().toLowerCase()).filter(Boolean);
    return url.protocol === "https:" && !url.username && !url.password && (!url.port || url.port === "443") && hosts.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch { return false; }
}
function validPaymentResponse(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const data = value as { confirmation_url?: unknown; payment_url?: unknown; confirmation?: { confirmation_url?: unknown } };
  const urls = [data.confirmation_url, data.payment_url, data.confirmation?.confirmation_url].filter(item => item !== undefined && item !== null);
  return urls.length > 0 && urls.every(isAllowedPaymentUrl);
}
function trustedReturnUrl(value: unknown, request: NextRequest, outcome: string): string {
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : new URL(request.url).origin;
  try {
    if (typeof value === "string") {
      const url = new URL(value, siteOrigin);
      if (url.origin === siteOrigin && ["https:", "http:"].includes(url.protocol) && !url.username && !url.password) return url.toString();
    }
  } catch { /* Use the fixed same-origin fallback. */ }
  return `${siteOrigin}/catalog?payment=${outcome}`;
}
function fail(status: number, detail: string): NextResponse { return NextResponse.json({ detail }, { status, headers: privateHeaders }); }
export async function proxyShopRequest(request: NextRequest, segments: string[]): Promise<NextResponse> {
  if (segments.some(s => !s || s === "." || s === ".." || /[\\/%?#\u0000-\u001f]/.test(s))) return fail(404, "Маршрут не найден.");
  const path = segments.join("/") + (request.nextUrl.pathname.endsWith("/") ? "/" : "");
  if (!isAllowedShopPath(path, request.method)) return fail(404, "Маршрут не найден.");
  if (request.method !== "GET" && !isTrustedMutation(request)) return fail(403, "Недопустимый источник запроса.");
  try {
    if (request.method === "POST" && /^order\/?$/.test(path)) key();
    const session = new UpstreamSession(request), id = /^order\/(\d+)\//.exec(path)?.[1];
    const token = id ? readGuestAccess(id, request.cookies.get(cookieName(id))?.value) : null;
    let body = request.method === "GET" ? undefined : await request.text();
    if (body && /^order\/\d+\/pay/.test(path)) {
      const data = JSON.parse(body);
      data.return_url = trustedReturnUrl(data.return_url, request, "success");
      data.cancel_url = trustedReturnUrl(data.cancel_url, request, "error");
      body = JSON.stringify(data);
    }
    if (body && body.length > 128000) return fail(413, "Слишком большой запрос.");
    const upstreamPath = path.replace(/^auth\/user\/change-password\/?$/, "auth/change-password/");
    const upstream = await session.fetch(upstreamPath + request.nextUrl.search, request.method, body, token || undefined);
    const data = await responseBody(upstream);
    if (upstream.ok && /^order\/\d+\/pay(?:\/yandex|\/retry)?\/?$/.test(path) && !validPaymentResponse(data)) return fail(502, "Сервер вернул недопустимую ссылку оплаты.");
    const response = session.response(data, [204, 205].includes(upstream.status) ? 200 : upstream.status);
    if (upstream.ok && request.method === "POST" && /^order\/?$/.test(path) && data && typeof data === "object") session.rememberGuest(response, data as Record<string, unknown>);
    return response;
  } catch (error) {
    console.error("Shop BFF request failed", error instanceof Error ? error.name : "UnknownError");
    return fail(502, "Сервис магазина временно недоступен. Повторите попытку.");
  }
}
export async function checkoutShopRequest(request: NextRequest): Promise<NextResponse> {
  if (!isTrustedMutation(request)) return fail(403, "Недопустимый источник запроса.");
  try {
    key();
    const raw = await request.text();
    if (raw.length > 128000) return fail(413, "Слишком большой запрос.");
    const payload = JSON.parse(raw);
    if (!payload.order || typeof payload.order !== "object" || !["yookassa", "yandex", null].includes(payload.paymentProvider)) return fail(400, "Некорректные данные заказа.");
    const session = new UpstreamSession(request), upstream = await session.fetch("order/", "POST", JSON.stringify(payload.order));
    const order = await responseBody(upstream) as Record<string, unknown>;
    if (!upstream.ok) return session.response(order, upstream.status);
    const response = session.response({ order, payment: null }, 201);
    session.rememberGuest(response, order);
    if (!payload.paymentProvider) return response;
    if (!/^\d+$/.test(String(order.id))) return fail(502, "Сервер не вернул номер заказа.");
    const hex = BigInt(String(order.id)).toString(16).padStart(12, "0");
    try {
      const paymentResponse = await session.fetch(`order/${order.id}/pay/${payload.paymentProvider === "yandex" ? "yandex/" : ""}`, "POST", JSON.stringify({ request_id: `00000000-0000-0000-0000-${hex}`, return_url: trustedReturnUrl(payload.return_url, request, "success"), cancel_url: trustedReturnUrl(payload.cancel_url, request, "error") }), typeof order.access_token === "string" ? order.access_token : undefined);
      const payment = await responseBody(paymentResponse);
      const success = paymentResponse.ok && validPaymentResponse(payment);
      const result = session.response({ order, payment: success ? payment : null, ...(success ? {} : { payment_error: typeof payment === "object" && payment && "detail" in payment ? String(payment.detail) : "Не удалось получить ссылку оплаты." }) }, 201);
      session.rememberGuest(result, order);
      return result;
    } catch {
      const result = session.response({ order, payment: null, payment_error: "Заказ создан. Не удалось получить ссылку оплаты; повторите оплату этого заказа." }, 201);
      session.rememberGuest(result, order);
      return result;
    }
  } catch (error) {
    console.error("Shop BFF checkout failed", error instanceof Error ? error.name : "UnknownError");
    return fail(502, "Не удалось завершить оформление. Проверьте состояние заказа перед повторной попыткой.");
  }
}

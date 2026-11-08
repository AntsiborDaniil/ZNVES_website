import "server-only";
import { NextRequest } from "next/server";

const maxBytes = 20 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);
const error = (status: number) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });

/** Public raster images only; no credentials, arbitrary hosts or redirects are forwarded. */
export async function proxyMedia(request: NextRequest, path: string[]): Promise<Response> {
  if (!path.length || path.some(part => !part || part === "." || part === ".." || /[\\/%?#:\u0000-\u001f]/.test(part)) || !/\.(jpe?g|png|webp|avif|gif)$/i.test(path[path.length - 1])) return error(404);
  const base = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.znves.ru";
  const target = new URL(`/media/${path.map(encodeURIComponent).join("/")}`, base);
  const headers = new Headers();
  for (const name of ["if-none-match", "if-modified-since"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  try {
    const upstream = await fetch(target, { method: request.method, headers, redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(30000) });
    const resultHeaders = new Headers({ "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800", "X-Content-Type-Options": "nosniff" });
    for (const name of ["etag", "last-modified"]) {
      const value = upstream.headers.get(name);
      if (value) resultHeaders.set(name, value);
    }
    if (upstream.status === 304) return new Response(null, { status: 304, headers: resultHeaders });
    if (!upstream.ok || upstream.status !== 200) { await upstream.body?.cancel(); return error(upstream.status === 404 ? 404 : 502); }
    const type = (upstream.headers.get("content-type") || "").split(";", 1)[0].trim().toLowerCase();
    const length = Number(upstream.headers.get("content-length"));
    if (!allowedTypes.has(type) || length > maxBytes) { await upstream.body?.cancel(); return error(502); }
    resultHeaders.set("Content-Type", type);
    if (request.method === "HEAD") return new Response(null, { status: 200, headers: resultHeaders });
    if (!upstream.body) return error(502);
    let size = 0;
    const bounded = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        size += chunk.byteLength;
        if (size > maxBytes) { controller.error(new Error("Image exceeds size limit")); return; }
        controller.enqueue(chunk);
      },
    });
    return new Response(upstream.body.pipeThrough(bounded), { status: 200, headers: resultHeaders });
  } catch { return error(504); }
}

/**
 * Structured logging for upstream API failures (visible in Vercel logs).
 */
export function logUpstreamError(
  scope: string,
  err: unknown,
  extra?: Record<string, unknown>
): void {
  const message = err instanceof Error ? err.message : String(err);
  const payload = {
    scope,
    message,
    ...(err instanceof Error && err.stack ? { stack: err.stack } : {}),
    ...(extra ?? {}),
  };
  console.error(`[upstream:${scope}]`, payload);
}

export function logUpstreamHttpError(
  scope: string,
  status: number,
  bodySnippet?: string,
  extra?: Record<string, unknown>
): void {
  console.error(`[upstream:${scope}]`, {
    scope,
    status,
    body: bodySnippet?.slice(0, 400),
    ...(extra ?? {}),
  });
}

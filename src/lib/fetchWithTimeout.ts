/** Таймаут клиентских/серверных fetch, чтобы UI не висел бесконечно на плохой сети. */
export const DEFAULT_FETCH_TIMEOUT_MS = 10_000;

type FetchWithTimeoutInit = RequestInit & {
  timeoutMs?: number;
};

/**
 * fetch + AbortSignal.timeout.
 * Если передан свой `signal`, при его abort тоже отменяем запрос
 * (через AbortSignal.any, с fallback на один timeout-signal).
 */
export const fetchWithTimeout = (
  input: RequestInfo | URL,
  init: FetchWithTimeoutInit = {}
): Promise<Response> => {
  const { timeoutMs = DEFAULT_FETCH_TIMEOUT_MS, signal: outerSignal, ...rest } =
    init;

  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const signal =
    outerSignal && typeof AbortSignal.any === "function"
      ? AbortSignal.any([outerSignal, timeoutSignal])
      : timeoutSignal;

  return fetch(input, { ...rest, signal });
};

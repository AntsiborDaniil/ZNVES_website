import { fetchPublicApi } from "./publicApi";

/** Таймаут fetch. 10s на LTE часто мало — запас для мобилки. */
export const DEFAULT_FETCH_TIMEOUT_MS = 25_000;

type FetchWithTimeoutInit = RequestInit & {
  timeoutMs?: number;
};

/**
 * fetch с таймаутом через AbortController (без AbortSignal.timeout —
 * его нет в части Safari, из‑за этого каталог на мобилке отдавал []).
 */
export const fetchWithTimeout = (
  input: RequestInfo | URL,
  init: FetchWithTimeoutInit = {}
): Promise<Response> => {
  const { timeoutMs = DEFAULT_FETCH_TIMEOUT_MS, signal: outerSignal, ...rest } =
    init;

  const controller = new AbortController();
  const timerId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  const onOuterAbort = () => {
    controller.abort();
  };

  if (outerSignal) {
    if (outerSignal.aborted) {
      clearTimeout(timerId);
      controller.abort();
    } else {
      outerSignal.addEventListener("abort", onOuterAbort);
    }
  }

  return fetchPublicApi(input, { ...rest, signal: controller.signal }).finally(() => {
    clearTimeout(timerId);
    outerSignal?.removeEventListener("abort", onOuterAbort);
  });
};

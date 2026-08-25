// API для оформления заказа

import { API_BASE_URL } from "../../lib/apiConfig";
import { getCsrfToken } from "../../lib/csrf";
import { shouldUseMocks } from "../../mocks/config";

/** Собирает URL изображения товара: если передан путь без протокола — дополняем базовым URL API. */
function buildProductImageUrl(value: string | undefined): string {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Локальные ассеты из public/ (мок-каталог) оставляем как есть
  if (trimmed.startsWith("/images/")) return trimmed;
  const base = API_BASE_URL.replace(/\/$/, "");
  return trimmed.startsWith("/") ? `${base}${trimmed}` : `${base}/${trimmed}`;
}

const ORDER_API_URL = `${API_BASE_URL}/api/order/`;
const MY_ORDERS_URL = `${API_BASE_URL}/api/order/my/`;

/** Позиция заказа в ответе API */
export interface ApiOrderPosition {
  id: string;
  product_name: string;
  color: string;
  size: string;
  quantity: number;
  /** URL или путь к изображению товара */
  product_image?: string;
}

/** Элемент ответа GET /api/order/my/?active=true|false */
export interface ApiMyOrderItem {
  id: string;
  total_amount: string;
  status: string;
  payment_type: string;
  delivery_service: string;
  promocode?: string | null;
  created_at: string;
  updated_at: string;
  customer_data?: {
    full_name: string;
    email: string;
    phone: string;
  };
  positions?: ApiOrderPosition[];
  delivery_data?: {
    pvz_code?: string;
    full_address: string;
  };
}

const MY_ORDERS_CACHE_TTL_MS = 60 * 1000; // 1 мин
const myOrdersCache: { active: { data: ApiMyOrderItem[]; at: number } | null; all: { data: ApiMyOrderItem[]; at: number } | null } = {
  active: null,
  all: null,
};

/**
 * Заказы пользователя: active=true — последний активный заказ, active=false — все остальные.
 * С куками (credentials). Результат кешируется на 1 минуту.
 */
export const getMyOrders = async (active: boolean): Promise<ApiMyOrderItem[]> => {
  if (typeof window === "undefined") return [];

  if (shouldUseMocks()) {
    const { getMockOrders } = await import("../../mocks/state/orderStore");
    return getMockOrders(active);
  }

  const key = active ? "active" : "all";
  const cached = myOrdersCache[key];
  if (cached && Date.now() - cached.at < MY_ORDERS_CACHE_TTL_MS) {
    return cached.data;
  }
  try {
    const url = `${MY_ORDERS_URL}?active=${active}`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return [];
    const data = (await response.json()) as ApiMyOrderItem[];
    const list = Array.isArray(data) ? data : [];
    if (list.length > 0) {
      myOrdersCache[key] = { data: list, at: Date.now() };
    }
    return list;
  } catch {
    return [];
  }
};

/** Все заказы пользователя для ЛК (active + остальные, без дублей). */
export const fetchAccountOrders = async (): Promise<ApiMyOrderItem[]> => {
  if (typeof window === "undefined") return [];

  if (shouldUseMocks()) {
    const { getAllMockOrders } = await import("../../mocks/state/orderStore");
    return getAllMockOrders();
  }

  const [activeList, restList] = await Promise.all([
    getMyOrders(true),
    getMyOrders(false),
  ]);

  const byId = new Map<string, ApiMyOrderItem>();
  [...activeList, ...restList].forEach((order) => {
    byId.set(order.id, order);
  });

  return Array.from(byId.values());
};

/** Сброс кеша заказов (вызвать после создания заказа и т.п.) */
export const invalidateMyOrdersCache = () => {
  myOrdersCache.active = null;
  myOrdersCache.all = null;
};

/** Вид заказа для отображения в кабинете (данные из API) */
export interface AccountOrderView {
  id: string;
  date: string;
  updatedDate?: string;
  status: string;
  totalAmount: string;
  paymentType: string;
  deliveryService: string;
  products: Array<{
    image: string;
    name: string;
    color?: string;
    size?: string;
    quantity?: number;
  }>;
  buyer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryAddress?: string;
}

function formatOrderDate(iso: string): string {
  try {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return "";
  }
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = (fullName || "").trim();
  const space = trimmed.indexOf(" ");
  if (space <= 0) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, space).trim(),
    lastName: trimmed.slice(space + 1).trim(),
  };
}

export const apiOrderToAccountView = (api: ApiMyOrderItem): AccountOrderView => {
  const buyer = api.customer_data
    ? (() => {
        const { firstName, lastName } = splitFullName(api.customer_data.full_name);
        return {
          firstName,
          lastName,
          email: api.customer_data.email ?? "",
          phone: api.customer_data.phone ?? "",
        };
      })()
    : undefined;

  const products = (api.positions ?? []).map((p) => ({
    image: buildProductImageUrl(p.product_image),
    name: p.product_name ?? "",
    color: p.color ?? "",
    size: p.size ?? "",
    quantity: p.quantity ?? 1,
  }));

  return {
    id: String(api.id),
    date: formatOrderDate(api.created_at),
    updatedDate: formatOrderDate(api.updated_at),
    status: api.status,
    totalAmount: api.total_amount ?? "",
    paymentType: api.payment_type ?? "",
    deliveryService: api.delivery_service ?? "",
    products,
    buyer,
    deliveryAddress: api.delivery_data?.full_address,
  };
};

export interface OrderRequest {
  total_amount: string;
  payment_type: "prepayment";
  delivery_service: "cdek" | "yandex" | "yandex_courier";
  customer_data: {
    full_name: string;
    email: string;
    phone: string;
  };
  cdek_delivery_data?: {
    pvz_code: string;
    full_address: string;
  };
  yandex_delivery_data?: {
    pvz_id?: string;
    full_address: string;
  };
  positions: Array<{
    id: string; 
    quantity: number;
  }>;
  promocode_value?: string;
}

export interface OrderResponse {
  id: number;
  status: string;
  message: string;
}

export interface PaymentResponse {
  payment_id?: string;
  confirmation_url?: string;
  payment_url?: string; // Для обратной совместимости
  /** Вложенный объект как у ЮKassa confirmation */
  confirmation?: {
    confirmation_url?: string;
    type?: string;
  };
  [key: string]: unknown;
}

/** Достаёт URL оплаты из разных форм ответа бэка / ЮKassa */
export function resolvePaymentRedirectUrl(
  data: PaymentResponse | null | undefined
): string | null {
  if (!data || typeof data !== "object") return null;
  const candidates = [
    data.confirmation_url,
    data.payment_url,
    data.confirmation?.confirmation_url,
  ];
  for (const raw of candidates) {
    if (typeof raw === "string") {
      const url = raw.trim();
      if (url && /^https?:\/\//i.test(url)) return url;
    }
  }
  return null;
}

/**
 * Редирект на оплату. После await Safari иногда игнорирует location.href —
 * поэтому assign + fallback через <a click> и повторный href.
 */
export function redirectToPaymentUrl(url: string): void {
  if (typeof window === "undefined" || !url) return;

  try {
    window.location.assign(url);
  } catch {
    window.location.href = url;
  }

  // Если навигация не стартовала (Safari после async), пробуем ещё раз
  window.setTimeout(() => {
    if (document.visibilityState !== "visible") return;
    try {
      const link = document.createElement("a");
      link.href = url;
      link.rel = "noopener noreferrer";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      window.location.href = url;
    }
  }, 250);
}

/**
 * Создает заказ
 */
export const createOrder = async (
  orderData: OrderRequest
): Promise<OrderResponse> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const csrf = getCsrfToken();
    if (csrf) headers["X-CSRFToken"] = csrf;

    const response = await fetch(ORDER_API_URL, {
      method: "POST",
      headers,
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = `${response.status} ${response.statusText}`;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.detail) message = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
        else if (errJson.message) message = errJson.message;
      } catch {
        if (errorText) message = errorText;
      }
      throw new Error(`Ошибка создания заказа: ${message}`);
    }

    const data: OrderResponse = await response.json();
    return data;
  } catch (error) {
    // Mock-режим: только при сетевом сбое (MSW ещё не готов) — локальный заказ.
    // HTTP-ошибки бэка / MSW пробрасываем дальше, чтобы запросы на /api/order/ оставались видимыми.
    if (shouldUseMocks() && error instanceof TypeError) {
      const { createMockOrder } = await import("../../mocks/state/orderStore");
      const order = createMockOrder(orderData);
      const numericId = Number(String(order.id).replace(/\D/g, "")) || Date.now();
      return {
        id: numericId,
        status: order.status,
        message: "Заказ создан",
      };
    }
    throw error;
  }
};

/** Преобразует order_id (number) в request_id (UUID-формат) */
function toRequestId(orderId: number): string {
  const hex = orderId.toString(16).padStart(12, "0");
  return `00000000-0000-0000-0000-${hex}`;
}

/** Формирует return_url/cancel_url относительно текущей страницы (origin + path) — работает на проде и деве */
function getRelativePaymentUrls(): { return_url: string; cancel_url: string } {
  if (typeof window === "undefined") {
    return { return_url: "/catalog?payment=success", cancel_url: "/catalog?payment=error" };
  }
  const { origin, pathname } = window.location;
  const sep = pathname.includes("?") ? "&" : "?";
  return {
    return_url: `${origin}${pathname}${sep}payment=success`,
    cancel_url: `${origin}${pathname}${sep}payment=error`,
  };
}

export interface PaymentUrlRequest {
  /** URL, на который вернуть пользователя после успешной оплаты */
  return_url?: string;
  /** URL при отмене/ошибке оплаты */
  cancel_url?: string;
}

/**
 * Получает ссылку на оплату через Юкассу (для карты или СБП).
 * return_url и cancel_url — относительно текущей страницы (работает на проде и деве).
 */
export const getPaymentUrl = async (
  orderId: number,
  options?: PaymentUrlRequest
): Promise<PaymentResponse> => {
  try {
    const url = `${ORDER_API_URL}${orderId}/pay/`;
    const urls = getRelativePaymentUrls();
    const body = {
      request_id: toRequestId(orderId),
      return_url: options?.return_url ?? urls.return_url,
      cancel_url: options?.cancel_url ?? urls.cancel_url,
    };

    const payHeaders: Record<string, string> = { "Content-Type": "application/json" };
    const payCsrf = getCsrfToken();
    if (payCsrf) payHeaders["X-CSRFToken"] = payCsrf;

    const response = await fetch(url, {
      method: "POST",
      headers: payHeaders,
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = errorText || `${response.status} ${response.statusText}`;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.detail) message = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
      } catch {}
      throw new Error(`Ошибка получения ссылки на оплату: ${message}`);
    }

    const data: PaymentResponse = await response.json();
    return data;
  } catch (error) {
    if (shouldUseMocks() && error instanceof TypeError) {
      return {
        payment_id: `mock-pay-${orderId}`,
        confirmation_url: `https://example.com/pay/${orderId}`,
      };
    }
    throw error;
  }
};

export interface YandexPayRequest {
  /** URL успешной оплаты (onSuccess) */
  return_url?: string;
  /** URL при ошибке (onError) */
  cancel_url?: string;
}

/**
 * Получает ссылку на оплату через Яндекс Pay.
 * return_url и cancel_url — относительно текущей страницы (работает на проде и деве).
 */
export const getYandexPaymentUrl = async (
  orderId: number,
  options?: YandexPayRequest
): Promise<PaymentResponse> => {
  try {
    const url = `${ORDER_API_URL}${orderId}/pay/yandex/`;
    const urls = getRelativePaymentUrls();
    const body = {
      request_id: toRequestId(orderId),
      return_url: options?.return_url ?? urls.return_url,
      cancel_url: options?.cancel_url ?? urls.cancel_url,
    };

    const yandexHeaders: Record<string, string> = { "Content-Type": "application/json" };
    const yandexCsrf = getCsrfToken();
    if (yandexCsrf) yandexHeaders["X-CSRFToken"] = yandexCsrf;

    const response = await fetch(url, {
      method: "POST",
      headers: yandexHeaders,
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let message = errorText || `${response.status} ${response.statusText}`;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.detail) message = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
      } catch {}
      throw new Error(`Ошибка получения ссылки на Яндекс Pay: ${message}`);
    }

    const data: PaymentResponse = await response.json();
    return data;
  } catch (error) {
    if (shouldUseMocks() && error instanceof TypeError) {
      return {
        payment_id: `mock-yandex-pay-${orderId}`,
        confirmation_url: `https://example.com/yandex-pay/${orderId}`,
      };
    }
    throw error;
  }
};


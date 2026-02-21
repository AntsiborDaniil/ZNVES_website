// API для оформления заказа

import { API_BASE_URL } from "../../lib/apiConfig";

const ORDER_API_URL = `${API_BASE_URL}/api/order/`;
const MY_ORDERS_URL = `${API_BASE_URL}/api/order/my/`;

/** Элемент ответа GET /api/order/my/?active=true|false */
export interface ApiMyOrderItem {
  id: string;
  total_amount: string;
  status: string;
  payment_type: string;
  delivery_service: string;
  promocode?: string;
  created_at: string;
  updated_at: string;
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
    myOrdersCache[key] = { data: list, at: Date.now() };
    return list;
  } catch {
    return [];
  }
};

/** Сброс кеша заказов (вызвать после создания заказа и т.п.) */
export const invalidateMyOrdersCache = () => {
  myOrdersCache.active = null;
  myOrdersCache.all = null;
};

/** Вид заказа для отображения в кабинете (общий минимум из API) */
export interface AccountOrderView {
  id: string;
  date: string;
  status: string;
  totalAmount: string;
  paymentType: string;
  deliveryService: string;
  products: Array<{ image: string; name: string }>;
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

export const apiOrderToAccountView = (api: ApiMyOrderItem): AccountOrderView => ({
  id: String(api.id),
  date: formatOrderDate(api.created_at),
  status: api.status,
  totalAmount: api.total_amount ?? "",
  paymentType: api.payment_type ?? "",
  deliveryService: api.delivery_service ?? "",
  products: [], // API не отдаёт состав заказа в списке
});

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
  [key: string]: any;
}

/**
 * Создает заказ
 */
export const createOrder = async (
  orderData: OrderRequest
): Promise<OrderResponse> => {
  try {
    console.log("Creating order:", orderData);

    const response = await fetch(ORDER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Order creation failed:", response.status, errorText);
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
    console.log("Order created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
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
    return { return_url: "/checkout?payment=success", cancel_url: "/checkout?payment=error" };
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
    console.log("Getting payment URL for order:", orderId, url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payment URL request failed:", response.status, errorText);
      let message = errorText || `${response.status} ${response.statusText}`;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.detail) message = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
      } catch {}
      throw new Error(`Ошибка получения ссылки на оплату: ${message}`);
    }

    const data: PaymentResponse = await response.json();
    console.log("Payment URL received:", data);
    return data;
  } catch (error) {
    console.error("Error getting payment URL:", error);
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
    console.log("Getting Yandex payment URL for order:", orderId, "body:", body);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Yandex payment URL request failed:", response.status, errorText);
      let message = errorText || `${response.status} ${response.statusText}`;
      try {
        const errJson = JSON.parse(errorText);
        if (errJson.detail) message = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
      } catch {}
      throw new Error(`Ошибка получения ссылки на Яндекс Pay: ${message}`);
    }

    const data: PaymentResponse = await response.json();
    console.log("Yandex payment URL received:", data);
    return data;
  } catch (error) {
    console.error("Error getting Yandex payment URL:", error);
    throw error;
  }
};


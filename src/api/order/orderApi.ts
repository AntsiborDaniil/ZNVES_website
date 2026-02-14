// API для оформления заказа

const ORDER_API_URL =
  (process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || "http://62.84.115.11:8000") + "/api/order/";

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


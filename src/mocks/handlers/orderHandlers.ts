import { http, HttpResponse } from "msw";
import type { OrderRequest } from "../../api/order/orderApi";
import { getMockApiBase } from "../config";
import { createMockOrder, getMockOrders } from "../state/orderStore";

const readJson = async <T>(request: Request): Promise<T> =>
  (await request.json()) as T;

export const createOrderHandlers = () => {
  const base = getMockApiBase();

  return [
    http.get(`${base}/api/order/my/`, ({ request }) => {
      const url = new URL(request.url);
      const active = url.searchParams.get("active") === "true";
      return HttpResponse.json(getMockOrders(active));
    }),

    http.post(`${base}/api/order/`, async ({ request }) => {
      const body = await readJson<OrderRequest>(request);
      const order = createMockOrder(body);
      return HttpResponse.json({
        id: Number(order.id.replace(/\D/g, "")) || 1,
        status: order.status,
        message: "Заказ создан",
      });
    }),

    http.post(`${base}/api/order/:orderId/pay/`, ({ params }) => {
      const orderId = String(params.orderId);
      return HttpResponse.json({
        payment_id: `mock-pay-${orderId}`,
        confirmation_url: `https://example.com/pay/${orderId}`,
      });
    }),

    http.post(`${base}/api/order/:orderId/pay/yandex/`, ({ params }) => {
      const orderId = String(params.orderId);
      return HttpResponse.json({
        payment_id: `mock-yandex-pay-${orderId}`,
        confirmation_url: `https://example.com/yandex-pay/${orderId}`,
      });
    }),
  ];
};

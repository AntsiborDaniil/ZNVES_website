// API для проверки и применения промокодов

import { API_BASE_URL } from "../../lib/apiConfig";
import { getProductById } from "../../data/products";
import { fetchCatalogProductRaw, type ApiProductDetail } from "../product/productApi";
import type { CartItem } from "../../types/cart";

const DISCOUNTS_API_URL = `${API_BASE_URL}/api/discounts/promo`;

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function hasValidUuid(id: unknown): id is string {
  return typeof id === "string" && UUID_REGEX.test(id);
}

export interface PromoRequestBody {
  cart_items: Array<{ warehouse_id: string; quantity: number }>;
  order_total: string;
  previous_promo_code?: string | null;
  previous_discount?: string;
}

export interface PromoResponseSuccess {
  promo_code: string;
  discount: string;
  prev_promo_code: string | null;
}

export interface PromoResponseError {
  promo_code: null;
  discount: string;
  error: string;
}

/**
 * Собирает cart_items для запроса промокода: резолвит warehouse_id из корзины
 * (как в CheckoutForm при создании заказа).
 */
export async function buildCartItemsForPromo(
  items: CartItem[]
): Promise<Array<{ warehouse_id: string; quantity: number }>> {
  const slugsFromItems = items
    .filter((item) => !hasValidUuid(item.productId) && !item.warehouseProduct)
    .map(
      (item) =>
        (typeof item.productId === "number"
          ? getProductById(item.productId)?.slug
          : null) ?? item.product?.slug
    )
    .filter((s): s is string => !!s);
  const uniqueSlugs = Array.from(new Set(slugsFromItems));
  const slugToProduct: Record<string, ApiProductDetail | null> = {};
  await Promise.all(
    uniqueSlugs.map(async (slug) => {
      const data = await fetchCatalogProductRaw(slug);
      if (data) slugToProduct[slug] = data;
      return null;
    })
  );

  const cartItems: Array<{ warehouse_id: string; quantity: number } | null> = items.map(
    (item) => {
      const uuidFromCart = hasValidUuid(item.productId) ? item.productId : item.warehouseProduct;
      if (uuidFromCart) {
        return { warehouse_id: uuidFromCart as string, quantity: item.quantity };
      }
      const fullProduct =
        typeof item.productId === "number" ? getProductById(item.productId) : undefined;
      const productSlug = fullProduct?.slug ?? item.product?.slug;
      if (!productSlug) return null;
      const productData = slugToProduct[productSlug];
      if (productData?.warehouse_items?.length) {
        const warehouseItem = productData.warehouse_items.find(
          (wi: { color?: string; color_slug?: string; size?: string; size_slug?: string }) =>
            (wi.color === item.color || wi.color_slug === item.color) &&
            (wi.size === item.size || wi.size_slug === item.size)
        );
        const rawId =
          (warehouseItem as { uuid?: string; id?: string })?.uuid ?? warehouseItem?.id;
        const idStr = rawId != null ? String(rawId).trim() : null;
        if (idStr && UUID_REGEX.test(idStr)) {
          return { warehouse_id: idStr, quantity: item.quantity };
        }
      }
      return null;
    }
  );

  const valid = cartItems.filter(
    (c): c is { warehouse_id: string; quantity: number } => c !== null
  );
  return valid;
}

export type ApplyPromoResult =
  | { success: true; promo_code: string; discount: string }
  | { success: false; error: string };

/**
 * Проверяет промокод: POST /api/discounts/promo/{promo_code}/
 * При 200 возвращает скидку, при 404 — ошибку.
 */
export async function applyPromoCode(
  promoCode: string,
  params: {
    cartItems: Array<{ warehouse_id: string; quantity: number }>;
    orderTotal: string;
    previousPromoCode?: string | null;
    previousDiscount?: string;
  }
): Promise<ApplyPromoResult> {
  const trimmed = promoCode.trim();
  if (!trimmed) {
    return { success: false, error: "Введите промокод" };
  }

  const body: PromoRequestBody = {
    cart_items: params.cartItems,
    order_total: params.orderTotal,
  };
  if (params.previousPromoCode != null) body.previous_promo_code = params.previousPromoCode;
  if (params.previousDiscount != null) body.previous_discount = params.previousDiscount;

  const url = `${DISCOUNTS_API_URL}/${encodeURIComponent(trimmed)}/`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (response.ok) {
    const success = data as PromoResponseSuccess;
    return {
      success: true,
      promo_code: success.promo_code ?? trimmed,
      discount: success.discount ?? "0.00",
    };
  }

  if (response.status === 404) {
    const err = data as PromoResponseError;
    return {
      success: false,
      error: err?.error ?? "Промокод не найден",
    };
  }

  return {
    success: false,
    error: (data as { error?: string })?.error ?? "Ошибка проверки промокода",
  };
}

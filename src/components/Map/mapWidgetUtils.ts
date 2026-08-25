import type { CdekPvzPoint } from "../../api/delivery/cdekApi";

export type PvzListOption = {
  name: string;
  address: string;
  code?: string;
  id?: string;
  city?: string;
  lat?: number;
  lon?: number;
};

export const YANDEX_WIDGET_SCRIPT_URL = "https://ndd-widget.landpro.site/widget.js";
export const YANDEX_PVZ_CONTAINER_ID = "delivery-widget";
export const COURIER_MAP_CONTAINER_ID = "courier-map";
export const DEFAULT_YA_SOURCE_ADDRESS = "Москва, Промышленная улица, 12А, 115516";
export const MOSCOW_CENTER: [number, number] = [55.7558, 37.6173];

export type YaNddWidgetPointDetail = {
  id?: string;
  name?: string;
  title?: string;
  address?: {
    full_address?: string;
    locality?: string;
    street?: string;
    house?: string;
  };
  delivery_price?: number;
  deliveryPrice?: number;
  delivery?: { price?: number; term?: unknown };
  delivery_term?: unknown;
  deliveryTerm?: unknown;
};

export type MapWidgetAddressData = {
  city?: string;
  street?: string;
  house?: string;
  fullAddress?: string;
  pvzAddress?: string;
  pvzCode?: string;
  pvzId?: string;
  lat?: number;
  lon?: number;
};

export type MapDeliveryMode = "pickup-yandex" | "pickup-cdek" | "courier" | "idle";

export function getMapDeliveryMode(
  deliveryMethod?: string,
  deliveryType?: string
): MapDeliveryMode {
  if (deliveryMethod === "pickup" && deliveryType === "yandex") return "pickup-yandex";
  if (deliveryMethod === "pickup" && deliveryType === "cdek") return "pickup-cdek";
  if (deliveryMethod === "yandex") return "courier";
  return "idle";
}

export function normalizePvzSearch(value: string): string {
  return (value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

export function filterCdekPvzPoints(
  list: CdekPvzPoint[],
  query: string
): CdekPvzPoint[] {
  const normalizedQuery = normalizePvzSearch(query);
  if (!normalizedQuery) return list;

  return list.filter((point) => {
    const address = normalizePvzSearch(point.address ?? "");
    const name = normalizePvzSearch(point.name ?? "");
    const code = normalizePvzSearch(point.code ?? "");
    const workTime = normalizePvzSearch(point.work_time ?? "");
    return (
      address.includes(normalizedQuery) ||
      name.includes(normalizedQuery) ||
      code.includes(normalizedQuery) ||
      workTime.includes(normalizedQuery)
    );
  });
}

export function buildCdekPvzSelection(
  pvz: CdekPvzPoint,
  city: string
): { addressData: MapWidgetAddressData; pvzOption: PvzListOption } {
  const payload: MapWidgetAddressData = {
    city,
    pvzAddress: pvz.address,
    pvzCode: pvz.code,
    fullAddress: pvz.address,
    lat: pvz.location?.lat,
    lon: pvz.location?.lon,
  };

  return {
    addressData: payload,
    pvzOption: {
      name: pvz.name || pvz.address,
      address: pvz.address,
      code: pvz.code,
      city,
      lat: pvz.location?.lat,
      lon: pvz.location?.lon,
    },
  };
}

export function parseYaNddWidgetSelection(
  detail: YaNddWidgetPointDetail | null | undefined,
  city: string
): { fullAddress: string; addressData: MapWidgetAddressData; pvzOption: PvzListOption } | null {
  if (!detail) return null;

  const addr = detail.address || {};
  const fullAddress =
    addr.full_address ||
    [addr.locality, addr.street, addr.house].filter(Boolean).join(", ") ||
    detail.name ||
    detail.title ||
    (detail.id ? `ПВЗ ${detail.id}` : "") ||
    "Пункт выдачи";

  return {
    fullAddress,
    addressData: {
      city: addr.locality || city,
      street: addr.street,
      house: addr.house,
      fullAddress,
      pvzAddress: fullAddress,
      pvzId: detail.id,
    },
    pvzOption: {
      name: fullAddress || detail.id || "ПВЗ",
      address: fullAddress,
      id: detail.id,
      city: addr.locality || city,
    },
  };
}

export function resolveYaWidgetSize(container?: HTMLElement | null): {
  width: string;
  height: string;
  heightPx: number;
  widthPx: number;
} {
  const viewportH =
    typeof window !== "undefined"
      ? window.visualViewport?.height || window.innerHeight || 800
      : 800;
  const measuredWidth =
    container?.clientWidth ||
    (typeof window !== "undefined" ? window.innerWidth || 400 : 400);
  const widthPx = Math.max(280, Math.round(measuredWidth));
  const isCompact = widthPx < 768;
  // Компакт: высота = карта + нижняя панель «Я Доставка» с «Продолжить».
  // Держим внутри контейнера (overflow:hidden), без наезда на промокод.
  const heightPx = isCompact
    ? Math.round(Math.min(Math.max(viewportH * 0.56, 540), 620))
    : 450;

  return {
    // Пиксельная ширина: YaDelivery фиксирует size при createWidget — при ресайзе модалки
    // виджет нужно пересоздать с новой шириной контейнера.
    width: `${widthPx}px`,
    height: `${heightPx}px`,
    heightPx,
    widthPx,
  };
}

export function buildYaDeliveryWidgetParams(
  city: string,
  sourceAddress: string,
  totalWeightGrams?: number,
  size?: { width: string; height: string }
) {
  const weightGrams = Math.max(100, totalWeightGrams ?? 10000);
  const resolvedSize = size ?? { height: "450px", width: "100%" };

  return {
    city,
    size: resolvedSize,
    source_address: sourceAddress,
    physical_dims_weight_gross: weightGrams,
    physical_dims_dx: 30,
    physical_dims_dy: 20,
    physical_dims_dz: 10,
    delivery_term: 0,
    delivery_price: () => "",
    show_select_button: true,
    filter: {
      type: ["pickup_point", "terminal"],
      is_yandex_branded: false,
      payment_methods: ["already_paid", "card_on_receipt"],
      payment_methods_filter: "or",
    },
  };
}

export function isInMoscow(addr: { city?: string }): boolean {
  const city = (addr.city || "").toLowerCase();
  return city.includes("москва") || city === "moscow" || city.includes("московск");
}

export function parseAddressFromGeoObject(geoObject: {
  properties: { get: (key: string) => unknown };
  getAddressLine?: () => string;
}): { city: string; street: string; house: string; fullAddress: string } {
  let city = "Москва";
  let street = "";
  let house = "";
  let fullAddress = "";

  try {
    const metaProp = geoObject.properties.get("metaDataProperty") as
      | {
          GeocoderMetaData?: {
            Address?: { Components?: Array<{ kind?: string; name?: string }> };
            text?: string;
          };
        }
      | undefined;
    const meta = metaProp?.GeocoderMetaData;
    fullAddress = (meta?.text as string) || (geoObject.getAddressLine?.() as string) || "";

    const components = meta?.Address?.Components ?? [];
    for (const component of components) {
      const kind = (component.kind || "").toLowerCase();
      const name = component.name || "";
      if (kind === "locality" || kind === "area") city = name || city;
      if (kind === "street" || kind === "thoroughfare") street = name || street;
      if (kind === "house") house = name || house;
    }
  } catch {
    /* ignore */
  }

  return { city, street, house, fullAddress };
}

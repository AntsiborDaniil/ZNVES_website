"use client";

import { useEffect, useRef } from "react";

const WIDGET_SCRIPT_URL = "https://ndd-widget.landpro.site/widget.js";
const CONTAINER_ID = "delivery-widget";
const COURIER_MAP_ID = "courier-map";
const YANDEX_MAPS_SCRIPT =
  "https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU";
const MOSCOW_CENTER: [number, number] = [55.7558, 37.6173];

type AddressData = {
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

export type PvzListOption = {
  name: string;
  address: string;
  code?: string;
  id?: string;
  city?: string;
  lat?: number;
  lon?: number;
};

type MapProps = {
  address?: string;
  city?: string;
  street?: string;
  house?: string;
  onAddressSelect?: (address: AddressData) => void;
  onPvzListLoaded?: (options: PvzListOption[]) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  deliveryMethod?: string;
  deliveryType?: string;
  selectedPvzCoords?: [number, number] | null;
  /** Суммарный вес корзины в граммах — для расчёта сроков и стоимости в виджете ПВЗ */
  totalWeightGrams?: number;
};

declare global {
  interface Window {
    YaDelivery?: {
      createWidget: (options: {
        containerId: string;
        params: Record<string, unknown>;
      }) => void;
    };
    ymaps?: {
      ready: (cb: () => void) => void;
      Map: new (id: string, opts: Record<string, unknown>) => unknown;
      Placemark: new (
        coords: number[],
        props?: Record<string, unknown>,
        opts?: { draggable?: boolean }
      ) => unknown;
      geocode: (
        query: string | number[],
        opts?: { kind?: string; results?: number }
      ) => { then: (cb: (res: unknown) => void) => void };
    };
  }
}

function parseAddressFromGeoObject(geoObject: {
  properties: { get: (key: string) => unknown };
  getAddressLine?: () => string;
}): { city: string; street: string; house: string; fullAddress: string } {
  let city = "Москва";
  let street = "";
  let house = "";
  let fullAddress = "";

  try {
    const metaProp = geoObject.properties.get("metaDataProperty") as
      | { GeocoderMetaData?: { Address?: { Components?: Array<{ kind?: string; name?: string }> }; text?: string } }
      | undefined;
    const meta = metaProp?.GeocoderMetaData;
    fullAddress = (meta?.text as string) || (geoObject.getAddressLine?.() as string) || "";

    const components = meta?.Address?.Components ?? [];
    for (const c of components) {
      const k = (c.kind || "").toLowerCase();
      const n = c.name || "";
      if (k === "locality" || k === "area") city = n || city;
      if (k === "street" || k === "thoroughfare") street = n || street;
      if (k === "house") house = n || house;
    }
  } catch {
    /* ignore */
  }

  return { city, street, house, fullAddress };
}

function isInMoscow(addr: { city?: string }): boolean {
  const city = (addr.city || "").toLowerCase();
  return (
    city.includes("москва") ||
    city === "moscow" ||
    city.includes("московск")
  );
}

/**
 * Map component: для ПВЗ — виджет ndd-widget; для курьера — обычная Яндекс.Карта с меткой.
 * Курьерская доставка только по Москве.
 */
const Map = ({
  city: cityProp,
  onAddressSelect,
  onPvzListLoaded,
  searchValue,
  onSearchChange,
  deliveryMethod,
  deliveryType,
  totalWeightGrams,
}: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const courierMapRef = useRef<HTMLDivElement>(null);
  const widgetInitedRef = useRef(false);
  const courierMapInstanceRef = useRef<{
    map: { destroy: () => void; setCenter: (c: number[]) => void };
    placemark: { geometry: { setCoordinates: (c: number[]) => void } };
  } | null>(null);
  const onAddressSelectRef = useRef(onAddressSelect);
  const onSearchChangeRef = useRef(onSearchChange);
  onAddressSelectRef.current = onAddressSelect;
  onSearchChangeRef.current = onSearchChange;

  const isPickup =
    deliveryMethod === "pickup" &&
    (deliveryType === "cdek" || deliveryType === "yandex");

  const isCourier = deliveryMethod === "yandex";

  const city = (cityProp || "Москва").trim() || "Москва";

  // Подписка на выбор ПВЗ (событие из документации виджета)
  useEffect(() => {
    if (!isPickup) return;

    const handler = (event: Event) => {
      const e = event as CustomEvent;
      const detail = e.detail;
      console.log("[Map NDD widget] YaNddWidgetPointSelected", detail);
      if (!detail) return;

      const addr = detail.address || {};
      const fullAddress =
        addr.full_address ||
        [addr.locality, addr.street, addr.house].filter(Boolean).join(", ") ||
        "";

      if (onAddressSelect) {
        onAddressSelect({
          city: addr.locality || city,
          street: addr.street,
          house: addr.house,
          fullAddress,
          pvzAddress: fullAddress,
          pvzId: detail.id,
        });
      }
      if (onPvzListLoaded) {
        onPvzListLoaded([
          {
            name: fullAddress || detail.id || "ПВЗ",
            address: fullAddress,
            id: detail.id,
            city: addr.locality || city,
          },
        ]);
      }
    };

    document.addEventListener("YaNddWidgetPointSelected", handler);
    return () => document.removeEventListener("YaNddWidgetPointSelected", handler);
  }, [isPickup, city, onAddressSelect, onPvzListLoaded]);

  // После клика по кнопке «Продолжить» в виджете добавляем класс на контейнер — в CSS по нему скрываем кнопку (без помех работе виджета)
  useEffect(() => {
    if (!isPickup) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const widgetRoot = document.getElementById(CONTAINER_ID);
      if (!widgetRoot || !target.closest?.(".widget__list-button")) return;
      const isInsideWidget = widgetRoot.contains(target);
      if (!isInsideWidget) return;
      setTimeout(() => {
        widgetRoot.classList.add("widget-continue-clicked");
      }, 0);
    };

    document.addEventListener("click", handleClick, false);
    return () => document.removeEventListener("click", handleClick, false);
  }, [isPickup]);

  // Загрузка скрипта и инициализация виджета ПВЗ
  useEffect(() => {
    if (!isPickup || !containerRef.current) return;

    const envStationId =
      typeof window !== "undefined" ? process.env.NEXT_PUBLIC_YA_DELIVERY_STATION_ID : undefined;
    const stationId = envStationId || "05e809bb-4521-42d9-a936-0fb0744c0fb3";

    console.log("[Map NDD widget] Эффект: isPickup=true", {
      city,
      totalWeightGrams_from_props: totalWeightGrams,
      NEXT_PUBLIC_YA_DELIVERY_STATION_ID: envStationId ?? "(не задан, используется fallback)",
      stationId_used: stationId,
      container_exists: !!document.getElementById(CONTAINER_ID),
    });

    function startWidget() {
      if (widgetInitedRef.current) {
        console.log("[Map NDD widget] startWidget пропущен: уже инициализирован");
        return;
      }
      if (!window.YaDelivery) {
        console.warn("[Map NDD widget] startWidget: window.YaDelivery ещё нет");
        return;
      }
      if (!document.getElementById(CONTAINER_ID)) {
        console.warn("[Map NDD widget] startWidget: контейнер #" + CONTAINER_ID + " не найден");
        return;
      }
      widgetInitedRef.current = true;

      const weightGrams = Math.max(100, totalWeightGrams ?? 10000);
      const params = {
        city,
        size: { height: "450px", width: "100%" },
        source_platform_station: stationId,
        physical_dims_weight_gross: weightGrams,
        physical_dims_dx: 30,
        physical_dims_dy: 20,
        physical_dims_dz: 10,
        delivery_term: 0,
        delivery_price: (price: number) => `${price} ₽`,
        show_select_button: true,
        filter: {
          type: ["pickup_point", "terminal"],
          is_yandex_branded: false,
          payment_methods: ["already_paid", "card_on_receipt"],
          payment_methods_filter: "or",
        },
      };
      console.log("[Map NDD widget] Вызов createWidget с params:", {
        ...params,
        delivery_price: "(function)",
      });

      window.YaDelivery.createWidget({
        containerId: CONTAINER_ID,
        params,
      });
      console.log("[Map NDD widget] createWidget вызван. Запросы к API идут из скрипта ndd-widget.landpro.site — смотреть вкладку Network (фильтр по landpro / taxi / yandex).");
    }

    if (window.YaDelivery) {
      console.log("[Map NDD widget] YaDelivery уже в window → startWidget()");
      startWidget();
    } else {
      console.log("[Map NDD widget] Ожидаем событие YaNddWidgetLoad");
      document.addEventListener("YaNddWidgetLoad", startWidget);
    }

    const existing = document.querySelector(
      `script[src="${WIDGET_SCRIPT_URL}"]`
    ) as (HTMLScriptElement & { readyState?: string }) | null;
    if (existing) {
      const readyState = existing.readyState ?? "";
      console.log("[Map NDD widget] Скрипт виджета уже на странице", {
        readyState: readyState || "(нет)",
      });
      // Не вызываем startWidget() синхронно: скрипт с async мог ещё не выполниться.
      // Если скрипт уже загружен — событие YaNddWidgetLoad мы могли пропустить; тогда опрашиваем YaDelivery.
      if (readyState === "complete" || readyState === "loaded") {
        const poll = setInterval(() => {
          if (window.YaDelivery) {
            clearInterval(poll);
            startWidget();
          }
        }, 50);
        const stopPoll = setTimeout(() => clearInterval(poll), 3000);
        return () => {
          clearInterval(poll);
          clearTimeout(stopPoll);
          document.removeEventListener("YaNddWidgetLoad", startWidget);
          widgetInitedRef.current = false;
          const container = document.getElementById(CONTAINER_ID);
          if (container) container.innerHTML = "";
          console.log("[Map NDD widget] Cleanup: виджет сброшен");
        };
      }
      return () => {
        document.removeEventListener("YaNddWidgetLoad", startWidget);
        widgetInitedRef.current = false;
        const container = document.getElementById(CONTAINER_ID);
        if (container) container.innerHTML = "";
        console.log("[Map NDD widget] Cleanup: виджет сброшен");
      };
    }

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      console.log("[Map NDD widget] Скрипт загружен:", WIDGET_SCRIPT_URL);
      startWidget();
    };
    script.onerror = () => {
      console.error(
        "[Map NDD widget] Ошибка загрузки виджета:",
        WIDGET_SCRIPT_URL
      );
    };
    document.body.appendChild(script);
    console.log("[Map NDD widget] Добавлен script", WIDGET_SCRIPT_URL);

    return () => {
      document.removeEventListener("YaNddWidgetLoad", startWidget);
      widgetInitedRef.current = false;
      const container = document.getElementById(CONTAINER_ID);
      if (container) container.innerHTML = "";
      console.log("[Map NDD widget] Cleanup: виджет сброшен");
    };
  }, [isPickup, city, totalWeightGrams]);

  // Курьер: обычная Яндекс.Карта с меткой, геокодинг, только Москва
  useEffect(() => {
    if (!isCourier) return;

    console.log("[Map] Courier effect: isCourier=true", {
      hasRef: !!courierMapRef.current,
      containerId: COURIER_MAP_ID,
    });

    const apiKey =
      (typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY) ||
      "";
    const scriptUrl = apiKey
      ? `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
      : "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

    const initCourierMap = (retryCount = 0) => {
      const el = document.getElementById(COURIER_MAP_ID);
      const rect = el?.getBoundingClientRect();
      console.log("[Map] initCourierMap:", {
        hasYmaps: !!window.ymaps,
        hasRef: !!courierMapRef.current,
        hasElement: !!el,
        elRect: rect,
        retry: retryCount,
      });

      if (!window.ymaps) {
        console.warn("[Map] window.ymaps не загружен");
        return;
      }
      if (!el) {
        console.warn("[Map] Элемент #" + COURIER_MAP_ID + " не найден");
        if (retryCount < 3) {
          setTimeout(() => initCourierMap(retryCount + 1), 100);
        }
        return;
      }
      if (rect && rect.width === 0 && rect.height === 0 && retryCount < 5) {
        console.warn("[Map] Контейнер нулевого размера, повтор через 150ms");
        setTimeout(() => initCourierMap(retryCount + 1), 150);
        return;
      }

      window.ymaps.ready(() => {
        const el2 = document.getElementById(COURIER_MAP_ID);
        if (!el2 || !window.ymaps) {
          console.warn("[Map] ymaps.ready: элемент или ymaps пропал");
          return;
        }

        // Удаляем старую карту
        if (courierMapInstanceRef.current) {
          try {
            courierMapInstanceRef.current.map.destroy();
          } catch {
            /* ignore */
          }
          courierMapInstanceRef.current = null;
        }

        console.log("[Map] Создаём карту в", COURIER_MAP_ID);
        const map = new window.ymaps!.Map(COURIER_MAP_ID, {
          center: MOSCOW_CENTER,
          zoom: 12,
          controls: ["zoomControl"],
        }) as {
          destroy: () => void;
          events: { add: (type: string, handler: (e: unknown) => void) => void };
          setCenter: (center: number[]) => void;
          geoObjects: { add: (obj: unknown) => void };
        };

        const placemark = new window.ymaps!.Placemark(
          MOSCOW_CENTER,
          {},
          { draggable: true }
        ) as {
          geometry: { setCoordinates: (c: number[]) => void; getCoordinates?: () => number[] };
          events: { add: (type: string, handler: (e: unknown) => void) => void };
        };
        map.geoObjects.add(placemark);

        const applyAddress = (
          coords: [number, number],
          addr: { city: string; street: string; house: string; fullAddress: string }
        ) => {
          console.log("[Map] applyAddress вызван:", { coords, addr });
          if (!isInMoscow(addr)) {
            console.log("[Map] Адрес вне Москвы, пропускаем");
            onSearchChangeRef.current?.("Доставка только по Москве");
            return;
          }
          const payload = {
            city: "Москва",
            street: addr.street,
            house: addr.house,
            fullAddress: addr.fullAddress,
            lat: coords[0],
            lon: coords[1],
          };
          console.log("[Map] Вызываем onAddressSelect с:", payload);
          onAddressSelectRef.current?.(payload);
        };

        const reverseGeocode = (coords: [number, number]) => {
          console.log("[Map] reverseGeocode:", coords);
          const [lat, lon] = coords;
          const base = typeof window !== "undefined" ? window.location.origin : "";
          const url = `${base}/api/reverse-geocode?lat=${lat}&lon=${lon}`;

          fetch(url)
            .then((r) => r.json())
            .then((data: { city?: string; street?: string; house?: string; fullAddress?: string; error?: string }) => {
              if (data.error || !data.fullAddress) {
                console.warn("[Map] Геокод: пустой результат или ошибка", data);
                return;
              }
              const addr = {
                city: data.city ?? "Москва",
                street: data.street ?? "",
                house: data.house ?? "",
                fullAddress: data.fullAddress ?? "",
              };
              console.log("[Map] Геокод успех:", addr);
              applyAddress(coords, addr);
            })
            .catch((err: unknown) => {
              console.error("[Map] Ошибка геокодера:", err);
            });
        };

        placemark.events.add("dragend", (e: unknown) => {
          const ev = e as { get?: (key: string) => unknown };
          const target = ev.get?.("target") as { geometry?: { getCoordinates?: () => number[] } } | undefined;
          const coords = target?.geometry?.getCoordinates?.();
          console.log("[Map] dragend метки:", coords);
          if (coords && coords.length >= 2) {
            reverseGeocode([coords[0], coords[1]]);
          }
        });

        map.events.add("click", (e: unknown) => {
          const ev = e as { get?: (key: string) => unknown };
          const coords = (ev.get?.("coords") as number[] | undefined) ?? [];
          console.log("[Map] клик по карте:", coords);
          if (coords.length < 2) return;
          placemark.geometry.setCoordinates(coords);
          reverseGeocode([coords[0], coords[1]]);
        });

        courierMapInstanceRef.current = { map, placemark };
        console.log("[Map] Карта курьера создана");
      });
    };

    const runInit = () => {
      requestAnimationFrame(() => {
        initCourierMap();
      });
    };

    const COURIER_SCRIPT_ID = "ymaps-courier-api";
    let ourScript = document.getElementById(COURIER_SCRIPT_ID) as HTMLScriptElement | null;

    if (ourScript) {
      if (window.ymaps) {
        runInit();
      } else {
        ourScript.addEventListener("load", runInit);
        const poll = setInterval(() => {
          if (window.ymaps) {
            clearInterval(poll);
            runInit();
          }
        }, 50);
        setTimeout(() => clearInterval(poll), 5000);
      }
    } else {
      const script = document.createElement("script");
      script.id = COURIER_SCRIPT_ID;
      script.src = scriptUrl;
      script.async = true;
      script.onload = runInit;
      script.onerror = () => {
        console.error("[Map] Ошибка загрузки Яндекс.Карт");
      };
      document.body.appendChild(script);
    }

    return () => {
      if (courierMapInstanceRef.current) {
        try {
          courierMapInstanceRef.current.map.destroy();
        } catch {
          /* ignore */
        }
        courierMapInstanceRef.current = null;
      }
    };
  }, [isCourier]);

  // Адрес из инпутов → метка на карте: геокодируем через наш API (без scriptError в браузере).
  useEffect(() => {
    if (!isCourier) return;
    const query = (searchValue ?? "").trim();
    if (!query || query === "Доставка только по Москве" || query.length < 5) return;

    const geocodeQuery = /москва/i.test(query) ? query : `${query}, Москва`;
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${base}/api/geocode?address=${encodeURIComponent(geocodeQuery)}`;
    const abort = new AbortController();

    const applyCoords = (
      data: { lat: number; lon: number; city?: string; street?: string; house?: string; fullAddress?: string },
      retry = 0
    ) => {
      const coords: [number, number] = [data.lat, data.lon];
      const cityLower = (data.city ?? "").toLowerCase();
      if (!cityLower.includes("москва") && !cityLower.includes("moscow") && !cityLower.includes("московск")) {
        onSearchChangeRef.current?.("Доставка только по Москве");
        return;
      }
      const inst = courierMapInstanceRef.current;
      if (!inst) {
        if (retry < 15) setTimeout(() => applyCoords(data, retry + 1), 200);
        return;
      }
      requestAnimationFrame(() => {
        const inst2 = courierMapInstanceRef.current;
        if (!inst2) return;
        try {
          inst2.placemark.geometry.setCoordinates(coords);
          inst2.map.setCenter(coords);
        } catch (e) {
          console.error("[Map] Ошибка при перемещении метки:", e);
        }
        onAddressSelectRef.current?.({
          city: "Москва",
          street: data.street ?? "",
          house: data.house ?? "",
          fullAddress: data.fullAddress ?? "",
          lat: data.lat,
          lon: data.lon,
        });
      });
    };

    const delay = 300;
    const timer = setTimeout(() => {
      fetch(url, { signal: abort.signal })
        .then((r) => r.json())
        .then((data: { lat?: number; lon?: number; city?: string; street?: string; house?: string; fullAddress?: string; error?: string }) => {
          if (data.error || data.lat == null || data.lon == null) return;
          applyCoords({
            lat: data.lat,
            lon: data.lon,
            city: data.city,
            street: data.street,
            house: data.house,
            fullAddress: data.fullAddress,
          });
        })
        .catch((err: unknown) => {
          if ((err as { name?: string })?.name === "AbortError") return;
          console.error("[Map] Ошибка геокодера:", err);
        });
    }, delay);

    return () => {
      clearTimeout(timer);
      abort.abort();
    };
  }, [isCourier, searchValue]);

  if (isPickup) {
    return (
      <div style={{ width: "100%", minHeight: 400 }}>
        <div
          ref={containerRef}
          id={CONTAINER_ID}
          style={{ width: "100%", minHeight: 450 }}
        />
      </div>
    );
  }

  if (isCourier) {
    return (
      <div style={{ width: "100%", minHeight: 400 }}>
        <div
          ref={courierMapRef}
          id={COURIER_MAP_ID}
          style={{ width: "100%", height: 450 }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#666",
      }}
    >
      Выберите способ доставки.
    </div>
  );
};

export default Map;

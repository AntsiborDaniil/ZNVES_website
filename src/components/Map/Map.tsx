"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CdekPvzPoint } from "../../api/delivery/cdekApi";
import { getRegionPvzCdek } from "../../api/delivery/pvzRegionCache";
import {
  buildCdekPvzSelection,
  buildYaDeliveryWidgetParams,
  COURIER_MAP_CONTAINER_ID,
  DEFAULT_YA_SOURCE_ADDRESS,
  filterCdekPvzPoints,
  getMapDeliveryMode,
  isInMoscow,
  MOSCOW_CENTER,
  parseAddressFromGeoObject,
  parseYaNddWidgetSelection,
  resolveYaWidgetSize,
  type PvzListOption,
  type YaNddWidgetPointDetail,
  YANDEX_PVZ_CONTAINER_ID,
  YANDEX_WIDGET_SCRIPT_URL,
} from "./mapWidgetUtils";

const WIDGET_SCRIPT_URL = YANDEX_WIDGET_SCRIPT_URL;
const CONTAINER_ID = YANDEX_PVZ_CONTAINER_ID;
const COURIER_MAP_ID = COURIER_MAP_CONTAINER_ID;

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

export type { PvzListOption };

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
  /** Колбэк при изменении расчёта доставки СДЭК (срок и цена) — для отображения в блоке «Доставка» */
  onCdekDeliveryEstimate?: (estimate: { price: number; daysMin: number; daysMax: number } | null) => void;
  /** Колбэк при клике по кнопке «Продолжить» в виджете Яндекса ПВЗ */
  onYandexContinueClick?: () => void;
  /** Колбэк при клике по виджету (не по кнопке «Продолжить») — чтобы снова показать кнопку при выборе другого ПВЗ */
  onYandexWidgetInteraction?: () => void;
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
  onCdekDeliveryEstimate,
  onYandexContinueClick,
  onYandexWidgetInteraction,
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

  const deliveryMode = getMapDeliveryMode(deliveryMethod, deliveryType);
  const isPickupYandex = deliveryMode === "pickup-yandex";
  const isPickupCdek = deliveryMode === "pickup-cdek";
  const isCourier = deliveryMode === "courier";
  const isPickup = isPickupYandex || isPickupCdek;

  const [cdekPvzList, setCdekPvzList] = useState<CdekPvzPoint[]>([]);
  const [cdekPvzLoading, setCdekPvzLoading] = useState(false);
  const [selectedCdekPvzCode, setSelectedCdekPvzCode] = useState<string | null>(null);
  const [cdekDeliveryEstimate, setCdekDeliveryEstimate] = useState<{ price: number; daysMin: number; daysMax: number } | null>(null);
  const [cdekPvzSearch, setCdekPvzSearch] = useState("");
  /** Конфиг доставки с сервера (env читается в runtime на проде) */
  const [deliveryConfig, setDeliveryConfig] = useState<{
    yaDeliverySourceAddress: string;
    cdekConfigured?: boolean;
  } | null>(null);
  /** Показывать скелетон «Загрузка пунктов…» для виджета Яндекса ПВЗ */
  const [yandexWidgetLoading, setYandexWidgetLoading] = useState(false);

  const city = (cityProp || "Москва").trim() || "Москва";

  // Конфиг Яндекса нужен только для ПВЗ Яндекса / курьера — не дергаем API на СДЭК.
  useEffect(() => {
    if (!isPickupYandex && !isCourier) return;

    let cancelled = false;
    const timeout = setTimeout(() => {
      if (cancelled) return;
      setDeliveryConfig((prev) => prev ?? { yaDeliverySourceAddress: DEFAULT_YA_SOURCE_ADDRESS, cdekConfigured: false });
    }, 4000);
    fetch("/api/delivery/config")
      .then((r) => r.json())
      .then((data: { yaDeliverySourceAddress?: string; cdekConfigured?: boolean }) => {
        if (cancelled) return;
        setDeliveryConfig({
          yaDeliverySourceAddress: (data.yaDeliverySourceAddress ?? DEFAULT_YA_SOURCE_ADDRESS).trim(),
          cdekConfigured: data.cdekConfigured,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setDeliveryConfig((prev) => prev ?? { yaDeliverySourceAddress: DEFAULT_YA_SOURCE_ADDRESS, cdekConfigured: false });
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [isPickupYandex, isCourier]);

  const cdekPvzFiltered = filterCdekPvzPoints(cdekPvzList, cdekPvzSearch);

  const selectCdekPvz = (pvz: CdekPvzPoint) => {
    setSelectedCdekPvzCode(pvz.code);
    const { addressData, pvzOption } = buildCdekPvzSelection(pvz, city);
    onAddressSelectRef.current?.(addressData);
    onPvzListLoaded?.([pvzOption]);
  };

  // Загрузка списка ПВЗ СДЭК по городу (наш API с ключами из env)
  useEffect(() => {
    if (!isPickupCdek || !city) return;
    const ac = new AbortController();
    setCdekPvzLoading(true);
    setSelectedCdekPvzCode(null);
    getRegionPvzCdek(city, ac.signal)
      .then((list) => {
        setCdekPvzList(list);
        if (onPvzListLoaded && list.length > 0) {
          onPvzListLoaded(
            list.map((p) => ({
              name: p.name || p.address,
              address: p.address,
              code: p.code,
              city: city,
              lat: p.location?.lat,
              lon: p.location?.lon,
            }))
          );
        }
      })
      .catch(() => setCdekPvzList([]))
      .finally(() => setCdekPvzLoading(false));
    return () => ac.abort();
  }, [isPickupCdek, city, onPvzListLoaded]);

  // Расчёт доставки СДЭК (срок и стоимость) — опционально, если есть роут
  useEffect(() => {
    if (!isPickupCdek || !city || (totalWeightGrams ?? 0) <= 0) return;
    const ac = new AbortController();
    fetch(`/api/cdek/calculate?city=${encodeURIComponent(city)}&weight_grams=${totalWeightGrams ?? 1000}`, {
      signal: ac.signal,
    })
      .then((r) => (r.ok || r.status === 503 ? r.json() : null))
      .then((data: { price?: number; days_min?: number; days_max?: number; from_api?: boolean; reason?: string } | null) => {
        if (data && data.from_api === true && typeof data.price === "number") {
          setCdekDeliveryEstimate({
            price: data.price,
            daysMin: data.days_min ?? 1,
            daysMax: data.days_max ?? 2,
          });
        } else {
          setCdekDeliveryEstimate(null);
        }
      })
      .catch(() => {
        setCdekDeliveryEstimate(null);
      });
    return () => ac.abort();
  }, [isPickupCdek, city, totalWeightGrams]);

  // Пробрасываем расчёт СДЭК наверх для отображения в блоке «Доставка»
  useEffect(() => {
    if (!onCdekDeliveryEstimate) return;
    if (isPickupCdek) {
      onCdekDeliveryEstimate(cdekDeliveryEstimate);
    } else {
      onCdekDeliveryEstimate(null);
    }
  }, [isPickupCdek, cdekDeliveryEstimate, onCdekDeliveryEstimate]);

  // Подписка на выбор ПВЗ (событие из документации виджета) — только для Яндекса
  useEffect(() => {
    if (!isPickupYandex) return;

    const handler = (event: Event) => {
      const e = event as CustomEvent<YaNddWidgetPointDetail>;
      const selection = parseYaNddWidgetSelection(e.detail, city);
      if (!selection) return;

      const widgetRoot = document.getElementById(CONTAINER_ID);
      if (widgetRoot) widgetRoot.classList.remove("widget-continue-clicked");

      onAddressSelect?.(selection.addressData);
      onPvzListLoaded?.([selection.pvzOption]);
    };

    document.addEventListener("YaNddWidgetPointSelected", handler);
    return () => document.removeEventListener("YaNddWidgetPointSelected", handler);
  }, [isPickupYandex, city, onAddressSelect, onPvzListLoaded]);

  // После клика по кнопке «Продолжить» в виджете добавляем класс на контейнер — в CSS по нему скрываем кнопку (без помех работе виджета)
  useEffect(() => {
    if (!isPickupYandex) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const widgetRoot = document.getElementById(CONTAINER_ID);
      if (!widgetRoot || !target.closest?.(".widget__list-button")) return;
      const isInsideWidget = widgetRoot.contains(target);
      if (!isInsideWidget) return;
      setTimeout(() => {
        widgetRoot.classList.add("widget-continue-clicked");
        onYandexContinueClick?.();
      }, 0);
    };

    document.addEventListener("click", handleClick, false);
    return () => document.removeEventListener("click", handleClick, false);
  }, [isPickup, onYandexContinueClick]);

  // При клике по виджету (не по кнопке «Продолжить») снова показываем кнопку — чтобы при выборе другого ПВЗ она появлялась
  useEffect(() => {
    if (!isPickupYandex) return;
    const widgetRoot = document.getElementById(CONTAINER_ID);
    if (!widgetRoot) return;
    const handleWidgetClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest?.(".widget__list-button")) return;
      if (!widgetRoot.contains(target)) return;
      widgetRoot.classList.remove("widget-continue-clicked");
      onYandexWidgetInteraction?.();
    };
    widgetRoot.addEventListener("click", handleWidgetClick, true);
    return () => widgetRoot.removeEventListener("click", handleWidgetClick, true);
  }, [isPickupYandex, onYandexWidgetInteraction]);

  /** Высота контейнера = size, переданный в YaDelivery.createWidget */
  const [yaWidgetHeightPx, setYaWidgetHeightPx] = useState(450);
  const yaWidgetWidthPxRef = useRef(0);

  // Загрузка скрипта и инициализация виджета ПВЗ (только для Яндекса).
  // Вес берём из ref — не пересоздаём виджет при каждом изменении totalWeightGrams.
  const totalWeightGramsRef = useRef(totalWeightGrams);
  totalWeightGramsRef.current = totalWeightGrams;
  const yaSourceAddress =
    deliveryConfig?.yaDeliverySourceAddress?.trim() || DEFAULT_YA_SOURCE_ADDRESS;
  const deliveryConfigReady = Boolean(deliveryConfig);

  const mountYaWidget = useCallback(
    (force = false) => {
      if (!window.YaDelivery) return false;
      if (!document.getElementById(CONTAINER_ID)) return false;
      if (!force && widgetInitedRef.current) return false;

      const size = resolveYaWidgetSize(containerRef.current);
      yaWidgetWidthPxRef.current = size.widthPx;
      setYaWidgetHeightPx(size.heightPx);

      const container = document.getElementById(CONTAINER_ID);
      if (container) container.innerHTML = "";

      widgetInitedRef.current = true;
      window.YaDelivery.createWidget({
        containerId: CONTAINER_ID,
        params: buildYaDeliveryWidgetParams(
          city,
          yaSourceAddress,
          totalWeightGramsRef.current,
          { width: size.width, height: size.height }
        ),
      });
      return true;
    },
    [city, yaSourceAddress]
  );

  useEffect(() => {
    if (!isPickupYandex || !containerRef.current || !deliveryConfigReady) return;

    setYandexWidgetLoading(true);
    let loadingTimeout: ReturnType<typeof setTimeout> | null = null;
    const clearLoadingTimeout = () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
    };

    function startWidget() {
      if (mountYaWidget(false)) {
        clearLoadingTimeout();
        loadingTimeout = setTimeout(() => setYandexWidgetLoading(false), 4000);
      }
    }

    if (window.YaDelivery) {
      startWidget();
    } else {
      document.addEventListener("YaNddWidgetLoad", startWidget);
    }

    const existing = document.querySelector(
      `script[src="${WIDGET_SCRIPT_URL}"]`
    ) as (HTMLScriptElement & { readyState?: string }) | null;
    if (existing) {
      const readyState = existing.readyState ?? "";
      if (readyState === "complete" || readyState === "loaded") {
        const poll = setInterval(() => {
          if (window.YaDelivery) {
            clearInterval(poll);
            startWidget();
          }
        }, 50);
        const stopPoll = setTimeout(() => clearInterval(poll), 3000);
        return () => {
          clearLoadingTimeout();
          setYandexWidgetLoading(false);
          clearInterval(poll);
          clearTimeout(stopPoll);
          document.removeEventListener("YaNddWidgetLoad", startWidget);
          widgetInitedRef.current = false;
          const container = document.getElementById(CONTAINER_ID);
          if (container) container.innerHTML = "";
        };
      }
      return () => {
        clearLoadingTimeout();
        setYandexWidgetLoading(false);
        document.removeEventListener("YaNddWidgetLoad", startWidget);
        widgetInitedRef.current = false;
        const container = document.getElementById(CONTAINER_ID);
        if (container) container.innerHTML = "";
      };
    }

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      startWidget();
    };
    script.onerror = () => {
    };
    document.body.appendChild(script);

    return () => {
      clearLoadingTimeout();
      setYandexWidgetLoading(false);
      document.removeEventListener("YaNddWidgetLoad", startWidget);
      widgetInitedRef.current = false;
      const container = document.getElementById(CONTAINER_ID);
      if (container) container.innerHTML = "";
    };
  }, [isPickupYandex, city, yaSourceAddress, deliveryConfigReady, mountYaWidget]);

  // При ресайзе модалки корзины YaDelivery не обновляет size — пересоздаём виджет.
  useEffect(() => {
    if (!isPickupYandex || !deliveryConfigReady) return;
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const remountIfWidthChanged = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!widgetInitedRef.current || !window.YaDelivery) return;
        const nextWidth = containerRef.current?.clientWidth ?? 0;
        if (nextWidth < 200) return;
        if (Math.abs(nextWidth - yaWidgetWidthPxRef.current) < 12) return;
        setYandexWidgetLoading(true);
        mountYaWidget(true);
        window.setTimeout(() => setYandexWidgetLoading(false), 600);
      }, 180);
    };

    const observer = new ResizeObserver(remountIfWidthChanged);
    observer.observe(el);
    // Родитель модалки тоже может менять ширину, пока YaDelivery зафиксировал ребёнка.
    if (el.parentElement) observer.observe(el.parentElement);

    return () => {
      observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [isPickupYandex, deliveryConfigReady, mountYaWidget]);

  useEffect(() => {
    if (!isCourier) return;

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

      if (!window.ymaps) {
        return;
      }
      if (!el) {
        if (retryCount < 3) {
          setTimeout(() => initCourierMap(retryCount + 1), 100);
        }
        return;
      }
      if (rect && rect.width === 0 && rect.height === 0 && retryCount < 5) {
        setTimeout(() => initCourierMap(retryCount + 1), 150);
        return;
      }

      window.ymaps.ready(() => {
        const el2 = document.getElementById(COURIER_MAP_ID);
        if (!el2 || !window.ymaps) {
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
          if (!isInMoscow(addr)) {
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
          onAddressSelectRef.current?.(payload);
        };

        const reverseGeocode = (coords: [number, number]) => {
          const [lat, lon] = coords;
          const base = typeof window !== "undefined" ? window.location.origin : "";
          const url = `${base}/api/reverse-geocode?lat=${lat}&lon=${lon}`;

          fetch(url)
            .then((r) => r.json())
            .then((data: { city?: string; street?: string; house?: string; fullAddress?: string; error?: string }) => {
              if (data.error || !data.fullAddress) {
                return;
              }
              const addr = {
                city: data.city ?? "Москва",
                street: data.street ?? "",
                house: data.house ?? "",
                fullAddress: data.fullAddress ?? "",
              };
              applyAddress(coords, addr);
            })
            .catch((err: unknown) => {
            });
        };

        placemark.events.add("dragend", (e: unknown) => {
          const ev = e as { get?: (key: string) => unknown };
          const target = ev.get?.("target") as { geometry?: { getCoordinates?: () => number[] } } | undefined;
          const coords = target?.geometry?.getCoordinates?.();
          if (coords && coords.length >= 2) {
            reverseGeocode([coords[0], coords[1]]);
          }
        });

        map.events.add("click", (e: unknown) => {
          const ev = e as { get?: (key: string) => unknown };
          const coords = (ev.get?.("coords") as number[] | undefined) ?? [];
          if (coords.length < 2) return;
          placemark.geometry.setCoordinates(coords);
          reverseGeocode([coords[0], coords[1]]);
        });

        courierMapInstanceRef.current = { map, placemark };
      });
    };

    const runInit = () => {
      requestAnimationFrame(() => {
        initCourierMap();
      });
    };

    const COURIER_SCRIPT_ID = "ymaps-courier-api";
    const ourScript = document.getElementById(COURIER_SCRIPT_ID) as HTMLScriptElement | null;

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
        });
    }, delay);

    return () => {
      clearTimeout(timer);
      abort.abort();
    };
  }, [isCourier, searchValue]);

  if (isPickupCdek) {
    return (
      <div style={{ width: "100%", minHeight: 400 }}>
        <div
          id="cdek-pvz-block"
          style={{
            width: "100%",
            border: "1px solid #e5e5e5",
            borderRadius: 8,
            overflow: "hidden",
            background: "#fafafa",
          }}
        >
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #e5e5e5", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 600, color: "#333" }}>
              СДЭК · Пункты выдачи · {city}
            </span>
          </div>

          {cdekPvzLoading && (
            <div style={{ padding: "0 12px 12px" }}>
              <div
                className="cdekPvzSkeletonLine"
                style={{ height: 42, marginBottom: 12 }}
                aria-hidden
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 12px",
                      border: "1px solid #eee",
                      borderRadius: 6,
                      background: "#fff",
                    }}
                  >
                    <div
                      className="cdekPvzSkeletonLine"
                      style={{
                        height: 14,
                        width: "70%",
                        marginBottom: 8,
                        animationDelay: `${i * 0.1}s`,
                      }}
                      aria-hidden
                    />
                    <div
                      className="cdekPvzSkeletonLine"
                      style={{
                        height: 12,
                        width: "90%",
                        animationDelay: `${i * 0.1 + 0.05}s`,
                      }}
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!cdekPvzLoading && cdekPvzList.length === 0 && (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(82, 82, 82, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
                aria-hidden
              >
                📍
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "#525252" }}>
                  В этом городе пока нет пунктов выдачи СДЭК
                </p>
                <p style={{ margin: "8px 0 0", fontSize: 14, color: "#737373", lineHeight: 1.4, maxWidth: 320 }}>
                  Попробуйте указать другой город или выберите доставку курьером
                </p>
              </div>
            </div>
          )}

          {!cdekPvzLoading && cdekPvzList.length > 0 && (
            <div style={{ padding: "0 12px 12px" }}>
              <input
                type="text"
                placeholder="Поиск по адресу ПВЗ"
                value={cdekPvzSearch}
                onChange={(e) => setCdekPvzSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  marginBottom: 10,
                  border: "1px solid #e5e5e5",
                  borderRadius: 8,
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
                aria-label="Поиск по адресу ПВЗ"
              />
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: 420,
                  padding: 4,
                }}
              >
                {cdekPvzFiltered.length === 0 ? (
                  <div
                    style={{
                      padding: 32,
                      textAlign: "center",
                      color: "#737373",
                      fontSize: 14,
                      lineHeight: 1.5,
                    }}
                  >
                    По запросу ничего не найдено. Попробуйте другое название улицы или района.
                  </div>
                ) : (
                cdekPvzFiltered.map((pvz) => (
                  <button
                    key={pvz.code}
                    type="button"
                    onClick={() => selectCdekPvz(pvz)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      marginBottom: 8,
                      border: selectedCdekPvzCode === pvz.code ? "2px solid #1366ae" : "1px solid #e0e0e0",
                      borderRadius: 6,
                      background: selectedCdekPvzCode === pvz.code ? "#e8f4fc" : "#fff",
                      cursor: "pointer",
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{pvz.name || pvz.code}</span>
                    <br />
                    <span style={{ color: "#555" }}>{pvz.address}</span>
                    {pvz.work_time && (
                      <div style={{ marginTop: 4, fontSize: 12, color: "#777" }}>
                        {pvz.work_time}
                      </div>
                    )}
                  </button>
                )))
                }
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isPickupYandex) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: yaWidgetHeightPx,
          height: yaWidgetHeightPx,
          position: "relative",
        }}
      >
        {yandexWidgetLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(180deg, #f5f5f5 0%, #eee 100%)",
              borderRadius: 8,
              gap: 12,
            }}
          >
            <div className="yandexWidgetLoadingSpinner" />
            <span style={{ color: "#555", fontSize: 14 }}>Загрузка пунктов выдачи…</span>
          </div>
        )}
        <div
          ref={containerRef}
          style={{ width: "100%", height: yaWidgetHeightPx, minHeight: yaWidgetHeightPx }}
        >
          <div
            id={CONTAINER_ID}
            style={{ width: "100%", height: yaWidgetHeightPx, minHeight: yaWidgetHeightPx }}
          />
        </div>
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

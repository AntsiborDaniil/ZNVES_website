"use client";

import { useEffect, useRef } from "react";

const WIDGET_SCRIPT_URL = "https://ndd-widget.landpro.site/widget.js";
const CONTAINER_ID = "delivery-widget";

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
};

declare global {
  interface Window {
    YaDelivery?: {
      createWidget: (options: {
        containerId: string;
        params: Record<string, unknown>;
      }) => void;
    };
  }
}

/**
 * Виджет выбора ПВЗ Яндекс.Доставки (ndd-widget.landpro.site).
 * По документации: скрипт widget.js, контейнер delivery-widget, событие YaNddWidgetPointSelected.
 */
const Map = ({
  city: cityProp,
  onAddressSelect,
  onPvzListLoaded,
  deliveryMethod,
  deliveryType,
}: MapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetInitedRef = useRef(false);

  const isPickup =
    deliveryMethod === "pickup" &&
    (deliveryType === "cdek" || deliveryType === "yandex");

  const city = (cityProp || "Москва").trim() || "Москва";

  // Подписка на выбор ПВЗ (событие из документации виджета)
  useEffect(() => {
    if (!isPickup) return;

    const handler = (event: Event) => {
      const e = event as CustomEvent;
      const detail = e.detail;
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

  // Загрузка скрипта и инициализация виджета
  useEffect(() => {
    if (!isPickup || !containerRef.current) return;

    const stationId =
      (typeof window !== "undefined" && process.env.NEXT_PUBLIC_YA_DELIVERY_STATION_ID) ||
      "05e809bb-4521-42d9-a936-0fb0744c0fb3";

    function startWidget() {
      if (widgetInitedRef.current) return;
      if (!window.YaDelivery || !document.getElementById(CONTAINER_ID)) return;
      widgetInitedRef.current = true;

      window.YaDelivery.createWidget({
        containerId: CONTAINER_ID,
        params: {
          city,
          size: {
            height: "450px",
            width: "100%",
          },
          source_platform_station: stationId,
          physical_dims_weight_gross: 10000,
          delivery_price: "от 100",
          delivery_term: "от 1 дня",
          show_select_button: true,
          filter: {
            type: ["pickup_point", "terminal"],
            is_yandex_branded: false,
            payment_methods: ["already_paid", "card_on_receipt"],
            payment_methods_filter: "or",
          },
        },
      });
    }

    if (window.YaDelivery) {
      startWidget();
    } else {
      document.addEventListener("YaNddWidgetLoad", startWidget);
    }

    const existing = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
    if (existing) {
      startWidget();
      return () => {
        document.removeEventListener("YaNddWidgetLoad", startWidget);
      };
    }

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.onload = startWidget;
    script.onerror = () => {
      console.error("[Map] Ошибка загрузки виджета Яндекс.Доставки:", WIDGET_SCRIPT_URL);
    };
    document.body.appendChild(script);

    return () => {
      document.removeEventListener("YaNddWidgetLoad", startWidget);
      widgetInitedRef.current = false;
    };
  }, [isPickup, city]);

  if (!isPickup) {
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
        Выберите доставку до пункта выдачи (СДЕК или Яндекс), чтобы открыть виджет выбора ПВЗ.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: 400 }}>
      <div
        ref={containerRef}
        id={CONTAINER_ID}
        style={{ width: "100%", minHeight: 450 }}
      />
    </div>
  );
};

export default Map;

"use client";

import { useEffect, useRef, useMemo, useState } from "react";

type AddressData = {
  city?: string;
  street?: string;
  house?: string;
  fullAddress?: string;
};

type MapProps = {
  address?: string;
  city?: string;
  street?: string;
  house?: string;
  onAddressSelect?: (address: AddressData) => void;
};

// Создаем кастомную иконку маркера (SVG) без флагов
const createCustomIcon = (L: any) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <svg width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16C0 28 16 41 16 41C16 41 32 28 32 16C32 7.163 24.837 0 16 0Z" fill="#525252"/>
        <circle cx="16" cy="16" r="8" fill="#f2f0ec"/>
      </svg>
    `,
    iconSize: [32, 41],
    iconAnchor: [16, 41],
    popupAnchor: [0, -41],
  });
};

const Map = ({ address, city, street, house, onAddressSelect }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const clickMarkerRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Формируем адрес для поиска
  const searchQuery = useMemo(() => {
    return (
      address || [city, street, house].filter(Boolean).join(", ") || "Москва"
    );
  }, [address, city, street, house]);

  // Убеждаемся, что компонент смонтирован на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Инициализация карты
  useEffect(() => {
    if (!isMounted || !mapRef.current || mapInstanceRef.current) return;

    let isComponentMounted = true;

    // Динамический импорт Leaflet только на клиенте
    const initMap = async () => {
      try {
        const L = (await import("leaflet")).default;
        await import("leaflet/dist/leaflet.css");

        if (!isComponentMounted || !mapRef.current) return;

        // Инициализация карты (центр по умолчанию - Москва)
        // Отключаем элементы управления и атрибуцию
        const map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
        }).setView([55.7558, 37.6173], 13);

        // Добавляем тайлы OpenStreetMap без атрибуции
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "",
          maxZoom: 19,
        }).addTo(map);

        // Обработчик клика на карту для выбора адреса
        map.on("click", async (e: any) => {
          const { lat, lng } = e.latlng;

          // Удаляем предыдущие маркеры (от клика и от формы)
          if (clickMarkerRef.current) {
            map.removeLayer(clickMarkerRef.current);
          }
          if (markerRef.current) {
            map.removeLayer(markerRef.current);
            markerRef.current = null;
          }

          // Создаем новый маркер на месте клика
          const customIcon = createCustomIcon(L);
          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
          clickMarkerRef.current = marker;

          // Обратное геокодирование для получения адреса
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут

            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=ru`,
              {
                headers: {
                  "User-Agent": "ZNVES Website",
                },
                signal: controller.signal,
              }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.address) {
              const addr = data.address;

              // Извлекаем данные адреса
              const addressData: AddressData = {
                city:
                  addr.city ||
                  addr.town ||
                  addr.village ||
                  addr.municipality ||
                  "",
                street: addr.road || addr.street || "",
                house: addr.house_number || "",
                fullAddress: data.display_name || "",
              };

              // Формируем строку адреса для popup
              const addressString =
                [addressData.street, addressData.house, addressData.city]
                  .filter(Boolean)
                  .join(", ") ||
                data.display_name ||
                `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

              marker.bindPopup(addressString).openPopup();

              // Вызываем callback для заполнения формы
              if (onAddressSelect) {
                onAddressSelect(addressData);
              }
            } else {
              const coordsString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
              marker.bindPopup(coordsString).openPopup();
            }
          } catch (error) {
            // Игнорируем ошибки геокодирования, показываем координаты
            const coordsString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            marker.bindPopup(coordsString).openPopup();
          }
        });

        mapInstanceRef.current = map;
      } catch (error) {
        // Игнорируем ошибки инициализации карты
        if (process.env.NODE_ENV === "development") {
          console.error("Ошибка инициализации карты:", error);
        }
      }
    };

    initMap();

    return () => {
      isComponentMounted = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (error) {
          // Игнорируем ошибки при удалении карты
        }
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted, onAddressSelect]);

  // Геокодирование адреса
  useEffect(() => {
    if (!isMounted || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Геокодирование адреса через Nominatim (OpenStreetMap)
    const geocodeAddress = async () => {
      const addressString = searchQuery;

      // Если адрес не указан или это просто "Москва", не делаем запрос
      if (
        !addressString ||
        addressString.trim() === "" ||
        addressString === "Москва"
      ) {
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд таймаут

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            addressString
          )}&limit=1`,
          {
            headers: {
              "User-Agent": "ZNVES Website",
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
          // Динамически импортируем Leaflet для использования L
          const L = (await import("leaflet")).default;

          const { lat, lon } = data[0];
          const coordinates: [number, number] = [
            parseFloat(lat),
            parseFloat(lon),
          ];

          // Удаляем старые маркеры (от формы и от клика)
          if (markerRef.current) {
            map.removeLayer(markerRef.current);
          }
          if (clickMarkerRef.current) {
            map.removeLayer(clickMarkerRef.current);
            clickMarkerRef.current = null;
          }

          // Добавляем новый маркер с кастомной иконкой
          const customIcon = createCustomIcon(L);
          const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);
          marker.bindPopup(addressString).openPopup();
          markerRef.current = marker;

          // Центрируем карту на адресе
          map.setView(coordinates, 15);
        }
      } catch (error) {
        // Игнорируем ошибки геокодирования
        if (process.env.NODE_ENV === "development") {
          console.error("Ошибка геокодирования:", error);
        }
      }
    };

    // Debounce для избежания слишком частых запросов
    const timeoutId = setTimeout(() => {
      geocodeAddress();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isMounted, searchQuery]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", borderRadius: "3px" }}
    />
  );
};

export default Map;

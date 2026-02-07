"use client";

import { useEffect, useRef, useState } from "react";
import {
  getCdekPvzByCity,
  getCdekPvzByCoords,
  getFallbackPvzForCity,
  getFallbackPvzByCoords,
  filterPvzByBounds,
  sortPvzByDistance,
  type CdekPvzPoint,
  type MapBounds,
} from "../../api/delivery/cdekApi";
import {
  getYandexPvzByCity,
  getYandexPvzByCoords,
  getFallbackYandexPvzForCity,
  getFallbackYandexPvzByCoords,
  filterYandexPvzByBounds,
  sortYandexPvzByDistance,
  type YandexPvzPoint,
} from "../../api/delivery/yandexApi";

/** Пресеты меток ПВЗ (стандартные пины Яндекс.Карт) */
const CDEK_MARKER_PRESET = "islands#greenIcon";
const YANDEX_MARKER_PRESET = "islands#redIcon";

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

/** Вариант ПВЗ для выпадающего списка (из ответа бэкенда) */
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
  /** Координаты выбранного ПВЗ — карта фокусируется на них и не центрируется на пользователе */
  selectedPvzCoords?: [number, number] | null;
};

declare global {
  interface Window {
    ymaps: any;
  }
}

const Map = ({
  address,
  city,
  street,
  house,
  onAddressSelect,
  onPvzListLoaded,
  searchValue,
  onSearchChange,
  deliveryMethod,
  deliveryType,
  selectedPvzCoords,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const pvzMarkersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isYmapsLoaded, setIsYmapsLoaded] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const geocodeDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isGeocodingRef = useRef(false);
  const isCdekMode =
    deliveryType === "cdek" && deliveryMethod === "pickup";
  const isYandexMode =
    deliveryType === "yandex" && deliveryMethod === "pickup";
  const deliveryTypeRef = useRef(deliveryType);
  const deliveryMethodRef = useRef(deliveryMethod);
  const onAddressSelectRef = useRef(onAddressSelect);
  useEffect(() => {
    deliveryTypeRef.current = deliveryType;
    deliveryMethodRef.current = deliveryMethod;
    onAddressSelectRef.current = onAddressSelect;
  }, [deliveryType, deliveryMethod, onAddressSelect]);

  // Загрузка Yandex Maps API
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Проверяем, не загружается ли уже скрипт
    const existingScript = document.querySelector(
      'script[src*="api-maps.yandex.ru"]'
    );

    if (existingScript) {
      // Если скрипт уже есть, ждем его загрузки
      if (window.ymaps) {
        window.ymaps.ready(() => {
          setIsYmapsLoaded(true);
        });
      } else {
        existingScript.addEventListener("load", () => {
          if (window.ymaps) {
            window.ymaps.ready(() => {
              setIsYmapsLoaded(true);
            });
          }
        });
      }
      return;
    }

    if (window.ymaps) {
      window.ymaps.ready(() => {
        setIsYmapsLoaded(true);
      });
      return;
    }

    const script = document.createElement("script");
    // API ключ можно добавить через переменную окружения NEXT_PUBLIC_YANDEX_MAPS_API_KEY
    // Или оставить пустым - базовая функциональность работает без ключа
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || "";
    const apiKeyParam = apiKey ? `&apikey=${apiKey}` : "";
    const scriptUrl = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${apiKeyParam}`;

    // Для отладки (можно убрать в продакшене)
    if (process.env.NODE_ENV === "development" && apiKey) {
      console.log(
        "Yandex Maps API key loaded:",
        apiKey.substring(0, 8) + "..."
      );
    }

    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          setIsYmapsLoaded(true);
        });
      }
    };
    script.onerror = () => {
      console.error("Ошибка загрузки Yandex Maps API");
    };
    document.head.appendChild(script);

    return () => {
      // Не удаляем скрипт при размонтировании, так как он может использоваться другими компонентами
    };
  }, []);

  // Инициализация карты
  useEffect(() => {
    if (
      !isMounted ||
      !isYmapsLoaded ||
      !mapRef.current ||
      mapInstanceRef.current
    ) {
      if (process.env.NODE_ENV === "development") {
        console.log("[Map] Инициализация пропущена:", {
          isMounted,
          isYmapsLoaded,
          hasMapRef: !!mapRef.current,
          hasMapInstance: !!mapInstanceRef.current,
        });
      }
      return;
    }

    console.log("[Map] Начинаем инициализацию карты");
    const initMap = async () => {
      try {
        const { ymaps } = window;

        // Проверяем, что геокодер доступен
        if (!ymaps.geocode) {
          console.warn(
            "[Map] ymaps.geocode недоступен при инициализации, ждем..."
          );
          await new Promise((resolve) => setTimeout(resolve, 500));
          if (!ymaps.geocode) {
            console.error("[Map] ymaps.geocode все еще недоступен");
            return;
          }
        }

        // Инициализация карты (центр по умолчанию - Москва)
        // Отключаем рекламу, если нет API ключа
        const map = new ymaps.Map(mapRef.current, {
          center: [55.7558, 37.6173],
          zoom: 13,
          controls: [],
          // Отключаем рекламу для работы без API ключа
          suppressMapOpenBlock: true,
        });

        // Закрываем все balloon'ы при клике на любые объекты карты (метро, музеи и т.д.)
        // Используем глобальный обработчик для всех geoObjects
        map.geoObjects.events.add("click", (e: any) => {
          try {
            const target = e.get("target");
            // Если клик был на объект, который не является нашим маркером
            if (target && target !== markerRef.current) {
              // Закрываем balloon через небольшую задержку после открытия
              setTimeout(() => {
                try {
                  if (
                    map.balloon &&
                    map.balloon.isOpen &&
                    map.balloon.isOpen()
                  ) {
                    map.balloon.close();
                  }
                } catch (error) {
                  // Игнорируем ошибки
                }
              }, 300);
            }
          } catch (error) {
            // Игнорируем ошибки
          }
        });

        // Ждем полной загрузки карты перед добавлением обработчиков
        await new Promise<void>((resolve) => {
          const onLoad = () => {
            console.log("[Map] Карта полностью загружена");
            map.events.remove("load", onLoad);
            resolve();
          };
          map.events.add("load", onLoad);
          // Таймаут на случай, если событие load не сработает
          setTimeout(() => {
            console.log("[Map] Таймаут загрузки карты, продолжаем");
            map.events.remove("load", onLoad);
            resolve();
          }, 2000);
        });

        // Обратное геокодирование (координаты -> адрес)
        const reverseGeocode = async (lat: number, lon: number) => {
          // Проверяем, что ymaps доступен
          if (!window.ymaps || !window.ymaps.geocode) {
            console.warn("[Map] ymaps.geocode недоступен, ждем...");
            // Ждем немного и пробуем снова
            setTimeout(() => {
              if (window.ymaps && window.ymaps.geocode) {
                reverseGeocode(lat, lon);
              } else {
                console.error("[Map] ymaps.geocode все еще недоступен");
              }
            }, 500);
            return;
          }

          try {
            const { ymaps } = window;

            // Проверяем, что карта еще существует
            if (!mapInstanceRef.current) {
              console.warn(
                "[Map] Карта была удалена, пропускаем геокодирование"
              );
              return;
            }

            console.log(
              "[Map] Начинаем обратное геокодирование для:",
              lat,
              lon
            );
            const geocoder = ymaps.geocode([lat, lon], {
              results: 1,
            });

            geocoder
              .then((res: any) => {
                try {
                  if (!res || !res.geoObjects) {
                    console.warn("[Map] Пустой ответ от геокодера");
                    return;
                  }

                  const firstGeoObject = res.geoObjects.get(0);
                  if (!firstGeoObject) {
                    console.warn("[Map] Геокодер не вернул результатов");
                    return;
                  }

                  // Безопасное получение свойств с полной обработкой ошибок
                  let metaData = null;
                  let addressComponents: any[] = [];

                  try {
                    // Проверяем наличие properties
                    if (!firstGeoObject.properties) {
                      console.warn(
                        "[Map] firstGeoObject.properties отсутствует"
                      );
                    } else if (
                      typeof firstGeoObject.properties.get === "function"
                    ) {
                      try {
                        metaData =
                          firstGeoObject.properties.get("metaDataProperty");
                      } catch (getError: any) {
                        console.warn(
                          "[Map] Ошибка при вызове properties.get:",
                          {
                            error: getError,
                            message: getError?.message,
                            stack: getError?.stack,
                          }
                        );
                        // Пробуем альтернативный способ
                        try {
                          metaData =
                            firstGeoObject.properties["metaDataProperty"] ||
                            firstGeoObject.properties.metaDataProperty;
                        } catch (altError: any) {
                          console.warn(
                            "[Map] Альтернативный способ тоже не сработал:",
                            altError
                          );
                        }
                      }
                    } else {
                      console.warn(
                        "[Map] properties.get недоступен, используем альтернативный метод"
                      );
                      metaData =
                        firstGeoObject.properties["metaDataProperty"] ||
                        firstGeoObject.properties.metaDataProperty;
                    }

                    if (metaData?.GeocoderMetaData?.Address?.Components) {
                      addressComponents =
                        metaData.GeocoderMetaData.Address.Components;
                    }
                  } catch (propError: any) {
                    console.warn(
                      "[Map] Общая ошибка при получении metaDataProperty:",
                      {
                        error: propError,
                        message: propError?.message,
                        stack: propError?.stack,
                      }
                    );
                    // Продолжаем с пустым массивом компонентов
                  }

                  // Обрабатываем данные адреса
                  let addressCity = "";
                  let addressStreet = "";
                  let addressHouse = "";

                  if (Array.isArray(addressComponents)) {
                    addressComponents.forEach((component: any) => {
                      if (component && component.kind && component.name) {
                        if (
                          component.kind === "locality" ||
                          component.kind === "area"
                        ) {
                          addressCity = component.name;
                        } else if (component.kind === "street") {
                          addressStreet = component.name;
                        } else if (component.kind === "house") {
                          addressHouse = component.name;
                        }
                      }
                    });
                  }

                  // Безопасное получение адреса
                  let fullAddress = "";
                  try {
                    if (
                      firstGeoObject &&
                      typeof firstGeoObject.getAddressLine === "function"
                    ) {
                      fullAddress = firstGeoObject.getAddressLine();
                    } else if (firstGeoObject?.properties) {
                      // Альтернативный способ получения адреса
                      try {
                        if (
                          typeof firstGeoObject.properties.get === "function"
                        ) {
                          fullAddress =
                            firstGeoObject.properties.get("text") ||
                            firstGeoObject.properties.get("name") ||
                            `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                        } else {
                          fullAddress =
                            firstGeoObject.properties["text"] ||
                            firstGeoObject.properties["name"] ||
                            `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                        }
                      } catch (propGetError: any) {
                        console.warn(
                          "[Map] Ошибка при получении адреса через properties:",
                          propGetError
                        );
                        fullAddress = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                      }
                    } else {
                      fullAddress = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                    }
                  } catch (addrError: any) {
                    console.warn(
                      "[Map] Ошибка при получении адреса:",
                      addrError
                    );
                    fullAddress = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                  }

                  const addressData: AddressData = {
                    city: addressCity,
                    street: addressStreet,
                    house: addressHouse,
                    fullAddress: fullAddress,
                    pvzAddress: deliveryMethod === "pickup" ? fullAddress : undefined,
                  };

                  // Проверяем, что карта еще существует перед обновлением
                  if (!mapInstanceRef.current) {
                    console.warn(
                      "[Map] Карта была удалена во время геокодирования"
                    );
                    return;
                  }

                  // Создаем или обновляем маркер
                  if (markerRef.current) {
                    map.geoObjects.remove(markerRef.current);
                  }

                  const marker = new ymaps.Placemark(
                    [lat, lon],
                    {
                      balloonContent: fullAddress,
                    },
                    {
                      preset: "islands#darkBlueDotIcon",
                      draggable: true,
                    }
                  );

                  // Обработчик перетаскивания маркера
                  marker.events.add("dragend", async () => {
                    const markerCoords = marker.geometry.getCoordinates();
                    await reverseGeocode(markerCoords[0], markerCoords[1]);
                  });

                  // Закрываем balloon при клике на маркер, если он уже открыт
                  marker.events.add("click", () => {
                    try {
                      // Если balloon уже открыт, закрываем его при повторном клике
                      setTimeout(() => {
                        if (
                          map.balloon &&
                          map.balloon.isOpen &&
                          map.balloon.isOpen()
                        ) {
                          map.balloon.close();
                        }
                      }, 100);
                    } catch (error) {
                      console.warn(
                        "[Map] Ошибка при закрытии balloon маркера:",
                        error
                      );
                    }
                  });

                  markerRef.current = marker;
                  map.geoObjects.add(marker);
                  map.setCenter([lat, lon], 15);

                  // Вызываем callback
                  if (onAddressSelect) {
                    console.log("[Map] Вызываем onAddressSelect:", addressData);
                    onAddressSelect(addressData);
                  }
                } catch (processError: any) {
                  console.error(
                    "[Map] Ошибка при обработке результата геокодера:",
                    {
                      error: processError,
                      message: processError?.message,
                      stack: processError?.stack,
                      lat,
                      lon,
                    }
                  );
                  // Создаем маркер с координатами даже при ошибке
                  if (mapInstanceRef.current) {
                    if (markerRef.current) {
                      map.geoObjects.remove(markerRef.current);
                    }
                    const marker = new ymaps.Placemark(
                      [lat, lon],
                      {
                        balloonContent: `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
                      },
                      {
                        preset: "islands#darkBlueDotIcon",
                        draggable: true,
                      }
                    );
                    markerRef.current = marker;
                    map.geoObjects.add(marker);
                    map.setCenter([lat, lon], 15);
                  }
                }
              })
              .catch((error: any) => {
                console.error(
                  "[Map] Ошибка обратного геокодирования (детали):",
                  {
                    error,
                    message: error?.message,
                    stack: error?.stack,
                    lat,
                    lon,
                  }
                );
                // Не показываем ошибку пользователю, просто логируем
              });
          } catch (error: any) {
            console.error("[Map] Ошибка при вызове геокодера (детали):", {
              error,
              message: error?.message,
              stack: error?.stack,
              lat,
              lon,
              hasYmaps: !!window.ymaps,
              hasGeocode: !!(window.ymaps && window.ymaps.geocode),
            });
          }
        };

        // Обработчик клика на карту (в режиме СДЭК выбор только по маркерам ПВЗ)
        const handleMapClick = (e: any) => {
          try {
            if (
              (deliveryTypeRef.current === "cdek" ||
                deliveryTypeRef.current === "yandex") &&
              deliveryMethodRef.current === "pickup"
            ) {
              return;
            }
            // Закрываем все открытые balloon'ы при клике на карту
            try {
              if (map.balloon && map.balloon.isOpen && map.balloon.isOpen()) {
                map.balloon.close();
              }
            } catch (balloonError) {
              // Игнорируем ошибки закрытия balloon
            }

            // Проверяем готовность перед обработкой
            if (!window.ymaps || !window.ymaps.geocode) {
              console.warn("[Map] ymaps.geocode недоступен при клике, ждем...");
              setTimeout(() => {
                if (window.ymaps && window.ymaps.geocode) {
                  const coords = e.get("coords");
                  reverseGeocode(coords[0], coords[1]);
                } else {
                  console.error("[Map] Не удалось получить доступ к геокодеру");
                }
              }, 500);
              return;
            }

            const coords = e.get("coords");
            console.log("[Map] Клик на карту:", coords);
            // Координаты в формате [широта, долгота]
            reverseGeocode(coords[0], coords[1]);
          } catch (error: any) {
            console.error("[Map] Ошибка при обработке клика:", {
              error,
              message: error?.message,
              stack: error?.stack,
            });
          }
        };

        map.events.add("click", handleMapClick);

        // Закрываем balloon при клике на маркер, если он уже открыт
        const handleMarkerClick = () => {
          if (markerRef.current) {
            try {
              // Если balloon уже открыт, закрываем его при повторном клике
              const marker = markerRef.current;
              marker.events.add("click", () => {
                try {
                  if (map.balloon.isOpen()) {
                    map.balloon.close();
                  }
                } catch (error) {
                  console.warn(
                    "[Map] Ошибка при закрытии balloon маркера:",
                    error
                  );
                }
              });
            } catch (error) {
              console.warn(
                "[Map] Ошибка при добавлении обработчика маркера:",
                error
              );
            }
          }
        };

        mapInstanceRef.current = map;
        setMapReady(true);
        console.log("[Map] Карта успешно инициализирована");
      } catch (error) {
        console.error("[Map] Ошибка инициализации карты:", error);
      }
    };

    initMap();

    return () => {
      setMapReady(false);
      console.log("[Map] Cleanup - удаление карты");
      if (mapInstanceRef.current) {
        try {
          pvzMarkersRef.current.forEach((m) => {
            try {
              mapInstanceRef.current.geoObjects.remove(m);
            } catch {}
          });
          pvzMarkersRef.current = [];
          if (userMarkerRef.current) {
            try {
              mapInstanceRef.current.geoObjects.remove(userMarkerRef.current);
            } catch {}
            userMarkerRef.current = null;
          }
          mapInstanceRef.current.destroy();
        } catch (error) {
          console.error("[Map] Ошибка при удалении карты:", error);
        }
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isMounted, isYmapsLoaded]);

  const pvzLoadThrottleRef = useRef(0);
  const pvzBoundsDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastBoundsLoadRef = useRef<{ centerLat: number; centerLon: number; zoom: number; timestamp: number } | null>(null);
  type PvzCacheEntry = { points: CdekPvzPoint[] | YandexPvzPoint[]; cityName: string; timestamp: number };
  const pvzBoundsCacheRef = useRef<Record<string, PvzCacheEntry>>({});
  const pvzBoundsCacheOrderRef = useRef<string[]>([]);
  const pvzSearchThrottleRef = useRef(0);
  const pvzSearchDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const pvzSearchAbortRef = useRef<AbortController | null>(null);

  // Запрос ПВЗ по вводу: debounce/throttle НЕ копят запросы — каждый новый ввод отменяет предыдущий таймер и (при новом поиске) отменяет предыдущий fetch.
  const PVZ_SEARCH_THROTTLE_MS = 400;
  const PVZ_SEARCH_DEBOUNCE_MS = 500;
  useEffect(() => {
    if (!isYmapsLoaded || (!isCdekMode && !isYandexMode)) {
      return;
    }
    const query = (searchValue || "").trim().replace(/^г\.\s*/i, "").trim();
    if (query.length < 2) return;

    const ymaps = window.ymaps;
    if (!ymaps) return;

    pvzSearchAbortRef.current?.abort();
    const controller = new AbortController();
    pvzSearchAbortRef.current = controller;
    const signal = controller.signal;

    const now = Date.now();
    if (now - pvzSearchThrottleRef.current < PVZ_SEARCH_THROTTLE_MS) {
      if (pvzSearchDebounceRef.current) clearTimeout(pvzSearchDebounceRef.current);
      pvzSearchDebounceRef.current = setTimeout(() => {
        pvzSearchDebounceRef.current = null;
        runSearchByQuery(signal);
      }, PVZ_SEARCH_DEBOUNCE_MS);
      return;
    }
    pvzSearchThrottleRef.current = now;
    if (pvzSearchDebounceRef.current) clearTimeout(pvzSearchDebounceRef.current);
    pvzSearchDebounceRef.current = setTimeout(() => {
      pvzSearchDebounceRef.current = null;
      runSearchByQuery(signal);
    }, PVZ_SEARCH_DEBOUNCE_MS);

    async function runSearchByQuery(abortSignal: AbortSignal) {
      if (!ymaps) return;
      const mapInstance = mapInstanceRef.current;
      let centerLat = 55.7558;
      let centerLon = 37.6173;
      const geocodeQuery = query.replace(/^г\.\s*/i, "").trim() || query;
      let cityName = geocodeQuery;

      try {
        const res = await ymaps.geocode(geocodeQuery, { results: 1 });
        if (abortSignal.aborted) return;
        const first = res.geoObjects.get(0);
        if (first) {
          const coords = first.geometry.getCoordinates();
          centerLat = coords[0];
          centerLon = coords[1];
          if (mapInstance) mapInstance.setCenter(coords, 12);
          const meta =
            first.properties.get("metaDataProperty")
              ?.GeocoderMetaData?.Address?.Components || [];
          const locality = meta.find(
            (c: any) => c.kind === "locality" || c.kind === "area"
          );
          if (locality?.name) cityName = locality.name;
        }
      } catch {
        // ignore geocode
      }

      if (isCdekMode) {
        let pointsByCity: CdekPvzPoint[] = [];
        let pointsByCoords: CdekPvzPoint[] = [];
        try {
          pointsByCity = await getCdekPvzByCity(cityName, abortSignal);
        } catch {
          // ignore
        }
        if (abortSignal.aborted) return;
        try {
          pointsByCoords = await getCdekPvzByCoords(centerLat, centerLon, cityName, abortSignal);
        } catch {
          // ignore
        }
        if (abortSignal.aborted) return;
        const byCode: Record<string, CdekPvzPoint> = {};
        [...pointsByCoords, ...pointsByCity].forEach((p) => {
          if (p?.code) byCode[p.code] = p;
        });
        const points = Object.values(byCode);

        if (abortSignal.aborted) return;
        if (onPvzListLoaded) {
          onPvzListLoaded(
            points.map((p) => {
              const loc = p.location as { lat?: number; latitude?: number; lon?: number; longitude?: number };
              const lat = loc?.lat ?? loc?.latitude;
              const lon = loc?.lon ?? loc?.longitude;
              return {
                name: p.name,
                address: p.address,
                code: p.code,
                city: cityName,
                lat: typeof lat === "number" ? lat : undefined,
                lon: typeof lon === "number" ? lon : undefined,
              };
            })
          );
        }
        if (abortSignal.aborted) return;
        if (mapInstance) {
          pvzMarkersRef.current.forEach((m) => {
            try {
              mapInstance.geoObjects.remove(m);
            } catch {}
          });
          pvzMarkersRef.current = [];
          points.forEach((pvz) => {
            const loc = pvz.location as { lat?: number; latitude?: number; lon?: number; longitude?: number };
            const lat = loc?.lat ?? loc?.latitude;
            const lon = loc?.lon ?? loc?.longitude;
            if (typeof lat !== "number" || typeof lon !== "number") return;
            const marker = new ymaps.Placemark(
              [lat, lon],
              {
                balloonContentHeader: pvz.name,
                balloonContentBody: `<p>${pvz.address}</p><p>${pvz.work_time || ""}</p>`,
                balloonContentFooter: pvz.code,
              },
              { preset: CDEK_MARKER_PRESET }
            );
            marker.events.add("click", () => {
              if (onAddressSelect) {
                onAddressSelect({
                  fullAddress: pvz.address,
                  pvzAddress: pvz.address,
                  pvzCode: pvz.code,
                  city: cityName,
                  lat,
                  lon,
                });
              }
            });
            mapInstance.geoObjects.add(marker);
            pvzMarkersRef.current.push(marker);
          });
        }
      } else if (isYandexMode) {
        let pointsByCity: YandexPvzPoint[] = [];
        let pointsByCoords: YandexPvzPoint[] = [];
        try {
          pointsByCity = await getYandexPvzByCity(cityName, abortSignal);
        } catch {
          // ignore
        }
        if (abortSignal.aborted) return;
        try {
          pointsByCoords = await getYandexPvzByCoords(centerLat, centerLon, cityName, abortSignal);
        } catch {
          // ignore
        }
        if (abortSignal.aborted) return;
        const byId: Record<string, YandexPvzPoint> = {};
        [...pointsByCoords, ...pointsByCity].forEach((p) => {
          if (p?.id) byId[p.id] = p;
        });
        const points = Object.values(byId);

        if (abortSignal.aborted) return;
        if (onPvzListLoaded) {
          onPvzListLoaded(
            points.map((p) => {
              const loc = p.location as { lat?: number; latitude?: number; lon?: number; longitude?: number };
              const lat = loc?.lat ?? loc?.latitude;
              const lon = loc?.lon ?? loc?.longitude;
              return {
                name: p.name,
                address: p.address,
                id: p.id,
                city: cityName,
                lat: typeof lat === "number" ? lat : undefined,
                lon: typeof lon === "number" ? lon : undefined,
              };
            })
          );
        }
        if (abortSignal.aborted) return;
        if (mapInstance) {
          pvzMarkersRef.current.forEach((m) => {
            try {
              mapInstance.geoObjects.remove(m);
            } catch {}
          });
          pvzMarkersRef.current = [];
          points.forEach((pvz) => {
            const loc = pvz.location as { lat?: number; latitude?: number; lon?: number; longitude?: number };
            const lat = loc?.lat ?? loc?.latitude;
            const lon = loc?.lon ?? loc?.longitude;
            if (typeof lat !== "number" || typeof lon !== "number") return;
            const marker = new ymaps.Placemark(
              [lat, lon],
              {
                balloonContentHeader: pvz.name,
                balloonContentBody: `<p>${pvz.address}</p><p>${pvz.work_time || ""}</p>`,
                balloonContentFooter: pvz.id,
              },
              { preset: YANDEX_MARKER_PRESET }
            );
            marker.events.add("click", () => {
              if (onAddressSelect) {
                onAddressSelect({
                  fullAddress: pvz.address,
                  pvzAddress: pvz.address,
                  pvzId: pvz.id,
                  city: cityName,
                  lat,
                  lon,
                });
              }
            });
            mapInstance.geoObjects.add(marker);
            pvzMarkersRef.current.push(marker);
          });
        }
      }
    }

    return () => {
      pvzSearchAbortRef.current?.abort();
      pvzSearchAbortRef.current = null;
      if (pvzSearchDebounceRef.current) {
        clearTimeout(pvzSearchDebounceRef.current);
        pvzSearchDebounceRef.current = null;
      }
    };
  }, [isYmapsLoaded, isCdekMode, isYandexMode, searchValue]);

  // Загрузка и отображение ПВЗ СДЭК или Яндекса с оптимизацией (throttle/debounce, только метки в видимой области)
  useEffect(() => {
    const isPickupMode = isCdekMode || isYandexMode;
    if (!mapReady || !isYmapsLoaded || !mapInstanceRef.current || !isPickupMode) {
      if (mapInstanceRef.current && !isPickupMode) {
        pvzMarkersRef.current.forEach((m) => {
          try {
            mapInstanceRef.current.geoObjects.remove(m);
          } catch {}
        });
        pvzMarkersRef.current = [];
        if (userMarkerRef.current) {
          try {
            mapInstanceRef.current.geoObjects.remove(userMarkerRef.current);
          } catch {}
          userMarkerRef.current = null;
        }
      }
      return;
    }

    const map = mapInstanceRef.current;
    const ymaps = window.ymaps;
    if (!ymaps) return;

    const removePvzMarkers = () => {
      pvzMarkersRef.current.forEach((m) => {
        try {
          map.geoObjects.remove(m);
        } catch {}
      });
      pvzMarkersRef.current = [];
      if (userMarkerRef.current) {
        try {
          map.geoObjects.remove(userMarkerRef.current);
        } catch {}
        userMarkerRef.current = null;
      }
    };

    let cancelled = false;
    const THROTTLE_MS = 600;
    const BOUNDS_DEBOUNCE_MS = 500;
    const BOUNDS_MIN_MOVE_DEG = 0.02;
    const ZOOM_SKIP_THRESHOLD = 1;
    const CACHE_TTL_MS = 5 * 60 * 1000;
    const CACHE_GRID_PRECISION = 50;

    const getCityFromCoords = async (
      lat: number,
      lon: number
    ): Promise<string> => {
      try {
        const res = await ymaps.geocode([lat, lon], { results: 1 });
        const first = res.geoObjects.get(0);
        if (!first) return "Москва";
        const meta =
          first.properties.get("metaDataProperty")
            ?.GeocoderMetaData?.Address?.Components || [];
        const locality = meta.find(
          (c: any) => c.kind === "locality" || c.kind === "area"
        );
        return locality?.name || "Москва";
      } catch {
        return "Москва";
      }
    };

    const loadPvzForVisibleBounds = async () => {
      if (cancelled || !mapInstanceRef.current) return;
      const mapInstance = mapInstanceRef.current;
      let bounds: MapBounds;
      let currentZoom = 12;
      try {
        bounds = mapInstance.getBounds();
        if (typeof mapInstance.getZoom === "function") currentZoom = mapInstance.getZoom();
      } catch {
        return;
      }
      const [[south, west], [north, east]] = bounds;
      const centerLat = (south + north) / 2;
      const centerLon = (west + east) / 2;

      const last = lastBoundsLoadRef.current;
      if (last) {
        const distLat = Math.abs(centerLat - last.centerLat);
        const distLon = Math.abs(centerLon - last.centerLon);
        const zoomDiff = Math.abs(currentZoom - last.zoom);
        if (distLat < BOUNDS_MIN_MOVE_DEG && distLon < BOUNDS_MIN_MOVE_DEG && zoomDiff <= ZOOM_SKIP_THRESHOLD) {
          return;
        }
      }

      const cityName = await getCityFromCoords(centerLat, centerLon);
      if (cancelled || !mapInstanceRef.current) return;

      const cacheKey = `${isCdekMode ? "cdek" : "yandex"}_${cityName}_${Math.round(centerLat * CACHE_GRID_PRECISION)}_${Math.round(centerLon * CACHE_GRID_PRECISION)}`;
      const now = Date.now();
      const cached = pvzBoundsCacheRef.current[cacheKey];
      if (cached && now - cached.timestamp < CACHE_TTL_MS) {
        if (cancelled || !mapInstanceRef.current) return;
        const points = cached.points;
        const pointsToShow = isCdekMode
          ? filterPvzByBounds(points as CdekPvzPoint[], bounds)
          : filterYandexPvzByBounds(points as YandexPvzPoint[], bounds);
        const pts = pointsToShow.length > 0 ? pointsToShow : (isCdekMode ? sortPvzByDistance(points as CdekPvzPoint[], centerLat, centerLon) : sortYandexPvzByDistance(points as YandexPvzPoint[], centerLat, centerLon)).slice(0, 30);
        pvzMarkersRef.current.forEach((m) => {
          try {
            mapInstance.geoObjects.remove(m);
          } catch {}
        });
        pvzMarkersRef.current = [];
        (pts as (CdekPvzPoint | YandexPvzPoint)[]).forEach((pvz) => {
          const loc = (pvz as any).location;
          const lat = loc?.lat ?? loc?.latitude;
          const lon = loc?.lon ?? loc?.longitude;
          if (typeof lat !== "number" || typeof lon !== "number") return;
          const marker = new ymaps.Placemark(
            [lat, lon],
            {
              balloonContentHeader: (pvz as any).name,
              balloonContentBody: `<p>${(pvz as any).address}</p><p>${(pvz as any).work_time || ""}</p>`,
              balloonContentFooter: (pvz as any).code ?? (pvz as any).id,
            },
            { preset: isCdekMode ? CDEK_MARKER_PRESET : YANDEX_MARKER_PRESET }
          );
          marker.events.add("click", () => {
            if (onAddressSelect) {
              onAddressSelect({
                fullAddress: (pvz as any).address,
                pvzAddress: (pvz as any).address,
                pvzCode: (pvz as any).code,
                pvzId: (pvz as any).id,
                city: cached.cityName,
                lat,
                lon,
              });
            }
          });
          mapInstance.geoObjects.add(marker);
          pvzMarkersRef.current.push(marker);
        });
        lastBoundsLoadRef.current = { centerLat, centerLon, zoom: currentZoom, timestamp: now };
        return;
      }

      if (isCdekMode) {
        let pointsByCoords: CdekPvzPoint[] = [];
        try {
          pointsByCoords = await getCdekPvzByCoords(centerLat, centerLon, cityName);
        } catch {
          // ignore
        }
        let pointsByCity: CdekPvzPoint[] = [];
        try {
          pointsByCity = await getCdekPvzByCity(cityName);
          if (pointsByCity.length === 0) {
            pointsByCity = sortPvzByDistance(
              getFallbackPvzForCity(cityName).length > 0
                ? getFallbackPvzForCity(cityName)
                : getFallbackPvzByCoords(centerLat, centerLon),
              centerLat,
              centerLon
            );
          }
        } catch (err) {
          console.warn("[Map] СДЭК ПВЗ:", err);
        }
        const byCode: Record<string, CdekPvzPoint> = {};
        [...pointsByCoords, ...pointsByCity].forEach((p) => {
          if (p?.code) byCode[p.code] = p;
        });
        const points: CdekPvzPoint[] = Object.values(byCode);
        const cache = pvzBoundsCacheRef.current;
        const order = pvzBoundsCacheOrderRef.current;
        if (Object.keys(cache).length > 50 && order.length > 0) {
          const oldestKey = order.shift();
          if (oldestKey) delete cache[oldestKey];
        }
        cache[cacheKey] = { points, cityName, timestamp: Date.now() };
        const idx = order.indexOf(cacheKey);
        if (idx >= 0) order.splice(idx, 1);
        order.push(cacheKey);
        let pointsToShow = filterPvzByBounds(points, bounds);
        if (pointsToShow.length === 0 && points.length > 0) {
          pointsToShow = sortPvzByDistance(points, centerLat, centerLon).slice(0, 30);
        }

        pvzMarkersRef.current.forEach((m) => {
          try {
            mapInstance.geoObjects.remove(m);
          } catch {}
        });
        pvzMarkersRef.current = [];

        pointsToShow.forEach((pvz) => {
          const loc = pvz.location as { lat?: number; latitude?: number; lon?: number; longitude?: number };
          const lat = loc?.lat ?? loc?.latitude;
          const lon = loc?.lon ?? loc?.longitude;
          if (typeof lat !== "number" || typeof lon !== "number") return;
          const coords: [number, number] = [lat, lon];
          const marker = new ymaps.Placemark(
            coords,
            {
              balloonContentHeader: pvz.name,
              balloonContentBody: `<p>${pvz.address}</p><p>${pvz.work_time || ""}</p>`,
              balloonContentFooter: pvz.code,
            },
            { preset: CDEK_MARKER_PRESET }
          );
          marker.events.add("click", () => {
            if (onAddressSelect) {
              onAddressSelect({
                fullAddress: pvz.address,
                pvzAddress: pvz.address,
                pvzCode: pvz.code,
                city: cityName,
                lat,
                lon,
              });
            }
          });
          mapInstance.geoObjects.add(marker);
          pvzMarkersRef.current.push(marker);
        });
        lastBoundsLoadRef.current = { centerLat, centerLon, zoom: currentZoom, timestamp: Date.now() };
      } else if (isYandexMode) {
        let pointsByCoords: YandexPvzPoint[] = [];
        try {
          pointsByCoords = await getYandexPvzByCoords(centerLat, centerLon, cityName);
        } catch {
          // ignore
        }
        let pointsByCity: YandexPvzPoint[] = [];
        try {
          pointsByCity = await getYandexPvzByCity(cityName);
          if (pointsByCity.length === 0) {
            pointsByCity = sortYandexPvzByDistance(
              getFallbackYandexPvzForCity(cityName).length > 0
                ? getFallbackYandexPvzForCity(cityName)
                : getFallbackYandexPvzByCoords(centerLat, centerLon),
              centerLat,
              centerLon
            );
          }
        } catch (err) {
          console.warn("[Map] Яндекс ПВЗ:", err);
        }
        const byId: Record<string, YandexPvzPoint> = {};
        [...pointsByCoords, ...pointsByCity].forEach((p) => {
          if (p?.id) byId[p.id] = p;
        });
        const points: YandexPvzPoint[] = Object.values(byId);
        const cacheY = pvzBoundsCacheRef.current;
        const orderY = pvzBoundsCacheOrderRef.current;
        if (Object.keys(cacheY).length > 50 && orderY.length > 0) {
          const oldestKey = orderY.shift();
          if (oldestKey) delete cacheY[oldestKey];
        }
        cacheY[cacheKey] = { points, cityName, timestamp: Date.now() };
        const idxY = orderY.indexOf(cacheKey);
        if (idxY >= 0) orderY.splice(idxY, 1);
        orderY.push(cacheKey);
        let pointsToShow = filterYandexPvzByBounds(points, bounds);
        if (pointsToShow.length === 0 && points.length > 0) {
          pointsToShow = sortYandexPvzByDistance(points, centerLat, centerLon).slice(0, 30);
        }

        pvzMarkersRef.current.forEach((m) => {
          try {
            mapInstance.geoObjects.remove(m);
          } catch {}
        });
        pvzMarkersRef.current = [];

        pointsToShow.forEach((pvz) => {
          const loc = pvz.location as { lat?: number; latitude?: number; lon?: number; longitude?: number };
          const lat = loc?.lat ?? loc?.latitude;
          const lon = loc?.lon ?? loc?.longitude;
          if (typeof lat !== "number" || typeof lon !== "number") return;
          const coords: [number, number] = [lat, lon];
          const marker = new ymaps.Placemark(
            coords,
            {
              balloonContentHeader: pvz.name,
              balloonContentBody: `<p>${pvz.address}</p><p>${pvz.work_time || ""}</p>`,
              balloonContentFooter: pvz.id,
            },
            { preset: YANDEX_MARKER_PRESET }
          );
          marker.events.add("click", () => {
            if (onAddressSelect) {
              onAddressSelect({
                fullAddress: pvz.address,
                pvzAddress: pvz.address,
                pvzId: pvz.id,
                city: cityName,
                lat,
                lon,
              });
            }
          });
          mapInstance.geoObjects.add(marker);
          pvzMarkersRef.current.push(marker);
        });
        lastBoundsLoadRef.current = { centerLat, centerLon, zoom: currentZoom, timestamp: Date.now() };
      }
    };

    const scheduleLoadPvz = () => {
      if (cancelled) return;
      const now = Date.now();
      if (now - pvzLoadThrottleRef.current < THROTTLE_MS) return;
      pvzLoadThrottleRef.current = now;
      loadPvzForVisibleBounds();
    };

    const scheduleLoadPvzDebounced = () => {
      if (!isPickupMode || cancelled) return;
      if (pvzBoundsDebounceRef.current) clearTimeout(pvzBoundsDebounceRef.current);
      pvzBoundsDebounceRef.current = setTimeout(() => {
        pvzBoundsDebounceRef.current = null;
        scheduleLoadPvz();
      }, BOUNDS_DEBOUNCE_MS);
    };

    const onActionEnd = () => {
      if (!isPickupMode || cancelled) return;
      scheduleLoadPvzDebounced();
    };

    const defaultCenterLat = 55.7558;
    const defaultCenterLon = 37.6173;

    const initPickupAndSubscribe = async () => {
      if (cancelled || !mapInstanceRef.current) return;

      if (markerRef.current) {
        try {
          map.geoObjects.remove(markerRef.current);
        } catch {}
        markerRef.current = null;
      }

      let userLat = defaultCenterLat;
      let userLon = defaultCenterLon;
      if (navigator.geolocation) {
        const pos = await new Promise<GeolocationPosition | null>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (p) => resolve(p),
            () => resolve(null),
            { timeout: 8000, maximumAge: 300000 }
          );
        });
        if (pos && !cancelled) {
          userLat = pos.coords.latitude;
          userLon = pos.coords.longitude;
        }
      }

      if (cancelled || !mapInstanceRef.current) return;

      const userMarker = new ymaps.Placemark(
        [userLat, userLon],
        { balloonContent: "Вы здесь" },
        { preset: "islands#blueCircleIcon", iconColor: "#0a5840" }
      );
      map.geoObjects.add(userMarker);
      userMarkerRef.current = userMarker;

      const hasSearchQuery = (searchValue || "").trim().length >= 2;
      if (selectedPvzCoords && selectedPvzCoords.length === 2) {
        map.setCenter(selectedPvzCoords, 12);
      } else if (!hasSearchQuery) {
        map.setCenter([defaultCenterLat, defaultCenterLon], 12);
      }
      map.events.add("actionend", onActionEnd);
      await loadPvzForVisibleBounds();
    };

    initPickupAndSubscribe();

    return () => {
      cancelled = true;
      if (pvzBoundsDebounceRef.current) {
        clearTimeout(pvzBoundsDebounceRef.current);
        pvzBoundsDebounceRef.current = null;
      }
      map.events.remove("actionend", onActionEnd);
      removePvzMarkers();
    };
  }, [mapReady, isYmapsLoaded, isCdekMode, isYandexMode, onAddressSelect]);

  // Фокус на выбранном ПВЗ при выборе из списка (без перезагрузки карты)
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !selectedPvzCoords || selectedPvzCoords.length !== 2) return;
    mapInstanceRef.current.setCenter(selectedPvzCoords, 12);
  }, [mapReady, selectedPvzCoords]);

  // Геокодирование адреса из searchValue с debounce (в режиме СДЭК не подменяем карту)
  useEffect(() => {
    if (!isMounted || !isYmapsLoaded || !mapInstanceRef.current) {
      console.log("[Map] Геокодирование пропущено - карта не готова");
      return;
    }
    if (
      (deliveryType === "cdek" || deliveryType === "yandex") &&
      deliveryMethod === "pickup"
    ) {
      return;
    }
    if (!searchValue || searchValue.trim().length < 3) {
      console.log(
        "[Map] Геокодирование пропущено - searchValue слишком короткий:",
        searchValue
      );
      return;
    }

    console.log("[Map] Планируем геокодирование для:", searchValue);
    // Очищаем предыдущий таймер
    if (geocodeDebounceTimerRef.current) {
      clearTimeout(geocodeDebounceTimerRef.current);
    }

    geocodeDebounceTimerRef.current = setTimeout(() => {
      if (isGeocodingRef.current) {
        console.log("[Map] Геокодирование уже выполняется, пропускаем");
        return;
      }
      isGeocodingRef.current = true;
      console.log("[Map] Начинаем геокодирование:", searchValue);
      const geocodeAddress = async () => {
        try {
          const { ymaps } = window;
          const geocoder = ymaps.geocode(searchValue, { results: 1 });

          geocoder
            .then((res: any) => {
              isGeocodingRef.current = false;
              const firstGeoObject = res.geoObjects.get(0);
              if (firstGeoObject && mapInstanceRef.current) {
                const coords = firstGeoObject.geometry.getCoordinates();
                const addressComponents =
                  firstGeoObject.properties.get("metaDataProperty")
                    ?.GeocoderMetaData?.Address?.Components || [];

                let addressCity = "";
                let addressStreet = "";
                let addressHouse = "";

                addressComponents.forEach((component: any) => {
                  if (
                    component.kind === "locality" ||
                    component.kind === "area"
                  ) {
                    addressCity = component.name;
                  } else if (component.kind === "street") {
                    addressStreet = component.name;
                  } else if (component.kind === "house") {
                    addressHouse = component.name;
                  }
                });

                const fullAddress = firstGeoObject.getAddressLine();

                // Обновляем маркер
                if (markerRef.current) {
                  mapInstanceRef.current.geoObjects.remove(markerRef.current);
                }

                const marker = new ymaps.Placemark(
                  coords,
                  {
                    balloonContent: fullAddress,
                  },
                  {
                    preset: "islands#darkBlueDotIcon",
                    draggable: true,
                  }
                );

                // Обработчик перетаскивания
                marker.events.add("dragend", async () => {
                  const markerCoords = marker.geometry.getCoordinates();
                  const reverseGeocoder = ymaps.geocode(markerCoords, {
                    results: 1,
                  });
                  reverseGeocoder.then((reverseRes: any) => {
                    const reverseGeoObject = reverseRes.geoObjects.get(0);
                    if (reverseGeoObject && onAddressSelect) {
                      const reverseComponents =
                        reverseGeoObject.properties.get("metaDataProperty")
                          .GeocoderMetaData.Address.Components;

                      let reverseCity = "";
                      let reverseStreet = "";
                      let reverseHouse = "";

                      reverseComponents.forEach((component: any) => {
                        if (
                          component.kind === "locality" ||
                          component.kind === "area"
                        ) {
                          reverseCity = component.name;
                        } else if (component.kind === "street") {
                          reverseStreet = component.name;
                        } else if (component.kind === "house") {
                          reverseHouse = component.name;
                        }
                      });

                      onAddressSelect({
                        city: reverseCity,
                        street: reverseStreet,
                        house: reverseHouse,
                        fullAddress: reverseGeoObject.getAddressLine(),
                        pvzAddress: deliveryMethod === "pickup" ? reverseGeoObject.getAddressLine() : undefined,
                      });
                    }
                  });
                });

                marker.events.add("click", () => {
                  try {
                    setTimeout(() => {
                      if (
                        mapInstanceRef.current &&
                        mapInstanceRef.current.balloon &&
                        mapInstanceRef.current.balloon.isOpen &&
                        mapInstanceRef.current.balloon.isOpen()
                      ) {
                        mapInstanceRef.current.balloon.close();
                      }
                    }, 100);
                  } catch (error) {
                    console.warn(
                      "[Map] Ошибка при закрытии balloon маркера:",
                      error
                    );
                  }
                });

                markerRef.current = marker;
                mapInstanceRef.current.geoObjects.add(marker);
                mapInstanceRef.current.setCenter(coords, 15);

                // НЕ вызываем onAddressSelect при геокодировании из поиска
                // Это предотвращает бесконечный цикл обновлений
                // onAddressSelect вызывается только при клике на карту или выборе из подсказок
                console.log(
                  "[Map] Геокодирование завершено, маркер установлен, onAddressSelect НЕ вызываем"
                );
                console.log("[Map] Найденный адрес:", fullAddress);
              } else {
                isGeocodingRef.current = false;
              }
            })
            .catch((error: any) => {
              isGeocodingRef.current = false;
              console.error("Ошибка геокодирования:", error);
            });
        } catch (error) {
          isGeocodingRef.current = false;
          console.error("Ошибка геокодирования:", error);
        }
      };

      geocodeAddress();
    }, 800); // 800ms debounce

    return () => {
      if (geocodeDebounceTimerRef.current) {
        clearTimeout(geocodeDebounceTimerRef.current);
      }
    };
  }, [isMounted, isYmapsLoaded, searchValue, deliveryType, deliveryMethod]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Скрытие лишних элементов интерфейса Яндекс.Карт
  useEffect(() => {
    if (!isYmapsLoaded || !mapInstanceRef.current) {
      return;
    }

    // Добавляем стили для скрытия лишних элементов
    const styleId = "yandex-maps-hide-elements";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        /* Скрываем плашки "как добраться", "доехать на такси", "создать свою карту" */
        .ymaps-2-1-79-balloon__route,
        .ymaps-2-1-79-balloon__taxi,
        .ymaps-2-1-79-balloon__create-map,
        .ymaps-2-1-79-balloon__route-link,
        .ymaps-2-1-79-balloon__taxi-link,
        .ymaps-2-1-79-balloon__create-map-link,
        [class*="balloon__route"],
        [class*="balloon__taxi"],
        [class*="balloon__create-map"],
        [class*="balloon__route-link"],
        [class*="balloon__taxi-link"],
        [class*="balloon__create-map-link"] {
          display: none !important;
        }
        
        /* Скрываем "условия использования" и другие ссылки в нижней части карты */
        .ymaps-2-1-79-copyrights-promo,
        .ymaps-2-1-79-copyrights,
        .ymaps-2-1-79-copyrights__content,
        .ymaps-2-1-79-copyrights__link,
        .ymaps-2-1-79-copyrights__wrap,
        [class*="copyrights-promo"],
        [class*="copyrights"],
        [class*="copyrights__content"],
        [class*="copyrights__link"],
        [class*="copyrights__wrap"],
        a[href*="yandex.ru/maps"],
        a[href*="yandex.com/maps"],
        /* Скрываем "Создать свою карту" */
        [class*="create-map"],
        [class*="create-map-link"],
        /* Скрываем "Открыть в Яндекс.Картах" */
        [class*="open-in-maps"],
        [class*="open-in-yandex"],
        /* Скрываем только copyrights и ссылки внизу карты; НЕ трогаем слой маркеров (placemark/overlay) */
        .ymaps-2-1-79-map a[href*="yandex.ru/maps"],
        .ymaps-2-1-79-map a[href*="yandex.com/maps"],
        div[class*="ymaps"][class*="copyrights"] a,
        div[class*="ymaps"][class*="copyrights"] button,
        div[class*="ymaps"][class*="copyrights"] {
          display: none !important;
        }
        
        /* Скрываем другие лишние элементы */
        .ymaps-2-1-79-balloon__footer,
        .ymaps-2-1-79-balloon__actions,
        [class*="balloon__footer"],
        [class*="balloon__actions"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Дополнительно скрываем элементы по тексту через JavaScript
    const hideElementsByText = () => {
      if (!mapRef.current) return;

      const mapElement = mapRef.current;
      const allElements = mapElement.querySelectorAll("a, button, span, div");

      allElements.forEach((element) => {
        const text = element.textContent || "";
        if (
          text.includes("Создать свою карту") ||
          text.includes("Условия использования") ||
          text.includes("Открыть в Яндекс.Картах")
        ) {
          (element as HTMLElement).style.display = "none";
          (element as HTMLElement).style.visibility = "hidden";
          (element as HTMLElement).style.opacity = "0";
          (element as HTMLElement).style.height = "0";
          (element as HTMLElement).style.width = "0";
          (element as HTMLElement).style.overflow = "hidden";
        }
      });
    };

    // Вызываем сразу и через интервалы для надежности
    if (mapInstanceRef.current && mapRef.current) {
      hideElementsByText();

      // Используем MutationObserver для отслеживания динамически добавляемых элементов
      const observer = new MutationObserver(() => {
        hideElementsByText();
      });

      observer.observe(mapRef.current, {
        childList: true,
        subtree: true,
        attributes: false,
      });

      const interval = setInterval(() => {
        hideElementsByText();
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        observer.disconnect();
      }, 10000);

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    }

    return () => {
      // Не удаляем стили при размонтировании, так как они могут использоваться другими компонентами
    };
  }, [isYmapsLoaded]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "400px", borderRadius: "3px" }}
      />
    </div>
  );
};

export default Map;

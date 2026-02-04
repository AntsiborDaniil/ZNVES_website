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

/** Метка-пин зелёная, внутри — изображение СДЭК из /images/cdek.svg */
const CDEK_MARKER_ICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="60" viewBox="0 0 48 60">' +
      '<path d="M24 0C10.7 0 0 10.7 0 24c0 14 24 36 24 36s24-22 24-36C48 10.7 37.3 0 24 0z" fill="#19B248" stroke="#fff" stroke-width="2"/>' +
      '<circle cx="24" cy="22" r="12" fill="#fff"/>' +
      '<image xlink:href="/images/cdek.svg" x="11" y="9" width="26" height="26" preserveAspectRatio="xMidYMid meet"/>' +
      "</svg>"
  );
const CDEK_MARKER_SIZE: [number, number] = [48, 60];

/** Метка-пин для ПВЗ Яндекса (красный пин, внутри /images/yandex.svg) */
const YANDEX_MARKER_ICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="60" viewBox="0 0 48 60">' +
      '<path d="M24 0C10.7 0 0 10.7 0 24c0 14 24 36 24 36s24-22 24-36C48 10.7 37.3 0 24 0z" fill="#FC3F1D" stroke="#fff" stroke-width="2"/>' +
      '<circle cx="24" cy="22" r="12" fill="#fff"/>' +
      '<image xlink:href="/images/yandex.svg" x="11" y="9" width="26" height="26" preserveAspectRatio="xMidYMid meet"/>' +
      "</svg>"
  );
const YANDEX_MARKER_SIZE: [number, number] = [48, 60];

type AddressData = {
  city?: string;
  street?: string;
  house?: string;
  fullAddress?: string;
  pvzAddress?: string;
  pvzCode?: string;
  pvzId?: string;
};

type MapProps = {
  address?: string;
  city?: string;
  street?: string;
  house?: string;
  onAddressSelect?: (address: AddressData) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  deliveryMethod?: string;
  deliveryType?: string;
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
  searchValue,
  onSearchChange,
  deliveryMethod,
  deliveryType,
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
  useEffect(() => {
    deliveryTypeRef.current = deliveryType;
    deliveryMethodRef.current = deliveryMethod;
  }, [deliveryType, deliveryMethod]);

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
    const THROTTLE_MS = 400;

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
      try {
        bounds = mapInstance.getBounds();
      } catch {
        return;
      }
      const [[south, west], [north, east]] = bounds;
      const centerLat = (south + north) / 2;
      const centerLon = (west + east) / 2;

      const cityName = await getCityFromCoords(centerLat, centerLon);
      if (cancelled || !mapInstanceRef.current) return;

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
            {
              iconLayout: "default#image",
              iconImageHref: CDEK_MARKER_ICON,
              iconImageSize: CDEK_MARKER_SIZE,
              iconImageOffset: [-CDEK_MARKER_SIZE[0] / 2, -CDEK_MARKER_SIZE[1]],
            }
          );
          marker.events.add("click", () => {
            if (onAddressSelect) {
              onAddressSelect({
                fullAddress: pvz.address,
                pvzAddress: pvz.address,
                pvzCode: pvz.code,
                city: cityName,
              });
            }
          });
          mapInstance.geoObjects.add(marker);
          pvzMarkersRef.current.push(marker);
        });
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
            {
              iconLayout: "default#image",
              iconImageHref: YANDEX_MARKER_ICON,
              iconImageSize: YANDEX_MARKER_SIZE,
              iconImageOffset: [-YANDEX_MARKER_SIZE[0] / 2, -YANDEX_MARKER_SIZE[1]],
            }
          );
          marker.events.add("click", () => {
            if (onAddressSelect) {
              onAddressSelect({
                fullAddress: pvz.address,
                pvzAddress: pvz.address,
                pvzId: pvz.id,
                city: cityName,
              });
            }
          });
          mapInstance.geoObjects.add(marker);
          pvzMarkersRef.current.push(marker);
        });
      }
    };

    const scheduleLoadPvz = () => {
      if (cancelled) return;
      const now = Date.now();
      if (now - pvzLoadThrottleRef.current < THROTTLE_MS) return;
      pvzLoadThrottleRef.current = now;
      loadPvzForVisibleBounds();
    };

    const onBoundsChange = () => {
      if (!isPickupMode || cancelled) return;
      scheduleLoadPvz();
    };

    const onActionEnd = () => {
      if (!isPickupMode || cancelled) return;
      scheduleLoadPvz();
    };

    let userLat = 55.7558;
    let userLon = 37.6173;

    const initPickupAndSubscribe = async () => {
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

      if (markerRef.current) {
        try {
          map.geoObjects.remove(markerRef.current);
        } catch {}
        markerRef.current = null;
      }

      const userMarker = new ymaps.Placemark(
        [userLat, userLon],
        { balloonContent: "Вы здесь" },
        { preset: "islands#blueCircleIcon", iconColor: "#0a5840" }
      );
      map.geoObjects.add(userMarker);
      userMarkerRef.current = userMarker;

      map.setCenter([userLat, userLon], 12);
      map.events.add("boundschange", onBoundsChange);
      map.events.add("actionend", onActionEnd);
      await loadPvzForVisibleBounds();
    };

    initPickupAndSubscribe();

    return () => {
      cancelled = true;
      map.events.remove("boundschange", onBoundsChange);
      map.events.remove("actionend", onActionEnd);
      removePvzMarkers();
    };
  }, [mapReady, isYmapsLoaded, isCdekMode, isYandexMode, onAddressSelect]);

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

                // Закрываем balloon при клике на маркер, если он уже открыт
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

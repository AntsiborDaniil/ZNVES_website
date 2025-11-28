"use client";

import { useEffect, useRef, useState } from "react";

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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
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
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isYmapsLoaded, setIsYmapsLoaded] = useState(false);
  const geocodeDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isGeocodingRef = useRef(false);

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

        // Обработчик клика на карту
        // Добавляем только после полной загрузки карты
        const handleMapClick = (e: any) => {
          try {
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

        mapInstanceRef.current = map;
        console.log("[Map] Карта успешно инициализирована");
      } catch (error) {
        console.error("[Map] Ошибка инициализации карты:", error);
      }
    };

    initMap();

    return () => {
      console.log("[Map] Cleanup - удаление карты");
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (error) {
          console.error("[Map] Ошибка при удалении карты:", error);
        }
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isMounted, isYmapsLoaded]); // Убрали onAddressSelect из зависимостей

  // Геокодирование адреса из searchValue с debounce
  useEffect(() => {
    if (!isMounted || !isYmapsLoaded || !mapInstanceRef.current) {
      console.log("[Map] Геокодирование пропущено - карта не готова");
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
                      });
                    }
                  });
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
  }, [isMounted, isYmapsLoaded, searchValue]); // Убрали onAddressSelect из зависимостей

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
        /* Скрываем все ссылки в нижней части карты */
        .ymaps-2-1-79-ground-pane ~ div a,
        .ymaps-2-1-79-map a[href*="maps"],
        /* Более агрессивное скрытие всех ссылок внизу карты */
        div[class*="ymaps"] > div[class*="copyrights"] a,
        div[class*="ymaps"] > div[class*="copyrights"],
        /* Скрываем все элементы в нижней панели карты */
        .ymaps-2-1-79-map > div:last-child a,
        .ymaps-2-1-79-map > div:last-child button,
        /* Скрываем все ссылки и кнопки в нижней части */
        [class*="ymaps-2-1-79"] a[href],
        [class*="ymaps-2-1-79"] button {
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

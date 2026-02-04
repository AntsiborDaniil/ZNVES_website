"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../data/products";
import { createOrder, getPaymentUrl, getYandexPaymentUrl, type OrderRequest } from "../../api/order/orderApi";
import { fetchCatalogProductRaw, type ApiProductDetail } from "../../api/product/productApi";
import Map, { type PvzListOption } from "../Map/Map";
import { getAddressSuggestions, type AddressSuggestion } from "../../api/delivery/addressSuggestApi";
import styles from "../../app/checkout/page.module.css";

interface CheckoutFormProps {
  onOrderSubmit?: (orderNumber: string) => void;
  showRightColumn?: boolean;
  className?: string;
}

const ORDER_ERROR_STORAGE_KEY = "znves:orderError";

/** Фильтрация ПВЗ: сначала по городу, затем по адресу, затем по деталям (название) */
function filterPvzByCityAddressDetails(
  options: PvzListOption[],
  query: string
): PvzListOption[] {
  const q = (query || "")
    .trim()
    .replace(/^г\.\s*/i, "")
    .trim()
    .toLowerCase();
  if (!q) return options;
  const tokens = q
    .split(/[\s,]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return options;

  return options.filter((opt) => {
    const city = (opt.city ?? "").toLowerCase();
    const address = (opt.address ?? "").toLowerCase();
    const name = (opt.name ?? "").toLowerCase();
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (i === 0) {
        if (!city.includes(token) && !address.includes(token) && !name.includes(token))
          return false;
      } else {
        if (!address.includes(token) && !name.includes(token)) return false;
      }
    }
    return true;
  });
}

const CheckoutForm = ({
  onOrderSubmit,
  showRightColumn = true,
  className = "",
}: CheckoutFormProps) => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { redirectToBot } = useAuth();

  const redirectToCartWithError = (message: string) => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(ORDER_ERROR_STORAGE_KEY, message);
      } catch {}
    }
    router.push("/cart");
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    deliveryFirstName: "",
    deliveryLastName: "",
    deliveryPhone: "",
    deliveryEmail: "",
    city: "",
    street: "",
    house: "",
    apartment: "",
    floor: "",
    entrance: "",
    intercom: "",
    pickupCity: "",
    postalCode: "",
    pvzAddress: "",
    deliveryType: "cdek",
    deliveryMethod: "pickup",
    paymentMethod: "sberbank",
    agreeToOffer: false,
    agreeToPrivacy: false,
    differentRecipient: false,
  });
  const [mapSearchValue, setMapSearchValue] = useState("");
  const [pvzAddressInputValue, setPvzAddressInputValue] = useState("");
  const pvzAddressDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const pvzAddressThrottleRef = useRef(0);
  const pvzAddressLatestRef = useRef("");
  const [pvzOptions, setPvzOptions] = useState<PvzListOption[]>([]);
  const filteredPvzOptions = useMemo(
    () => filterPvzByCityAddressDetails(pvzOptions, pvzAddressInputValue),
    [pvzOptions, pvzAddressInputValue]
  );
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [selectedPvzCoords, setSelectedPvzCoords] = useState<[number, number] | null>(null);
  const addressSuggestTimerRef = useRef<NodeJS.Timeout | null>(null);
  const addressSuggestThrottleRef = useRef(0);
  const isUpdatingFromMapRef = useRef(false);
  const lastGeocodedAddressRef = useRef<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pvzCode, setPvzCode] = useState<string>(""); // Для CDEK
  const [pvzId, setPvzId] = useState<string>(""); // Для Яндекс
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  
  // Refs для полей формы
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const deliveryFirstNameRef = useRef<HTMLInputElement>(null);
  const deliveryLastNameRef = useRef<HTMLInputElement>(null);
  const deliveryPhoneRef = useRef<HTMLInputElement>(null);
  const deliveryEmailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const houseRef = useRef<HTMLInputElement>(null);
  const pvzAddressRef = useRef<HTMLInputElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const pvzDropdownRef = useRef<HTMLDivElement>(null);

  // Устанавливаем город "Москва" при выборе курьерской доставки
  useEffect(() => {
    if (formData.deliveryMethod === "yandex") {
      setFormData((prev) => ({
        ...prev,
        city: "Москва",
      }));
    }
  }, [formData.deliveryMethod]);

  // Цены доставки (сейчас всегда 0)
  const deliveryPrices = {
    pickup: 0,
    yandex: 0,
  };

  // Расчет итоговой суммы
  const calculateTotal = () => {
    const itemsTotal = getTotalPrice();
    const deliveryPrice =
      deliveryPrices[formData.deliveryMethod as keyof typeof deliveryPrices] ||
      0;
    return itemsTotal + deliveryPrice;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Убираем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // При смене типа доставки сбрасываем метод доставки на pickup
    if (name === "deliveryType") {
      setFormData((prev) => ({
        ...prev,
        deliveryType: value,
        deliveryMethod: "pickup",
      }));
      setSelectedPvzCoords(null);
      // Сбрасываем ошибки доставки при смене типа
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.pvzAddress;
        delete newErrors.city;
        delete newErrors.street;
        delete newErrors.house;
        return newErrors;
      });
    } else if (name === "deliveryMethod" && value === "yandex") {
      // При выборе курьерской доставки устанавливаем город "Москва"
      setFormData((prev) => ({
        ...prev,
        deliveryMethod: value,
        city: "Москва",
      }));
      setSelectedPvzCoords(null);
      // Сбрасываем ошибки доставки при смене метода
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.pvzAddress;
        delete newErrors.city;
        delete newErrors.street;
        delete newErrors.house;
        return newErrors;
      });
    } else if (name === "deliveryMethod") {
      setFormData((prev) => ({
        ...prev,
        deliveryMethod: value,
      }));
      setSelectedPvzCoords(null);
      // Сбрасываем ошибки доставки при смене метода
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.pvzAddress;
        delete newErrors.city;
        delete newErrors.street;
        delete newErrors.house;
        return newErrors;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddressSelect = useCallback((addressData: {
    city?: string;
    street?: string;
    house?: string;
    fullAddress?: string;
    pvzAddress?: string;
    pvzCode?: string; // Для CDEK
    pvzId?: string; // Для Яндекс
    lat?: number;
    lon?: number;
  }) => {
    const fullAddress =
      addressData.fullAddress ||
      addressData.pvzAddress ||
      [addressData.street, addressData.house, addressData.city]
        .filter(Boolean)
        .join(", ");

    const isPvzSelection = !!(addressData.pvzCode || addressData.pvzId);
    if (
      !isPvzSelection &&
      lastGeocodedAddressRef.current === fullAddress
    ) {
      return;
    }

    lastGeocodedAddressRef.current = fullAddress;
    isUpdatingFromMapRef.current = true;

    // Убираем ошибки при выборе адреса
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.pvzAddress;
      delete newErrors.city;
      delete newErrors.street;
      delete newErrors.house;
      return newErrors;
    });

    // Если выбран пункт выдачи, сохраняем адрес ПВЗ в форму (инпут «Адрес пункта выдачи»).
    // mapSearchValue не меняем — карта не должна центрироваться/телепортироваться при выборе ПВЗ.
    if (formData.deliveryMethod === "pickup") {
      const pvzAddr = addressData.pvzAddress || fullAddress || "";
      setFormData((prev) => ({
        ...prev,
        pvzAddress: pvzAddr,
        city: addressData.city || prev.city,
      }));
      setPvzAddressInputValue(pvzAddr);
      pvzAddressLatestRef.current = pvzAddr;
      if (pvzAddressDebounceRef.current) {
        clearTimeout(pvzAddressDebounceRef.current);
        pvzAddressDebounceRef.current = null;
      }
      if (addressData.pvzCode) {
        setPvzCode(addressData.pvzCode);
      }
      if (addressData.pvzId) {
        setPvzId(addressData.pvzId);
      }
      if (typeof addressData.lat === "number" && typeof addressData.lon === "number") {
        setSelectedPvzCoords([addressData.lat, addressData.lon]);
      }
    } else {
      // Для курьерской доставки сохраняем полный адрес
      const newAddress = {
        city: addressData.city || "",
        street: addressData.street || "",
        house: addressData.house || "",
      };

      setFormData((prev) => ({
        ...prev,
        ...newAddress,
      }));
    }

    // Обновляем поиск по карте только для курьерской доставки; при выборе ПВЗ не трогаем — избегаем «телепорта» карты
    if (!addressData.pvzCode && !addressData.pvzId && fullAddress && fullAddress !== mapSearchValue) {
      setMapSearchValue(fullAddress);
    }

    setTimeout(() => {
      isUpdatingFromMapRef.current = false;
    }, 1000);
  }, [formData.deliveryMethod, mapSearchValue]);

  const handleMapSearchChange = (value: string) => {
    setMapSearchValue(value);
    setFormData((prev) =>
      prev.deliveryMethod === "pickup" ? { ...prev, pvzAddress: value } : prev
    );
  };

  const PVZ_INPUT_DEBOUNCE_MS = 500;
  const PVZ_INPUT_THROTTLE_MS = 400;

  const flushPvzAddressDebounce = () => {
    if (pvzAddressDebounceRef.current) {
      clearTimeout(pvzAddressDebounceRef.current);
      pvzAddressDebounceRef.current = null;
    }
    const value = pvzAddressLatestRef.current;
    setFormData((prev) =>
      prev.deliveryMethod === "pickup" ? { ...prev, pvzAddress: value } : prev
    );
    setMapSearchValue(value);
  };

  // Debounce: новый ввод отменяет предыдущий таймер; через 500ms уходит только последнее значение (не очередь запросов).
  const schedulePvzAddressSync = (typedValue: string) => {
    pvzAddressLatestRef.current = typedValue;
    if (pvzAddressDebounceRef.current) {
      clearTimeout(pvzAddressDebounceRef.current);
      pvzAddressDebounceRef.current = null;
    }
    pvzAddressDebounceRef.current = setTimeout(() => {
      pvzAddressDebounceRef.current = null;
      const value = pvzAddressLatestRef.current;
      const now = Date.now();
      if (now - pvzAddressThrottleRef.current < PVZ_INPUT_THROTTLE_MS) return;
      pvzAddressThrottleRef.current = now;
      setFormData((prev) =>
        prev.deliveryMethod === "pickup" ? { ...prev, pvzAddress: value } : prev
      );
      setMapSearchValue(value);
    }, PVZ_INPUT_DEBOUNCE_MS);
  };

  const handlePvzOptionSelect = (opt: PvzListOption) => {
    handleAddressSelect({
      pvzAddress: opt.address,
      pvzCode: opt.code,
      pvzId: opt.id,
      city: opt.city,
      fullAddress: opt.address,
      lat: opt.lat,
      lon: opt.lon,
    });
    if (typeof opt.lat === "number" && typeof opt.lon === "number") {
      setSelectedPvzCoords([opt.lat, opt.lon]);
    }
    setPvzOptions([]);
  };

  const closePvzOptions = () => setPvzOptions([]);
  const closeAddressSuggestions = () => setAddressSuggestions([]);

  const handleAddressSuggestionSelect = (suggestion: AddressSuggestion) => {
    const value = suggestion.value || suggestion.displayName;
    setFormData((prev) => ({ ...prev, pvzAddress: value }));
    setMapSearchValue(value);
    setPvzAddressInputValue(value);
    pvzAddressLatestRef.current = value;
    if (pvzAddressDebounceRef.current) {
      clearTimeout(pvzAddressDebounceRef.current);
      pvzAddressDebounceRef.current = null;
    }
    setAddressSuggestions([]);
  };

  // Запрос подсказок адресов по вводу в «Адрес пункта выдачи» (debounce 500ms + throttle 400ms)
  const ADDRESS_SUGGEST_DEBOUNCE_MS = 500;
  const ADDRESS_SUGGEST_THROTTLE_MS = 400;
  useEffect(() => {
    if (formData.deliveryMethod !== "pickup") return;
    const query = formData.pvzAddress.trim();
    if (query.length < 2) {
      setAddressSuggestions([]);
      return;
    }
    if (addressSuggestTimerRef.current) {
      clearTimeout(addressSuggestTimerRef.current);
      addressSuggestTimerRef.current = null;
    }
    addressSuggestTimerRef.current = setTimeout(() => {
      addressSuggestTimerRef.current = null;
      const now = Date.now();
      if (now - addressSuggestThrottleRef.current < ADDRESS_SUGGEST_THROTTLE_MS) return;
      addressSuggestThrottleRef.current = now;
      getAddressSuggestions(query).then((list) => {
        setAddressSuggestions(list);
      });
    }, ADDRESS_SUGGEST_DEBOUNCE_MS);
    return () => {
      if (addressSuggestTimerRef.current) {
        clearTimeout(addressSuggestTimerRef.current);
        addressSuggestTimerRef.current = null;
      }
    };
  }, [formData.pvzAddress, formData.deliveryMethod]);

  // Закрытие списков по Escape
  useEffect(() => {
    const hasOpen = filteredPvzOptions.length > 0 || addressSuggestions.length > 0;
    if (!hasOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePvzOptions();
        closeAddressSuggestions();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [filteredPvzOptions.length, addressSuggestions.length]);

  // Закрытие списков по клику вне блока
  useEffect(() => {
    const hasOpen = filteredPvzOptions.length > 0 || addressSuggestions.length > 0;
    if (!hasOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = pvzDropdownRef.current;
      if (el && !el.contains(e.target as Node)) {
        closePvzOptions();
        closeAddressSuggestions();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [filteredPvzOptions.length, addressSuggestions.length]);

  useEffect(() => {
    if (isUpdatingFromMapRef.current) {
      return;
    }

    const addressString = [formData.city, formData.street, formData.house]
      .filter(Boolean)
      .join(", ");

    if (addressString && addressString !== mapSearchValue) {
      const timeoutId = setTimeout(() => {
        setMapSearchValue(addressString);
      }, 1500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [formData.city, formData.street, formData.house, mapSearchValue]);

  const generateOrderNumber = () => {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Функция валидации формы
  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {};

    // Валидация личных данных
    if (!formData.firstName.trim()) {
      newErrors.firstName = true;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = true;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = true;
    }

    // Валидация данных получателя, если отличается от покупателя
    if (formData.differentRecipient) {
      if (!formData.deliveryFirstName.trim()) {
        newErrors.deliveryFirstName = true;
      }
      if (!formData.deliveryLastName.trim()) {
        newErrors.deliveryLastName = true;
      }
      if (!formData.deliveryPhone.trim()) {
        newErrors.deliveryPhone = true;
      }
      if (!formData.deliveryEmail.trim()) {
        newErrors.deliveryEmail = true;
      }
    }

    // Валидация данных доставки
    if (formData.deliveryMethod === "pickup") {
      // Для ПВЗ нужно проверить, что выбран пункт выдачи
      if (formData.deliveryType === "cdek" && !pvzCode) {
        newErrors.pvzAddress = true;
      } else if (formData.deliveryType === "yandex" && !pvzId) {
        newErrors.pvzAddress = true;
      }
    } else if (formData.deliveryMethod === "yandex") {
      // Для курьерской доставки нужны город, улица и дом
      if (!formData.city.trim()) {
        newErrors.city = true;
      }
      if (!formData.street.trim()) {
        newErrors.street = true;
      }
      if (!formData.house.trim()) {
        newErrors.house = true;
      }
    }

    setErrors(newErrors);

    // Если есть ошибки, скроллим к первой
    if (Object.keys(newErrors).length > 0) {
      const errorFields = Object.keys(newErrors);
      const firstError = errorFields[0];
      
      // Скроллим к полю или секции карты с плавной анимацией
      setTimeout(() => {
        let targetElement: HTMLElement | null = null;
        
        switch (firstError) {
          case "firstName":
            targetElement = firstNameRef.current as HTMLElement | null;
            break;
          case "lastName":
            targetElement = lastNameRef.current as HTMLElement | null;
            break;
          case "phone":
            targetElement = phoneRef.current as HTMLElement | null;
            break;
          case "email":
            targetElement = emailRef.current as HTMLElement | null;
            break;
          case "deliveryFirstName":
            targetElement = deliveryFirstNameRef.current as HTMLElement | null;
            break;
          case "deliveryLastName":
            targetElement = deliveryLastNameRef.current as HTMLElement | null;
            break;
          case "deliveryPhone":
            targetElement = deliveryPhoneRef.current as HTMLElement | null;
            break;
          case "deliveryEmail":
            targetElement = deliveryEmailRef.current as HTMLElement | null;
            break;
          case "city":
            targetElement = cityRef.current as HTMLElement | null;
            break;
          case "street":
            targetElement = streetRef.current as HTMLElement | null;
            break;
          case "house":
            targetElement = houseRef.current as HTMLElement | null;
            break;
          case "pvzAddress":
            targetElement = (pvzAddressRef.current || mapSectionRef.current) as HTMLElement | null;
            break;
        }

        if (targetElement) {
          // Получаем позицию элемента с учетом отступа
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 150; // Отступ 150px сверху
          
          // Плавный скролл с использованием requestAnimationFrame для максимальной плавности
          const startPosition = window.pageYOffset;
          const distance = offsetPosition - startPosition;
          const duration = 800; // Длительность анимации в миллисекундах
          let start: number | null = null;

          const animateScroll = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Используем easing функцию для более плавной анимации
            const ease = (t: number) => t < 0.5 
              ? 2 * t * t 
              : -1 + (4 - 2 * t) * t;
            
            window.scrollTo({
              top: startPosition + distance * ease(progress),
              behavior: "auto"
            });

            if (timeElapsed < duration) {
              requestAnimationFrame(animateScroll);
            } else {
              // После завершения скролла фокусируемся на поле
              if (targetElement instanceof HTMLInputElement) {
                targetElement.focus();
                // Добавляем небольшое выделение для привлечения внимания
                targetElement.style.transition = "box-shadow 0.3s ease";
                targetElement.style.boxShadow = "0 0 0 3px rgba(220, 53, 69, 0.3)";
                setTimeout(() => {
                  if (targetElement instanceof HTMLInputElement) {
                    targetElement.style.boxShadow = "";
                  }
                }, 1000);
              }
            }
          };

          requestAnimationFrame(animateScroll);
        }
      }, 150);

      return false;
    }

    return true;
  };

  const handleSubmitOrder = async () => {
    if (!formData.agreeToOffer || !formData.agreeToPrivacy) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    // Валидация формы
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Определяем delivery_service на основе deliveryType и deliveryMethod
      let deliveryService: "cdek" | "yandex" | "yandex_courier";
      if (formData.deliveryType === "cdek") {
        deliveryService = "cdek";
      } else if (formData.deliveryType === "yandex" && formData.deliveryMethod === "yandex") {
        deliveryService = "yandex_courier";
      } else {
        deliveryService = "yandex";
      }

      // Формируем полный адрес (для ПВЗ учитываем ещё не применённый debounce)
      const effectivePvzAddress = formData.deliveryMethod === "pickup"
        ? (pvzAddressLatestRef.current || formData.pvzAddress || "")
        : "";
      const fullAddress = formData.deliveryMethod === "pickup"
        ? effectivePvzAddress
        : [
            formData.city,
            formData.street,
            formData.house,
            formData.apartment && `кв. ${formData.apartment}`,
            formData.floor && `${formData.floor} этаж`,
            formData.entrance && `подъезд ${formData.entrance}`,
            formData.intercom && `домофон ${formData.intercom}`,
          ]
            .filter(Boolean)
            .join(", ");

      // positions[].id: productId (UUID warehouse_item) или fallback по slug
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const hasValidUuid = (id: unknown) =>
        typeof id === "string" && uuidRegex.test(id);
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
        })
      );

      const positions: Array<{ id: string; quantity: number } | null> = items.map(
        (item) => {
          const uuidFromCart =
            hasValidUuid(item.productId)
              ? item.productId
              : item.warehouseProduct;
          if (uuidFromCart) {
            return { id: uuidFromCart as string, quantity: item.quantity };
          }
          const fullProduct =
            typeof item.productId === "number"
              ? getProductById(item.productId)
              : undefined;
          const productSlug = fullProduct?.slug ?? item.product?.slug;
          if (!productSlug) {
            console.warn("[Order] Нет slug для позиции:", item);
            return null;
          }
          const productData = slugToProduct[productSlug];
          if (productData?.warehouse_items?.length) {
            const warehouseItem = productData.warehouse_items.find(
              (wi: { color?: string; color_slug?: string; size?: string; size_slug?: string }) =>
                (wi.color === item.color || wi.color_slug === item.color) &&
                (wi.size === item.size || wi.size_slug === item.size)
            );
            const rawId =
              (warehouseItem as { uuid?: string; id?: string })?.uuid ??
              warehouseItem?.id;
            const idStr = rawId != null ? String(rawId).trim() : null;
            if (idStr && uuidRegex.test(idStr)) {
              return { id: idStr, quantity: item.quantity };
            }
          }
          console.warn(
            "[Order] Не найден warehouse_item UUID для:",
            productSlug,
            item.color,
            item.size
          );
          return null;
        }
      );

      const validPositions = positions.filter(
        (p): p is { id: string; quantity: number } => p !== null
      );
      if (validPositions.length !== items.length) {
        setIsSubmitting(false);
        redirectToCartWithError(
          "Некоторые товары не могут быть заказаны. Удалите их из корзины и добавьте заново со страницы товара (с выбором цвета и размера)."
        );
        return;
      }

      // Формируем данные заказа для API
      const orderRequest: OrderRequest = {
        total_amount: calculateTotal().toFixed(2),
        payment_type: "prepayment",
        delivery_service: deliveryService,
        customer_data: {
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
        },
        positions: validPositions,
      };

      // Добавляем данные доставки в зависимости от типа
      if (deliveryService === "cdek") {
        // Для CDEK обязательно заполняем cdek_delivery_data
        orderRequest.cdek_delivery_data = {
          pvz_code: pvzCode || "DEFAULT",
          full_address: fullAddress,
        };
      } else if (deliveryService === "yandex") {
        // Для yandex (ПВЗ) обязательно заполняем yandex_delivery_data со всеми полями, включая pvz_id
        orderRequest.yandex_delivery_data = {
          pvz_id: pvzId || "",
          full_address: fullAddress,
        };
      } else if (deliveryService === "yandex_courier") {
        // Для yandex_courier обязательно заполняем yandex_delivery_data (pvz_id не нужен)
        orderRequest.yandex_delivery_data = {
          full_address: fullAddress,
        };
      }

      console.log("Submitting order:", orderRequest);
      // Создаем заказ
      const orderResponse = await createOrder(orderRequest);
      console.log("Order created:", orderResponse);

      // Сохраняем order_id для дальнейшего использования
      const orderId = orderResponse.id;

      // Обработка оплаты в зависимости от выбранного способа
      if (formData.paymentMethod === "card" || formData.paymentMethod === "sberbank") {
        // Оплата картой или СБП — передаём URL возврата на сайт после оплаты
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        try {
          const paymentResponse = await getPaymentUrl(orderId, {
            return_url: `${origin}/checkout?payment=success`,
            cancel_url: `${origin}/checkout?payment=error`,
          });
          console.log("Payment URL:", paymentResponse);
          
          // Используем confirmation_url или payment_url для обратной совместимости
          const paymentUrl = paymentResponse.confirmation_url || paymentResponse.payment_url;
          
          if (paymentUrl) {
            // Перенаправляем на страницу оплаты
            window.location.href = paymentUrl;
            return;
          }
        } catch (error) {
          console.error("Failed to get payment URL:", error);
          // Продолжаем с сохранением заказа в sessionStorage
        }
      } else if (formData.paymentMethod === "yandexpay" || formData.paymentMethod === "installment") {
        // Яндекс Pay и Долями — передаём URL возврата на сайт после оплаты
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        try {
          const paymentResponse = await getYandexPaymentUrl(orderId, {
            return_url: `${origin}/checkout?payment=success`,
            cancel_url: `${origin}/checkout?payment=error`,
          });
          console.log("Yandex Payment URL:", paymentResponse);
          
          const paymentUrl = paymentResponse.confirmation_url || paymentResponse.payment_url;
          
          if (paymentUrl) {
            window.location.href = paymentUrl;
            return;
          }
        } catch (error) {
          console.error("Failed to get Yandex payment URL:", error);
          alert(
            "Ошибка оплаты. Попробуйте оплатить картой или СБП, либо свяжитесь с поддержкой."
          );
          return;
        }
      }

      // Сохраняем заказ в sessionStorage для отображения в личном кабинете
      const newOrderNumber = orderResponse.id.toString();
      const orderDate = new Date();

      // Формируем данные заказа для отображения
      const orderData = {
        id: newOrderNumber,
        date: formatDate(orderDate),
        status: "не оплачен",
        buyer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || formData.email,
        },
        delivery: {
          firstName: formData.deliveryFirstName || formData.firstName,
          lastName: formData.deliveryLastName || formData.lastName,
          email: formData.deliveryEmail || formData.email,
          phone: formData.deliveryPhone || formData.phone || formData.email,
          city: formData.city,
          street: formData.street,
          house: formData.house,
          apartment: formData.apartment,
          floor: formData.floor,
          entrance: formData.entrance,
          intercom: formData.intercom,
          pickupCity: formData.pickupCity,
          postalCode: formData.postalCode,
          pvzAddress: formData.deliveryMethod === "pickup" ? (pvzAddressLatestRef.current || formData.pvzAddress) : formData.pvzAddress,
          type: formData.deliveryType,
          method: formData.deliveryMethod,
        },
        payment: {
          method: formData.paymentMethod,
          amount: formatPrice(calculateTotal()),
        },
        products: items.map((item) => {
          const fullProduct =
            typeof item.productId === "number"
              ? getProductById(item.productId)
              : undefined;
          const colorLabel =
            fullProduct?.availableColors.find((c) => c.value === item.color)
              ?.label || item.color;

          return {
            id: item.productId,
            name: item.product.title,
            category: fullProduct?.category || item.product.category || "",
            color: colorLabel,
            size: item.size,
            quantity: item.quantity,
            price: formatPrice(item.product.priceValue * item.quantity),
            priceValue: item.product.priceValue * item.quantity,
            image: item.product.images[0] || "/images/catalogs/placeholder.png",
          };
        }),
        total: {
          itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
          totalAmount: formatPrice(calculateTotal()),
          totalAmountValue: calculateTotal(),
        },
      };

      // Сохраняем заказ в sessionStorage
      if (typeof window !== "undefined") {
        try {
          const existingOrders = sessionStorage.getItem("znves:orders");
          const orders = existingOrders ? JSON.parse(existingOrders) : [];
          orders.push(orderData);
          sessionStorage.setItem("znves:orders", JSON.stringify(orders));
        } catch (error) {
          console.error("Failed to save order to sessionStorage:", error);
        }
      }

      if (onOrderSubmit) {
        onOrderSubmit(newOrderNumber);
      }
    } catch (error) {
      console.error("Failed to submit order:", error);
      const message =
        error instanceof Error ? error.message : "Ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.";
      setIsSubmitting(false);
      redirectToCartWithError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.telegramSection}>
            <h1 className={styles.title}>Оформление заказа</h1>
            <button
              className={styles.telegramButton}
              type="button"
              onClick={redirectToBot}
            >
              <div className={styles.telegramIcon}>
                <Image
                  src="/images/checkout/telegram.png"
                  alt="Telegram"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <span>Подключить Telegram</span>
            </button>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Личные данные</h2>
            <div className={styles.firstInputs}>
              <div className={styles.inputWrapper}>
                <label htmlFor="firstName" className={styles.label}>
                  Имя
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Введите имя"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                  ref={firstNameRef}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="lastName" className={styles.label}>
                  Фамилия
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Введите фамилию"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                  ref={lastNameRef}
                />
              </div>
            </div>
            <div className={styles.infoInputs}>
              <div className={styles.inputWrapper}>
                <label htmlFor="phone" className={styles.label}>
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                  ref={phoneRef}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  ref={emailRef}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Вариант доставки</h2>
            <div className={styles.deliveryTypeRow}>
              <label className={styles.deliveryTypeButton}>
                <input
                  type="radio"
                  name="deliveryType"
                  value="cdek"
                  checked={formData.deliveryType === "cdek"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.deliveryTypeButtonContent}>
                  <span className={styles.deliveryTypeText}>СДЕК</span>
                  <div
                    className={`${styles.deliveryCheckmark} ${
                      formData.deliveryType === "cdek"
                        ? styles.deliveryCheckmarkActive
                        : ""
                    }`}
                  >
                    {formData.deliveryType === "cdek" && (
                      <span className={styles.checkmarkIcon}>
                        <Image
                          src="/images/checkout/checkmark.png"
                          alt="checkmark"
                          width={11.64}
                          height={10}
                          loading="lazy"
                        />
                      </span>
                    )}
                  </div>
                </div>
              </label>
              <label className={styles.deliveryTypeButton}>
                <input
                  type="radio"
                  name="deliveryType"
                  value="yandex"
                  checked={formData.deliveryType === "yandex"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.deliveryTypeButtonContent}>
                  <span className={styles.deliveryTypeText}>ЯНДЕКС.КУРЬЕР</span>
                  <div
                    className={`${styles.deliveryCheckmark} ${
                      formData.deliveryType === "yandex"
                        ? styles.deliveryCheckmarkActive
                        : ""
                    }`}
                  >
                    {formData.deliveryType === "yandex" && (
                      <span className={styles.checkmarkIcon}>
                        <Image
                          src="/images/checkout/checkmark.png"
                          alt="checkmark"
                          width={11.64}
                          height={10}
                          loading="lazy"
                        />
                      </span>
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Доставка</h2>
            <div className={styles.deliveryButtonsRow}>
              {formData.deliveryType === "cdek" && (
                <label className={styles.deliveryButton}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === "pickup"}
                    onChange={handleInputChange}
                    className={styles.radioInput}
                  />
                  <div className={styles.deliveryButtonContent}>
                    <div className={styles.deliveryButtonInfo}>
                      <span className={styles.deliveryButtonName}>
                        Пункт выдачи
                      </span>
                    </div>
                    <div className={styles.deliveryButtonInfo}>
                      <span className={styles.deliveryButtonSubtext}>
                        Послезавтра
                      </span>
                      <span className={styles.deliveryButtonPrice}>
                        бесплатно
                      </span>
                    </div>
                    <div
                      className={`${styles.deliveryCheckmark} ${
                        formData.deliveryMethod === "pickup"
                          ? styles.deliveryCheckmarkActive
                          : ""
                      }`}
                    >
                      {formData.deliveryMethod === "pickup" && (
                        <span className={styles.checkmarkIcon}>
                          <Image
                            src="/images/checkout/checkmark.png"
                            alt="checkmark"
                            width={11.64}
                            height={10}
                            loading="lazy"
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              )}
              {formData.deliveryType === "yandex" && (
                <>
                  <label className={styles.deliveryButton}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === "pickup"}
                      onChange={handleInputChange}
                      className={styles.radioInput}
                    />
                    <div className={styles.deliveryButtonContent}>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonName}>
                          Пункт выдачи
                        </span>
                      </div>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonSubtext}>
                          Послезавтра
                        </span>
                        <span className={styles.deliveryButtonPrice}>
                          бесплатно
                        </span>
                      </div>
                      <div
                        className={`${styles.deliveryCheckmark} ${
                          formData.deliveryMethod === "pickup"
                            ? styles.deliveryCheckmarkActive
                            : ""
                        }`}
                      >
                        {formData.deliveryMethod === "pickup" && (
                          <span className={styles.checkmarkIcon}>
                            <Image
                              src="/images/checkout/checkmark.png"
                              alt="checkmark"
                              width={11.64}
                              height={10}
                              loading="lazy"
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                  <label className={styles.deliveryButton}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="yandex"
                      checked={formData.deliveryMethod === "yandex"}
                      onChange={handleInputChange}
                      className={styles.radioInput}
                    />
                    <div className={styles.deliveryButtonContent}>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonName}>
                          Курьером
                        </span>
                      </div>
                      <div className={styles.deliveryButtonInfo}>
                        <span className={styles.deliveryButtonSubtext}>
                          6-7 дней
                        </span>
                        <span className={styles.deliveryButtonPrice}>
                          бесплатно
                        </span>
                      </div>
                      <div
                        className={`${styles.deliveryCheckmark} ${
                          formData.deliveryMethod === "yandex"
                            ? styles.deliveryCheckmarkActive
                            : ""
                        }`}
                      >
                        {formData.deliveryMethod === "yandex" && (
                          <span className={styles.checkmarkIcon}>
                            <Image
                              src="/images/checkout/checkmark.png"
                              alt="checkmark"
                              width={11.64}
                              height={10}
                              loading="lazy"
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Данные о доставке</h2>
            <label
              className={styles.checkboxLabel}
              style={{ marginBottom: "20px" }}
            >
              <input
                type="checkbox"
                name="differentRecipient"
                checked={formData.differentRecipient}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              <span>Получатель отличается от покупателя</span>
            </label>
            {formData.differentRecipient && (
              <>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryFirstName" className={styles.label}>
                      Имя получателя
                    </label>
                    <input
                      type="text"
                      id="deliveryFirstName"
                      name="deliveryFirstName"
                      placeholder="Введите имя"
                      value={formData.deliveryFirstName}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.deliveryFirstName ? styles.inputError : ""}`}
                      ref={deliveryFirstNameRef}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryLastName" className={styles.label}>
                      Фамилия получателя
                    </label>
                    <input
                      type="text"
                      id="deliveryLastName"
                      name="deliveryLastName"
                      placeholder="Введите фамилию"
                      value={formData.deliveryLastName}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.deliveryLastName ? styles.inputError : ""}`}
                      ref={deliveryLastNameRef}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryPhone" className={styles.label}>
                      Телефон получателя
                    </label>
                    <input
                      type="tel"
                      id="deliveryPhone"
                      name="deliveryPhone"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.deliveryPhone}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.deliveryPhone ? styles.inputError : ""}`}
                      ref={deliveryPhoneRef}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="deliveryEmail" className={styles.label}>
                      Email получателя
                    </label>
                    <input
                      type="email"
                      id="deliveryEmail"
                      name="deliveryEmail"
                      placeholder="Введите email"
                      value={formData.deliveryEmail}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.deliveryEmail ? styles.inputError : ""}`}
                      ref={deliveryEmailRef}
                    />
                  </div>
                </div>
              </>
            )}
            {formData.deliveryMethod === "pickup" && (
              <>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="pickupCity" className={styles.label}>
                      Город
                    </label>
                    <input
                      type="text"
                      id="pickupCity"
                      name="pickupCity"
                      placeholder="Введите город"
                      value={formData.pickupCity || ""}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="postalCode" className={styles.label}>
                      Почтовый индекс
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      placeholder="Введите индекс"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div
                    ref={pvzDropdownRef}
                    className={styles.pvzAddressDropdownWrap}
                    style={{ width: "100%" }}
                  >
                    <div
                      className={styles.inputWrapper}
                      style={{ width: "100%" }}
                    >
                      <label htmlFor="pvzAddress" className={styles.label}>
                        Адрес пункта выдачи
                      </label>
                      <input
                        type="text"
                        id="pvzAddress"
                        name="pvzAddress"
                        placeholder="Введите город или адрес для поиска пункта выдачи"
                        value={pvzAddressInputValue}
                        onChange={(e) => {
                          const v = e.target.value;
                          setPvzAddressInputValue(v);
                          schedulePvzAddressSync(v);
                        }}
                        onBlur={flushPvzAddressDebounce}
                        className={`${styles.input} ${errors.pvzAddress ? styles.inputError : ""}`}
                        ref={pvzAddressRef}
                      />
                    </div>
                    {filteredPvzOptions.length > 0 && (
                      <ul className={styles.pvzOptionsList} role="listbox">
                        {filteredPvzOptions.map((opt, idx) => (
                          <li
                            key={opt.code ?? opt.id ?? `pvz-${idx}`}
                            className={styles.pvzOptionItem}
                            role="option"
                            onClick={() => handlePvzOptionSelect(opt)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handlePvzOptionSelect(opt);
                              }
                            }}
                            tabIndex={0}
                          >
                            <span className={styles.pvzOptionName}>{opt.name}</span>
                            <span className={styles.pvzOptionAddress}>{opt.address}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}
            {formData.deliveryMethod === "yandex" && (
              <>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="city" className={styles.label}>
                      Город
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Москва"
                      value="Москва"
                      className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                      readOnly
                      ref={cityRef}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="street" className={styles.label}>
                      Улица
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      placeholder="Введите улицу"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.street ? styles.inputError : ""}`}
                      ref={streetRef}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="house" className={styles.label}>
                      Дом
                    </label>
                    <input
                      type="text"
                      id="house"
                      name="house"
                      placeholder="Введите дом"
                      value={formData.house}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.house ? styles.inputError : ""}`}
                      ref={houseRef}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="apartment" className={styles.label}>
                      Квартира
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      placeholder="Введите квартиру"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.firstInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="floor" className={styles.label}>
                      Этаж
                    </label>
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      placeholder="Введите этаж"
                      value={formData.floor}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="entrance" className={styles.label}>
                      Подъезд
                    </label>
                    <input
                      type="text"
                      id="entrance"
                      name="entrance"
                      placeholder="Введите подъезд"
                      value={formData.entrance}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.infoInputs}>
                  <div className={styles.inputWrapper}>
                    <label htmlFor="intercom" className={styles.label}>
                      Домофон
                    </label>
                    <input
                      type="text"
                      id="intercom"
                      name="intercom"
                      placeholder="Введите домофон"
                      value={formData.intercom}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.section} ref={mapSectionRef}>
            <h2 className={styles.sectionTitle}>
              {formData.deliveryMethod === "pickup"
                ? "Пункт получения"
                : "Адрес доставки"}
            </h2>
            <div className={styles.checkoutMapSearchContainer}>
              <input
                type="text"
                id="mapSearchInput"
                name="mapSearchInput"
                className={styles.checkoutMapSearchInput}
                placeholder={
                  formData.deliveryMethod === "pickup"
                    ? "Выберите пункт получения"
                    : "Выберите адрес доставки"
                }
                value={
                  formData.deliveryMethod === "pickup"
                    ? pvzAddressInputValue ||
                      "Выберите пункт выдачи на карте"
                    : mapSearchValue ||
                      [formData.city, formData.street, formData.house]
                        .filter(Boolean)
                        .join(", ") ||
                      "Выберите адрес на карте"
                }
                onChange={(e) => {
                  const v = e.target.value;
                  if (formData.deliveryMethod === "pickup") {
                    setPvzAddressInputValue(v);
                    schedulePvzAddressSync(v);
                  } else {
                    handleMapSearchChange(v);
                  }
                }}
              />
            </div>
            <div className={styles.checkoutMapContainer}>
              <Map
                onAddressSelect={handleAddressSelect}
                onPvzListLoaded={setPvzOptions}
                searchValue={mapSearchValue}
                onSearchChange={handleMapSearchChange}
                deliveryMethod={formData.deliveryMethod}
                deliveryType={formData.deliveryType}
                selectedPvzCoords={selectedPvzCoords}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.paymentTitle}>Способ оплаты</h2>
            <div className={styles.paymentButtonsRow}>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="sberbank"
                  checked={formData.paymentMethod === "sberbank"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/sbp.png"
                    alt="СБП"
                    width={54}
                    height={30}
                    className={styles.paymentButtonIcon}
                    loading="lazy"
                  />
                </div>
              </label>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/card.png"
                    alt="Картой онлайн"
                    width={86}
                    height={24}
                    className={styles.paymentButtonIcon}
                    loading="lazy"
                  />
                  <Image
                    src="/images/checkout/cardText.png"
                    alt="Онлайн"
                    width={86}
                    height={16}
                    className={styles.paymentButtonIcon}
                    loading="lazy"
                  />
                </div>
              </label>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="yandexpay"
                  checked={formData.paymentMethod === "yandexpay"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/y.png"
                    alt="Яндекс Pay"
                    width={60}
                    height={20}
                    className={styles.paymentButtonIcon}
                    loading="lazy"
                  />
                </div>
              </label>
              <label className={styles.paymentButton}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="installment"
                  checked={formData.paymentMethod === "installment"}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <div className={styles.paymentButtonContent}>
                  <Image
                    src="/images/checkout/dolya.png"
                    alt="Долями"
                    width={73}
                    height={14}
                    className={styles.paymentButtonIcon}
                    loading="lazy"
                  />
                </div>
              </label>
            </div>
          </div>

          {!showRightColumn && (
            <>
              <div className={styles.orderSummaryBlock}>
                <div className={styles.orderSummary}>
                  <div className={styles.summaryRowTotal}>
                    <span className={styles.summaryLabelTotal}>Итого</span>
                    <span className={styles.summaryTotal}>
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={`${styles.submitButton} ${styles.submitButtonRight}`}
                  disabled={!formData.agreeToOffer || !formData.agreeToPrivacy || isSubmitting}
                  onClick={handleSubmitOrder}
                >
                  {isSubmitting ? "Оформление..." : "Оформить заказ"}
                </button>
                <div className={styles.checkboxes}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToOffer"
                      checked={formData.agreeToOffer}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я соглашаюсь с условиями{" "}
                      <Link
                        href="/public-offer"
                        className={styles.checkboxLink}
                      >
                        публичной оферты
                      </Link>
                    </span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я принимаю{" "}
                      <Link href="/privacy" className={styles.checkboxLink}>
                        политику конфиденциальности
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
        {showRightColumn && (
          <div className={styles.rightPart}>
            <div className={styles.orderHeader}>
              <h2 className={styles.orderTitle}>Ваши товары</h2>
              <Link href="/cart" className={styles.editLink}>
                изменить
              </Link>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.orderItemsBlock}>
                <div className={styles.orderItems}>
                  {items.map((item, index) => {
                    const fullProduct =
                      typeof item.productId === "number"
                        ? getProductById(item.productId)
                        : undefined;
                    const colorLabel =
                      fullProduct?.availableColors.find(
                        (c) => c.value === item.color
                      )?.label || item.color;

                    return (
                      <div
                        key={`${item.productId}-${item.size}-${item.color}-${index}`}
                        className={styles.orderItem}
                      >
                        <div className={styles.orderItemImage}>
                          <Image
                            src={
                              item.product.images[0] ||
                              "/images/catalogs/placeholder.png"
                            }
                            alt={item.product.title}
                            width={82}
                            height={82}
                            className={styles.orderImage}
                            loading="lazy"
                          />
                        </div>
                        <div className={styles.orderItemInfo}>
                          <div className={styles.orderItemCategory}>
                            <div className={styles.column}>
                              {fullProduct?.category ||
                                item.product.category ||
                                ""}

                              <h2 className={styles.orderItemTitle}>
                                {item.product.title}
                              </h2>
                            </div>
                            <div className={styles.orderItemDetailsRow}>
                              <div className={styles.orderItemDetailColumn}>
                                <span className={styles.orderItemDetailLabel}>
                                  Цвет
                                </span>
                                <span className={styles.orderItemDetailValue}>
                                  {colorLabel}
                                </span>
                              </div>
                              <div className={styles.orderItemDetailColumn}>
                                <span className={styles.orderItemDetailLabel}>
                                  Размер
                                </span>
                                <span
                                  className={`${styles.orderItemDetailValue} ${styles.orderItemSizeValue}`}
                                >
                                  {item.size}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.orderItemPrice}>
                            {formatPrice(
                              item.product.priceValue * item.quantity
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Доставка:</span>
                <span className={styles.summaryValue}>Бесплатно</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Товаров на:</span>
                <span className={styles.summaryValue}>
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <div className={styles.orderSummaryBlock}>
                <div className={styles.orderSummary}>
                  <div className={styles.summaryRowTotal}>
                    <span className={styles.summaryLabelTotal}>Итого</span>
                    <span className={styles.summaryTotal}>
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={`${styles.submitButton} ${styles.submitButtonRight}`}
                  disabled={!formData.agreeToOffer || !formData.agreeToPrivacy || isSubmitting}
                  onClick={handleSubmitOrder}
                >
                  {isSubmitting ? "Оформление..." : "Оформить заказ"}
                </button>
                <div className={styles.checkboxes}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToOffer"
                      checked={formData.agreeToOffer}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я соглашаюсь с условиями{" "}
                      <Link
                        href="/public-offer"
                        className={styles.checkboxLink}
                      >
                        публичной оферты
                      </Link>
                    </span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      className={styles.checkbox}
                    />
                    <span>
                      Я принимаю{" "}
                      <Link href="/privacy" className={styles.checkboxLink}>
                        политику конфиденциальности
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;

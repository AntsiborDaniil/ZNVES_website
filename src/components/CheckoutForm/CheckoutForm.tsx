"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { getProductById } from "../../data/products";
import { createOrder, getPaymentUrl, getYandexPaymentUrl, invalidateMyOrdersCache, type OrderRequest } from "../../api/order/orderApi";
import PromoErrorToast from "../PromoErrorToast/PromoErrorToast";
import { fetchCatalogProductRaw, type ApiProductDetail, type ApiWarehouseItem } from "../../api/product/productApi";
import { fetchCatalogColors } from "../../api/catalog/catalogApi";
import type { PvzListOption } from "../Map/Map";
import { getAddressSuggestions, type AddressSuggestion } from "../../api/delivery/addressSuggestApi";
import { useWindowSize } from "../../hooks/useWindowSize";
import { validatePhone } from "../../lib/authValidation";
import styles from "./CheckoutFormModal.module.css";
import CheckoutPersonalSection from "./sections/CheckoutPersonalSection";
import CheckoutDeliverySection, {
  type ModalDeliveryOption,
  type YandexCourierOffer,
} from "./sections/CheckoutDeliverySection";
import CheckoutPaymentSection from "./sections/CheckoutPaymentSection";

/** Кеш по slug на время сессии — меньше повторных запросов при оформлении заказа */
const productRawCache = new Map<string, ApiProductDetail | null>();

interface CheckoutFormProps {
  onOrderSubmit?: (orderNumber: string) => void;
  /** Вызывается при ошибке заказа, когда форма встроена в родительскую страницу (минует sessionStorage + router.push) */
  onOrderError?: (message: string) => void;
  className?: string;
  /** Цвета с каталога (с cart), чтобы не дублировать запрос при открытии формы на cart */
  initialColorSlugToLabel?: Record<string, string>;
  modalPromo?: {
    value: string;
    onChange: (value: string) => void;
    onApply: () => void;
    isLoading: boolean;
  };
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
  onOrderError,
  className = "",
  initialColorSlugToLabel: initialColors = {},
  modalPromo,
}: CheckoutFormProps) => {
  const { items, getTotalPrice, clearCart, appliedPromo, setAppliedPromo, openCart } = useCart();
  const { user, updateUser } = useAuth();
  const { width } = useWindowSize();
  const isCartMobilePvz = width > 0 && width < 480;

  const redirectToCartWithError = (message: string) => {
    if (onOrderError) {
      onOrderError(message);
      return;
    }
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(ORDER_ERROR_STORAGE_KEY, message);
      } catch {}
    }
    openCart();
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
    pickupCity: "Москва",
    postalCode: "",
    pvzAddress: "",
    deliveryType: "cdek",
    deliveryMethod: "pickup",
    paymentMethod: "sberbank",
    differentRecipient: false,
    deliveryComment: "",
  });
  const isModalCourier = formData.deliveryMethod === "yandex";
  const isModalPickup = formData.deliveryMethod === "pickup";
  const modalDeliveryOption: ModalDeliveryOption =
    formData.deliveryType === "cdek"
      ? "cdek_pickup"
      : formData.deliveryMethod === "yandex"
        ? "yandex_courier"
        : "yandex_pickup";
  const [showContinueButtonAgain, setShowContinueButtonAgain] = useState(false);
  const hideContinueButton =
    isCartMobilePvz &&
    formData.deliveryType === "cdek" &&
    !!formData.pvzAddress.trim() &&
    formData.deliveryMethod === "pickup" &&
    !showContinueButtonAgain;
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
  const addressSuggestAbortRef = useRef<AbortController | null>(null);
  const courierCalcAbortRef = useRef<AbortController | null>(null);
  const isUpdatingFromMapRef = useRef(false);
  const lastGeocodedAddressRef = useRef<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pvzCode, setPvzCode] = useState<string>(""); // Для CDEK
  const [pvzId, setPvzId] = useState<string>(""); // Для Яндекс
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [colorSlugToLabel, setColorSlugToLabel] = useState<Record<string, string>>(initialColors);
  const [totalWeightGrams, setTotalWeightGrams] = useState<number | undefined>(undefined);
  const [cdekDeliveryEstimate, setCdekDeliveryEstimate] = useState<{
    price: number;
    daysMin: number;
    daysMax: number;
  } | null>(null);

  const [yandexCourierEstimate, setYandexCourierEstimate] = useState<{
    price: number;
    description: string;
    deliveryFrom: string | null;
    deliveryTo: string | null;
    loading: boolean;
  } | null>(null);
  const [yandexCourierOffers, setYandexCourierOffers] = useState<YandexCourierOffer[] | null>(null);
  const [selectedCourierOfferId, setSelectedCourierOfferId] = useState<string | null>(null);
  const [mapEnabled, setMapEnabled] = useState(false);
  const mapWasPickupRef = useRef(false);

  const isCourierAvailableByTime = useMemo(() => {
    const now = new Date();
    const moscowHour = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" })).getHours();
    return moscowHour >= 8 && moscowHour < 22;
  }, []);
  const [courierAvailable, setCourierAvailable] = useState(isCourierAvailableByTime);
  const [paymentErrorToast, setPaymentErrorToast] = useState<string | null>(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const moscowHour = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Moscow" })).getHours();
      setCourierAvailable(moscowHour >= 8 && moscowHour < 22);
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Refs для полей формы
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const deliveryFirstNameRef = useRef<HTMLInputElement>(null);
  const deliveryLastNameRef = useRef<HTMLInputElement>(null);
  const deliveryPhoneRef = useRef<HTMLDivElement>(null);
  const deliveryEmailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const houseRef = useRef<HTMLInputElement>(null);
  const pvzAddressRef = useRef<HTMLInputElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const pvzDropdownRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const mapSearchSyncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setShowContinueButtonAgain(false);
  }, [formData.deliveryType, formData.deliveryMethod]);

  // Defer MapLazy mount so opening cart/checkout doesn't immediately load map scripts.
  // First pickup show: requestIdleCallback / setTimeout(400). Delivery-type changes while
  // already on pickup: enable immediately. Courier: disable so ymaps unloads.
  useEffect(() => {
    if (formData.deliveryMethod !== "pickup") {
      setMapEnabled(false);
      mapWasPickupRef.current = false;
      return;
    }

    if (mapWasPickupRef.current) {
      setMapEnabled(true);
      return;
    }

    mapWasPickupRef.current = true;
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => {
      if (!cancelled) setMapEnabled(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 400 });
    } else {
      timeoutId = setTimeout(enable, 400);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [formData.deliveryMethod, formData.deliveryType]);

  // Суммарный вес корзины в граммах из warehouse_items (для виджета доставки)
  useEffect(() => {
    if (!items.length) {
      setTotalWeightGrams(undefined);
      return;
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const hasValidUuid = (id: unknown) => typeof id === "string" && uuidRegex.test(id);
    const slugsFromItems = items.map(
      (item) =>
        (typeof item.productId === "number"
          ? getProductById(item.productId)?.slug
          : null) ?? item.product?.slug
    ).filter((s): s is string => !!s);
    const uniqueSlugs = Array.from(new Set(slugsFromItems));

    let cancelled = false;
    const slugToProduct: Record<string, ApiProductDetail | null> = {};
    Promise.all(
      uniqueSlugs.map(async (slug) => {
        const cached = productRawCache.get(slug);
        if (cached !== undefined) {
          slugToProduct[slug] = cached;
          return;
        }
        const data = await fetchCatalogProductRaw(slug);
        productRawCache.set(slug, data ?? null);
        if (data) slugToProduct[slug] = data;
      })
    ).then(() => {
      if (cancelled) return;
      const weightBySlug: Record<string, { warehouse_items?: Array<{ weight?: number; id?: string; uuid?: string; color?: string; size?: string }> }> = {};
      for (const [slug, productData] of Object.entries(slugToProduct)) {
        if (productData?.warehouse_items) {
          weightBySlug[slug] = {
            warehouse_items: productData.warehouse_items.map((wi) => ({
              weight: (wi as ApiWarehouseItem).weight,
              id: (wi as ApiWarehouseItem).id,
              uuid: (wi as { uuid?: string }).uuid,
              color: (wi as ApiWarehouseItem).color,
              size: (wi as ApiWarehouseItem).size,
            })),
          };
        }
      }

      let total = 0;
      for (const item of items) {
        const uuidFromCart = hasValidUuid(item.productId) ? item.productId : item.warehouseProduct;
        if (uuidFromCart && typeof uuidFromCart === "string") {
          let found = false;
          for (const productData of Object.values(slugToProduct)) {
            if (!productData?.warehouse_items) continue;
            const wi = productData.warehouse_items.find(
              (wi) => (wi.id ?? (wi as { uuid?: string }).uuid) === uuidFromCart
            ) as ApiWarehouseItem | undefined;
            if (wi && typeof wi.weight === "number") {
              total += wi.weight * item.quantity;
              found = true;
              break;
            }
          }
          if (!found)          continue;
        }
        const fullProduct =
          typeof item.productId === "number" ? getProductById(item.productId) : undefined;
        const productSlug = fullProduct?.slug ?? item.product?.slug;
        if (!productSlug) {
          continue;
        }
        const productData = slugToProduct[productSlug];
        const warehouseItem = productData?.warehouse_items?.find(
          (wi) =>
            (wi.color === item.color || (wi as { color_slug?: string }).color_slug === item.color) &&
            (wi.size === item.size || (wi as { size_slug?: string }).size_slug === item.size)
        ) as ApiWarehouseItem | undefined;
        const w = warehouseItem?.weight;
        if (typeof w === "number") {
          total += w * item.quantity;
        } else {
        }
      }
      const result = total > 0 ? total : undefined;
      setTotalWeightGrams(result);
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  // Автозаполнение личных данных и адресов доставки из личного кабинета (GET /api/auth/user/)
  useEffect(() => {
    if (!user) return;
    const dd = user.delivery_data;
    setFormData((prev) => ({
      ...prev,
      firstName: prev.firstName || user.first_name || "",
      lastName: prev.lastName || user.last_name || "",
      phone: prev.phone || user.phone_number || "",
      email: prev.email || user.email || "",
      deliveryFirstName: prev.deliveryFirstName || user.first_name || "",
      deliveryLastName: prev.deliveryLastName || user.last_name || "",
      deliveryPhone: prev.deliveryPhone || user.phone_number || "",
      deliveryEmail: prev.deliveryEmail || user.email || "",
      pvzAddress: prev.pvzAddress || (dd?.cdek_full_pvz_address ?? ""),
    }));
    if (dd?.cdek_full_pvz_address) {
      pvzAddressLatestRef.current = dd.cdek_full_pvz_address;
      setPvzAddressInputValue(dd.cdek_full_pvz_address);
    }
    if (dd?.street) {
      const courierAddr = [dd.city, dd.street, dd.house].filter(Boolean).join(", ");
      if (courierAddr) setMapSearchValue(courierAddr);
    }
  }, [user]);

  // При смене типа доставки подставляем сохранённый адрес из профиля (СДЕК ПВЗ / Яндекс ПВЗ)
  useEffect(() => {
    if (!user?.delivery_data || formData.deliveryMethod !== "pickup") return;
    const addr =
      formData.deliveryType === "cdek"
        ? user.delivery_data.cdek_full_pvz_address
        : user.delivery_data.yandex_full_pvz_address;
    const value = addr ?? "";
    setFormData((prev) => (prev.pvzAddress === value ? prev : { ...prev, pvzAddress: value }));
    pvzAddressLatestRef.current = value;
    setPvzAddressInputValue(value);
  }, [user?.delivery_data, formData.deliveryType, formData.deliveryMethod]);

  // При вставке/автозаполнении — снять фокус с кнопки, чтобы она стала серой
  useEffect(() => {
    const el = formContainerRef.current;
    if (!el) return;
    const blurSubmitIfActive = () => {
      if (submitButtonRef.current && document.activeElement === submitButtonRef.current) {
        submitButtonRef.current.blur();
      }
    };
    el.addEventListener("input", blurSubmitIfActive, true);
    el.addEventListener("change", blurSubmitIfActive, true);
    el.addEventListener("paste", blurSubmitIfActive, true);
    el.addEventListener("animationstart", blurSubmitIfActive, true);
    return () => {
      el.removeEventListener("input", blurSubmitIfActive, true);
      el.removeEventListener("change", blurSubmitIfActive, true);
      el.removeEventListener("paste", blurSubmitIfActive, true);
      el.removeEventListener("animationstart", blurSubmitIfActive, true);
    };
  }, []);

  // Если кнопка в фокусе, периодически проверяем: не изменились ли значения в инпутах (вставка/автофилл без событий) — тогда снять фокус
  useEffect(() => {
    const el = formContainerRef.current;
    if (!el) return;
    let lastSnapshot: Record<string, string> = {};
    const getInputsSnapshot = (): Record<string, string> => {
      const out: Record<string, string> = {};
      el.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input:not([type=checkbox]):not([type=radio]), select").forEach((node) => {
        const name = node.getAttribute("name");
        if (name) out[name] = node.value ?? "";
      });
      return out;
    };
    const tick = () => {
      if (!submitButtonRef.current || document.activeElement !== submitButtonRef.current) return;
      const current = getInputsSnapshot();
      if (Object.keys(lastSnapshot).length && JSON.stringify(current) !== JSON.stringify(lastSnapshot)) {
        submitButtonRef.current.blur();
      }
      lastSnapshot = current;
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, []);

  // Загрузка цветов только если есть позиции без colorLabel; не дублируем запрос, если передан initialColorSlugToLabel (с cart)
  useEffect(() => {
    const needsColors = items.some((item) => !item.colorLabel);
    if (!needsColors) return;
    if (Object.keys(initialColors).length > 0) return;
    fetchCatalogColors().then((colors) => {
      const map: Record<string, string> = {};
      colors.forEach((c) => {
        map[c.slug] = c.value;
      });
      setColorSlugToLabel(map);
    });
  }, [items, initialColors]);

  // Устанавливаем город "Москва" при выборе курьерской доставки
  useEffect(() => {
    if (formData.deliveryMethod === "yandex") {
      setFormData((prev) => ({
        ...prev,
        city: "Москва",
      }));
    }
  }, [formData.deliveryMethod]);

  // Стоимость доставки: ПВЗ — всегда бесплатно; курьер Яндекс — из расчёта B2B API
  const deliveryPrice = useMemo(() => {
    if (formData.deliveryMethod === "yandex" && yandexCourierEstimate && !yandexCourierEstimate.loading) {
      return yandexCourierEstimate.price;
    }
    return 0;
  }, [formData.deliveryMethod, yandexCourierEstimate]);

  /** Цена курьера загружается — показываем «рассчитывается» в UI */
  const isCourierPriceLoading = formData.deliveryMethod === "yandex" && yandexCourierEstimate?.loading === true;

  const handleCourierTariffChange = useCallback(
    (offerId: string) => {
      if (!yandexCourierOffers) return;
      const offer = yandexCourierOffers.find((o) => o.id === offerId);
      if (!offer) return;
      setSelectedCourierOfferId(offerId);
      setYandexCourierEstimate({
        price: offer.price,
        description: offer.description ?? "",
        deliveryFrom: offer.deliveryFrom,
        deliveryTo: offer.deliveryTo,
        loading: false,
      });
    },
    [yandexCourierOffers]
  );

  // Расчет итоговой суммы (с учётом промокода и доставки)
  const itemsSubtotalOriginal = useMemo(() => getTotalPrice(), [getTotalPrice]);

  const itemsSubtotal = useMemo(() => {
    if (!appliedPromo) return itemsSubtotalOriginal;
    return Math.max(0, itemsSubtotalOriginal - parseFloat(appliedPromo.discount));
  }, [itemsSubtotalOriginal, appliedPromo]);

  const totalAmountOriginal = useMemo(
    () => itemsSubtotalOriginal + deliveryPrice,
    [itemsSubtotalOriginal, deliveryPrice]
  );

  const totalAmount = useMemo(
    () => itemsSubtotal + deliveryPrice,
    [itemsSubtotal, deliveryPrice]
  );

  const modalDeliverySummaryLabel = useMemo(() => {
    if (isModalCourier) return "Доставка Яндекс курьером";
    if (formData.deliveryType === "cdek") return "Доставка СДЭК до ПВЗ";
    return "Доставка Яндекс до ПВЗ";
  }, [isModalCourier, formData.deliveryType]);

  const modalSummaryCity = useMemo(() => {
    const city = isModalPickup
      ? formData.pickupCity || "Москва"
      : formData.city || "Москва";
    return `Россия, г ${city}`;
  }, [isModalPickup, formData.pickupCity, formData.city]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  /** Первая буква каждого слова с заглавной */
  const capitalizeName = (str: string) => {
    return str
      .trim()
      .split(/\s+/)
      .map((word) =>
        word.length > 0
          ? word[0].toUpperCase() + word.slice(1).toLowerCase()
          : ""
      )
      .filter(Boolean)
      .join(" ");
  };

  const handlePhoneChange = (name: "phone" | "deliveryPhone") => (value: string) => {
    if (submitButtonRef.current && document.activeElement === submitButtonRef.current) {
      submitButtonRef.current.blur();
    }
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Если кнопка «Оформить заказ» в фокусе — снимаем фокус, чтобы она снова стала серой
    if (submitButtonRef.current && document.activeElement === submitButtonRef.current) {
      submitButtonRef.current.blur();
    }

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
        ...(!prev.pickupCity?.trim() ? { pickupCity: "Москва" } : {}),
      }));
      setSelectedPvzCoords(null);
      setYandexCourierEstimate(null);
      setYandexCourierOffers(null);
      setSelectedCourierOfferId(null);
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
        ...(value === "pickup" && !prev.pickupCity?.trim() ? { pickupCity: "Москва" } : {}),
      }));
      setSelectedPvzCoords(null);
      if (value === "pickup") {
        setYandexCourierEstimate(null);
        setYandexCourierOffers(null);
        setSelectedCourierOfferId(null);
      }
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.pvzAddress;
        delete newErrors.city;
        delete newErrors.street;
        delete newErrors.house;
        return newErrors;
      });
    } else {
      let processedValue = type === "checkbox" ? checked : value;
      if (type !== "checkbox") {
        if (
          name === "firstName" ||
          name === "lastName" ||
          name === "deliveryFirstName" ||
          name === "deliveryLastName"
        ) {
          processedValue = capitalizeName(value as string);
        }
      }
      setFormData((prev) => ({
        ...prev,
        [name]: processedValue,
      }));

      // Курьер: при вводе улицы/дома/города синхронизируем адрес в карту → метка обновится по геокоду
      if (
        (name === "street" || name === "house" || name === "city") &&
        formData.deliveryMethod === "yandex"
      ) {
        const nextCity = name === "city" ? String(value) : (formData.city || "Москва");
        const nextStreet = name === "street" ? String(value) : (formData.street || "");
        const nextHouse = name === "house" ? String(value) : (formData.house || "");
        const city = (nextCity || "Москва").trim();
        const street = (nextStreet || "").trim();
        const house = (nextHouse || "").trim();
        const streetPrefixes = /^(ул\.?|улица|пр\.?|проспект|пр-т|пер\.?|переулок|ш\.?|шоссе|б-р|бульвар)\s/i;
        const streetPart = street ? (streetPrefixes.test(street) ? street : `ул. ${street}`) : "";
        const housePart = house ? `д. ${house}` : "";
        const parts = [streetPart, housePart].filter(Boolean);
        const addressString = parts.length > 0 ? `${city}, ${parts.join(", ")}` : "";
        if (addressString.length >= 8) {
          if (mapSearchSyncTimeoutRef.current) clearTimeout(mapSearchSyncTimeoutRef.current);
          mapSearchSyncTimeoutRef.current = setTimeout(() => {
            mapSearchSyncTimeoutRef.current = null;
            setMapSearchValue(addressString);
          }, 200);
        }
      }
    }
  };

  const handleModalDeliveryOption = (option: ModalDeliveryOption) => {
    if (option === "cdek_pickup") {
      setFormData((prev) => ({
        ...prev,
        deliveryType: "cdek",
        deliveryMethod: "pickup",
        ...(!prev.pickupCity?.trim() ? { pickupCity: "Москва" } : {}),
      }));
    } else if (option === "yandex_pickup") {
      setFormData((prev) => ({
        ...prev,
        deliveryType: "yandex",
        deliveryMethod: "pickup",
        ...(!prev.pickupCity?.trim() ? { pickupCity: "Москва" } : {}),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        deliveryType: "yandex",
        deliveryMethod: "yandex",
        city: "Москва",
        deliveryFirstName: prev.deliveryFirstName || prev.firstName,
        deliveryLastName: prev.deliveryLastName || prev.lastName,
      }));
    }
    setSelectedPvzCoords(null);
    setYandexCourierEstimate(null);
    setYandexCourierOffers(null);
    setSelectedCourierOfferId(null);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.pvzAddress;
      delete newErrors.city;
      delete newErrors.street;
      delete newErrors.house;
      return newErrors;
    });
  };

  const handleAddressSelectImpl = useCallback((addressData: {
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
      setShowContinueButtonAgain(true);

      // При выборе ПВЗ не вызываем delivery-data: адрес сохраняется только в форме заказа, профиль не меняем.
    } else {
      // Для курьерской доставки сохраняем полный адрес только в форме заказа. delivery-data вызывается только в личном кабинете.
      const newAddress = {
        city: addressData.city || "",
        street: addressData.street || "",
        house: addressData.house || "",
      };
      setFormData((prev) => ({
        ...prev,
        ...newAddress,
      }));

      // Рассчитываем стоимость курьерской доставки через Яндекс B2B API
      if (fullAddress || (typeof addressData.lat === "number" && typeof addressData.lon === "number")) {
        setYandexCourierOffers(null);
        setSelectedCourierOfferId(null);
        setYandexCourierEstimate({ price: 0, description: "", deliveryFrom: null, deliveryTo: null, loading: true });
        const params = new URLSearchParams({
          dest_address: fullAddress || [addressData.street, addressData.house, addressData.city].filter(Boolean).join(", "),
          weight_grams: String(totalWeightGrams ?? 1000),
        });
        if (typeof addressData.lat === "number" && typeof addressData.lon === "number") {
          params.set("dest_lat", String(addressData.lat));
          params.set("dest_lon", String(addressData.lon));
        }
        courierCalcAbortRef.current?.abort();
        const courierAc = new AbortController();
        courierCalcAbortRef.current = courierAc;
        fetch(`/api/yandex/courier/calculate?${params.toString()}`, {
          signal: courierAc.signal,
        })
          .then((r) => r.json())
          .then((data: {
            from_api?: boolean;
            price?: number;
            description?: string;
            delivery_from?: string | null;
            delivery_to?: string | null;
            error?: string;
            offers?: Array<{
              id: string;
              taxi_class?: string | null;
              description?: string | null;
              price?: number;
              delivery_from?: string | null;
              delivery_to?: string | null;
            }>;
            best_index?: number;
            no_offers?: boolean;
          }) => {
            if (courierAc.signal.aborted) return;
            if (data.from_api && data.offers && data.offers.length) {
              const offers: YandexCourierOffer[] = data.offers
                .filter((o) => typeof o.price === "number")
                .map((o) => ({
                  id: String(o.id),
                  taxiClass: o.taxi_class ?? null,
                  description: o.description ?? null,
                  price: o.price as number,
                  deliveryFrom: o.delivery_from ?? null,
                  deliveryTo: o.delivery_to ?? null,
                }));

              if (!offers.length) {
                setYandexCourierOffers(null);
                setSelectedCourierOfferId(null);
                setYandexCourierEstimate(null);
                return;
              }

              const bestIndex =
                typeof data.best_index === "number" && data.best_index >= 0 && data.best_index < offers.length
                  ? data.best_index
                  : 0;
              const best = offers[bestIndex] ?? offers[0];

              setYandexCourierOffers(offers);
              setSelectedCourierOfferId(best.id);
              setYandexCourierEstimate({
                price: best.price,
                description: best.description ?? "",
                deliveryFrom: best.deliveryFrom,
                deliveryTo: best.deliveryTo,
                loading: false,
              });
            } else {
              setYandexCourierEstimate(null);
              setYandexCourierOffers(null);
              setSelectedCourierOfferId(null);
            }
          })
          .catch((err) => {
            if (err?.name === "AbortError" || courierAc.signal.aborted) return;
            setYandexCourierEstimate(null);
            setYandexCourierOffers(null);
            setSelectedCourierOfferId(null);
          });
      }
    }

    // Обновляем поиск по карте только для курьерской доставки; при выборе ПВЗ не трогаем — избегаем «телепорта» карты
    if (!addressData.pvzCode && !addressData.pvzId && fullAddress && fullAddress !== mapSearchValue) {
      setMapSearchValue(fullAddress);
    }

    setTimeout(() => {
      isUpdatingFromMapRef.current = false;
    }, 1000);
  }, [formData.deliveryMethod, mapSearchValue]);

  const handleAddressSelectRef = useRef(handleAddressSelectImpl);
  handleAddressSelectRef.current = handleAddressSelectImpl;
  const handleAddressSelect = useCallback(
    (data: Parameters<typeof handleAddressSelectImpl>[0]) => {
      handleAddressSelectRef.current(data);
    },
    []
  );

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
      addressSuggestAbortRef.current?.abort();
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
      addressSuggestAbortRef.current?.abort();
      const ac = new AbortController();
      addressSuggestAbortRef.current = ac;
      getAddressSuggestions(query, ac.signal)
        .then((list) => {
          if (!ac.signal.aborted) setAddressSuggestions(list);
        })
        .catch((err) => {
          if (err?.name === "AbortError" || ac.signal.aborted) return;
          setAddressSuggestions([]);
        });
    }, ADDRESS_SUGGEST_DEBOUNCE_MS);
    return () => {
      if (addressSuggestTimerRef.current) {
        clearTimeout(addressSuggestTimerRef.current);
        addressSuggestTimerRef.current = null;
      }
      addressSuggestAbortRef.current?.abort();
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

  // inputs → map: при изменении city/street/house (курьер) обновляем mapSearchValue для геокодинга
  useEffect(() => {
    if (formData.deliveryMethod !== "yandex") return;
    if (isUpdatingFromMapRef.current) return;

    const street = (formData.street || "").trim();
    const house = (formData.house || "").trim();
    const city = (formData.city || "Москва").trim();

    // Собираем адрес в формате для геокодинга (добавляем ул. только если нет типа)
    const streetPrefixes = /^(ул\.?|улица|пр\.?|проспект|пр-т|пер\.?|переулок|ш\.?|шоссе|б-р|бульвар)\s/i;
    const streetPart = street ? (streetPrefixes.test(street) ? street : `ул. ${street}`) : "";
    const housePart = house ? `д. ${house}` : "";
    const parts = [streetPart, housePart].filter(Boolean);
    const addressString = parts.length > 0 ? `${city}, ${parts.join(", ")}` : "";

    if (addressString && addressString.length >= 8 && addressString !== mapSearchValue) {
      const timeoutId = setTimeout(() => {
        setMapSearchValue(addressString);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [formData.deliveryMethod, formData.city, formData.street, formData.house, mapSearchValue]);

  // Синхронизация поля адреса в левом виджете Яндекса с нашим «Адресом пункта выдачи».
  // Только присваиваем value, без dispatchEvent — иначе виджет открывает поиск при подстановке.
  useEffect(() => {
    if (formData.deliveryMethod !== "pickup") return;
    const value = formData.pvzAddress.trim();
    if (!value) return;

    try {
      const root = document.getElementById("delivery-widget");
      if (!root) return;

      const addressInput =
        (root.querySelector('input[type="text"]') as HTMLInputElement | null) ??
        null;
      if (!addressInput) return;

      if (addressInput.value === value) return;
      addressInput.value = value;
    } catch {
      // Молча игнорируем, если структура виджета изменилась
    }
  }, [formData.deliveryMethod, formData.pvzAddress]);

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
    if (!formData.phone.trim() || validatePhone(formData.phone) !== true) {
      newErrors.phone = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = true;
    }

    // Валидация данных получателя, если отличается от покупателя
    // Для ПВЗ блок «Данные о доставке» скрыт, поэтому эти поля не проверяем
    if (formData.deliveryMethod !== "pickup" && formData.differentRecipient) {
      if (!formData.deliveryFirstName.trim()) {
        newErrors.deliveryFirstName = true;
      }
      if (!formData.deliveryLastName.trim()) {
        newErrors.deliveryLastName = true;
      }
      if (!formData.deliveryPhone.trim() || validatePhone(formData.deliveryPhone) !== true) {
        newErrors.deliveryPhone = true;
      }
      if (!formData.deliveryEmail.trim()) {
        newErrors.deliveryEmail = true;
      }
    }

    // Валидация данных доставки
    if (formData.deliveryMethod === "pickup") {
      // Для ПВЗ нужно проверить, что выбран пункт выдачи.
      // Сейчас и для CDEK, и для Яндекс-ПВЗ выбор идёт через один виджет,
      // который отдаёт только pvzId, поэтому считаем валидным, если есть
      // либо pvzCode, либо pvzId.
      if (formData.deliveryType === "cdek" && !pvzCode && !pvzId) {
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
      if (newErrors.phone) {
        setPaymentErrorToast("Укажите корректный номер телефона для оформления заказа.");
      } else if (newErrors.pvzAddress) {
        setPaymentErrorToast("Выберите пункт выдачи на карте или в списке.");
      }
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
    if (isSubmitting) {
      return;
    }

    if (formData.deliveryMethod === "yandex" && !courierAvailable) {
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
            formData.deliveryComment && `комментарий: ${formData.deliveryComment}`,
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
          const cached = productRawCache.get(slug);
          if (cached !== undefined) {
            slugToProduct[slug] = cached;
            return;
          }
          const data = await fetchCatalogProductRaw(slug);
          productRawCache.set(slug, data ?? null);
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
        total_amount: totalAmount.toFixed(2),
        payment_type: "prepayment",
        delivery_service: deliveryService,
        customer_data: {
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
        },
        positions: validPositions,
      };
      if (appliedPromo?.promoCode) {
        orderRequest.promocode_value = appliedPromo.promoCode;
      }

      // Добавляем данные доставки в зависимости от типа
      if (deliveryService === "cdek") {
        // Для CDEK обязательно заполняем cdek_delivery_data
        orderRequest.cdek_delivery_data = {
          // Если кода CDEK нет, пробуем использовать pvzId из виджета,
          // чтобы на бэке было хоть какое-то значение, а не заглушка.
          pvz_code: pvzCode || pvzId || "DEFAULT",
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

      // Создаем заказ
      const orderResponse = await createOrder(orderRequest);

      invalidateMyOrdersCache();

      // Сбрасываем применённый промокод после успешного создания заказа
      setAppliedPromo(null);

      // Сохраняем order_id для дальнейшего использования
      const orderId = orderResponse.id;

      // Обработка оплаты в зависимости от выбранного способа
      if (formData.paymentMethod === "card" || formData.paymentMethod === "sberbank") {
        // Оплата картой или СБП — return_url/cancel_url формируются в API относительно текущей страницы
        try {
          const paymentResponse = await getPaymentUrl(orderId);
          
          // Используем confirmation_url или payment_url для обратной совместимости
          const paymentUrl = paymentResponse.confirmation_url || paymentResponse.payment_url;
          
          if (paymentUrl) {
            // Перенаправляем на страницу оплаты
            window.location.href = paymentUrl;
            return;
          }
        } catch (error) {
          setPaymentErrorToast("Не удалось перейти к оплате. Попробуйте ещё раз или свяжитесь с поддержкой.");
        }
      } else if (formData.paymentMethod === "yandexpay" || formData.paymentMethod === "installment") {
        // Яндекс Pay и Долями — return_url/cancel_url формируются в API относительно текущей страницы
        try {
          const paymentResponse = await getYandexPaymentUrl(orderId);
          
          const paymentUrl = paymentResponse.confirmation_url || paymentResponse.payment_url;
          
          if (paymentUrl) {
            window.location.href = paymentUrl;
            return;
          }
        } catch (error) {
          setPaymentErrorToast("Не удалось перейти к оплате. Попробуйте оплатить картой или СБП, либо свяжитесь с поддержкой.");
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
          amount: formatPrice(totalAmount),
        },
        products: items.map((item) => {
          const fullProduct =
            typeof item.productId === "number"
              ? getProductById(item.productId)
              : undefined;
          const colorLabel =
            item.colorLabel ||
            colorSlugToLabel[item.color] ||
            fullProduct?.availableColors.find((c) => c.value === item.color)
              ?.label ||
            item.color;

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
          totalAmount: formatPrice(totalAmount),
          totalAmountValue: totalAmount,
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
        }
      }

      if (onOrderSubmit) {
        onOrderSubmit(newOrderNumber);
      }
    } catch (error) {
      const message =
        "К сожалению, оформить заказ не удалось: один или несколько товаров отсутствуют в наличии или их количество ограничено. Пожалуйста, обновите корзину и попробуйте оформить заказ повторно либо свяжитесь со службой поддержки.";
      setIsSubmitting(false);
      clearCart();
      redirectToCartWithError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className={className}>
      <div ref={formContainerRef} className={styles.content}>
        <div className={styles.leftColumn}>
          <CheckoutPersonalSection
            firstName={formData.firstName}
            lastName={formData.lastName}
            email={formData.email}
            phone={formData.phone}
            errors={errors}
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            emailRef={emailRef}
            phoneRef={phoneRef}
            onInputChange={handleInputChange}
            onPhoneChange={handlePhoneChange("phone")}
          />

          <CheckoutDeliverySection
            isModalCourier={isModalCourier}
            isModalPickup={isModalPickup}
            modalDeliveryOption={modalDeliveryOption}
            deliveryMethod={formData.deliveryMethod}
            deliveryType={formData.deliveryType}
            pickupCity={formData.pickupCity}
            street={formData.street}
            house={formData.house}
            floor={formData.floor}
            deliveryComment={formData.deliveryComment}
            deliveryFirstName={formData.deliveryFirstName}
            deliveryLastName={formData.deliveryLastName}
            pvzAddress={formData.pvzAddress}
            pvzAddressInputValue={pvzAddressInputValue}
            mapSearchValue={mapSearchValue}
            selectedPvzCoords={selectedPvzCoords}
            totalWeightGrams={totalWeightGrams}
            mapEnabled={mapEnabled}
            hideContinueButton={hideContinueButton}
            isCartMobilePvz={isCartMobilePvz}
            errors={errors}
            yandexCourierOffers={yandexCourierOffers}
            selectedCourierOfferId={selectedCourierOfferId}
            courierAvailable={courierAvailable}
            streetRef={streetRef}
            houseRef={houseRef}
            deliveryFirstNameRef={deliveryFirstNameRef}
            deliveryLastNameRef={deliveryLastNameRef}
            mapSectionRef={mapSectionRef}
            onInputChange={handleInputChange}
            onModalDeliveryOption={handleModalDeliveryOption}
            onCourierTariffChange={handleCourierTariffChange}
            onShowContinueButtonAgain={() => setShowContinueButtonAgain(true)}
            onPvzSearchChange={(v) => {
              setPvzAddressInputValue(v);
              schedulePvzAddressSync(v);
            }}
            onMapSearchChange={handleMapSearchChange}
            onAddressSelect={handleAddressSelect}
            onPvzListLoaded={setPvzOptions}
            onCdekDeliveryEstimate={setCdekDeliveryEstimate}
            onYandexContinueClick={() => setShowContinueButtonAgain(false)}
            onYandexWidgetInteraction={() => setShowContinueButtonAgain(true)}
            formatPrice={formatPrice}
          />

          <CheckoutPaymentSection
            paymentMethod={formData.paymentMethod}
            deliveryMethod={formData.deliveryMethod}
            courierAvailable={courierAvailable}
            isSubmitting={isSubmitting}
            itemsSubtotal={itemsSubtotal}
            itemsSubtotalOriginal={itemsSubtotalOriginal}
            deliveryPrice={deliveryPrice}
            totalAmount={totalAmount}
            totalAmountOriginal={totalAmountOriginal}
            hasPromoDiscount={Boolean(appliedPromo)}
            isCourierPriceLoading={isCourierPriceLoading}
            modalDeliverySummaryLabel={modalDeliverySummaryLabel}
            modalSummaryCity={modalSummaryCity}
            modalPromo={modalPromo}
            submitButtonRef={submitButtonRef}
            onInputChange={handleInputChange}
            onSubmitOrder={handleSubmitOrder}
            formatPrice={formatPrice}
          />
        </div>
      </div>
    </div>
    {paymentErrorToast && (
      <PromoErrorToast
        message={paymentErrorToast}
        onClose={() => setPaymentErrorToast(null)}
        duration={5000}
      />
    )}
    </>
  );
};

export default CheckoutForm;

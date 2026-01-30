(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/NavigationTracker/NavigationTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const LAST_PATH_KEY = "znves:lastPath";
const PREVIOUS_PATH_KEY = "znves:previousPath";
const NavigationTracker = ()=>{
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationTracker.useEffect": ()=>{
            setIsMounted(true);
        }
    }["NavigationTracker.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationTracker.useEffect": ()=>{
            if (!isMounted || !pathname) {
                return;
            }
            const lastPath = sessionStorage.getItem(LAST_PATH_KEY);
            if (lastPath && lastPath !== pathname) {
                sessionStorage.setItem(PREVIOUS_PATH_KEY, lastPath);
            }
            sessionStorage.setItem(LAST_PATH_KEY, pathname);
        }
    }["NavigationTracker.useEffect"], [
        pathname,
        isMounted
    ]);
    return null;
};
_s(NavigationTracker, "vBUUMTT5VQXiwKnQjd+hLlaSYzk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavigationTracker;
const __TURBOPACK__default__export__ = NavigationTracker;
var _c;
__turbopack_context__.k.register(_c, "NavigationTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/auth/authApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API для авторизации через Telegram
__turbopack_context__.s([
    "checkTelegramAuth",
    ()=>checkTelegramAuth,
    "getAuthHeaders",
    ()=>getAuthHeaders,
    "getTelegramBotUrl",
    ()=>getTelegramBotUrl,
    "redirectToTelegramBot",
    ()=>redirectToTelegramBot
]);
const TELEGRAM_LOGIN_URL = "http://62.84.115.11:8000/api/auth/telegram-login/";
const TELEGRAM_BOT_USERNAME = "@my_znves_bot";
const AUTH_STORAGE_KEY = "znves:auth";
const getAuthHeaders = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
        if (!stored) return {};
        const data = JSON.parse(stored);
        const token = typeof (data === null || data === void 0 ? void 0 : data.token) === "string" ? data.token : typeof (data === null || data === void 0 ? void 0 : data.access_token) === "string" ? data.access_token : typeof (data === null || data === void 0 ? void 0 : data.access) === "string" ? data.access : null;
        if (token) {
            return {
                Authorization: "Bearer ".concat(token)
            };
        }
    } catch (e) {
    // ignore
    }
    return {};
};
const checkTelegramAuth = async ()=>{
    try {
        console.log("Checking Telegram auth, URL:", TELEGRAM_LOGIN_URL);
        const response = await fetch(TELEGRAM_LOGIN_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            credentials: "include",
            mode: "cors"
        });
        if (!response.ok) {
            // Если пользователь не авторизован или неверный запрос — возвращаем null
            if (response.status === 400 || response.status === 401 || response.status === 403) {
                console.log("User not authenticated or bad request:", response.status);
                return null;
            }
            const errorText = await response.text();
            console.error("Telegram auth API error: ".concat(response.status), errorText);
            return null;
        }
        const data = await response.json();
        // Выводим данные в консоль как требуется
        console.log("Telegram auth data:", data);
        return data;
    } catch (error) {
        // Обрабатываем разные типы ошибок
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            console.warn("Failed to fetch Telegram auth. Possible causes:", "- CORS issue (server needs to allow requests from this origin)", "- Network error (server might be down)", "- URL might be incorrect");
            console.warn("Auth check failed, user will be redirected to bot on next action");
        } else {
            console.error("Error checking Telegram auth:", error);
        }
        // Возвращаем null при любой ошибке - это означает, что пользователь не авторизован
        return null;
    }
};
const getTelegramBotUrl = ()=>{
    const botUsername = TELEGRAM_BOT_USERNAME.replace("@", "").trim();
    // Используем простой URL без параметров - Telegram автоматически откроет бота
    return "https://t.me/".concat(botUsername);
};
const redirectToTelegramBot = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const botUsername = TELEGRAM_BOT_USERNAME.replace("@", "").trim();
    // Определяем, мобильное устройство или нет
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let url;
    if (isMobile) {
        // Для мобильных устройств используем tg:// протокол
        url = "tg://resolve?domain=".concat(botUsername);
    } else {
        // Для десктопа используем https://t.me/ без параметров
        url = "https://t.me/".concat(botUsername);
    }
    console.log("Redirecting to Telegram bot:", url, "Bot username:", botUsername);
    try {
        window.location.href = url;
    } catch (error) {
        console.error("Error redirecting to Telegram bot:", error);
        // Fallback на обычный URL
        window.location.href = "https://t.me/".concat(botUsername);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/cart/cartApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API корзины — добавление товара (получаем warehouse_product UUID для заказа)
__turbopack_context__.s([
    "addToCart",
    ()=>addToCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/auth/authApi.ts [app-client] (ecmascript)");
;
const CART_API_URL = "http://62.84.115.11:8000/api/cart/";
const addToCart = async (productSlug, colorSlug, sizeSlug)=>{
    const body = {
        product_slug: productSlug,
        color_slug: colorSlug,
        size_slug: sizeSlug
    };
    const response = await fetch(CART_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthHeaders"])()
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const errorText = await response.text();
        let message = errorText || "".concat(response.status, " ").concat(response.statusText);
        try {
            const errJson = JSON.parse(errorText);
            if (errJson.detail) message = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
        } catch (e) {}
        throw new Error("Ошибка добавления в корзину: ".concat(message));
    }
    return response.json();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cart$2f$cartApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/cart/cartApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CART_STORAGE_KEY = "znves:cart";
const getCartFromStorage = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};
const saveCartToStorage = (items)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
    // Ignore storage errors
    }
};
const CartProvider = (param)=>{
    let { children } = param;
    _s();
    // Инициализируем с пустым массивом для SSR совместимости
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Загружаем данные из localStorage только после монтирования на клиенте
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            const storedItems = getCartFromStorage();
            setItems(storedItems);
            setIsHydrated(true);
        }
    }["CartProvider.useEffect"], []);
    // Сохраняем в localStorage только после гидратации
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            if (isHydrated) {
                saveCartToStorage(items);
            }
        }
    }["CartProvider.useEffect"], [
        items,
        isHydrated
    ]);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[addItem]": async function(product, size, color) {
            let quantity = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
            let warehouseProduct;
            if (product.slug) {
                try {
                    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cart$2f$cartApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToCart"])(product.slug, color, size);
                    warehouseProduct = res.warehouse_product;
                } catch (err) {
                    console.warn("Cart API (add to cart) failed, adding locally without warehouse_product:", err);
                }
            }
            setItems({
                "CartProvider.useCallback[addItem]": (prevItems)=>{
                    const existingIndex = prevItems.findIndex({
                        "CartProvider.useCallback[addItem].existingIndex": (item)=>item.productId === product.id && item.size === size && item.color === color
                    }["CartProvider.useCallback[addItem].existingIndex"]);
                    if (existingIndex >= 0) {
                        const updated = [
                            ...prevItems
                        ];
                        updated[existingIndex] = {
                            ...updated[existingIndex],
                            quantity: updated[existingIndex].quantity + quantity,
                            warehouseProduct: warehouseProduct !== null && warehouseProduct !== void 0 ? warehouseProduct : updated[existingIndex].warehouseProduct
                        };
                        return updated;
                    }
                    return [
                        ...prevItems,
                        {
                            productId: product.id,
                            size,
                            color,
                            quantity,
                            product,
                            warehouseProduct
                        }
                    ];
                }
            }["CartProvider.useCallback[addItem]"]);
        }
    }["CartProvider.useCallback[addItem]"], []);
    const removeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[removeItem]": (productId, size, color)=>{
            setItems({
                "CartProvider.useCallback[removeItem]": (prevItems)=>prevItems.filter({
                        "CartProvider.useCallback[removeItem]": (item)=>!(item.productId === productId && item.size === size && item.color === color)
                    }["CartProvider.useCallback[removeItem]"])
            }["CartProvider.useCallback[removeItem]"]);
        }
    }["CartProvider.useCallback[removeItem]"], []);
    const updateQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[updateQuantity]": (productId, size, color, quantity)=>{
            if (quantity <= 0) {
                removeItem(productId, size, color);
                return;
            }
            setItems({
                "CartProvider.useCallback[updateQuantity]": (prevItems)=>prevItems.map({
                        "CartProvider.useCallback[updateQuantity]": (item)=>item.productId === productId && item.size === size && item.color === color ? {
                                ...item,
                                quantity
                            } : item
                    }["CartProvider.useCallback[updateQuantity]"])
            }["CartProvider.useCallback[updateQuantity]"]);
        }
    }["CartProvider.useCallback[updateQuantity]"], [
        removeItem
    ]);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[clearCart]": ()=>{
            setItems([]);
        }
    }["CartProvider.useCallback[clearCart]"], []);
    const getTotalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[getTotalPrice]": ()=>{
            return items.reduce({
                "CartProvider.useCallback[getTotalPrice]": (total, item)=>{
                    return total + item.product.priceValue * item.quantity;
                }
            }["CartProvider.useCallback[getTotalPrice]"], 0);
        }
    }["CartProvider.useCallback[getTotalPrice]"], [
        items
    ]);
    const getTotalItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CartProvider.useCallback[getTotalItems]": ()=>{
            return items.reduce({
                "CartProvider.useCallback[getTotalItems]": (total, item)=>total + item.quantity
            }["CartProvider.useCallback[getTotalItems]"], 0);
        }
    }["CartProvider.useCallback[getTotalItems]"], [
        items
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            getTotalPrice,
            getTotalItems
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/CartContext.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartProvider, "fJGCGexOXaEgUvB0q4iYI7R7p9M=");
_c = CartProvider;
const useCart = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/auth/authApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AUTH_STORAGE_KEY = "znves:auth";
const getAuthFromStorage = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
};
const saveAuthToStorage = (user)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        if (user) {
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            sessionStorage.removeItem(AUTH_STORAGE_KEY);
        }
    } catch (e) {
    // Ignore storage errors
    }
};
const AuthProvider = (param)=>{
    let { children } = param;
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Загружаем данные из sessionStorage только после монтирования на клиенте
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const storedUser = getAuthFromStorage();
            setUser(storedUser);
            setIsHydrated(true);
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    // Проверяем авторизацию на сервере
    const checkAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[checkAuth]": async ()=>{
            if (!isHydrated) {
                return;
            }
            setIsLoading(true);
            try {
                const authData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkTelegramAuth"])();
                // Если authData null, это может быть как "не авторизован", так и "ошибка сети"
                // В любом случае считаем пользователя неавторизованным
                setUser(authData);
                saveAuthToStorage(authData);
            } catch (error) {
                // Ошибка уже обработана в checkTelegramAuth, просто устанавливаем null
                console.warn("Auth check completed with error, user considered not authenticated");
                setUser(null);
                saveAuthToStorage(null);
            } finally{
                setIsLoading(false);
            }
        }
    }["AuthProvider.useCallback[checkAuth]"], [
        isHydrated
    ]);
    // Перенаправление на бота
    const redirectToBot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[redirectToBot]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirectToTelegramBot"])();
        }
    }["AuthProvider.useCallback[redirectToBot]"], []);
    // Проверяем авторизацию только при возврате из бота (фокус/вкладка), не при каждой перезагрузке
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (!isHydrated) {
                return;
            }
            const handleFocus = {
                "AuthProvider.useEffect.handleFocus": ()=>{
                    // Проверяем авторизацию при возврате на страницу
                    checkAuth();
                }
            }["AuthProvider.useEffect.handleFocus"];
            const handleVisibilityChange = {
                "AuthProvider.useEffect.handleVisibilityChange": ()=>{
                    if (document.visibilityState === "visible") {
                        checkAuth();
                    }
                }
            }["AuthProvider.useEffect.handleVisibilityChange"];
            window.addEventListener("focus", handleFocus);
            document.addEventListener("visibilitychange", handleVisibilityChange);
            return ({
                "AuthProvider.useEffect": ()=>{
                    window.removeEventListener("focus", handleFocus);
                    document.removeEventListener("visibilitychange", handleVisibilityChange);
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        isHydrated,
        checkAuth
    ]);
    const isAuthenticated = !!user;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            isAuthenticated,
            user,
            isLoading,
            checkAuth,
            redirectToBot
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "tlZmNxHS4q8ihkHlU8R5knmbn24=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Toast/Toast.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "slideIn": "Toast-module__9WWWZG__slideIn",
  "slideInMobile": "Toast-module__9WWWZG__slideInMobile",
  "slideOut": "Toast-module__9WWWZG__slideOut",
  "slideOutMobile": "Toast-module__9WWWZG__slideOutMobile",
  "toast": "Toast-module__9WWWZG__toast",
  "toastClosing": "Toast-module__9WWWZG__toastClosing",
  "toastMessage": "Toast-module__9WWWZG__toastMessage",
});
}),
"[project]/src/components/ui/Toast/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const Toast = (param)=>{
    let { message, onClose, duration = 3000 } = param;
    _s();
    const [isClosing, setIsClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            let closeTimer = null;
            const timer = setTimeout({
                "Toast.useEffect.timer": ()=>{
                    setIsClosing(true);
                    // Ждем завершения анимации исчезновения перед вызовом onClose
                    closeTimer = setTimeout({
                        "Toast.useEffect.timer": ()=>{
                            onClose();
                        }
                    }["Toast.useEffect.timer"], 300); // Длительность анимации slideOut
                }
            }["Toast.useEffect.timer"], duration);
            return ({
                "Toast.useEffect": ()=>{
                    clearTimeout(timer);
                    if (closeTimer) {
                        clearTimeout(closeTimer);
                    }
                }
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        duration,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toast, " ").concat(isClosing ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toastClosing : ""),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toastMessage,
            children: message
        }, void 0, false, {
            fileName: "[project]/src/components/ui/Toast/Toast.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Toast/Toast.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Toast, "ipWZdoaKtkla/sNXeWUi9+m3qRw=");
_c = Toast;
const __TURBOPACK__default__export__ = Toast;
var _c;
__turbopack_context__.k.register(_c, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ToastProvider/ToastProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ToastProvider = (param)=>{
    let { children } = param;
    _s();
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[showToast]": (message)=>{
            const id = Date.now();
            setToast({
                message,
                id
            });
        }
    }["ToastProvider.useCallback[showToast]"], []);
    const handleClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToastProvider.useCallback[handleClose]": ()=>{
            setToast(null);
        }
    }["ToastProvider.useCallback[handleClose]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            showToast
        },
        children: [
            children,
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: toast.message,
                onClose: handleClose
            }, toast.id, false, {
                fileName: "[project]/src/components/ui/ToastProvider/ToastProvider.tsx",
                lineNumber: 36,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/ToastProvider/ToastProvider.tsx",
        lineNumber: 33,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ToastProvider, "gAA8coPrD4Y30Gh9LJXcFhEKzQ4=");
_c = ToastProvider;
const useToast = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
_s1(useToast, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_7ad8a640._.js.map
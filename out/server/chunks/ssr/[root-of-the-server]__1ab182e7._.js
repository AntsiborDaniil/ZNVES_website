module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/NavigationTracker/NavigationTracker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const LAST_PATH_KEY = "znves:lastPath";
const PREVIOUS_PATH_KEY = "znves:previousPath";
const NavigationTracker = ()=>{
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsMounted(true);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isMounted || !pathname) {
            return;
        }
        const lastPath = sessionStorage.getItem(LAST_PATH_KEY);
        if (lastPath && lastPath !== pathname) {
            sessionStorage.setItem(PREVIOUS_PATH_KEY, lastPath);
        }
        sessionStorage.setItem(LAST_PATH_KEY, pathname);
    }, [
        pathname,
        isMounted
    ]);
    return null;
};
const __TURBOPACK__default__export__ = NavigationTracker;
}),
"[project]/src/api/auth/authApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    if ("TURBOPACK compile-time truthy", 1) return {};
    //TURBOPACK unreachable
    ;
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
            console.error(`Telegram auth API error: ${response.status}`, errorText);
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
    return `https://t.me/${botUsername}`;
};
const redirectToTelegramBot = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const botUsername = undefined;
    // Определяем, мобильное устройство или нет
    const isMobile = undefined;
    let url;
};
}),
"[project]/src/api/cart/cartApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API корзины — добавление товара (получаем warehouse_product UUID для заказа)
__turbopack_context__.s([
    "addToCart",
    ()=>addToCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/auth/authApi.ts [app-ssr] (ecmascript)");
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
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthHeaders"])()
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const errorText = await response.text();
        let message = errorText || `${response.status} ${response.statusText}`;
        try {
            const errJson = JSON.parse(errorText);
            if (errJson.detail) message = typeof errJson.detail === "string" ? errJson.detail : JSON.stringify(errJson.detail);
        } catch  {}
        throw new Error(`Ошибка добавления в корзину: ${message}`);
    }
    return response.json();
};
}),
"[project]/src/contexts/CartContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cart$2f$cartApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/cart/cartApi.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CART_STORAGE_KEY = "znves:cart";
const getCartFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return [];
    }
    //TURBOPACK unreachable
    ;
};
const saveCartToStorage = (items)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
};
const CartProvider = ({ children })=>{
    // Инициализируем с пустым массивом для SSR совместимости
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Загружаем данные из localStorage только после монтирования на клиенте
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedItems = getCartFromStorage();
        setItems(storedItems);
        setIsHydrated(true);
    }, []);
    // Сохраняем в localStorage только после гидратации
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isHydrated) {
            saveCartToStorage(items);
        }
    }, [
        items,
        isHydrated
    ]);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (product, size, color, quantity = 1)=>{
        let warehouseProduct;
        if (product.slug) {
            try {
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cart$2f$cartApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addToCart"])(product.slug, color, size);
                warehouseProduct = res.warehouse_product;
            } catch (err) {
                console.warn("Cart API (add to cart) failed, adding locally without warehouse_product:", err);
            }
        }
        setItems((prevItems)=>{
            const existingIndex = prevItems.findIndex((item)=>item.productId === product.id && item.size === size && item.color === color);
            if (existingIndex >= 0) {
                const updated = [
                    ...prevItems
                ];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                    warehouseProduct: warehouseProduct ?? updated[existingIndex].warehouseProduct
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
        });
    }, []);
    const removeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((productId, size, color)=>{
        setItems((prevItems)=>prevItems.filter((item)=>!(item.productId === productId && item.size === size && item.color === color)));
    }, []);
    const updateQuantity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((productId, size, color, quantity)=>{
        if (quantity <= 0) {
            removeItem(productId, size, color);
            return;
        }
        setItems((prevItems)=>prevItems.map((item)=>item.productId === productId && item.size === size && item.color === color ? {
                    ...item,
                    quantity
                } : item));
    }, [
        removeItem
    ]);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setItems([]);
    }, []);
    const getTotalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return items.reduce((total, item)=>{
            return total + item.product.priceValue * item.quantity;
        }, 0);
    }, [
        items
    ]);
    const getTotalItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return items.reduce((total, item)=>total + item.quantity, 0);
    }, [
        items
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
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
const useCart = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/auth/authApi.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AUTH_STORAGE_KEY = "znves:auth";
const getAuthFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
};
const saveAuthToStorage = (user)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
};
const AuthProvider = ({ children })=>{
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Загружаем данные из sessionStorage только после монтирования на клиенте
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedUser = getAuthFromStorage();
        setUser(storedUser);
        setIsHydrated(true);
        setIsLoading(false);
    }, []);
    // Проверяем авторизацию на сервере
    const checkAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!isHydrated) {
            return;
        }
        setIsLoading(true);
        try {
            const authData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkTelegramAuth"])();
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
    }, [
        isHydrated
    ]);
    // Перенаправление на бота
    const redirectToBot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$auth$2f$authApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["redirectToTelegramBot"])();
    }, []);
    // Проверяем авторизацию только при возврате из бота (фокус/вкладка), не при каждой перезагрузке
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isHydrated) {
            return;
        }
        const handleFocus = ()=>{
            // Проверяем авторизацию при возврате на страницу
            checkAuth();
        };
        const handleVisibilityChange = ()=>{
            if (document.visibilityState === "visible") {
                checkAuth();
            }
        };
        window.addEventListener("focus", handleFocus);
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return ()=>{
            window.removeEventListener("focus", handleFocus);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [
        isHydrated,
        checkAuth
    ]);
    const isAuthenticated = !!user;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
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
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
}),
"[project]/src/components/ui/Toast/Toast.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/src/components/ui/Toast/Toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.module.css [app-ssr] (css module)");
"use client";
;
;
;
const Toast = ({ message, onClose, duration = 3000 })=>{
    const [isClosing, setIsClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let closeTimer = null;
        const timer = setTimeout(()=>{
            setIsClosing(true);
            // Ждем завершения анимации исчезновения перед вызовом onClose
            closeTimer = setTimeout(()=>{
                onClose();
            }, 300); // Длительность анимации slideOut
        }, duration);
        return ()=>{
            clearTimeout(timer);
            if (closeTimer) {
                clearTimeout(closeTimer);
            }
        };
    }, [
        duration,
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].toast} ${isClosing ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].toastClosing : ""}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].toastMessage,
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
const __TURBOPACK__default__export__ = Toast;
}),
"[project]/src/components/ui/ToastProvider/ToastProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Toast/Toast.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ToastProvider = ({ children })=>{
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const showToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message)=>{
        const id = Date.now();
        setToast({
            message,
            id
        });
    }, []);
    const handleClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setToast(null);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            showToast
        },
        children: [
            children,
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Toast$2f$Toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
const useToast = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1ab182e7._.js.map
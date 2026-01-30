(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/BurgerMenu/BurgerMenu.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "burgerButton": "BurgerMenu-module__YlH9FW__burgerButton",
  "burgerMenu": "BurgerMenu-module__YlH9FW__burgerMenu",
  "catalogItem": "BurgerMenu-module__YlH9FW__catalogItem",
  "catalogLink": "BurgerMenu-module__YlH9FW__catalogLink",
  "catalogLinkActive": "BurgerMenu-module__YlH9FW__catalogLinkActive",
  "catalogSubmenu": "BurgerMenu-module__YlH9FW__catalogSubmenu",
  "closeButton": "BurgerMenu-module__YlH9FW__closeButton",
  "fadeInItem": "BurgerMenu-module__YlH9FW__fadeInItem",
  "menu": "BurgerMenu-module__YlH9FW__menu",
  "menuContent": "BurgerMenu-module__YlH9FW__menuContent",
  "menuHeader": "BurgerMenu-module__YlH9FW__menuHeader",
  "menuHeaderActive": "BurgerMenu-module__YlH9FW__menuHeaderActive",
  "menuHeaderButton": "BurgerMenu-module__YlH9FW__menuHeaderButton",
  "menuIcon": "BurgerMenu-module__YlH9FW__menuIcon",
  "menuItemActive": "BurgerMenu-module__YlH9FW__menuItemActive",
  "menuItemWithIcon": "BurgerMenu-module__YlH9FW__menuItemWithIcon",
  "menuOpen": "BurgerMenu-module__YlH9FW__menuOpen",
  "menuSection": "BurgerMenu-module__YlH9FW__menuSection",
  "menuSectionAccount": "BurgerMenu-module__YlH9FW__menuSectionAccount",
  "menuSectionNavigation": "BurgerMenu-module__YlH9FW__menuSectionNavigation",
  "overlay": "BurgerMenu-module__YlH9FW__overlay",
  "overlayOpen": "BurgerMenu-module__YlH9FW__overlayOpen",
  "slideDown": "BurgerMenu-module__YlH9FW__slideDown",
  "socialLink": "BurgerMenu-module__YlH9FW__socialLink",
  "socialSection": "BurgerMenu-module__YlH9FW__socialSection",
});
}),
"[project]/src/hooks/useKeyboardEvent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardEvent",
    ()=>useKeyboardEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useKeyboardEvent = function(key, handler) {
    let enabled = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useKeyboardEvent.useEffect": ()=>{
            if (!enabled) {
                return;
            }
            const handleKeyDown = {
                "useKeyboardEvent.useEffect.handleKeyDown": (event)=>{
                    if (event.key === key) {
                        handler(event);
                    }
                }
            }["useKeyboardEvent.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "useKeyboardEvent.useEffect": ()=>{
                    window.removeEventListener("keydown", handleKeyDown);
                }
            })["useKeyboardEvent.useEffect"];
        }
    }["useKeyboardEvent.useEffect"], [
        key,
        handler,
        enabled
    ]);
};
_s(useKeyboardEvent, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BurgerMenu/BurgerMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/BurgerMenu/BurgerMenu.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useKeyboardEvent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useKeyboardEvent.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const CATALOG_CATEGORIES = [
    {
        label: "All",
        href: "/catalog"
    },
    {
        label: "Pants",
        href: "/catalog?category=pants"
    },
    {
        label: "Jeans",
        href: "/catalog?category=jeans"
    },
    {
        label: "T-Shirt",
        href: "/catalog?category=t-shirts"
    },
    {
        label: "Zip Hoodies",
        href: "/catalog?category=zip%20hoodies"
    },
    {
        label: "Jackets",
        href: "/catalog?category=jackets"
    },
    {
        label: "Hoodies",
        href: "/catalog?category=hoodies"
    },
    {
        label: "Shorts",
        href: "/catalog?category=shorts"
    }
];
const SOCIAL_LINKS = [
    {
        label: "Telegram",
        href: "#telegram"
    },
    {
        label: "Instagram*",
        href: "#instagram"
    }
];
const BurgerMenu = (param)=>{
    let { isOpen, onToggle } = param;
    _s();
    const menuId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isCatalogOpen, setIsCatalogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Автоматически открываем каталог при открытии меню
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BurgerMenu.useEffect": ()=>{
            if (isOpen) {
                setIsCatalogOpen(true);
            }
        }
    }["BurgerMenu.useEffect"], [
        isOpen
    ]);
    const handleLinkClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BurgerMenu.useCallback[handleLinkClick]": ()=>{
            if (isOpen) {
                onToggle();
            }
        }
    }["BurgerMenu.useCallback[handleLinkClick]"], [
        isOpen,
        onToggle
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useKeyboardEvent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardEvent"])("Escape", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BurgerMenu.useKeyboardEvent.useCallback": ()=>{
            if (isOpen) {
                onToggle();
            }
        }
    }["BurgerMenu.useKeyboardEvent.useCallback"], [
        isOpen,
        onToggle
    ]), isOpen);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BurgerMenu.useEffect": ()=>{
            if (!isOpen) {
                setIsCatalogOpen(false);
                return;
            }
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return ({
                "BurgerMenu.useEffect": ()=>{
                    document.body.style.overflow = previousOverflow;
                }
            })["BurgerMenu.useEffect"];
        }
    }["BurgerMenu.useEffect"], [
        isOpen
    ]);
    const isNewInActive = pathname === "/new-in";
    const isCatalogActive = pathname.startsWith("/catalog");
    const isAccountActive = pathname.startsWith("/account");
    const isCartActive = pathname === "/cart";
    const currentCategory = searchParams.get("category");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].burgerMenu,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].burgerButton, " ").concat(isOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].open : ""),
                onClick: onToggle,
                "aria-label": "Toggle menu",
                "aria-expanded": isOpen,
                "aria-controls": "".concat(menuId, "-menu"),
                type: "button",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay, " ").concat(isOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlayOpen : ""),
                "aria-hidden": !isOpen,
                onClick: onToggle
            }, void 0, false, {
                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menu, " ").concat(isOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuOpen : ""),
                id: "".concat(menuId, "-menu"),
                "aria-hidden": !isOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].closeButton,
                        onClick: onToggle,
                        "aria-label": "Закрыть меню",
                        type: "button",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/burger/burgerCancel.png",
                            alt: "Закрыть",
                            width: 27,
                            height: 27,
                            loading: "lazy"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuContent,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuSectionNavigation,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuSection,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/new-in",
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuHeader, " ").concat(isNewInActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuHeaderActive : ""),
                                            onClick: handleLinkClick,
                                            children: "NEW IN"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuSection,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/catalog",
                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuHeader, " ").concat(isCatalogActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuHeaderActive : ""),
                                                onClick: handleLinkClick,
                                                children: "CATALOG"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                lineNumber: 137,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isCatalogOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].catalogSubmenu,
                                                children: CATALOG_CATEGORIES.map((category)=>{
                                                    // Определяем активную категорию
                                                    let isCategoryActive = false;
                                                    if (category.href === "/catalog") {
                                                        // Для "All" проверяем, что мы на /catalog без параметров
                                                        isCategoryActive = pathname === "/catalog" && !currentCategory;
                                                    } else {
                                                        // Для остальных категорий извлекаем параметр category из href
                                                        const categoryParam = category.href.split("?category=")[1];
                                                        if (categoryParam && currentCategory) {
                                                            // Декодируем параметр из URL (может быть закодирован)
                                                            let decodedCategory = categoryParam;
                                                            try {
                                                                decodedCategory = decodeURIComponent(categoryParam);
                                                            } catch (e) {
                                                            // Если ошибка декодирования, используем как есть
                                                            }
                                                            const decodedLower = decodedCategory.toLowerCase();
                                                            // currentCategory уже декодирован из URL через searchParams.get()
                                                            const currentCategoryLower = currentCategory.toLowerCase();
                                                            // Сравниваем без учета регистра
                                                            isCategoryActive = currentCategoryLower === decodedLower;
                                                        }
                                                    }
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].catalogItem,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: category.href,
                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].catalogLink, " ").concat(isCategoryActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].catalogLinkActive : ""),
                                                            onClick: handleLinkClick,
                                                            children: category.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, category.href, false, {
                                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuSectionAccount,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/account",
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItemWithIcon, " ").concat(isAccountActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItemActive : ""),
                                        onClick: handleLinkClick,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/images/burger/cabinet.png",
                                                alt: "",
                                                width: 14,
                                                height: 14,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuIcon,
                                                loading: "lazy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "ЛИЧНЫЙ КАБИНЕТ"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/cart",
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItemWithIcon, " ").concat(isCartActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuItemActive : ""),
                                        onClick: handleLinkClick,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/images/burger/cart.png",
                                                alt: "",
                                                width: 14,
                                                height: 14,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuIcon,
                                                loading: "lazy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "КОРЗИНА"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialSection,
                                children: SOCIAL_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: link.href,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].socialLink,
                                        onClick: handleLinkClick,
                                        children: link.label
                                    }, link.href, false, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BurgerMenu, "XLJ0jmMp/tU2lh73yFWzB52AJnI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useKeyboardEvent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardEvent"]
    ];
});
_c = BurgerMenu;
const __TURBOPACK__default__export__ = BurgerMenu;
var _c;
__turbopack_context__.k.register(_c, "BurgerMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/CartIcon/CartIcon.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cartBadge": "CartIcon-module__b-CSMq__cartBadge",
  "cartIcon": "CartIcon-module__b-CSMq__cartIcon",
  "cartIconWrapper": "CartIcon-module__b-CSMq__cartIconWrapper",
});
}),
"[project]/src/components/ui/CartIcon/CartIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/CartIcon/CartIcon.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const CartIcon = ()=>{
    _s();
    const { getTotalItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const totalItems = getTotalItems();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: "/cart",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartIcon,
        "aria-label": "Корзина",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartIconWrapper,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/images/cart.png",
                    alt: "Корзина",
                    width: 12,
                    height: 11.5,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartImage,
                    loading: "lazy"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/CartIcon/CartIcon.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                totalItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartBadge,
                    children: totalItems
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/CartIcon/CartIcon.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/CartIcon/CartIcon.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/CartIcon/CartIcon.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartIcon, "h9VZNuUwhpdlCtb4blC3dksopYI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CartIcon;
const __TURBOPACK__default__export__ = CartIcon;
var _c;
__turbopack_context__.k.register(_c, "CartIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/AccountIcon/AccountIcon.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accountIcon": "AccountIcon-module__yZNQtq__accountIcon",
  "accountImage": "AccountIcon-module__yZNQtq__accountImage",
});
}),
"[project]/src/components/ui/AccountIcon/AccountIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AccountIcon$2f$AccountIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/AccountIcon/AccountIcon.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const AccountIcon = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, redirectToBot } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleClick = ()=>{
        if (!isAuthenticated) {
            redirectToBot();
        } else {
            router.push("/account");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AccountIcon$2f$AccountIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountIcon,
        "aria-label": "Личный кабинет",
        type: "button",
        onClick: handleClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/images/account.png",
            alt: "Личный кабинет",
            width: 12,
            height: 12,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AccountIcon$2f$AccountIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountImage,
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/AccountIcon/AccountIcon.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/AccountIcon/AccountIcon.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AccountIcon, "P+qUZf5z9Rh+PPuXWL28TsS4pMQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AccountIcon;
const __TURBOPACK__default__export__ = AccountIcon;
var _c;
__turbopack_context__.k.register(_c, "AccountIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Header/Header.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "header": "Header-module__ldgnoG__header",
  "headerGreen": "Header-module__ldgnoG__headerGreen",
  "leftSection": "Header-module__ldgnoG__leftSection",
  "logo": "Header-module__ldgnoG__logo",
  "logoImage": "Header-module__ldgnoG__logoImage",
  "logoLink": "Header-module__ldgnoG__logoLink",
  "rightIcons": "Header-module__ldgnoG__rightIcons",
});
}),
"[project]/src/components/Header/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BurgerMenu/BurgerMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/CartIcon/CartIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AccountIcon$2f$AccountIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/AccountIcon/AccountIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Header/Header.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const Header = (param)=>{
    let { variant = "transparent" } = param;
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const routesToPrefetch = [
                "/catalog",
                "/new-in",
                "/privacy",
                "/public-offer",
                "/cart"
            ];
            routesToPrefetch.forEach({
                "Header.useEffect": (route)=>{
                    void router.prefetch(route);
                }
            }["Header.useEffect"]);
        }
    }["Header.useEffect"], [
        router
    ]);
    const headerClassName = "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header, " ").concat(variant === "green" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerGreen : "");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: headerClassName,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 40,
                            height: 40
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header/Header.tsx",
                        lineNumber: 43,
                        columnNumber: 29
                    }, void 0),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        isOpen: isMenuOpen,
                        onToggle: ()=>setIsMenuOpen((prev)=>!prev)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header/Header.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/Header/Header.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Header/Header.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoLink,
                "aria-label": "Go to homepage",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/images/logo.png",
                    alt: "ZNVES logo",
                    width: 125,
                    height: 60,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoImage,
                    loading: "lazy"
                }, void 0, false, {
                    fileName: "[project]/src/components/Header/Header.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/Header/Header.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightIcons,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AccountIcon$2f$AccountIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/Header/Header.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/Header/Header.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header/Header.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header/Header.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "EXXh0uFEahuu34Nc519oYzE/iwg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeroSection/HeroSection.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "catalogButton": "HeroSection-module__yS5m3G__catalogButton",
  "hero": "HeroSection-module__yS5m3G__hero",
  "heroBackground": "HeroSection-module__yS5m3G__heroBackground",
  "heroBackgroundImage": "HeroSection-module__yS5m3G__heroBackgroundImage",
  "heroBackgroundImage2": "HeroSection-module__yS5m3G__heroBackgroundImage2",
  "heroBackgroundImageMobile": "HeroSection-module__yS5m3G__heroBackgroundImageMobile",
  "heroContent": "HeroSection-module__yS5m3G__heroContent",
});
}),
"[project]/src/hooks/useScrollRestoration.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollRestoration",
    ()=>useScrollRestoration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useScrollRestoration = function() {
    let restoreOnUnmount = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    _s();
    const previousRestorationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrollRestoration.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Сохраняем текущее состояние scroll restoration
            previousRestorationRef.current = window.history.scrollRestoration;
            window.history.scrollRestoration = "manual";
            // Прокручиваем к началу страницы
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });
            return ({
                "useScrollRestoration.useEffect": ()=>{
                    // Восстанавливаем scroll restoration при размонтировании
                    if (restoreOnUnmount && previousRestorationRef.current) {
                        window.history.scrollRestoration = previousRestorationRef.current;
                    }
                }
            })["useScrollRestoration.useEffect"];
        }
    }["useScrollRestoration.useEffect"], [
        restoreOnUnmount
    ]);
};
_s(useScrollRestoration, "J/tfRI4GErA0u8Cw6CrQ6hFAu20=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeroSection/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/HeroSection/HeroSection.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollRestoration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useScrollRestoration.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const HeroSection = ()=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollRestoration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollRestoration"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hero,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroContent,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/catalog",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].catalogButton,
                    children: "catalog"
                }, void 0, false, {
                    fileName: "[project]/src/components/HeroSection/HeroSection.tsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/HeroSection/HeroSection.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroBackground,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/hero-background.png",
                        alt: "Hero Background",
                        fill: true,
                        priority: true,
                        fetchPriority: "high",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroBackgroundImage,
                        sizes: "100vw",
                        quality: 85
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroSection/HeroSection.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/hero-background-2.png",
                        alt: "Hero Background overlay",
                        fill: true,
                        loading: "lazy",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroBackgroundImage2,
                        sizes: "100vw",
                        quality: 85
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroSection/HeroSection.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/heroMobile.png",
                        alt: "Hero Background Mobile",
                        fill: true,
                        priority: true,
                        fetchPriority: "high",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HeroSection$2f$HeroSection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heroBackgroundImageMobile,
                        sizes: "100vw",
                        quality: 85
                    }, void 0, false, {
                        fileName: "[project]/src/components/HeroSection/HeroSection.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HeroSection/HeroSection.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HeroSection/HeroSection.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(HeroSection, "i2Pmz86I+GEMTyh0cl3DeIWLJmI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useScrollRestoration$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollRestoration"]
    ];
});
_c = HeroSection;
const __TURBOPACK__default__export__ = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/products.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "catalogProducts",
    ()=>catalogProducts,
    "getProductById",
    ()=>getProductById,
    "newInProducts",
    ()=>newInProducts,
    "toCatalogProduct",
    ()=>toCatalogProduct
]);
var _catalogProductsData_, _catalogProductsData_1, _catalogProductsData_2, _catalogProductsData_3, _catalogProductsData_4, _catalogProductsData_5, _catalogProductsData_6, _catalogProductsData_7;
const catalogProductsData = [
    {
        id: 1,
        sku: "ZN-TSH-001",
        title: "T-SHIRT",
        price: "4 990 ₽",
        priceValue: 4990,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/green-zip.png",
            "/images/catalogs/brown-jacket.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: false,
        category: "T-shirts",
        color: "green",
        size: "m",
        sortOrder: 1,
        defaultSize: "m",
        availableSizes: [
            "xxs",
            "xs",
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Серый",
                value: "gray",
                hex: "#d1cdcb"
            },
            {
                label: "Зеленый",
                value: "green",
                hex: "#1f4c38"
            },
            {
                label: "Ржавчина",
                value: "rust",
                hex: "#7b3f2f"
            },
            {
                label: "Темно-синий",
                value: "navy",
                hex: "#1c2743"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Свободная футболка из плотного хлопка с фирменной вышивкой ZNVES на груди. Идеально сочетается с денимом и нижним слоем."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Логотип нанесен методом вышивки, устойчивой к стирке и выгоранию."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "XS — 42, S — 44, M — 46, L — 48, XL — 50. Рост модели 175 см."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 86-60-90, рост 175 см. На модели размер M."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "100% хлопок. Рекомендуем деликатную стирку при температуре до 30°C, сушить на горизонтальной поверхности."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Курьерская доставка по России — 2-5 рабочих дней. Самовывоз доступен в фирменных шоурумах."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Вы можете оформить возврат в течение 14 дней при сохранении товарного вида и ярлыков."
            }
        ]
    },
    {
        id: 2,
        sku: "ZN-ZIP-001",
        title: "ZIP HOODIE",
        price: "6 590 ₽",
        priceValue: 6590,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/brown-jacket.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/green-zip.png"
        ],
        isNew: false,
        category: "Zip hoodies",
        color: "cream",
        size: "l",
        sortOrder: 2,
        defaultSize: "l",
        availableSizes: [
            "s",
            "m",
            "l",
            "xl",
            "xxl"
        ],
        availableColors: [
            {
                label: "Кремовый",
                value: "cream",
                hex: "#f1e9dc"
            },
            {
                label: "Синий лёд",
                value: "ice-blue",
                hex: "#8ba7c9"
            },
            {
                label: "Лесной",
                value: "forest",
                hex: "#274c3d"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#1a1a1a"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Молния по всей длине, объемный капюшон и контрастный принт ZNVES. Легко комбинируется со спортивными и повседневными образами."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Шелкография с матовым покрытием, устойчива к истиранию и деформации."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "XS — 42, S — 44, M — 46, L — 48, XL — 50. Свободная посадка."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 90-64-92, рост 178 см. На модели размер L."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "80% хлопок, 20% полиэстер. Машинная стирка при 30°C с мягким порошком."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Стандартная доставка по России — 2-4 дня. Экспресс доставка доступна в Москве и Санкт-Петербурге."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат или обмен в течение 14 дней с момента получения заказа."
            }
        ]
    },
    {
        id: 3,
        sku: "ZN-JKT-001",
        title: "JACKET",
        price: "5 990 ₽",
        priceValue: 5990,
        images: [
            "/images/catalogs/brown-jacket.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/green-zip.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: false,
        category: "Jackets",
        color: "brown",
        size: "m",
        sortOrder: 3,
        defaultSize: "m",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Коричневый",
                value: "brown",
                hex: "#644432"
            },
            {
                label: "Хвойный",
                value: "pine",
                hex: "#315c3c"
            },
            {
                label: "Темно-синий",
                value: "navy",
                hex: "#17233d"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Легкая куртка с утепленной подкладкой и минималистичным логотипом. Подходит для межсезонья."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Тиснение на коже и фирменная фурнитура с гравировкой ZNVES."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "S — 44, M — 46, L — 48, XL — 50. Посадка regular fit."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 94-72-98, рост 182 см. На модели размер M."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "Основная ткань: 100% хлопок, подкладка: 100% полиэстер. Сухая чистка."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Бесплатная доставка при заказе от 10 000 ₽."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Обмен и возврат возможны в течение 14 дней. Обратная доставка за наш счет."
            }
        ]
    },
    {
        id: 4,
        sku: "ZN-HOD-001",
        title: "HOODIE",
        price: "5 690 ₽",
        priceValue: 5690,
        images: [
            "/images/catalogs/green-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/brown-jacket.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: false,
        category: "Hoodies",
        color: "navy",
        size: "l",
        sortOrder: 4,
        defaultSize: "l",
        availableSizes: [
            "m",
            "l",
            "xl",
            "xxl"
        ],
        availableColors: [
            {
                label: "Темно-синий",
                value: "navy",
                hex: "#1a2742"
            },
            {
                label: "Графит",
                value: "graphite",
                hex: "#2e2f33"
            },
            {
                label: "Зеленый",
                value: "green",
                hex: "#2d5b3b"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Уютное худи с мягким флисом внутри и объемным принтом спереди."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Аппликация из бархатного материала."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "S — 44, M — 46, L — 48, XL — 50."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 88-62-94, рост 176 см. На модели размер L."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "70% хлопок, 30% полиэстер. Стирка на изнанке при 30°C, гладить через ткань."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доставка по России — 3-6 дней, почтой или курьером."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат в течение 14 дней, обмен возможен в шоуруме."
            }
        ]
    },
    {
        id: 5,
        sku: "ZN-PNT-001",
        title: "PANTS",
        price: "4 790 ₽",
        priceValue: 4790,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/green-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/brown-jacket.png"
        ],
        isNew: false,
        category: "Pants",
        color: "green",
        size: "m",
        sortOrder: 5,
        defaultSize: "m",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Зеленый",
                value: "green",
                hex: "#38614c"
            },
            {
                label: "Песочный",
                value: "sand",
                hex: "#d1b58b"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#151515"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Карго-брюки прямого кроя с регулируемым поясом и множеством карманов."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Минималистичный шеврон с логотипом на правом кармане."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "XS — 42, S — 44, M — 46, L — 48."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 90-70-94, рост 180 см. На модели размер M."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "98% хлопок, 2% эластан. Машинная стирка при 30°C, сушка на воздухе."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доставка курьером по России и СНГ."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат без проблем в течение 14 дней."
            }
        ]
    },
    {
        id: 6,
        sku: "ZN-JNS-001",
        title: "JEANS",
        price: "6 190 ₽",
        priceValue: 6190,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: false,
        category: "Jeans",
        color: "navy",
        size: "l",
        sortOrder: 6,
        defaultSize: "l",
        availableSizes: [
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Индиго",
                value: "navy",
                hex: "#1b2a41"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#161616"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Деним прямого кроя с минималистичным брендингом и контрастной отстрочкой."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Патч из натуральной кожи с тиснением ZNVES."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "Размер в талии соответствует российскому размеру, длина — 32."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 82-64-94, рост 174 см. На модели размер L."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "100% хлопок. Стирать наизнанку, не использовать отбеливатели."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доступна экспресс-доставка по Москве."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат в течение 14 дней в розничных магазинах."
            }
        ]
    },
    {
        id: 7,
        sku: "ZN-SRT-001",
        title: "SHORTS",
        price: "3 990 ₽",
        priceValue: 3990,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: false,
        category: "Shorts",
        color: "cream",
        size: "s",
        sortOrder: 7,
        defaultSize: "s",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l"
        ],
        availableColors: [
            {
                label: "Кремовый",
                value: "cream",
                hex: "#ede4d4"
            },
            {
                label: "Темно-синий",
                value: "navy",
                hex: "#1a2a3a"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Шорты свободного кроя из мягкого футера с эластичным поясом и карманами."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Минималистичный логотип на левом бедре."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "XS — 42, S — 44, M — 46, L — 48."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 86-60-90, рост 173 см. На модели размер S."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "80% хлопок, 20% полиэстер. Стирка при 30°C, без отжима."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доставка по России и СНГ в течение 3-5 дней."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат в оригинальной упаковке в течение 14 дней."
            }
        ]
    },
    {
        id: 8,
        sku: "ZN-HOD-002",
        title: "HOODIE",
        price: "5 990 ₽",
        priceValue: 5990,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: false,
        category: "Hoodies",
        color: "green",
        size: "xl",
        sortOrder: 8,
        defaultSize: "xl",
        availableSizes: [
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Зеленый",
                value: "green",
                hex: "#3a5f44"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#151515"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Oversize худи с двойным капюшоном и объемной вышивкой ZNVES."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Трехмерная вышивка, выполненная немецкими нитями Madeira."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "M — 46, L — 48, XL — 50."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 100-78-102, рост 188 см. На модели размер XL."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "75% хлопок, 25% полиэстер. Стирка при 30°C, сушить в расправленном виде."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Бесплатная доставка при оплате онлайн."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат/обмен в течение 14 дней через службу поддержки."
            }
        ]
    },
    {
        id: 9,
        sku: "ZN-TSH-002",
        title: "T-SHIRT",
        price: "4 490 ₽",
        priceValue: 4490,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: false,
        category: "T-shirts",
        color: "cream",
        size: "s",
        sortOrder: 9,
        defaultSize: "s",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l"
        ],
        availableColors: [
            {
                label: "Кремовый",
                value: "cream",
                hex: "#e8e1d6"
            },
            {
                label: "Серый",
                value: "gray",
                hex: "#d1cdcb"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Базовая футболка из мягкого трикотажа с логотипом ZNVES."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Принт выполнен методом шелкографии."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "XS — 42, S — 44, M — 46, L — 48."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 84-60-90, рост 172 см. На модели размер S."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "100% хлопок. Стирать при 30°C, не отбеливать."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доставка курьером — 2-4 рабочих дня."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Обмен и возврат возможны в течение 14 дней."
            }
        ]
    },
    {
        id: 10,
        sku: "ZN-ZIP-002",
        title: "ZIP HOODIE",
        price: "6 790 ₽",
        priceValue: 6790,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: false,
        category: "Zip hoodies",
        color: "brown",
        size: "m",
        sortOrder: 10,
        defaultSize: "m",
        availableSizes: [
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Коричневый",
                value: "brown",
                hex: "#6b4b34"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#181818"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Зип-худи с контрастной молнией и вышитым логотипом ZNVES на груди."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Комбинация шелкографии и вышивки."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "S — 44, M — 46, L — 48, XL — 50."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 96-76-100, рост 184 см. На модели размер M."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "80% хлопок, 20% полиэстер. Стирать при 30°C."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доставка по России и СНГ. Экспресс в крупных городах."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат в течение 14 дней при сохранении бирок."
            }
        ]
    },
    {
        id: 11,
        sku: "ZN-JKT-002",
        title: "JACKET",
        price: "6 590 ₽",
        priceValue: 6590,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: false,
        category: "Jackets",
        color: "green",
        size: "l",
        sortOrder: 11,
        defaultSize: "l",
        availableSizes: [
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Хаки",
                value: "green",
                hex: "#3a5f44"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#151515"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Парка из влагозащитной ткани с утеплителем и съемным капюшоном."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Шеврон с логотипом ZNVES на рукаве."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "M — 46, L — 48, XL — 50."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 100-82-104, рост 190 см. На модели размер L."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "Основная ткань: 100% полиэстер. Стирка на деликатном режиме."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доступна экспресс-доставка по Москве и Санкт-Петербургу."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат возможен в течение 14 дней."
            }
        ]
    },
    {
        id: 12,
        sku: "ZN-PNT-002",
        title: "PANTS",
        price: "4 490 ₽",
        priceValue: 4490,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: false,
        category: "Pants",
        color: "brown",
        size: "s",
        sortOrder: 12,
        defaultSize: "s",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l"
        ],
        availableColors: [
            {
                label: "Коричневый",
                value: "brown",
                hex: "#6b4b34"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#181818"
            }
        ],
        sections: [
            {
                id: "description",
                title: "Описание",
                content: "Брюки прямого кроя из плотного твила с эластичным поясом и шнурком."
            },
            {
                id: "printing",
                title: "Нанесение",
                content: "Маленький логотип на заднем кармане."
            },
            {
                id: "size-chart",
                title: "Таблица размеров",
                content: "XS — 42, S — 44, M — 46, L — 48."
            },
            {
                id: "model",
                title: "Параметры модели",
                content: "Параметры модели: 86-66-94, рост 170 см. На модели размер S."
            },
            {
                id: "care",
                title: "Состав и уход",
                content: "97% хлопок, 3% эластан. Стирка на деликатном режиме при 30°C."
            },
            {
                id: "delivery",
                title: "Доставка",
                content: "Доставка почтой или курьером, 3-5 рабочих дней."
            },
            {
                id: "returns",
                title: "Возврат",
                content: "Возврат осуществляется в течение 14 дней при сохранении товарного вида."
            }
        ]
    }
];
var _catalogProductsData__sections, _catalogProductsData__sections1, _catalogProductsData__sections2, _catalogProductsData__sections3, _catalogProductsData__sections4, _catalogProductsData__sections5, _catalogProductsData__sections6, _catalogProductsData__sections7;
const newInProductsData = [
    {
        id: 101,
        sku: "ZN-HOD-101",
        title: "HOODIE",
        price: "5 990 ₽",
        priceValue: 5990,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: true,
        category: "Hoodies",
        color: "green",
        size: "m",
        sortOrder: 1,
        defaultSize: "m",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l"
        ],
        availableColors: [
            {
                label: "Зеленый",
                value: "green",
                hex: "#3a5f44"
            },
            {
                label: "Серый",
                value: "gray",
                hex: "#d1cdcb"
            }
        ],
        sections: (_catalogProductsData__sections = (_catalogProductsData_ = catalogProductsData[0]) === null || _catalogProductsData_ === void 0 ? void 0 : _catalogProductsData_.sections) !== null && _catalogProductsData__sections !== void 0 ? _catalogProductsData__sections : []
    },
    {
        id: 102,
        sku: "ZN-ZIP-101",
        title: "ZIP HOODIE",
        price: "6 590 ₽",
        priceValue: 6590,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: true,
        category: "Zip hoodies",
        color: "cream",
        size: "l",
        sortOrder: 2,
        defaultSize: "l",
        availableSizes: [
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Кремовый",
                value: "cream",
                hex: "#eee4d6"
            },
            {
                label: "Темно-серый",
                value: "dark-gray",
                hex: "#3a3a3a"
            }
        ],
        sections: (_catalogProductsData__sections1 = (_catalogProductsData_1 = catalogProductsData[1]) === null || _catalogProductsData_1 === void 0 ? void 0 : _catalogProductsData_1.sections) !== null && _catalogProductsData__sections1 !== void 0 ? _catalogProductsData__sections1 : []
    },
    {
        id: 103,
        sku: "ZN-TSH-101",
        title: "T-SHIRT",
        price: "4 990 ₽",
        priceValue: 4990,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: true,
        category: "T-shirts",
        color: "navy",
        size: "s",
        sortOrder: 3,
        defaultSize: "s",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l"
        ],
        availableColors: [
            {
                label: "Темно-синий",
                value: "navy",
                hex: "#1f2b3d"
            },
            {
                label: "Белый",
                value: "white",
                hex: "#f7f7f7"
            }
        ],
        sections: (_catalogProductsData__sections2 = (_catalogProductsData_2 = catalogProductsData[2]) === null || _catalogProductsData_2 === void 0 ? void 0 : _catalogProductsData_2.sections) !== null && _catalogProductsData__sections2 !== void 0 ? _catalogProductsData__sections2 : []
    },
    {
        id: 104,
        sku: "ZN-JKT-101",
        title: "JACKET",
        price: "6 290 ₽",
        priceValue: 6290,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: true,
        category: "Jackets",
        color: "brown",
        size: "m",
        sortOrder: 4,
        defaultSize: "m",
        availableSizes: [
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Коричневый",
                value: "brown",
                hex: "#6b4b34"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#181818"
            }
        ],
        sections: (_catalogProductsData__sections3 = (_catalogProductsData_3 = catalogProductsData[3]) === null || _catalogProductsData_3 === void 0 ? void 0 : _catalogProductsData_3.sections) !== null && _catalogProductsData__sections3 !== void 0 ? _catalogProductsData__sections3 : []
    },
    {
        id: 105,
        sku: "ZN-TSH-102",
        title: "T-SHIRT",
        price: "4 590 ₽",
        priceValue: 4590,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: true,
        category: "T-shirts",
        color: "cream",
        size: "m",
        sortOrder: 5,
        defaultSize: "m",
        availableSizes: [
            "s",
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Кремовый",
                value: "cream",
                hex: "#e8e1d6"
            },
            {
                label: "Серый",
                value: "gray",
                hex: "#d1cdcb"
            }
        ],
        sections: (_catalogProductsData__sections4 = (_catalogProductsData_4 = catalogProductsData[4]) === null || _catalogProductsData_4 === void 0 ? void 0 : _catalogProductsData_4.sections) !== null && _catalogProductsData__sections4 !== void 0 ? _catalogProductsData__sections4 : []
    },
    {
        id: 106,
        sku: "ZN-PNT-101",
        title: "PANTS",
        price: "4 890 ₽",
        priceValue: 4890,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: true,
        category: "Pants",
        color: "green",
        size: "m",
        sortOrder: 6,
        defaultSize: "m",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l"
        ],
        availableColors: [
            {
                label: "Зеленый",
                value: "green",
                hex: "#3a5f44"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#151515"
            }
        ],
        sections: (_catalogProductsData__sections5 = (_catalogProductsData_5 = catalogProductsData[5]) === null || _catalogProductsData_5 === void 0 ? void 0 : _catalogProductsData_5.sections) !== null && _catalogProductsData__sections5 !== void 0 ? _catalogProductsData__sections5 : []
    },
    {
        id: 107,
        sku: "ZN-HOD-103",
        title: "HOODIE",
        price: "5 790 ₽",
        priceValue: 5790,
        images: [
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png"
        ],
        isNew: true,
        category: "Hoodies",
        color: "navy",
        size: "xl",
        sortOrder: 7,
        defaultSize: "xl",
        availableSizes: [
            "m",
            "l",
            "xl"
        ],
        availableColors: [
            {
                label: "Темно-синий",
                value: "navy",
                hex: "#1f2b3d"
            },
            {
                label: "Черный",
                value: "black",
                hex: "#151515"
            }
        ],
        sections: (_catalogProductsData__sections6 = (_catalogProductsData_6 = catalogProductsData[6]) === null || _catalogProductsData_6 === void 0 ? void 0 : _catalogProductsData_6.sections) !== null && _catalogProductsData__sections6 !== void 0 ? _catalogProductsData__sections6 : []
    },
    {
        id: 108,
        sku: "ZN-SRT-101",
        title: "SHORTS",
        price: "3 790 ₽",
        priceValue: 3790,
        images: [
            "/images/catalogs/blue-zip.png",
            "/images/catalogs/voyage.png",
            "/images/catalogs/blue-zip.png"
        ],
        isNew: true,
        category: "Shorts",
        color: "cream",
        size: "s",
        sortOrder: 8,
        defaultSize: "s",
        availableSizes: [
            "xs",
            "s",
            "m",
            "l"
        ],
        availableColors: [
            {
                label: "Кремовый",
                value: "cream",
                hex: "#f0e6d8"
            },
            {
                label: "Темно-синий",
                value: "navy",
                hex: "#1c2a3d"
            }
        ],
        sections: (_catalogProductsData__sections7 = (_catalogProductsData_7 = catalogProductsData[7]) === null || _catalogProductsData_7 === void 0 ? void 0 : _catalogProductsData_7.sections) !== null && _catalogProductsData__sections7 !== void 0 ? _catalogProductsData__sections7 : []
    }
];
const catalogProducts = catalogProductsData;
const newInProducts = newInProductsData;
const allProducts = [
    ...catalogProductsData,
    ...newInProductsData
];
const getProductById = (id)=>{
    return allProducts.find((product)=>product.id === id);
};
const toCatalogProduct = (product)=>({
        id: product.id,
        title: product.title,
        price: product.price,
        priceValue: product.priceValue,
        images: product.images,
        isNew: product.isNew,
        category: product.category,
        color: product.color,
        size: product.size,
        sortOrder: product.sortOrder
    });
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductCard/ProductCard.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "addToCartButton": "ProductCard-module__g-pugq__addToCartButton",
  "imageContainer": "ProductCard-module__g-pugq__imageContainer",
  "imageWrapper": "ProductCard-module__g-pugq__imageWrapper",
  "newBadge": "ProductCard-module__g-pugq__newBadge",
  "productCard": "ProductCard-module__g-pugq__productCard",
  "productImage": "ProductCard-module__g-pugq__productImage",
  "productImageLoaded": "ProductCard-module__g-pugq__productImageLoaded",
  "productImageLoading": "ProductCard-module__g-pugq__productImageLoading",
  "productImageVisible": "ProductCard-module__g-pugq__productImageVisible",
  "productInfo": "ProductCard-module__g-pugq__productInfo",
  "productPrice": "ProductCard-module__g-pugq__productPrice",
  "productTitle": "ProductCard-module__g-pugq__productTitle",
  "sliderCard": "ProductCard-module__g-pugq__sliderCard",
});
}),
"[project]/src/components/ProductCard/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ToastProvider$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ToastProvider/ToastProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard/ProductCard.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const ProductCard = (param)=>{
    let { title, price, images, isNew, productId, showAddToCart = true, isSliderCard = false } = param;
    _s();
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ToastProvider$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const imageList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProductCard.useMemo[imageList]": ()=>{
            if (images.length === 0) {
                return [
                    "/images/catalogs/placeholder.png"
                ];
            }
            return images;
        }
    }["ProductCard.useMemo[imageList]"], [
        images
    ]);
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loadedStates, setLoadedStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductCard.useEffect": ()=>{
            setLoadedStates(new Array(imageList.length).fill(false));
        }
    }["ProductCard.useEffect"], [
        imageList
    ]);
    const markImageLoaded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductCard.useCallback[markImageLoaded]": (index)=>{
            setLoadedStates({
                "ProductCard.useCallback[markImageLoaded]": (prev)=>{
                    if (prev[index]) {
                        return prev;
                    }
                    const next = [
                        ...prev
                    ];
                    next[index] = true;
                    return next;
                }
            }["ProductCard.useCallback[markImageLoaded]"]);
        }
    }["ProductCard.useCallback[markImageLoaded]"], []);
    const updateIndexFromPointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductCard.useCallback[updateIndexFromPointer]": (clientX)=>{
            const container = containerRef.current;
            if (!container || imageList.length <= 1) {
                return;
            }
            const rect = container.getBoundingClientRect();
            const relativeX = clientX - rect.left;
            const clampedX = Math.max(0, Math.min(relativeX, rect.width - 1));
            const segmentWidth = rect.width / imageList.length;
            const newIndex = Math.floor(clampedX / segmentWidth);
            setCurrentIndex({
                "ProductCard.useCallback[updateIndexFromPointer]": (prev)=>prev === newIndex ? prev : newIndex
            }["ProductCard.useCallback[updateIndexFromPointer]"]);
        }
    }["ProductCard.useCallback[updateIndexFromPointer]"], [
        imageList.length
    ]);
    const handlePointerMove = (event)=>{
        if (imageList.length <= 1) {
            return;
        }
        updateIndexFromPointer(event.clientX);
    };
    const handlePointerEnter = (event)=>{
        if (imageList.length <= 1) {
            return;
        }
        updateIndexFromPointer(event.clientX);
    };
    const handlePointerLeave = ()=>{
        setCurrentIndex(0);
    };
    const handleAddToCart = (e)=>{
        var _product_availableColors_;
        e.preventDefault();
        e.stopPropagation();
        if (!productId) {
            return;
        }
        const product = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(productId);
        if (!product) {
            return;
        }
        const catalogProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            priceValue: product.priceValue,
            images: product.images,
            isNew: product.isNew,
            category: product.category,
            color: product.color,
            size: product.size,
            sortOrder: product.sortOrder
        };
        addItem(catalogProduct, product.defaultSize, ((_product_availableColors_ = product.availableColors[0]) === null || _product_availableColors_ === void 0 ? void 0 : _product_availableColors_.value) || product.color, 1);
        showToast("Добавлено в корзину");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productCard, " ").concat(isSliderCard ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sliderCard : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageWrapper,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer,
                    ref: containerRef,
                    onPointerEnter: handlePointerEnter,
                    onPointerMove: handlePointerMove,
                    onPointerLeave: handlePointerLeave,
                    children: [
                        imageList.map((image, index)=>{
                            const isActive = index === currentIndex;
                            const isLoaded = loadedStates[index];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: image,
                                alt: "".concat(title, " — фото ").concat(index + 1),
                                fill: true,
                                sizes: "(max-width: 768px) 70vw, (max-width: 1200px) 40vw, 22vw",
                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productImage, " swiper-lazy ").concat(isActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productImageVisible : "", " ").concat(isLoaded ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productImageLoaded : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productImageLoading),
                                loading: "lazy",
                                onLoad: ()=>markImageLoaded(index),
                                quality: 80
                            }, image + index, false, {
                                fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        }),
                        isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].newBadge,
                            children: "new"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                            lineNumber: 173,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                    lineNumber: 143,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productTitle,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productPrice,
                        children: price
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    productId && showAddToCart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addToCartButton,
                        onClick: handleAddToCart,
                        "aria-label": "Добавить в корзину",
                        children: "Добавить в корзину"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductCard/ProductCard.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProductCard, "eH7L98xdAJxnr8xohDh9HXYXeBE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ToastProvider$2f$ToastProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = ProductCard;
const __TURBOPACK__default__export__ = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDisplaySection/ProductDisplaySection.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "arrowButton": "ProductDisplaySection-module__p04fWq__arrowButton",
  "arrowButtonActive": "ProductDisplaySection-module__p04fWq__arrowButtonActive",
  "arrowButtonDisabled": "ProductDisplaySection-module__p04fWq__arrowButtonDisabled",
  "arrowButtonInactive": "ProductDisplaySection-module__p04fWq__arrowButtonInactive",
  "arrowSvgActive": "ProductDisplaySection-module__p04fWq__arrowSvgActive",
  "arrowSvgInactive": "ProductDisplaySection-module__p04fWq__arrowSvgInactive",
  "arrows": "ProductDisplaySection-module__p04fWq__arrows",
  "arrowsBottom": "ProductDisplaySection-module__p04fWq__arrowsBottom",
  "emptyState": "ProductDisplaySection-module__p04fWq__emptyState",
  "header": "ProductDisplaySection-module__p04fWq__header",
  "headerRight": "ProductDisplaySection-module__p04fWq__headerRight",
  "isBestseller": "ProductDisplaySection-module__p04fWq__isBestseller",
  "loading": "ProductDisplaySection-module__p04fWq__loading",
  "section": "ProductDisplaySection-module__p04fWq__section",
  "shopArrow": "ProductDisplaySection-module__p04fWq__shopArrow",
  "shopNow": "ProductDisplaySection-module__p04fWq__shopNow",
  "slideItem": "ProductDisplaySection-module__p04fWq__slideItem",
  "slideLink": "ProductDisplaySection-module__p04fWq__slideLink",
  "slider": "ProductDisplaySection-module__p04fWq__slider",
  "sliderContainer": "ProductDisplaySection-module__p04fWq__sliderContainer",
  "sliderSpin": "ProductDisplaySection-module__p04fWq__sliderSpin",
  "title": "ProductDisplaySection-module__p04fWq__title",
});
}),
"[project]/src/api/home/catalogApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API для слайдеров на главной странице
__turbopack_context__.s([
    "fetchAllCatalogProducts",
    ()=>fetchAllCatalogProducts,
    "fetchCatalogProducts",
    ()=>fetchCatalogProducts,
    "fetchNewInProducts",
    ()=>fetchNewInProducts
]);
const API_BASE_URL = "http://62.84.115.11:8000/api/catalog/";
// Кеш для запросов
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут
// Преобразование API ответа в CatalogProduct
const transformApiProduct = (apiProduct, index)=>{
    // Извлекаем базовый URL для изображений
    const baseUrl = "http://62.84.115.11:8000";
    // Преобразуем изображения, добавляя базовый URL если нужно
    const images = apiProduct.images.map((img)=>{
        if (img.startsWith("http")) {
            return img;
        }
        return img.startsWith("/") ? "".concat(baseUrl).concat(img) : "".concat(baseUrl, "/").concat(img);
    });
    // Парсим цену
    const priceValue = parseFloat(apiProduct.price.replace(/\s/g, "").replace(",", ".")) || 0;
    const formattedPrice = "".concat(Math.round(priceValue).toLocaleString("ru-RU"), " ₽");
    // Извлекаем категорию из slug или name
    const category = extractCategoryFromSlug(apiProduct.slug) || "T-shirts";
    // Генерируем стабильный ID на основе slug
    const id = hashString(apiProduct.slug) || index + 1;
    return {
        id,
        slug: apiProduct.slug,
        title: apiProduct.name,
        price: formattedPrice,
        priceValue,
        images,
        isNew: apiProduct.is_new,
        category,
        color: "green",
        size: "m",
        sortOrder: index
    };
};
// Простая функция хеширования для генерации ID из slug
const hashString = (str)=>{
    let hash = 0;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};
// Извлечение категории из slug
const extractCategoryFromSlug = (slug)=>{
    const slugLower = slug.toLowerCase();
    if (slugLower.includes("pant") || slugLower.includes("брюк")) return "Pants";
    if (slugLower.includes("jean")) return "Jeans";
    if (slugLower.includes("t-shirt") || slugLower.includes("футболк")) return "T-shirts";
    if (slugLower.includes("zip") && slugLower.includes("hood")) return "Zip hoodies";
    if (slugLower.includes("jacket")) return "Jackets";
    if (slugLower.includes("hoodie")) return "Hoodies";
    if (slugLower.includes("short")) return "Shorts";
    return null;
};
const fetchCatalogProducts = async function() {
    let params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const cacheKey = JSON.stringify(params);
    const cached = cache.get(cacheKey);
    // Проверяем кеш
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    try {
        const url = new URL(API_BASE_URL);
        if (params.category) {
            url.searchParams.set("category", params.category);
        }
        if (params.is_new !== undefined) {
            url.searchParams.set("is_new", params.is_new.toString());
        }
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        });
        if (!response.ok) {
            throw new Error("API error: ".concat(response.status, " ").concat(response.statusText));
        }
        const data = await response.json();
        const transformedProducts = data.map((product, index)=>transformApiProduct(product, index));
        // Сохраняем в кеш
        cache.set(cacheKey, {
            data: transformedProducts,
            timestamp: Date.now()
        });
        return transformedProducts;
    } catch (error) {
        console.error("Error fetching catalog products:", error);
        // Возвращаем пустой массив в случае ошибки
        return [];
    }
};
const fetchNewInProducts = async ()=>{
    return fetchCatalogProducts({
        is_new: true
    });
};
const fetchAllCatalogProducts = async ()=>{
    return fetchCatalogProducts({});
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useWindowSize.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWindowSize",
    ()=>useWindowSize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useWindowSize = ()=>{
    _s();
    const [windowSize, setWindowSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWindowSize.useEffect": ()=>{
            const handleResize = {
                "useWindowSize.useEffect.handleResize": ()=>{
                    setWindowSize({
                        width: window.innerWidth,
                        height: window.innerHeight
                    });
                }
            }["useWindowSize.useEffect.handleResize"];
            handleResize();
            window.addEventListener("resize", handleResize);
            return ({
                "useWindowSize.useEffect": ()=>window.removeEventListener("resize", handleResize)
            })["useWindowSize.useEffect"];
        }
    }["useWindowSize.useEffect"], []);
    return windowSize;
};
_s(useWindowSize, "t3YfNFQwXUtH/YGPNUS56oAAqFg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ProductDisplaySection/ProductDisplaySection.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$home$2f$catalogApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/home/catalogApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swiper/swiper-react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$free$2d$mode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FreeMode$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/free-mode.mjs [app-client] (ecmascript) <export default as FreeMode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWindowSize.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const ProductDisplaySection = (param)=>{
    let { title, showShopNow, id, isBestseller = false } = param;
    _s();
    const swiperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeArrow, setActiveArrow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [maxVisible, setMaxVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(4);
    const [spaceBetween, setSpaceBetween] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBeginning, setIsBeginning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isEnd, setIsEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const hasPrefetchedProductsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hasPrefetchedShopNowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const { width } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDisplaySection.useEffect": ()=>{
            if (width === 0) return;
            if (width <= 480) {
                setMaxVisible(1.5);
                setSpaceBetween(8);
                setIsMobile(false);
            } else if (width <= 768) {
                setMaxVisible(3);
                setSpaceBetween(10);
                setIsMobile(false);
            } else if (width <= 1200) {
                setMaxVisible(3);
                setSpaceBetween(10);
                setIsMobile(false);
            } else {
                setMaxVisible(4);
                setSpaceBetween(10);
                setIsMobile(false);
            }
        }
    }["ProductDisplaySection.useEffect"], [
        width
    ]);
    // Загрузка товаров из API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDisplaySection.useEffect": ()=>{
            const loadProducts = {
                "ProductDisplaySection.useEffect.loadProducts": async ()=>{
                    setIsLoading(true);
                    try {
                        if (title === "NEW IN") {
                            const newInProducts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$home$2f$catalogApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNewInProducts"])();
                            setProducts(newInProducts);
                        } else {
                            const catalogProducts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$home$2f$catalogApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAllCatalogProducts"])();
                            setProducts(catalogProducts);
                        }
                    } catch (error) {
                        console.error("Error loading products:", error);
                        setProducts([]);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["ProductDisplaySection.useEffect.loadProducts"];
            loadProducts();
        }
    }["ProductDisplaySection.useEffect"], [
        title
    ]);
    const handlePrev = ()=>{
        if (!isBeginning && swiperRef.current) {
            swiperRef.current.slidePrev();
            setActiveArrow("prev");
        }
    };
    const handleNext = ()=>{
        if (!isEnd && swiperRef.current) {
            swiperRef.current.slideNext();
            setActiveArrow("next");
        }
    };
    const canNavigate = products.length > maxVisible;
    const shopNowHref = title === "NEW IN" ? "/new-in" : title === "CATALOG" ? "/catalog" : "/catalog";
    const handleSwiper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductDisplaySection.useCallback[handleSwiper]": (swiper)=>{
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
        }
    }["ProductDisplaySection.useCallback[handleSwiper]"], []);
    const handleSlideChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductDisplaySection.useCallback[handleSlideChange]": (swiper)=>{
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setActiveArrow(null);
        }
    }["ProductDisplaySection.useCallback[handleSlideChange]"], []);
    const handleBeforeInit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductDisplaySection.useCallback[handleBeforeInit]": (swiper)=>{
            const params = swiper.params;
            params.preloadImages = false;
            params.lazy = {
                enabled: true,
                loadOnTransitionStart: false,
                loadPrevNext: true,
                loadPrevNextAmount: 2
            };
        }
    }["ProductDisplaySection.useCallback[handleBeforeInit]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDisplaySection.useEffect": ()=>{
            if (hasPrefetchedProductsRef.current) {
                return;
            }
            const prefetchCount = Math.min(products.length, 6);
            const routesToPrefetch = products.slice(0, prefetchCount).map({
                "ProductDisplaySection.useEffect.routesToPrefetch": (product)=>"/catalog/".concat(product.slug || product.id)
            }["ProductDisplaySection.useEffect.routesToPrefetch"]);
            routesToPrefetch.forEach({
                "ProductDisplaySection.useEffect": (route)=>{
                    void router.prefetch(route);
                }
            }["ProductDisplaySection.useEffect"]);
            hasPrefetchedProductsRef.current = true;
        }
    }["ProductDisplaySection.useEffect"], [
        products,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDisplaySection.useEffect": ()=>{
            if (hasPrefetchedShopNowRef.current || !showShopNow) {
                return;
            }
            void router.prefetch(shopNowHref);
            hasPrefetchedShopNowRef.current = true;
        }
    }["ProductDisplaySection.useEffect"], [
        router,
        shopNowHref,
        showShopNow
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: id,
        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section, " ").concat(isBestseller ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].isBestseller : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerRight,
                        children: [
                            showShopNow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: shopNowHref,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shopNow,
                                children: [
                                    "SHOP NOW",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/catalogs/shopArrow.png",
                                        alt: "Arrow Right",
                                        width: 24,
                                        height: 24,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shopArrow,
                                        loading: "lazy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            canNavigate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrows,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButton, " ").concat(activeArrow === "prev" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonInactive, " ").concat(isBeginning ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonDisabled : ""),
                                        onClick: handlePrev,
                                        "aria-label": "Previous",
                                        type: "button",
                                        disabled: isBeginning,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "35",
                                            height: "30",
                                            viewBox: "0 0 20 20",
                                            fill: "none",
                                            stroke: "currentColor",
                                            className: activeArrow === "prev" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgInactive,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 15l-5-5 5-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                                lineNumber: 218,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButton, " ").concat(activeArrow === "next" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonInactive, " ").concat(isEnd ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonDisabled : ""),
                                        onClick: handleNext,
                                        "aria-label": "Next",
                                        type: "button",
                                        disabled: isEnd,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "35",
                                            height: "30",
                                            viewBox: "0 0 20 20",
                                            fill: "none",
                                            stroke: "currentColor",
                                            className: activeArrow === "next" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgInactive,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M8 15l5-5-5-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                                lineNumber: 244,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sliderContainer,
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loading,
                    children: "Загрузка..."
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                    lineNumber: 253,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : products.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Swiper"], {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slider,
                    modules: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$free$2d$mode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FreeMode$3e$__["FreeMode"]
                    ],
                    freeMode: {
                        enabled: true,
                        momentum: true,
                        momentumRatio: 0.35,
                        minimumVelocity: 0.08,
                        sticky: false
                    },
                    resistance: true,
                    resistanceRatio: 0.85,
                    spaceBetween,
                    slidesPerView: maxVisible,
                    slidesPerGroup: 1,
                    loop: false,
                    centeredSlides: isMobile,
                    speed: 600,
                    watchSlidesProgress: true,
                    watchOverflow: true,
                    onSwiper: handleSwiper,
                    onSlideChange: handleSlideChange,
                    onBeforeInit: handleBeforeInit,
                    lazy: {
                        enabled: true,
                        loadOnTransitionStart: false,
                        loadPrevNext: true,
                        loadPrevNextAmount: 2
                    }
                }, products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwiperSlide"], {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slideItem,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/catalog/".concat(product.slug || product.id),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slideLink,
                            "aria-label": "Перейти к товару ".concat(product.title),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                title: product.title,
                                price: product.price,
                                images: product.images,
                                isNew: product.isNew,
                                productId: product.id,
                                showAddToCart: false,
                                isSliderCard: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                lineNumber: 294,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                            lineNumber: 289,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, product.id, false, {
                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                        lineNumber: 288,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                    children: "Товары не найдены"
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                    lineNumber: 308,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            canNavigate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowsBottom,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButton, " ").concat(activeArrow === "prev" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonInactive, " ").concat(isBeginning ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonDisabled : ""),
                        onClick: handlePrev,
                        "aria-label": "Previous",
                        type: "button",
                        disabled: isBeginning,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "35",
                            height: "30",
                            viewBox: "0 0 20 20",
                            fill: "none",
                            stroke: "currentColor",
                            className: activeArrow === "prev" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgInactive,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 15l-5-5 5-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                lineNumber: 336,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButton, " ").concat(activeArrow === "next" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonInactive, " ").concat(isEnd ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowButtonDisabled : ""),
                        onClick: handleNext,
                        "aria-label": "Next",
                        type: "button",
                        disabled: isEnd,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "35",
                            height: "30",
                            viewBox: "0 0 20 20",
                            fill: "none",
                            stroke: "currentColor",
                            className: activeArrow === "next" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgActive : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDisplaySection$2f$ProductDisplaySection$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].arrowSvgInactive,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M8 15l5-5-5-5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                                lineNumber: 362,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                            lineNumber: 350,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
                lineNumber: 312,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDisplaySection/ProductDisplaySection.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProductDisplaySection, "4qZKLe4F1Kvv9QxABz4n0glGJ9w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"]
    ];
});
_c = ProductDisplaySection;
const __TURBOPACK__default__export__ = ProductDisplaySection;
var _c;
__turbopack_context__.k.register(_c, "ProductDisplaySection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Footer/Footer.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "button": "Footer-module__Grjkva__button",
  "catalogColumns": "Footer-module__Grjkva__catalogColumns",
  "catalogColumnsOpen": "Footer-module__Grjkva__catalogColumnsOpen",
  "column": "Footer-module__Grjkva__column",
  "columnInst": "Footer-module__Grjkva__columnInst",
  "columnItem": "Footer-module__Grjkva__columnItem",
  "columnLi": "Footer-module__Grjkva__columnLi",
  "columnList": "Footer-module__Grjkva__columnList",
  "columnListOpen": "Footer-module__Grjkva__columnListOpen",
  "columnTitle": "Footer-module__Grjkva__columnTitle",
  "columnTitleButton": "Footer-module__Grjkva__columnTitleButton",
  "columnToggle": "Footer-module__Grjkva__columnToggle",
  "copyright": "Footer-module__Grjkva__copyright",
  "copyrightInsta": "Footer-module__Grjkva__copyrightInsta",
  "footer": "Footer-module__Grjkva__footer",
  "input": "Footer-module__Grjkva__input",
  "inputContainer": "Footer-module__Grjkva__inputContainer",
  "link": "Footer-module__Grjkva__link",
  "links": "Footer-module__Grjkva__links",
  "logo": "Footer-module__Grjkva__logo",
  "lower": "Footer-module__Grjkva__lower",
  "politics": "Footer-module__Grjkva__politics",
  "politicsLink": "Footer-module__Grjkva__politicsLink",
  "rowColumns": "Footer-module__Grjkva__rowColumns",
  "subText": "Footer-module__Grjkva__subText",
  "upper": "Footer-module__Grjkva__upper",
  "upperLeft": "Footer-module__Grjkva__upperLeft",
  "upperRight": "Footer-module__Grjkva__upperRight",
});
}),
"[project]/src/components/Footer/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Footer/Footer.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const Footer = ()=>{
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCatalogOpen, setIsCatalogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isContactOpen, setIsContactOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].upper,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].upperLeft,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/logo.png",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                                alt: "logo",
                                width: 65,
                                height: 31,
                                loading: "lazy"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subText,
                                children: "Подпишитесь на получение рассылки рекламно-информационных материалов"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        placeholder: "Введите ваш email"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 29,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button,
                                        children: "Подписаться"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].politics,
                                children: [
                                    "Нажимая на кнопку «Подписаться», вы даете согласие на обработку персональных данных в соответствии с",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/privacy",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].politicsLink,
                                        children: "Политикой конфиденциальности"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer/Footer.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].upperRight,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rowColumns,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].column,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnTitleButton,
                                                onClick: ()=>setIsMenuOpen(!isMenuOpen),
                                                "aria-expanded": isMenuOpen,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnTitle,
                                                        children: "MENU"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnToggle,
                                                        children: isMenuOpen ? "−" : "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 49,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnList, " ").concat(isMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnListOpen : ""),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                        href: "/account",
                                                        children: "Личный кабинет"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                        href: "/cart",
                                                        children: "Корзина"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 68,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 60,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].column,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnTitleButton,
                                                onClick: ()=>setIsCatalogOpen(!isCatalogOpen),
                                                "aria-expanded": isCatalogOpen,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnTitle,
                                                        children: "CATALOG"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnToggle,
                                                        children: isCatalogOpen ? "−" : "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].catalogColumns, " ").concat(isCatalogOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].catalogColumnsOpen : ""),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnList, " ").concat(isCatalogOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnListOpen : ""),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/new-in",
                                                                children: "New in"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 95,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/t-shirt",
                                                                children: "T-shirt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/hoodies",
                                                                children: "Hoodies"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/zip-hoodies",
                                                                children: "Zip hoodies"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnList, " ").concat(isCatalogOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnListOpen : ""),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/jeans",
                                                                children: "Jeans"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 117,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/pants",
                                                                children: "Pants"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 120,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/shorts",
                                                                children: "Shorts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 123,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/jackets",
                                                                children: "Jackets"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].column,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnTitleButton,
                                                onClick: ()=>setIsContactOpen(!isContactOpen),
                                                "aria-expanded": isContactOpen,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnTitle,
                                                        children: "CONTACT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnToggle,
                                                        children: isContactOpen ? "−" : "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnList, " ").concat(isContactOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnListOpen : ""),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "https://t.me/znves",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                        children: "Telegram"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "https://www.instagram.com/real.ponama?igsh=b2w5YWdoNmJ2djVo",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnInst,
                                                        children: "Instagram*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 144,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].links,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                                        href: "/public-offer",
                                        children: "Публичная оферта"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                                        href: "/privacy",
                                        children: "Политика конфиденциальности"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer/Footer.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer/Footer.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].lower,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].copyright,
                        children: "© 2025 Все права защищены"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Footer/Footer.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].copyrightInsta,
                        children: [
                            "* Instagram принадлежит компании Meta, признанной экстремистской организацией ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 182,
                                columnNumber: 24
                            }, ("TURBOPACK compile-time value", void 0)),
                            " и запрещенной в РФ"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer/Footer.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer/Footer.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Footer/Footer.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Footer, "MAJV3Wn7UyAIzDIQ3ewrZRY1cTg=");
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e5e4f0dc._.js.map
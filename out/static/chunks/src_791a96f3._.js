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
                            height: 27
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
                                            lineNumber: 124,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 123,
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
                                                lineNumber: 136,
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
                                                            lineNumber: 179,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, category.href, false, {
                                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                lineNumber: 122,
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
                                                height: 16,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuIcon
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "ЛИЧНЫЙ КАБИНЕТ"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 197,
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
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BurgerMenu$2f$BurgerMenu$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuIcon
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "КОРЗИНА"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                lineNumber: 196,
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
                                        lineNumber: 233,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BurgerMenu/BurgerMenu.tsx",
                        lineNumber: 121,
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
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CartIcon$2f$CartIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartImage
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
                    lineNumber: 23,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AccountIcon$2f$AccountIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ui/AccountIcon/AccountIcon.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const AccountIcon = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleClick = ()=>{
        router.push("/account");
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
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$AccountIcon$2f$AccountIcon$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountImage
        }, void 0, false, {
            fileName: "[project]/src/components/ui/AccountIcon/AccountIcon.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/AccountIcon/AccountIcon.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AccountIcon, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
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
                    priority: true
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
                                height: 31
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
                                lineNumber: 24,
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
                                        lineNumber: 28,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button,
                                        children: "Подписаться"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 27,
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
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 37,
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
                                                        lineNumber: 54,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnToggle,
                                                        children: isMenuOpen ? "−" : "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 48,
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
                                                        lineNumber: 64,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                        href: "/cart",
                                                        children: "Корзина"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 59,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 47,
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
                                                        lineNumber: 79,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnToggle,
                                                        children: isCatalogOpen ? "−" : "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 80,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 73,
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
                                                                lineNumber: 94,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/t-shirt",
                                                                children: "T-shirt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/hoodies",
                                                                children: "Hoodies"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/zip-hoodies",
                                                                children: "Zip hoodies"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 89,
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
                                                                lineNumber: 116,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/pants",
                                                                children: "Pants"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 119,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/shorts",
                                                                children: "Shorts"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnItem,
                                                                href: "/catalog/jackets",
                                                                children: "Jackets"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 84,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 72,
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
                                                        lineNumber: 138,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].columnToggle,
                                                        children: isContactOpen ? "−" : "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 132,
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
                                                        lineNumber: 148,
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
                                                        lineNumber: 156,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                                lineNumber: 143,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 46,
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
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                                        href: "/privacy",
                                        children: "Политика конфиденциальности"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Footer/Footer.tsx",
                                        lineNumber: 171,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer/Footer.tsx",
                        lineNumber: 45,
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
                        lineNumber: 178,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].copyrightInsta,
                        children: [
                            "* Instagram принадлежит компании Meta, признанной экстремистской организацией ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/Footer/Footer.tsx",
                                lineNumber: 181,
                                columnNumber: 24
                            }, ("TURBOPACK compile-time value", void 0)),
                            " и запрещенной в РФ"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Footer/Footer.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Footer/Footer.tsx",
                lineNumber: 177,
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
"[project]/src/components/OrderSuccessModal/OrderSuccessModal.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "closeButton": "OrderSuccessModal-module__845uQq__closeButton",
  "modalButtons": "OrderSuccessModal-module__845uQq__modalButtons",
  "modalContent": "OrderSuccessModal-module__845uQq__modalContent",
  "modalOverlay": "OrderSuccessModal-module__845uQq__modalOverlay",
  "modalText": "OrderSuccessModal-module__845uQq__modalText",
  "modalTitle": "OrderSuccessModal-module__845uQq__modalTitle",
  "orderNumber": "OrderSuccessModal-module__845uQq__orderNumber",
  "primaryButton": "OrderSuccessModal-module__845uQq__primaryButton",
  "secondaryButton": "OrderSuccessModal-module__845uQq__secondaryButton",
});
}),
"[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/OrderSuccessModal/OrderSuccessModal.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const OrderSuccessModal = (param)=>{
    let { orderNumber, onClose, onGoToAccount } = param;
    _s();
    // Блокируем скролл при открытой модалке
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrderSuccessModal.useEffect": ()=>{
            document.body.style.overflow = "hidden";
            return ({
                "OrderSuccessModal.useEffect": ()=>{
                    document.body.style.overflow = "unset";
                }
            })["OrderSuccessModal.useEffect"];
        }
    }["OrderSuccessModal.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalOverlay,
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalContent,
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].closeButton,
                    onClick: onClose,
                    "aria-label": "Закрыть",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/login/cancel-btn.png",
                        alt: "Закрыть",
                        width: 24,
                        height: 24
                    }, void 0, false, {
                        fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalTitle,
                    children: "Спасибо за Ваш заказ!"
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderNumber,
                    children: [
                        "№",
                        orderNumber
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalText,
                    children: [
                        "Отследить ваш заказ Вы можете ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                            lineNumber: 46,
                            columnNumber: 41
                        }, ("TURBOPACK compile-time value", void 0)),
                        "в личном кабинете"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalButtons,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                            onClick: onGoToAccount,
                            children: "Перейти в личный кабинет"
                        }, void 0, false, {
                            fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/catalog",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
                            children: "Вернуться в каталог"
                        }, void 0, false, {
                            fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(OrderSuccessModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = OrderSuccessModal;
const __TURBOPACK__default__export__ = OrderSuccessModal;
var _c;
__turbopack_context__.k.register(_c, "OrderSuccessModal");
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
"[project]/src/components/Map/Map.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const Map = (param)=>{
    let { address, city, street, house, onAddressSelect, searchValue, onSearchChange, deliveryMethod, deliveryType } = param;
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isYmapsLoaded, setIsYmapsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const geocodeDebounceTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isGeocodingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Загрузка Yandex Maps API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Проверяем, не загружается ли уже скрипт
            const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
            if (existingScript) {
                // Если скрипт уже есть, ждем его загрузки
                if (window.ymaps) {
                    window.ymaps.ready({
                        "Map.useEffect": ()=>{
                            setIsYmapsLoaded(true);
                        }
                    }["Map.useEffect"]);
                } else {
                    existingScript.addEventListener("load", {
                        "Map.useEffect": ()=>{
                            if (window.ymaps) {
                                window.ymaps.ready({
                                    "Map.useEffect": ()=>{
                                        setIsYmapsLoaded(true);
                                    }
                                }["Map.useEffect"]);
                            }
                        }
                    }["Map.useEffect"]);
                }
                return;
            }
            if (window.ymaps) {
                window.ymaps.ready({
                    "Map.useEffect": ()=>{
                        setIsYmapsLoaded(true);
                    }
                }["Map.useEffect"]);
                return;
            }
            const script = document.createElement("script");
            // API ключ можно добавить через переменную окружения NEXT_PUBLIC_YANDEX_MAPS_API_KEY
            // Или оставить пустым - базовая функциональность работает без ключа
            const apiKey = ("TURBOPACK compile-time value", "de59d0f3-8ac1-44d5-aba6-99392f11da0d") || "";
            const apiKeyParam = ("TURBOPACK compile-time truthy", 1) ? "&apikey=".concat(apiKey) : "TURBOPACK unreachable";
            const scriptUrl = "https://api-maps.yandex.ru/2.1/?lang=ru_RU".concat(apiKeyParam);
            // Для отладки (можно убрать в продакшене)
            if ("TURBOPACK compile-time truthy", 1) {
                console.log("Yandex Maps API key loaded:", apiKey.substring(0, 8) + "...");
            }
            script.src = scriptUrl;
            script.async = true;
            script.onload = ({
                "Map.useEffect": ()=>{
                    if (window.ymaps) {
                        window.ymaps.ready({
                            "Map.useEffect": ()=>{
                                setIsYmapsLoaded(true);
                            }
                        }["Map.useEffect"]);
                    }
                }
            })["Map.useEffect"];
            script.onerror = ({
                "Map.useEffect": ()=>{
                    console.error("Ошибка загрузки Yandex Maps API");
                }
            })["Map.useEffect"];
            document.head.appendChild(script);
            return ({
                "Map.useEffect": ()=>{
                // Не удаляем скрипт при размонтировании, так как он может использоваться другими компонентами
                }
            })["Map.useEffect"];
        }
    }["Map.useEffect"], []);
    // Инициализация карты
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            if (!isMounted || !isYmapsLoaded || !mapRef.current || mapInstanceRef.current) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.log("[Map] Инициализация пропущена:", {
                        isMounted,
                        isYmapsLoaded,
                        hasMapRef: !!mapRef.current,
                        hasMapInstance: !!mapInstanceRef.current
                    });
                }
                return;
            }
            console.log("[Map] Начинаем инициализацию карты");
            const initMap = {
                "Map.useEffect.initMap": async ()=>{
                    try {
                        const { ymaps } = window;
                        // Проверяем, что геокодер доступен
                        if (!ymaps.geocode) {
                            console.warn("[Map] ymaps.geocode недоступен при инициализации, ждем...");
                            await new Promise({
                                "Map.useEffect.initMap": (resolve)=>setTimeout(resolve, 500)
                            }["Map.useEffect.initMap"]);
                            if (!ymaps.geocode) {
                                console.error("[Map] ymaps.geocode все еще недоступен");
                                return;
                            }
                        }
                        // Инициализация карты (центр по умолчанию - Москва)
                        // Отключаем рекламу, если нет API ключа
                        const map = new ymaps.Map(mapRef.current, {
                            center: [
                                55.7558,
                                37.6173
                            ],
                            zoom: 13,
                            controls: [],
                            // Отключаем рекламу для работы без API ключа
                            suppressMapOpenBlock: true
                        });
                        // Закрываем все balloon'ы при клике на любые объекты карты (метро, музеи и т.д.)
                        // Используем глобальный обработчик для всех geoObjects
                        map.geoObjects.events.add("click", {
                            "Map.useEffect.initMap": (e)=>{
                                try {
                                    const target = e.get("target");
                                    // Если клик был на объект, который не является нашим маркером
                                    if (target && target !== markerRef.current) {
                                        // Закрываем balloon через небольшую задержку после открытия
                                        setTimeout({
                                            "Map.useEffect.initMap": ()=>{
                                                try {
                                                    if (map.balloon && map.balloon.isOpen && map.balloon.isOpen()) {
                                                        map.balloon.close();
                                                    }
                                                } catch (error) {
                                                // Игнорируем ошибки
                                                }
                                            }
                                        }["Map.useEffect.initMap"], 300);
                                    }
                                } catch (error) {
                                // Игнорируем ошибки
                                }
                            }
                        }["Map.useEffect.initMap"]);
                        // Ждем полной загрузки карты перед добавлением обработчиков
                        await new Promise({
                            "Map.useEffect.initMap": (resolve)=>{
                                const onLoad = {
                                    "Map.useEffect.initMap.onLoad": ()=>{
                                        console.log("[Map] Карта полностью загружена");
                                        map.events.remove("load", onLoad);
                                        resolve();
                                    }
                                }["Map.useEffect.initMap.onLoad"];
                                map.events.add("load", onLoad);
                                // Таймаут на случай, если событие load не сработает
                                setTimeout({
                                    "Map.useEffect.initMap": ()=>{
                                        console.log("[Map] Таймаут загрузки карты, продолжаем");
                                        map.events.remove("load", onLoad);
                                        resolve();
                                    }
                                }["Map.useEffect.initMap"], 2000);
                            }
                        }["Map.useEffect.initMap"]);
                        // Обратное геокодирование (координаты -> адрес)
                        const reverseGeocode = {
                            "Map.useEffect.initMap.reverseGeocode": async (lat, lon)=>{
                                // Проверяем, что ymaps доступен
                                if (!window.ymaps || !window.ymaps.geocode) {
                                    console.warn("[Map] ymaps.geocode недоступен, ждем...");
                                    // Ждем немного и пробуем снова
                                    setTimeout({
                                        "Map.useEffect.initMap.reverseGeocode": ()=>{
                                            if (window.ymaps && window.ymaps.geocode) {
                                                reverseGeocode(lat, lon);
                                            } else {
                                                console.error("[Map] ymaps.geocode все еще недоступен");
                                            }
                                        }
                                    }["Map.useEffect.initMap.reverseGeocode"], 500);
                                    return;
                                }
                                try {
                                    const { ymaps } = window;
                                    // Проверяем, что карта еще существует
                                    if (!mapInstanceRef.current) {
                                        console.warn("[Map] Карта была удалена, пропускаем геокодирование");
                                        return;
                                    }
                                    console.log("[Map] Начинаем обратное геокодирование для:", lat, lon);
                                    const geocoder = ymaps.geocode([
                                        lat,
                                        lon
                                    ], {
                                        results: 1
                                    });
                                    geocoder.then({
                                        "Map.useEffect.initMap.reverseGeocode": (res)=>{
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
                                                let addressComponents = [];
                                                try {
                                                    var _metaData_GeocoderMetaData_Address, _metaData_GeocoderMetaData;
                                                    // Проверяем наличие properties
                                                    if (!firstGeoObject.properties) {
                                                        console.warn("[Map] firstGeoObject.properties отсутствует");
                                                    } else if (typeof firstGeoObject.properties.get === "function") {
                                                        try {
                                                            metaData = firstGeoObject.properties.get("metaDataProperty");
                                                        } catch (getError) {
                                                            console.warn("[Map] Ошибка при вызове properties.get:", {
                                                                error: getError,
                                                                message: getError === null || getError === void 0 ? void 0 : getError.message,
                                                                stack: getError === null || getError === void 0 ? void 0 : getError.stack
                                                            });
                                                            // Пробуем альтернативный способ
                                                            try {
                                                                metaData = firstGeoObject.properties["metaDataProperty"] || firstGeoObject.properties.metaDataProperty;
                                                            } catch (altError) {
                                                                console.warn("[Map] Альтернативный способ тоже не сработал:", altError);
                                                            }
                                                        }
                                                    } else {
                                                        console.warn("[Map] properties.get недоступен, используем альтернативный метод");
                                                        metaData = firstGeoObject.properties["metaDataProperty"] || firstGeoObject.properties.metaDataProperty;
                                                    }
                                                    if (metaData === null || metaData === void 0 ? void 0 : (_metaData_GeocoderMetaData = metaData.GeocoderMetaData) === null || _metaData_GeocoderMetaData === void 0 ? void 0 : (_metaData_GeocoderMetaData_Address = _metaData_GeocoderMetaData.Address) === null || _metaData_GeocoderMetaData_Address === void 0 ? void 0 : _metaData_GeocoderMetaData_Address.Components) {
                                                        addressComponents = metaData.GeocoderMetaData.Address.Components;
                                                    }
                                                } catch (propError) {
                                                    console.warn("[Map] Общая ошибка при получении metaDataProperty:", {
                                                        error: propError,
                                                        message: propError === null || propError === void 0 ? void 0 : propError.message,
                                                        stack: propError === null || propError === void 0 ? void 0 : propError.stack
                                                    });
                                                // Продолжаем с пустым массивом компонентов
                                                }
                                                // Обрабатываем данные адреса
                                                let addressCity = "";
                                                let addressStreet = "";
                                                let addressHouse = "";
                                                if (Array.isArray(addressComponents)) {
                                                    addressComponents.forEach({
                                                        "Map.useEffect.initMap.reverseGeocode": (component)=>{
                                                            if (component && component.kind && component.name) {
                                                                if (component.kind === "locality" || component.kind === "area") {
                                                                    addressCity = component.name;
                                                                } else if (component.kind === "street") {
                                                                    addressStreet = component.name;
                                                                } else if (component.kind === "house") {
                                                                    addressHouse = component.name;
                                                                }
                                                            }
                                                        }
                                                    }["Map.useEffect.initMap.reverseGeocode"]);
                                                }
                                                // Безопасное получение адреса
                                                let fullAddress = "";
                                                try {
                                                    if (firstGeoObject && typeof firstGeoObject.getAddressLine === "function") {
                                                        fullAddress = firstGeoObject.getAddressLine();
                                                    } else if (firstGeoObject === null || firstGeoObject === void 0 ? void 0 : firstGeoObject.properties) {
                                                        // Альтернативный способ получения адреса
                                                        try {
                                                            if (typeof firstGeoObject.properties.get === "function") {
                                                                fullAddress = firstGeoObject.properties.get("text") || firstGeoObject.properties.get("name") || "".concat(lat.toFixed(6), ", ").concat(lon.toFixed(6));
                                                            } else {
                                                                fullAddress = firstGeoObject.properties["text"] || firstGeoObject.properties["name"] || "".concat(lat.toFixed(6), ", ").concat(lon.toFixed(6));
                                                            }
                                                        } catch (propGetError) {
                                                            console.warn("[Map] Ошибка при получении адреса через properties:", propGetError);
                                                            fullAddress = "".concat(lat.toFixed(6), ", ").concat(lon.toFixed(6));
                                                        }
                                                    } else {
                                                        fullAddress = "".concat(lat.toFixed(6), ", ").concat(lon.toFixed(6));
                                                    }
                                                } catch (addrError) {
                                                    console.warn("[Map] Ошибка при получении адреса:", addrError);
                                                    fullAddress = "".concat(lat.toFixed(6), ", ").concat(lon.toFixed(6));
                                                }
                                                const addressData = {
                                                    city: addressCity,
                                                    street: addressStreet,
                                                    house: addressHouse,
                                                    fullAddress: fullAddress,
                                                    pvzAddress: deliveryMethod === "pickup" ? fullAddress : undefined
                                                };
                                                // Проверяем, что карта еще существует перед обновлением
                                                if (!mapInstanceRef.current) {
                                                    console.warn("[Map] Карта была удалена во время геокодирования");
                                                    return;
                                                }
                                                // Создаем или обновляем маркер
                                                if (markerRef.current) {
                                                    map.geoObjects.remove(markerRef.current);
                                                }
                                                const marker = new ymaps.Placemark([
                                                    lat,
                                                    lon
                                                ], {
                                                    balloonContent: fullAddress
                                                }, {
                                                    preset: "islands#darkBlueDotIcon",
                                                    draggable: true
                                                });
                                                // Обработчик перетаскивания маркера
                                                marker.events.add("dragend", {
                                                    "Map.useEffect.initMap.reverseGeocode": async ()=>{
                                                        const markerCoords = marker.geometry.getCoordinates();
                                                        await reverseGeocode(markerCoords[0], markerCoords[1]);
                                                    }
                                                }["Map.useEffect.initMap.reverseGeocode"]);
                                                // Закрываем balloon при клике на маркер, если он уже открыт
                                                marker.events.add("click", {
                                                    "Map.useEffect.initMap.reverseGeocode": ()=>{
                                                        try {
                                                            // Если balloon уже открыт, закрываем его при повторном клике
                                                            setTimeout({
                                                                "Map.useEffect.initMap.reverseGeocode": ()=>{
                                                                    if (map.balloon && map.balloon.isOpen && map.balloon.isOpen()) {
                                                                        map.balloon.close();
                                                                    }
                                                                }
                                                            }["Map.useEffect.initMap.reverseGeocode"], 100);
                                                        } catch (error) {
                                                            console.warn("[Map] Ошибка при закрытии balloon маркера:", error);
                                                        }
                                                    }
                                                }["Map.useEffect.initMap.reverseGeocode"]);
                                                markerRef.current = marker;
                                                map.geoObjects.add(marker);
                                                map.setCenter([
                                                    lat,
                                                    lon
                                                ], 15);
                                                // Вызываем callback
                                                if (onAddressSelect) {
                                                    console.log("[Map] Вызываем onAddressSelect:", addressData);
                                                    onAddressSelect(addressData);
                                                }
                                            } catch (processError) {
                                                console.error("[Map] Ошибка при обработке результата геокодера:", {
                                                    error: processError,
                                                    message: processError === null || processError === void 0 ? void 0 : processError.message,
                                                    stack: processError === null || processError === void 0 ? void 0 : processError.stack,
                                                    lat,
                                                    lon
                                                });
                                                // Создаем маркер с координатами даже при ошибке
                                                if (mapInstanceRef.current) {
                                                    if (markerRef.current) {
                                                        map.geoObjects.remove(markerRef.current);
                                                    }
                                                    const marker = new ymaps.Placemark([
                                                        lat,
                                                        lon
                                                    ], {
                                                        balloonContent: "".concat(lat.toFixed(6), ", ").concat(lon.toFixed(6))
                                                    }, {
                                                        preset: "islands#darkBlueDotIcon",
                                                        draggable: true
                                                    });
                                                    markerRef.current = marker;
                                                    map.geoObjects.add(marker);
                                                    map.setCenter([
                                                        lat,
                                                        lon
                                                    ], 15);
                                                }
                                            }
                                        }
                                    }["Map.useEffect.initMap.reverseGeocode"]).catch({
                                        "Map.useEffect.initMap.reverseGeocode": (error)=>{
                                            console.error("[Map] Ошибка обратного геокодирования (детали):", {
                                                error,
                                                message: error === null || error === void 0 ? void 0 : error.message,
                                                stack: error === null || error === void 0 ? void 0 : error.stack,
                                                lat,
                                                lon
                                            });
                                        // Не показываем ошибку пользователю, просто логируем
                                        }
                                    }["Map.useEffect.initMap.reverseGeocode"]);
                                } catch (error) {
                                    console.error("[Map] Ошибка при вызове геокодера (детали):", {
                                        error,
                                        message: error === null || error === void 0 ? void 0 : error.message,
                                        stack: error === null || error === void 0 ? void 0 : error.stack,
                                        lat,
                                        lon,
                                        hasYmaps: !!window.ymaps,
                                        hasGeocode: !!(window.ymaps && window.ymaps.geocode)
                                    });
                                }
                            }
                        }["Map.useEffect.initMap.reverseGeocode"];
                        // Обработчик клика на карту
                        // Добавляем только после полной загрузки карты
                        const handleMapClick = {
                            "Map.useEffect.initMap.handleMapClick": (e)=>{
                                try {
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
                                        setTimeout({
                                            "Map.useEffect.initMap.handleMapClick": ()=>{
                                                if (window.ymaps && window.ymaps.geocode) {
                                                    const coords = e.get("coords");
                                                    reverseGeocode(coords[0], coords[1]);
                                                } else {
                                                    console.error("[Map] Не удалось получить доступ к геокодеру");
                                                }
                                            }
                                        }["Map.useEffect.initMap.handleMapClick"], 500);
                                        return;
                                    }
                                    const coords = e.get("coords");
                                    console.log("[Map] Клик на карту:", coords);
                                    // Координаты в формате [широта, долгота]
                                    reverseGeocode(coords[0], coords[1]);
                                } catch (error) {
                                    console.error("[Map] Ошибка при обработке клика:", {
                                        error,
                                        message: error === null || error === void 0 ? void 0 : error.message,
                                        stack: error === null || error === void 0 ? void 0 : error.stack
                                    });
                                }
                            }
                        }["Map.useEffect.initMap.handleMapClick"];
                        map.events.add("click", handleMapClick);
                        // Закрываем balloon при клике на маркер, если он уже открыт
                        const handleMarkerClick = {
                            "Map.useEffect.initMap.handleMarkerClick": ()=>{
                                if (markerRef.current) {
                                    try {
                                        // Если balloon уже открыт, закрываем его при повторном клике
                                        const marker = markerRef.current;
                                        marker.events.add("click", {
                                            "Map.useEffect.initMap.handleMarkerClick": ()=>{
                                                try {
                                                    if (map.balloon.isOpen()) {
                                                        map.balloon.close();
                                                    }
                                                } catch (error) {
                                                    console.warn("[Map] Ошибка при закрытии balloon маркера:", error);
                                                }
                                            }
                                        }["Map.useEffect.initMap.handleMarkerClick"]);
                                    } catch (error) {
                                        console.warn("[Map] Ошибка при добавлении обработчика маркера:", error);
                                    }
                                }
                            }
                        }["Map.useEffect.initMap.handleMarkerClick"];
                        mapInstanceRef.current = map;
                        console.log("[Map] Карта успешно инициализирована");
                    } catch (error) {
                        console.error("[Map] Ошибка инициализации карты:", error);
                    }
                }
            }["Map.useEffect.initMap"];
            initMap();
            return ({
                "Map.useEffect": ()=>{
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
                }
            })["Map.useEffect"];
        }
    }["Map.useEffect"], [
        isMounted,
        isYmapsLoaded
    ]); // Убрали onAddressSelect из зависимостей
    // Геокодирование адреса из searchValue с debounce
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            if (!isMounted || !isYmapsLoaded || !mapInstanceRef.current) {
                console.log("[Map] Геокодирование пропущено - карта не готова");
                return;
            }
            if (!searchValue || searchValue.trim().length < 3) {
                console.log("[Map] Геокодирование пропущено - searchValue слишком короткий:", searchValue);
                return;
            }
            console.log("[Map] Планируем геокодирование для:", searchValue);
            // Очищаем предыдущий таймер
            if (geocodeDebounceTimerRef.current) {
                clearTimeout(geocodeDebounceTimerRef.current);
            }
            geocodeDebounceTimerRef.current = setTimeout({
                "Map.useEffect": ()=>{
                    if (isGeocodingRef.current) {
                        console.log("[Map] Геокодирование уже выполняется, пропускаем");
                        return;
                    }
                    isGeocodingRef.current = true;
                    console.log("[Map] Начинаем геокодирование:", searchValue);
                    const geocodeAddress = {
                        "Map.useEffect.geocodeAddress": async ()=>{
                            try {
                                const { ymaps } = window;
                                const geocoder = ymaps.geocode(searchValue, {
                                    results: 1
                                });
                                geocoder.then({
                                    "Map.useEffect.geocodeAddress": (res)=>{
                                        isGeocodingRef.current = false;
                                        const firstGeoObject = res.geoObjects.get(0);
                                        if (firstGeoObject && mapInstanceRef.current) {
                                            var _firstGeoObject_properties_get_GeocoderMetaData_Address, _firstGeoObject_properties_get_GeocoderMetaData, _firstGeoObject_properties_get;
                                            const coords = firstGeoObject.geometry.getCoordinates();
                                            const addressComponents = ((_firstGeoObject_properties_get = firstGeoObject.properties.get("metaDataProperty")) === null || _firstGeoObject_properties_get === void 0 ? void 0 : (_firstGeoObject_properties_get_GeocoderMetaData = _firstGeoObject_properties_get.GeocoderMetaData) === null || _firstGeoObject_properties_get_GeocoderMetaData === void 0 ? void 0 : (_firstGeoObject_properties_get_GeocoderMetaData_Address = _firstGeoObject_properties_get_GeocoderMetaData.Address) === null || _firstGeoObject_properties_get_GeocoderMetaData_Address === void 0 ? void 0 : _firstGeoObject_properties_get_GeocoderMetaData_Address.Components) || [];
                                            let addressCity = "";
                                            let addressStreet = "";
                                            let addressHouse = "";
                                            addressComponents.forEach({
                                                "Map.useEffect.geocodeAddress": (component)=>{
                                                    if (component.kind === "locality" || component.kind === "area") {
                                                        addressCity = component.name;
                                                    } else if (component.kind === "street") {
                                                        addressStreet = component.name;
                                                    } else if (component.kind === "house") {
                                                        addressHouse = component.name;
                                                    }
                                                }
                                            }["Map.useEffect.geocodeAddress"]);
                                            const fullAddress = firstGeoObject.getAddressLine();
                                            // Обновляем маркер
                                            if (markerRef.current) {
                                                mapInstanceRef.current.geoObjects.remove(markerRef.current);
                                            }
                                            const marker = new ymaps.Placemark(coords, {
                                                balloonContent: fullAddress
                                            }, {
                                                preset: "islands#darkBlueDotIcon",
                                                draggable: true
                                            });
                                            // Обработчик перетаскивания
                                            marker.events.add("dragend", {
                                                "Map.useEffect.geocodeAddress": async ()=>{
                                                    const markerCoords = marker.geometry.getCoordinates();
                                                    const reverseGeocoder = ymaps.geocode(markerCoords, {
                                                        results: 1
                                                    });
                                                    reverseGeocoder.then({
                                                        "Map.useEffect.geocodeAddress": (reverseRes)=>{
                                                            const reverseGeoObject = reverseRes.geoObjects.get(0);
                                                            if (reverseGeoObject && onAddressSelect) {
                                                                const reverseComponents = reverseGeoObject.properties.get("metaDataProperty").GeocoderMetaData.Address.Components;
                                                                let reverseCity = "";
                                                                let reverseStreet = "";
                                                                let reverseHouse = "";
                                                                reverseComponents.forEach({
                                                                    "Map.useEffect.geocodeAddress": (component)=>{
                                                                        if (component.kind === "locality" || component.kind === "area") {
                                                                            reverseCity = component.name;
                                                                        } else if (component.kind === "street") {
                                                                            reverseStreet = component.name;
                                                                        } else if (component.kind === "house") {
                                                                            reverseHouse = component.name;
                                                                        }
                                                                    }
                                                                }["Map.useEffect.geocodeAddress"]);
                                                                onAddressSelect({
                                                                    city: reverseCity,
                                                                    street: reverseStreet,
                                                                    house: reverseHouse,
                                                                    fullAddress: reverseGeoObject.getAddressLine(),
                                                                    pvzAddress: deliveryMethod === "pickup" ? reverseGeoObject.getAddressLine() : undefined
                                                                });
                                                            }
                                                        }
                                                    }["Map.useEffect.geocodeAddress"]);
                                                }
                                            }["Map.useEffect.geocodeAddress"]);
                                            // Закрываем balloon при клике на маркер, если он уже открыт
                                            marker.events.add("click", {
                                                "Map.useEffect.geocodeAddress": ()=>{
                                                    try {
                                                        setTimeout({
                                                            "Map.useEffect.geocodeAddress": ()=>{
                                                                if (mapInstanceRef.current && mapInstanceRef.current.balloon && mapInstanceRef.current.balloon.isOpen && mapInstanceRef.current.balloon.isOpen()) {
                                                                    mapInstanceRef.current.balloon.close();
                                                                }
                                                            }
                                                        }["Map.useEffect.geocodeAddress"], 100);
                                                    } catch (error) {
                                                        console.warn("[Map] Ошибка при закрытии balloon маркера:", error);
                                                    }
                                                }
                                            }["Map.useEffect.geocodeAddress"]);
                                            markerRef.current = marker;
                                            mapInstanceRef.current.geoObjects.add(marker);
                                            mapInstanceRef.current.setCenter(coords, 15);
                                            // НЕ вызываем onAddressSelect при геокодировании из поиска
                                            // Это предотвращает бесконечный цикл обновлений
                                            // onAddressSelect вызывается только при клике на карту или выборе из подсказок
                                            console.log("[Map] Геокодирование завершено, маркер установлен, onAddressSelect НЕ вызываем");
                                            console.log("[Map] Найденный адрес:", fullAddress);
                                        } else {
                                            isGeocodingRef.current = false;
                                        }
                                    }
                                }["Map.useEffect.geocodeAddress"]).catch({
                                    "Map.useEffect.geocodeAddress": (error)=>{
                                        isGeocodingRef.current = false;
                                        console.error("Ошибка геокодирования:", error);
                                    }
                                }["Map.useEffect.geocodeAddress"]);
                            } catch (error) {
                                isGeocodingRef.current = false;
                                console.error("Ошибка геокодирования:", error);
                            }
                        }
                    }["Map.useEffect.geocodeAddress"];
                    geocodeAddress();
                }
            }["Map.useEffect"], 800); // 800ms debounce
            return ({
                "Map.useEffect": ()=>{
                    if (geocodeDebounceTimerRef.current) {
                        clearTimeout(geocodeDebounceTimerRef.current);
                    }
                }
            })["Map.useEffect"];
        }
    }["Map.useEffect"], [
        isMounted,
        isYmapsLoaded,
        searchValue
    ]); // Убрали onAddressSelect из зависимостей
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            setIsMounted(true);
        }
    }["Map.useEffect"], []);
    // Скрытие лишних элементов интерфейса Яндекс.Карт
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            if (!isYmapsLoaded || !mapInstanceRef.current) {
                return;
            }
            // Добавляем стили для скрытия лишних элементов
            const styleId = "yandex-maps-hide-elements";
            if (!document.getElementById(styleId)) {
                const style = document.createElement("style");
                style.id = styleId;
                style.textContent = '\n        /* Скрываем плашки "как добраться", "доехать на такси", "создать свою карту" */\n        .ymaps-2-1-79-balloon__route,\n        .ymaps-2-1-79-balloon__taxi,\n        .ymaps-2-1-79-balloon__create-map,\n        .ymaps-2-1-79-balloon__route-link,\n        .ymaps-2-1-79-balloon__taxi-link,\n        .ymaps-2-1-79-balloon__create-map-link,\n        [class*="balloon__route"],\n        [class*="balloon__taxi"],\n        [class*="balloon__create-map"],\n        [class*="balloon__route-link"],\n        [class*="balloon__taxi-link"],\n        [class*="balloon__create-map-link"] {\n          display: none !important;\n        }\n        \n        /* Скрываем "условия использования" и другие ссылки в нижней части карты */\n        .ymaps-2-1-79-copyrights-promo,\n        .ymaps-2-1-79-copyrights,\n        .ymaps-2-1-79-copyrights__content,\n        .ymaps-2-1-79-copyrights__link,\n        .ymaps-2-1-79-copyrights__wrap,\n        [class*="copyrights-promo"],\n        [class*="copyrights"],\n        [class*="copyrights__content"],\n        [class*="copyrights__link"],\n        [class*="copyrights__wrap"],\n        a[href*="yandex.ru/maps"],\n        a[href*="yandex.com/maps"],\n        /* Скрываем "Создать свою карту" */\n        [class*="create-map"],\n        [class*="create-map-link"],\n        /* Скрываем "Открыть в Яндекс.Картах" */\n        [class*="open-in-maps"],\n        [class*="open-in-yandex"],\n        /* Скрываем все ссылки в нижней части карты */\n        .ymaps-2-1-79-ground-pane ~ div a,\n        .ymaps-2-1-79-map a[href*="maps"],\n        /* Более агрессивное скрытие всех ссылок внизу карты */\n        div[class*="ymaps"] > div[class*="copyrights"] a,\n        div[class*="ymaps"] > div[class*="copyrights"],\n        /* Скрываем все элементы в нижней панели карты */\n        .ymaps-2-1-79-map > div:last-child a,\n        .ymaps-2-1-79-map > div:last-child button,\n        /* Скрываем все ссылки и кнопки в нижней части */\n        [class*="ymaps-2-1-79"] a[href],\n        [class*="ymaps-2-1-79"] button {\n          display: none !important;\n        }\n        \n        /* Скрываем другие лишние элементы */\n        .ymaps-2-1-79-balloon__footer,\n        .ymaps-2-1-79-balloon__actions,\n        [class*="balloon__footer"],\n        [class*="balloon__actions"] {\n          display: none !important;\n        }\n      ';
                document.head.appendChild(style);
            }
            // Дополнительно скрываем элементы по тексту через JavaScript
            const hideElementsByText = {
                "Map.useEffect.hideElementsByText": ()=>{
                    if (!mapRef.current) return;
                    const mapElement = mapRef.current;
                    const allElements = mapElement.querySelectorAll("a, button, span, div");
                    allElements.forEach({
                        "Map.useEffect.hideElementsByText": (element)=>{
                            const text = element.textContent || "";
                            if (text.includes("Создать свою карту") || text.includes("Условия использования") || text.includes("Открыть в Яндекс.Картах")) {
                                element.style.display = "none";
                                element.style.visibility = "hidden";
                                element.style.opacity = "0";
                                element.style.height = "0";
                                element.style.width = "0";
                                element.style.overflow = "hidden";
                            }
                        }
                    }["Map.useEffect.hideElementsByText"]);
                }
            }["Map.useEffect.hideElementsByText"];
            // Вызываем сразу и через интервалы для надежности
            if (mapInstanceRef.current && mapRef.current) {
                hideElementsByText();
                // Используем MutationObserver для отслеживания динамически добавляемых элементов
                const observer = new MutationObserver({
                    "Map.useEffect": ()=>{
                        hideElementsByText();
                    }
                }["Map.useEffect"]);
                observer.observe(mapRef.current, {
                    childList: true,
                    subtree: true,
                    attributes: false
                });
                const interval = setInterval({
                    "Map.useEffect.interval": ()=>{
                        hideElementsByText();
                    }
                }["Map.useEffect.interval"], 500);
                setTimeout({
                    "Map.useEffect": ()=>{
                        clearInterval(interval);
                        observer.disconnect();
                    }
                }["Map.useEffect"], 10000);
                return ({
                    "Map.useEffect": ()=>{
                        clearInterval(interval);
                        observer.disconnect();
                    }
                })["Map.useEffect"];
            }
            return ({
                "Map.useEffect": ()=>{
                // Не удаляем стили при размонтировании, так как они могут использоваться другими компонентами
                }
            })["Map.useEffect"];
        }
    }["Map.useEffect"], [
        isYmapsLoaded
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: "100%"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: mapRef,
            style: {
                width: "100%",
                height: "400px",
                borderRadius: "3px"
            }
        }, void 0, false, {
            fileName: "[project]/src/components/Map/Map.tsx",
            lineNumber: 915,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Map/Map.tsx",
        lineNumber: 914,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Map, "H8wyRiShKFitzAjGss6D/hJPy4g=");
_c = Map;
const __TURBOPACK__default__export__ = Map;
var _c;
__turbopack_context__.k.register(_c, "Map");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/checkout/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "Summary": "page-module__XjuLyG__Summary",
  "backLink": "page-module__XjuLyG__backLink",
  "checkbox": "page-module__XjuLyG__checkbox",
  "checkboxLabel": "page-module__XjuLyG__checkboxLabel",
  "checkboxLink": "page-module__XjuLyG__checkboxLink",
  "checkboxes": "page-module__XjuLyG__checkboxes",
  "checkmark": "page-module__XjuLyG__checkmark",
  "checkmarkIcon": "page-module__XjuLyG__checkmarkIcon",
  "checkoutMapContainer": "page-module__XjuLyG__checkoutMapContainer",
  "checkoutMapSearchContainer": "page-module__XjuLyG__checkoutMapSearchContainer",
  "checkoutMapSearchInput": "page-module__XjuLyG__checkoutMapSearchInput",
  "checkoutPage": "page-module__XjuLyG__checkoutPage",
  "column": "page-module__XjuLyG__column",
  "content": "page-module__XjuLyG__content",
  "delivery": "page-module__XjuLyG__delivery",
  "deliveryButton": "page-module__XjuLyG__deliveryButton",
  "deliveryButtonContent": "page-module__XjuLyG__deliveryButtonContent",
  "deliveryButtonInfo": "page-module__XjuLyG__deliveryButtonInfo",
  "deliveryButtonName": "page-module__XjuLyG__deliveryButtonName",
  "deliveryButtonPrice": "page-module__XjuLyG__deliveryButtonPrice",
  "deliveryButtonPriceCourier": "page-module__XjuLyG__deliveryButtonPriceCourier",
  "deliveryButtonSubtext": "page-module__XjuLyG__deliveryButtonSubtext",
  "deliveryButtonsRow": "page-module__XjuLyG__deliveryButtonsRow",
  "deliveryCheckmark": "page-module__XjuLyG__deliveryCheckmark",
  "deliveryCheckmarkActive": "page-module__XjuLyG__deliveryCheckmarkActive",
  "deliveryOptionContent": "page-module__XjuLyG__deliveryOptionContent",
  "deliveryOptionInfo": "page-module__XjuLyG__deliveryOptionInfo",
  "deliveryOptionName": "page-module__XjuLyG__deliveryOptionName",
  "deliveryOptionPrice": "page-module__XjuLyG__deliveryOptionPrice",
  "deliveryOptionTime": "page-module__XjuLyG__deliveryOptionTime",
  "deliveryOptions": "page-module__XjuLyG__deliveryOptions",
  "deliveryTypeButton": "page-module__XjuLyG__deliveryTypeButton",
  "deliveryTypeButtonContent": "page-module__XjuLyG__deliveryTypeButtonContent",
  "deliveryTypeRow": "page-module__XjuLyG__deliveryTypeRow",
  "deliveryTypeText": "page-module__XjuLyG__deliveryTypeText",
  "editLink": "page-module__XjuLyG__editLink",
  "emptyCart": "page-module__XjuLyG__emptyCart",
  "emptyText": "page-module__XjuLyG__emptyText",
  "emptyTitle": "page-module__XjuLyG__emptyTitle",
  "firstInputs": "page-module__XjuLyG__firstInputs",
  "infoInputs": "page-module__XjuLyG__infoInputs",
  "input": "page-module__XjuLyG__input",
  "inputWrapper": "page-module__XjuLyG__inputWrapper",
  "label": "page-module__XjuLyG__label",
  "leftColumn": "page-module__XjuLyG__leftColumn",
  "main": "page-module__XjuLyG__main",
  "orderHeader": "page-module__XjuLyG__orderHeader",
  "orderImage": "page-module__XjuLyG__orderImage",
  "orderItem": "page-module__XjuLyG__orderItem",
  "orderItemBottom": "page-module__XjuLyG__orderItemBottom",
  "orderItemCategory": "page-module__XjuLyG__orderItemCategory",
  "orderItemDetailColumn": "page-module__XjuLyG__orderItemDetailColumn",
  "orderItemDetailLabel": "page-module__XjuLyG__orderItemDetailLabel",
  "orderItemDetailValue": "page-module__XjuLyG__orderItemDetailValue",
  "orderItemDetailsRow": "page-module__XjuLyG__orderItemDetailsRow",
  "orderItemImage": "page-module__XjuLyG__orderItemImage",
  "orderItemInfo": "page-module__XjuLyG__orderItemInfo",
  "orderItemPrice": "page-module__XjuLyG__orderItemPrice",
  "orderItemSizeValue": "page-module__XjuLyG__orderItemSizeValue",
  "orderItemTitle": "page-module__XjuLyG__orderItemTitle",
  "orderItems": "page-module__XjuLyG__orderItems",
  "orderItemsBlock": "page-module__XjuLyG__orderItemsBlock",
  "orderSummary": "page-module__XjuLyG__orderSummary",
  "orderSummaryBlock": "page-module__XjuLyG__orderSummaryBlock",
  "orderTitle": "page-module__XjuLyG__orderTitle",
  "paymentButton": "page-module__XjuLyG__paymentButton",
  "paymentButtonContent": "page-module__XjuLyG__paymentButtonContent",
  "paymentButtonIcon": "page-module__XjuLyG__paymentButtonIcon",
  "paymentButtonText": "page-module__XjuLyG__paymentButtonText",
  "paymentButtonsRow": "page-module__XjuLyG__paymentButtonsRow",
  "paymentIcon": "page-module__XjuLyG__paymentIcon",
  "paymentOptions": "page-module__XjuLyG__paymentOptions",
  "paymentTitle": "page-module__XjuLyG__paymentTitle",
  "quantityButton": "page-module__XjuLyG__quantityButton",
  "quantityControls": "page-module__XjuLyG__quantityControls",
  "quantityValue": "page-module__XjuLyG__quantityValue",
  "radio": "page-module__XjuLyG__radio",
  "radioInput": "page-module__XjuLyG__radioInput",
  "radioLabel": "page-module__XjuLyG__radioLabel",
  "rightColumn": "page-module__XjuLyG__rightColumn",
  "rightPart": "page-module__XjuLyG__rightPart",
  "section": "page-module__XjuLyG__section",
  "sectionTitle": "page-module__XjuLyG__sectionTitle",
  "shopButton": "page-module__XjuLyG__shopButton",
  "submitButton": "page-module__XjuLyG__submitButton",
  "submitButtonRight": "page-module__XjuLyG__submitButtonRight",
  "summaryLabel": "page-module__XjuLyG__summaryLabel",
  "summaryLabelTotal": "page-module__XjuLyG__summaryLabelTotal",
  "summaryRow": "page-module__XjuLyG__summaryRow",
  "summaryRowTotal": "page-module__XjuLyG__summaryRowTotal",
  "summaryTotal": "page-module__XjuLyG__summaryTotal",
  "summaryValue": "page-module__XjuLyG__summaryValue",
  "telegramButton": "page-module__XjuLyG__telegramButton",
  "telegramDescription": "page-module__XjuLyG__telegramDescription",
  "telegramIcon": "page-module__XjuLyG__telegramIcon",
  "telegramSection": "page-module__XjuLyG__telegramSection",
  "title": "page-module__XjuLyG__title",
  "wrapper": "page-module__XjuLyG__wrapper",
});
}),
"[project]/src/components/CheckoutForm/CheckoutForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2f$Map$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Map/Map.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/checkout/page.module.css [app-client] (css module)");
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
const CheckoutForm = (param)=>{
    let { onOrderSubmit, showRightColumn = true, className = "" } = param;
    _s();
    const { items, getTotalPrice, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
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
        differentRecipient: false
    });
    const [mapSearchValue, setMapSearchValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const isUpdatingFromMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastGeocodedAddressRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    // Устанавливаем город "Москва" при выборе курьерской доставки
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutForm.useEffect": ()=>{
            if (formData.deliveryMethod === "yandex") {
                setFormData({
                    "CheckoutForm.useEffect": (prev)=>({
                            ...prev,
                            city: "Москва"
                        })
                }["CheckoutForm.useEffect"]);
            }
        }
    }["CheckoutForm.useEffect"], [
        formData.deliveryMethod
    ]);
    // Цены доставки
    const deliveryPrices = {
        pickup: 0,
        yandex: 300
    };
    // Расчет итоговой суммы
    const calculateTotal = ()=>{
        const itemsTotal = getTotalPrice();
        const deliveryPrice = deliveryPrices[formData.deliveryMethod] || 0;
        return itemsTotal + deliveryPrice;
    };
    const formatPrice = (price)=>{
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };
    const handleInputChange = (e)=>{
        const { name, value, type } = e.target;
        const checked = e.target.checked;
        // При смене типа доставки сбрасываем метод доставки на pickup
        if (name === "deliveryType") {
            setFormData((prev)=>({
                    ...prev,
                    deliveryType: value,
                    deliveryMethod: "pickup"
                }));
        } else if (name === "deliveryMethod" && value === "yandex") {
            // При выборе курьерской доставки устанавливаем город "Москва"
            setFormData((prev)=>({
                    ...prev,
                    deliveryMethod: value,
                    city: "Москва"
                }));
        } else {
            setFormData((prev)=>({
                    ...prev,
                    [name]: type === "checkbox" ? checked : value
                }));
        }
    };
    const handleAddressSelect = (addressData)=>{
        const fullAddress = addressData.fullAddress || [
            addressData.street,
            addressData.house,
            addressData.city
        ].filter(Boolean).join(", ");
        if (lastGeocodedAddressRef.current === fullAddress) {
            return;
        }
        lastGeocodedAddressRef.current = fullAddress;
        isUpdatingFromMapRef.current = true;
        // Если выбран пункт выдачи, сохраняем адрес ПВЗ
        if (formData.deliveryMethod === "pickup") {
            setFormData((prev)=>({
                    ...prev,
                    pvzAddress: addressData.pvzAddress || fullAddress || "",
                    city: addressData.city || prev.city
                }));
        } else {
            // Для курьерской доставки сохраняем полный адрес
            const newAddress = {
                city: addressData.city || "",
                street: addressData.street || "",
                house: addressData.house || ""
            };
            setFormData((prev)=>({
                    ...prev,
                    ...newAddress
                }));
        }
        if (fullAddress && fullAddress !== mapSearchValue) {
            setMapSearchValue(fullAddress);
        }
        setTimeout(()=>{
            isUpdatingFromMapRef.current = false;
        }, 1000);
    };
    const handleMapSearchChange = (value)=>{
        setMapSearchValue(value);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutForm.useEffect": ()=>{
            if (isUpdatingFromMapRef.current) {
                return;
            }
            const addressString = [
                formData.city,
                formData.street,
                formData.house
            ].filter(Boolean).join(", ");
            if (addressString && addressString !== mapSearchValue) {
                const timeoutId = setTimeout({
                    "CheckoutForm.useEffect.timeoutId": ()=>{
                        setMapSearchValue(addressString);
                    }
                }["CheckoutForm.useEffect.timeoutId"], 1500);
                return ({
                    "CheckoutForm.useEffect": ()=>{
                        clearTimeout(timeoutId);
                    }
                })["CheckoutForm.useEffect"];
            }
        }
    }["CheckoutForm.useEffect"], [
        formData.city,
        formData.street,
        formData.house,
        mapSearchValue
    ]);
    const generateOrderNumber = ()=>{
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    };
    const formatDate = (date)=>{
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return "".concat(day, ".").concat(month, ".").concat(year);
    };
    const handleSubmitOrder = ()=>{
        if (!formData.agreeToOffer || !formData.agreeToPrivacy) {
            return;
        }
        const newOrderNumber = generateOrderNumber();
        const orderDate = new Date();
        // Формируем данные заказа
        const orderData = {
            id: newOrderNumber,
            date: formatDate(orderDate),
            status: "не оплачен",
            buyer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone || formData.email
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
                pvzAddress: formData.pvzAddress,
                type: formData.deliveryType,
                method: formData.deliveryMethod
            },
            payment: {
                method: formData.paymentMethod,
                amount: formatPrice(calculateTotal())
            },
            products: items.map((item)=>{
                var _fullProduct_availableColors_find;
                const fullProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(item.productId);
                const colorLabel = (fullProduct === null || fullProduct === void 0 ? void 0 : (_fullProduct_availableColors_find = fullProduct.availableColors.find((c)=>c.value === item.color)) === null || _fullProduct_availableColors_find === void 0 ? void 0 : _fullProduct_availableColors_find.label) || item.color;
                return {
                    id: item.productId,
                    name: item.product.title,
                    category: (fullProduct === null || fullProduct === void 0 ? void 0 : fullProduct.category) || item.product.category || "",
                    color: colorLabel,
                    size: item.size,
                    quantity: item.quantity,
                    price: formatPrice(item.product.priceValue * item.quantity),
                    priceValue: item.product.priceValue * item.quantity,
                    image: item.product.images[0] || "/images/catalogs/placeholder.png"
                };
            }),
            total: {
                itemsCount: items.reduce((sum, item)=>sum + item.quantity, 0),
                totalAmount: formatPrice(calculateTotal()),
                totalAmountValue: calculateTotal()
            }
        };
        // Сохраняем заказ в sessionStorage
        if ("TURBOPACK compile-time truthy", 1) {
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
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftColumn,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].telegramSection,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                    children: "Оформление заказа"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 288,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].telegramButton,
                                    type: "button",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].telegramIcon,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/images/checkout/telegram.png",
                                                alt: "Telegram",
                                                width: 32,
                                                height: 32
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 290,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Подключить Telegram"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 287,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: "Личные данные"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 303,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].firstInputs,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "firstName",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                    children: "Имя"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    id: "firstName",
                                                    name: "firstName",
                                                    placeholder: "Введите имя",
                                                    value: formData.firstName,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 305,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "lastName",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                    children: "Фамилия"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    id: "lastName",
                                                    name: "lastName",
                                                    placeholder: "Введите фамилию",
                                                    value: formData.lastName,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoInputs,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "phone",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                    children: "Телефон"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    id: "phone",
                                                    name: "phone",
                                                    placeholder: "+7 (___) ___-__-__",
                                                    value: formData.phone,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 339,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 335,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "email",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    id: "email",
                                                    name: "email",
                                                    placeholder: "Введите email",
                                                    value: formData.email,
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 349,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 334,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 302,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: "Вариант доставки"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 367,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTypeRow,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTypeButton,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "deliveryType",
                                                    value: "cdek",
                                                    checked: formData.deliveryType === "cdek",
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTypeButtonContent,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTypeText,
                                                            children: "СДЕК"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmark, " ").concat(formData.deliveryType === "cdek" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmarkActive : ""),
                                                            children: formData.deliveryType === "cdek" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkmarkIcon,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: "/images/checkout/checkmark.png",
                                                                    alt: "checkmark",
                                                                    width: 11.64,
                                                                    height: 10
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 389,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 380,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 369,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTypeButton,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "deliveryType",
                                                    value: "yandex",
                                                    checked: formData.deliveryType === "yandex",
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTypeButtonContent,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTypeText,
                                                            children: "ЯНДЕКС.КУРЬЕР"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmark, " ").concat(formData.deliveryType === "yandex" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmarkActive : ""),
                                                            children: formData.deliveryType === "yandex" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkmarkIcon,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: "/images/checkout/checkmark.png",
                                                                    alt: "checkmark",
                                                                    width: 11.64,
                                                                    height: 10
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 420,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 419,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 411,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 400,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 368,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: "Доставка"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 435,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonsRow,
                                    children: [
                                        formData.deliveryType === "cdek" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButton,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "deliveryMethod",
                                                    value: "pickup",
                                                    checked: formData.deliveryMethod === "pickup",
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonContent,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonInfo,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonName,
                                                                children: "Пункт выдачи"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonInfo,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonSubtext,
                                                                    children: "Послезавтра"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 454,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonPrice,
                                                                    children: "бесплатно"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 457,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmark, " ").concat(formData.deliveryMethod === "pickup" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmarkActive : ""),
                                                            children: formData.deliveryMethod === "pickup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkmarkIcon,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: "/images/checkout/checkmark.png",
                                                                    alt: "checkmark",
                                                                    width: 11.64,
                                                                    height: 10
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 470,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 469,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 461,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 447,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 438,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        formData.deliveryType === "yandex" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButton,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "deliveryMethod",
                                                            value: "pickup",
                                                            checked: formData.deliveryMethod === "pickup",
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonContent,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonInfo,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonName,
                                                                        children: "Пункт выдачи"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                        lineNumber: 495,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 494,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonInfo,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonSubtext,
                                                                            children: "Послезавтра"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                            lineNumber: 500,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonPrice,
                                                                            children: "бесплатно"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                            lineNumber: 503,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 499,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmark, " ").concat(formData.deliveryMethod === "pickup" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmarkActive : ""),
                                                                    children: formData.deliveryMethod === "pickup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkmarkIcon,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            src: "/images/checkout/checkmark.png",
                                                                            alt: "checkmark",
                                                                            width: 11.64,
                                                                            height: 10
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                            lineNumber: 516,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                        lineNumber: 515,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 484,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButton,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "radio",
                                                            name: "deliveryMethod",
                                                            value: "yandex",
                                                            checked: formData.deliveryMethod === "yandex",
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 528,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonContent,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonInfo,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonName,
                                                                        children: "Курьером"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                        lineNumber: 538,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonInfo,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonSubtext,
                                                                            children: "6-7 дней"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                            lineNumber: 543,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonPrice, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryButtonPriceCourier),
                                                                            children: [
                                                                                "от ",
                                                                                formatPrice(deliveryPrices.yandex)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                            lineNumber: 546,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 542,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmark, " ").concat(formData.deliveryMethod === "yandex" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryCheckmarkActive : ""),
                                                                    children: formData.deliveryMethod === "yandex" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkmarkIcon,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            src: "/images/checkout/checkmark.png",
                                                                            alt: "checkmark",
                                                                            width: 11.64,
                                                                            height: 10
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                            lineNumber: 561,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                        lineNumber: 560,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 552,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 536,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 527,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 436,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 434,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: "Данные о доставке"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                    style: {
                                        marginBottom: "20px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            name: "differentRecipient",
                                            checked: formData.differentRecipient,
                                            onChange: handleInputChange,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 583,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Получатель отличается от покупателя"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 590,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 579,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                formData.differentRecipient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].firstInputs,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "deliveryFirstName",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Имя получателя"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 596,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "deliveryFirstName",
                                                            name: "deliveryFirstName",
                                                            placeholder: "Введите имя",
                                                            value: formData.deliveryFirstName,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 599,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 595,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "deliveryLastName",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Фамилия получателя"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 610,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "deliveryLastName",
                                                            name: "deliveryLastName",
                                                            placeholder: "Введите фамилию",
                                                            value: formData.deliveryLastName,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 613,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 609,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 594,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoInputs,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "deliveryPhone",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Телефон получателя"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 626,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "tel",
                                                            id: "deliveryPhone",
                                                            name: "deliveryPhone",
                                                            placeholder: "+7 (___) ___-__-__",
                                                            value: formData.deliveryPhone,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 629,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 625,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "deliveryEmail",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Email получателя"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "email",
                                                            id: "deliveryEmail",
                                                            name: "deliveryEmail",
                                                            placeholder: "Введите email",
                                                            value: formData.deliveryEmail,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 643,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 624,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true),
                                formData.deliveryMethod === "pickup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].firstInputs,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "pickupCity",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Город"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "pickupCity",
                                                            name: "pickupCity",
                                                            placeholder: "Введите город",
                                                            value: formData.pickupCity || "",
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 663,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "postalCode",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Почтовый индекс"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 674,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "postalCode",
                                                            name: "postalCode",
                                                            placeholder: "Введите индекс",
                                                            value: formData.postalCode,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 658,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoInputs,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                style: {
                                                    width: "100%"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "pvzAddress",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                        children: "Адрес пункта выдачи"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 693,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        id: "pvzAddress",
                                                        name: "pvzAddress",
                                                        placeholder: "Выберите пункт выдачи на карте",
                                                        value: formData.pvzAddress,
                                                        onChange: handleInputChange,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                                        readOnly: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 696,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                lineNumber: 689,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 688,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true),
                                formData.deliveryMethod === "yandex" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].firstInputs,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "city",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Город"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 714,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "city",
                                                            name: "city",
                                                            placeholder: "Москва",
                                                            value: "Москва",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                                            readOnly: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 717,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 713,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "street",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Улица"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 728,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "street",
                                                            name: "street",
                                                            placeholder: "Введите улицу",
                                                            value: formData.street,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 731,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 712,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoInputs,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "house",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Дом"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 744,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "house",
                                                            name: "house",
                                                            placeholder: "Введите дом",
                                                            value: formData.house,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 747,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 743,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "apartment",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Квартира"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 758,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "apartment",
                                                            name: "apartment",
                                                            placeholder: "Введите квартиру",
                                                            value: formData.apartment,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 761,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 757,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 742,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].firstInputs,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "floor",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Этаж"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 774,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "floor",
                                                            name: "floor",
                                                            placeholder: "Введите этаж",
                                                            value: formData.floor,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 777,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 773,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "entrance",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                            children: "Подъезд"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 788,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            id: "entrance",
                                                            name: "entrance",
                                                            placeholder: "Введите подъезд",
                                                            value: formData.entrance,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 791,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 787,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 772,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoInputs,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "intercom",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                        children: "Домофон"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        id: "intercom",
                                                        name: "intercom",
                                                        placeholder: "Введите домофон",
                                                        value: formData.intercom,
                                                        onChange: handleInputChange,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                lineNumber: 803,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 802,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 577,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                    children: formData.deliveryMethod === "pickup" ? "Пункт получения" : "Адрес доставки"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 823,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutMapSearchContainer,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "mapSearchInput",
                                        name: "mapSearchInput",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutMapSearchInput,
                                        placeholder: formData.deliveryMethod === "pickup" ? "Выберите пункт получения" : "Выберите адрес доставки",
                                        value: formData.deliveryMethod === "pickup" ? formData.pvzAddress || mapSearchValue || "Выберите пункт выдачи на карте" : mapSearchValue || [
                                            formData.city,
                                            formData.street,
                                            formData.house
                                        ].filter(Boolean).join(", ") || "Выберите адрес на карте",
                                        onChange: (e)=>{
                                            handleMapSearchChange(e.target.value);
                                        },
                                        readOnly: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                        lineNumber: 829,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 828,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutMapContainer,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Map$2f$Map$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        onAddressSelect: handleAddressSelect,
                                        searchValue: mapSearchValue,
                                        onSearchChange: handleMapSearchChange,
                                        deliveryMethod: formData.deliveryMethod,
                                        deliveryType: formData.deliveryType
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                        lineNumber: 857,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 856,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 822,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentTitle,
                                    children: "Способ оплаты"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 868,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonsRow,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButton,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "paymentMethod",
                                                    value: "sberbank",
                                                    checked: formData.paymentMethod === "sberbank",
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 871,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonContent,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/images/checkout/sbp.png",
                                                        alt: "СБП",
                                                        width: 54,
                                                        height: 30,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonIcon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 880,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 879,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 870,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButton,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "paymentMethod",
                                                    value: "card",
                                                    checked: formData.paymentMethod === "card",
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonContent,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: "/images/checkout/card.png",
                                                            alt: "Картой онлайн",
                                                            width: 86,
                                                            height: 24,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonIcon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 899,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: "/images/checkout/cardText.png",
                                                            alt: "Онлайн",
                                                            width: 86,
                                                            height: 16,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonIcon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 906,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 898,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 889,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButton,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "paymentMethod",
                                                    value: "yandexpay",
                                                    checked: formData.paymentMethod === "yandexpay",
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 916,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonContent,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/images/checkout/y.png",
                                                        alt: "Яндекс Pay",
                                                        width: 60,
                                                        height: 20,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonIcon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 925,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 924,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 915,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButton,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "paymentMethod",
                                                    value: "installment",
                                                    checked: formData.paymentMethod === "installment",
                                                    onChange: handleInputChange,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 935,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonContent,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/images/checkout/dolya.png",
                                                        alt: "Долями",
                                                        width: 73,
                                                        height: 14,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentButtonIcon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 944,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 943,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 934,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 869,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 867,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        !showRightColumn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderSummaryBlock,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderSummary,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryRowTotal,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryLabelTotal,
                                                    children: "Итого"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 961,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryTotal,
                                                    children: formatPrice(calculateTotal())
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 962,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 960,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                        lineNumber: 959,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButton, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButtonRight),
                                        disabled: !formData.agreeToOffer || !formData.agreeToPrivacy,
                                        onClick: handleSubmitOrder,
                                        children: "Оформить заказ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                        lineNumber: 967,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxes,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        name: "agreeToOffer",
                                                        checked: formData.agreeToOffer,
                                                        onChange: handleInputChange,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 977,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Я соглашаюсь с условиями",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/public-offer",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLink,
                                                                children: "публичной оферты"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 986,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 984,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                lineNumber: 976,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        name: "agreeToPrivacy",
                                                        checked: formData.agreeToPrivacy,
                                                        onChange: handleInputChange,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 995,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Я принимаю",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/privacy",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLink,
                                                                children: "политику конфиденциальности"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 1004,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 1002,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                lineNumber: 994,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                        lineNumber: 975,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                lineNumber: 958,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                    lineNumber: 286,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                showRightColumn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightPart,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderHeader,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderTitle,
                                    children: "Ваши товары"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 1017,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/cart",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editLink,
                                    children: "изменить"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 1018,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 1016,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightColumn,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemsBlock,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItems,
                                        children: items.map((item, index)=>{
                                            var _fullProduct_availableColors_find;
                                            const fullProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductById"])(item.productId);
                                            const colorLabel = (fullProduct === null || fullProduct === void 0 ? void 0 : (_fullProduct_availableColors_find = fullProduct.availableColors.find((c)=>c.value === item.color)) === null || _fullProduct_availableColors_find === void 0 ? void 0 : _fullProduct_availableColors_find.label) || item.color;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItem,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemImage,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            src: item.product.images[0] || "/images/catalogs/placeholder.png",
                                                            alt: item.product.title,
                                                            width: 82,
                                                            height: 82,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderImage
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 1038,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 1037,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemInfo,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemCategory,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].column,
                                                                        children: [
                                                                            (fullProduct === null || fullProduct === void 0 ? void 0 : fullProduct.category) || item.product.category || "",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemTitle,
                                                                                children: item.product.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                                lineNumber: 1056,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                        lineNumber: 1051,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetailsRow,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetailColumn,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetailLabel,
                                                                                        children: "Цвет"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                                        lineNumber: 1062,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetailValue,
                                                                                        children: colorLabel
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                                        lineNumber: 1065,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                                lineNumber: 1061,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetailColumn,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetailLabel,
                                                                                        children: "Размер"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                                        lineNumber: 1070,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetailValue, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemSizeValue),
                                                                                        children: item.size
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                                        lineNumber: 1073,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                                lineNumber: 1069,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                        lineNumber: 1060,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 1050,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemPrice,
                                                                children: formatPrice(item.product.priceValue * item.quantity)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                lineNumber: 1081,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 1049,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, "".concat(item.productId, "-").concat(item.size, "-").concat(item.color, "-").concat(index), true, {
                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                lineNumber: 1033,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                        lineNumber: 1024,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 1023,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryRow,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryLabel,
                                            children: "Доставка:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 1093,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryValue,
                                            children: formData.deliveryMethod === "pickup" ? "Бесплатно" : formatPrice(deliveryPrices[formData.deliveryMethod] || 0)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 1094,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 1092,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryRow,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryLabel,
                                            children: "Товаров на:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 1105,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryValue,
                                            children: formatPrice(getTotalPrice())
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 1104,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderSummaryBlock,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderSummary,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryRowTotal,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryLabelTotal,
                                                        children: "Итого"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 1113,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].summaryTotal,
                                                        children: formatPrice(calculateTotal())
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                lineNumber: 1112,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 1111,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButton, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitButtonRight),
                                            disabled: !formData.agreeToOffer || !formData.agreeToPrivacy,
                                            onClick: handleSubmitOrder,
                                            children: "Оформить заказ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 1119,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxes,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            name: "agreeToOffer",
                                                            checked: formData.agreeToOffer,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 1129,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Я соглашаюсь с условиями",
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/public-offer",
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLink,
                                                                    children: "публичной оферты"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 1138,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 1136,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 1128,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLabel,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            name: "agreeToPrivacy",
                                                            checked: formData.agreeToPrivacy,
                                                            onChange: handleInputChange,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 1147,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Я принимаю",
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: "/privacy",
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLink,
                                                                    children: "политику конфиденциальности"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                                    lineNumber: 1156,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                            lineNumber: 1154,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                                    lineNumber: 1146,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                                    lineNumber: 1110,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                            lineNumber: 1022,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
                    lineNumber: 1015,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
            lineNumber: 285,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/CheckoutForm/CheckoutForm.tsx",
        lineNumber: 284,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CheckoutForm, "mcG1vvW8b4Tp/2CSQ3GW4kbnNZU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CheckoutForm;
const __TURBOPACK__default__export__ = CheckoutForm;
var _c;
__turbopack_context__.k.register(_c, "CheckoutForm");
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
"[project]/src/app/checkout/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/OrderSuccessModal/OrderSuccessModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CheckoutForm/CheckoutForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWindowSize.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/checkout/page.module.css [app-client] (css module)");
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
const CheckoutPage = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { items, clearCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const { width } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"])();
    const [showSuccessModal, setShowSuccessModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [orderNumber, setOrderNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Очищаем корзину после показа модалки
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (showSuccessModal && items.length > 0) {
                clearCart();
            }
        }
    }["CheckoutPage.useEffect"], [
        showSuccessModal,
        items.length,
        clearCart
    ]);
    const handleOrderSubmit = (newOrderNumber)=>{
        setOrderNumber(newOrderNumber);
        setShowSuccessModal(true);
    };
    const handleGoToAccount = ()=>{
        setShowSuccessModal(false);
        router.push("/account");
    };
    const handleCloseModal = ()=>{
        setShowSuccessModal(false);
        router.push("/catalog");
    };
    // Редирект на страницу корзины при ширине <= 1024px
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (width > 0 && width <= 1024) {
                router.push("/cart?autoCheckout=true");
            }
        }
    }["CheckoutPage.useEffect"], [
        width,
        router
    ]);
    // Показываем пустую корзину только если модалка не открыта
    if (items.length === 0 && !showSuccessModal) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutPage,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "green"
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCart,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                                children: "Корзина пуста"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyText,
                                children: "Добавьте товары в корзину, чтобы продолжить оформление"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/catalog",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shopButton,
                                children: "Перейти в каталог"
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutPage,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "green"
            }, void 0, false, {
                fileName: "[project]/src/app/checkout/page.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/catalog",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backLink,
                            children: "Вернуться в каталог"
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CheckoutForm$2f$CheckoutForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onOrderSubmit: handleOrderSubmit
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/checkout/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/checkout/page.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            showSuccessModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderSuccessModal$2f$OrderSuccessModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                orderNumber: orderNumber,
                onClose: handleCloseModal,
                onGoToAccount: handleGoToAccount
            }, void 0, false, {
                fileName: "[project]/src/app/checkout/page.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/checkout/page.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CheckoutPage, "CDLq9is0nXvpuNyeKpwyalRdAQM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWindowSize"]
    ];
});
_c = CheckoutPage;
const __TURBOPACK__default__export__ = CheckoutPage;
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_791a96f3._.js.map
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
"[project]/src/services/accountService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateAccountDetails",
    ()=>updateAccountDetails,
    "updatePassword",
    ()=>updatePassword
]);
"use client";
const ACCOUNT_UPDATE_URL = ""; // TODO: set profile update endpoint
const PASSWORD_UPDATE_URL = ""; // TODO: set password update endpoint
const postJson = async (url, payload)=>{
    if (!url) {
        throw new Error("Укажите URL эндпоинта в accountService");
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        const message = await response.text().catch(()=>"Не удалось выполнить запрос");
        throw new Error(message || "Не удалось выполнить запрос");
    }
    try {
        return await response.json();
    } catch (e) {
        return {};
    }
};
const updateAccountDetails = async (payload)=>postJson(ACCOUNT_UPDATE_URL, payload);
const updatePassword = async (payload)=>postJson(PASSWORD_UPDATE_URL, payload);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AccountPage/PersonalData/PersonalData.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "PersonalData-module__OZLLfq__actions",
  "container": "PersonalData-module__OZLLfq__container",
  "fieldLabel": "PersonalData-module__OZLLfq__fieldLabel",
  "fieldRow": "PersonalData-module__OZLLfq__fieldRow",
  "fieldsGrid": "PersonalData-module__OZLLfq__fieldsGrid",
  "infoPanel": "PersonalData-module__OZLLfq__infoPanel",
  "input": "PersonalData-module__OZLLfq__input",
  "inputWrapper": "PersonalData-module__OZLLfq__inputWrapper",
  "panel": "PersonalData-module__OZLLfq__panel",
  "passwordField": "PersonalData-module__OZLLfq__passwordField",
  "passwordForm": "PersonalData-module__OZLLfq__passwordForm",
  "passwordInput": "PersonalData-module__OZLLfq__passwordInput",
  "passwordInputWrapper": "PersonalData-module__OZLLfq__passwordInputWrapper",
  "passwordLabel": "PersonalData-module__OZLLfq__passwordLabel",
  "passwordMessage": "PersonalData-module__OZLLfq__passwordMessage",
  "passwordMessageError": "PersonalData-module__OZLLfq__passwordMessageError",
  "passwordMessageSuccess": "PersonalData-module__OZLLfq__passwordMessageSuccess",
  "passwordPanel": "PersonalData-module__OZLLfq__passwordPanel",
  "primaryButton": "PersonalData-module__OZLLfq__primaryButton",
  "secondaryButton": "PersonalData-module__OZLLfq__secondaryButton",
  "sectionDescription": "PersonalData-module__OZLLfq__sectionDescription",
  "sectionHeading": "PersonalData-module__OZLLfq__sectionHeading",
  "subsectionHeading": "PersonalData-module__OZLLfq__subsectionHeading",
  "togglePassword": "PersonalData-module__OZLLfq__togglePassword",
});
}),
"[project]/src/components/AccountPage/PersonalData/PersonalData.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$accountService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/accountService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/AccountPage/PersonalData/PersonalData.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const defaultProfileData = {
    firstName: "Александр",
    lastName: "Смирнов",
    email: "abvdf@gmail.com",
    phone: "+7 (977) 721-04-52"
};
const profileFields = [
    {
        key: "firstName",
        label: "Имя",
        placeholder: "Введите ваше имя*"
    },
    {
        key: "lastName",
        label: "Фамилия",
        placeholder: "Введите вашу фамилию*"
    },
    {
        key: "email",
        label: "Email",
        placeholder: "Введите ваш email*"
    },
    {
        key: "phone",
        label: "Номер",
        placeholder: "Введите ваш номер телефона*"
    }
];
const PersonalData = ()=>{
    _s();
    const [profileData, setProfileData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ...defaultProfileData
    });
    const [hasUnsavedChanges, setHasUnsavedChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveStatus, setSaveStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [passwordForm, setPasswordForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        newPassword: "",
        confirmPassword: ""
    });
    const [hasPasswordChanges, setHasPasswordChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passwordVisibility, setPasswordVisibility] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        newPassword: false,
        confirmPassword: false
    });
    const [isPasswordSubmitting, setIsPasswordSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passwordStatus, setPasswordStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleProfileChange = (field)=>(event)=>{
            setProfileData((prev)=>({
                    ...prev,
                    [field]: event.target.value
                }));
            setHasUnsavedChanges(true);
            setSaveStatus(null);
        };
    const handleSaveChanges = async ()=>{
        if (!hasUnsavedChanges) return;
        setIsSaving(true);
        setSaveStatus(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$accountService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAccountDetails"])(profileData);
            setHasUnsavedChanges(false);
            setSaveStatus({
                type: "success",
                message: "Изменения сохранены"
            });
        } catch (error) {
            setSaveStatus({
                type: "error",
                message: error instanceof Error ? error.message : "Не удалось сохранить изменения"
            });
        } finally{
            setIsSaving(false);
        }
    };
    const handleResetProfile = ()=>{
        setProfileData({
            ...defaultProfileData
        });
        setHasUnsavedChanges(false);
        setSaveStatus(null);
    };
    const togglePasswordVisibility = (field)=>{
        setPasswordVisibility((prev)=>({
                ...prev,
                [field]: !prev[field]
            }));
    };
    const handlePasswordChange = (field)=>(event)=>{
            setPasswordForm((prev)=>({
                    ...prev,
                    [field]: event.target.value
                }));
            setHasPasswordChanges(true);
            setPasswordStatus(null);
        };
    const handlePasswordSubmit = async ()=>{
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordStatus({
                type: "error",
                message: "Пароли не совпадают"
            });
            return;
        }
        setIsPasswordSubmitting(true);
        setPasswordStatus(null);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$accountService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePassword"])({
                currentPassword: "",
                newPassword: passwordForm.newPassword,
                confirmPassword: passwordForm.confirmPassword
            });
            setPasswordStatus({
                type: "success",
                message: "Пароль успешно обновлён"
            });
            setPasswordForm({
                newPassword: "",
                confirmPassword: ""
            });
            setHasPasswordChanges(false);
        } catch (error) {
            setPasswordStatus({
                type: "error",
                message: error instanceof Error ? error.message : "Не удалось изменить пароль"
            });
        } finally{
            setIsPasswordSubmitting(false);
        }
    };
    const handlePasswordCancel = ()=>{
        setPasswordForm({
            newPassword: "",
            confirmPassword: ""
        });
        setHasPasswordChanges(false);
        setPasswordStatus(null);
    };
    const renderPasswordInput = (label, field, placeholder)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordField,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordLabel,
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                    lineNumber: 170,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordInputWrapper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                            type: passwordVisibility[field] ? "text" : "password",
                            placeholder: placeholder,
                            value: passwordForm[field],
                            onChange: handlePasswordChange(field)
                        }, void 0, false, {
                            fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                            lineNumber: 172,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].togglePassword,
                            onClick: ()=>togglePasswordVisibility(field),
                            "aria-label": passwordVisibility[field] ? "Скрыть пароль" : "Показать пароль",
                            children: passwordVisibility[field] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].togglePasswordIcon,
                                width: "20",
                                height: "20",
                                viewBox: "0 0 20 20",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M10 3C5.5 3 2.73 5.61 1 10C2.73 14.39 5.5 17 10 17C14.5 17 17.27 14.39 19 10C17.27 5.61 14.5 3 10 3Z",
                                        stroke: "#7a7a79",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z",
                                        stroke: "#7a7a79",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].togglePasswordIcon,
                                src: "/images/login/eye-open.png",
                                alt: "Показать пароль",
                                width: 20,
                                height: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                            lineNumber: 179,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                    lineNumber: 171,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
            lineNumber: 169,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].panel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionHeading,
                                children: "Настройки"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionDescription,
                                children: "В данном разделе предоставляются возможности для настройки имени, изменения пароля и других параметров."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].panel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subsectionHeading,
                                children: "Личные данные"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoPanel,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldsGrid,
                                    children: profileFields.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldLabel,
                                                    htmlFor: "profile-".concat(field.key),
                                                    children: field.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "profile-".concat(field.key),
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                                        type: "text",
                                                        value: profileData[field.key],
                                                        onChange: handleProfileChange(field.key),
                                                        placeholder: field.placeholder
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                                        lineNumber: 250,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, field.key, true, {
                                            fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                        onClick: handleSaveChanges,
                                        disabled: isSaving || !hasUnsavedChanges,
                                        children: isSaving ? "Сохранение..." : "Сохранить изменения"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
                                        onClick: handleResetProfile,
                                        children: "Отмена"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordPanel,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subsectionHeading,
                        children: "Изменить пароль"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldsGrid,
                        onSubmit: (event)=>{
                            event.preventDefault();
                            handlePasswordSubmit();
                        },
                        children: [
                            renderPasswordInput("Новый пароль", "newPassword", "Введите ваш новый пароль*"),
                            renderPasswordInput("Повторите пароль", "confirmPassword", "Введите пароль*")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                onClick: handlePasswordSubmit,
                                disabled: isPasswordSubmitting || !hasPasswordChanges,
                                children: isPasswordSubmitting ? "Сохранение..." : "Сохранить изменения"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].secondaryButton,
                                onClick: handlePasswordCancel,
                                children: "Отмена"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    passwordStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordMessage, " ").concat(passwordStatus.type === "success" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordMessageSuccess : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].passwordMessageError),
                        children: passwordStatus.message
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AccountPage/PersonalData/PersonalData.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(PersonalData, "uK6UxLNwfb8t6HI1qP+4J6c6ywQ=");
_c = PersonalData;
const __TURBOPACK__default__export__ = PersonalData;
var _c;
__turbopack_context__.k.register(_c, "PersonalData");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AccountPage/MyAccount/MyAccount.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "MyAccount-module__Yp8Xqa__card",
  "cardArrow": "MyAccount-module__Yp8Xqa__cardArrow",
  "cardContent": "MyAccount-module__Yp8Xqa__cardContent",
  "cardContentInner": "MyAccount-module__Yp8Xqa__cardContentInner",
  "cardHeader": "MyAccount-module__Yp8Xqa__cardHeader",
  "cardInfo": "MyAccount-module__Yp8Xqa__cardInfo",
  "cardInfoItem": "MyAccount-module__Yp8Xqa__cardInfoItem",
  "cardTitle": "MyAccount-module__Yp8Xqa__cardTitle",
  "cardTitleCart": "MyAccount-module__Yp8Xqa__cardTitleCart",
  "container": "MyAccount-module__Yp8Xqa__container",
  "orderDetailsBottom": "MyAccount-module__Yp8Xqa__orderDetailsBottom",
  "orderDetailsContainer": "MyAccount-module__Yp8Xqa__orderDetailsContainer",
  "orderDetailsLeft": "MyAccount-module__Yp8Xqa__orderDetailsLeft",
  "orderDetailsRight": "MyAccount-module__Yp8Xqa__orderDetailsRight",
  "orderDetailsTop": "MyAccount-module__Yp8Xqa__orderDetailsTop",
  "orderState": "MyAccount-module__Yp8Xqa__orderState",
  "orderStateText": "MyAccount-module__Yp8Xqa__orderStateText",
  "orderStatus": "MyAccount-module__Yp8Xqa__orderStatus",
  "orderThumbnails": "MyAccount-module__Yp8Xqa__orderThumbnails",
  "thumbnail": "MyAccount-module__Yp8Xqa__thumbnail",
  "thumbnailImage": "MyAccount-module__Yp8Xqa__thumbnailImage",
  "thumbnailImageArrow": "MyAccount-module__Yp8Xqa__thumbnailImageArrow",
  "thumbnailMore": "MyAccount-module__Yp8Xqa__thumbnailMore",
});
}),
"[project]/src/components/AccountPage/MyAccount/MyAccount.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/AccountPage/MyAccount/MyAccount.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const MyAccount = (param)=>{
    let { onNavigate } = param;
    _s();
    const [lastOrder, setLastOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyAccount.useEffect": ()=>{
            // Загружаем последний заказ из sessionStorage
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    const storedOrders = sessionStorage.getItem("znves:orders");
                    if (storedOrders) {
                        const parsedOrders = JSON.parse(storedOrders);
                        if (parsedOrders.length > 0) {
                            // Сортируем заказы по дате (новые первыми) и берем первый
                            const sortedOrders = parsedOrders.sort({
                                "MyAccount.useEffect.sortedOrders": (a, b)=>{
                                    const dateA = new Date(a.date.split(".").reverse().join("-"));
                                    const dateB = new Date(b.date.split(".").reverse().join("-"));
                                    return dateB.getTime() - dateA.getTime();
                                }
                            }["MyAccount.useEffect.sortedOrders"]);
                            setLastOrder(sortedOrders[0]);
                        }
                    }
                } catch (error) {
                    console.error("Failed to load orders from sessionStorage:", error);
                }
            }
        }
    }["MyAccount.useEffect"], []);
    const handlePersonalDataClick = ()=>{
        onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("profile");
    };
    const handleOrdersClick = ()=>{
        if (lastOrder) {
            onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("orders", lastOrder.id);
        } else {
            onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate("orders");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                onClick: handlePersonalDataClick,
                role: "button",
                tabIndex: 0,
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePersonalDataClick();
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContentInner,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContentInnerLeft,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                            children: "Личные данные"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                            children: "Смирнов Александр Александрович"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/images/account/arrowRight.png",
                                    alt: "Стрелка",
                                    width: 41,
                                    height: 39,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnailImageArrow
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardInfo,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardInfoItem,
                                    children: "abvgd@mail.com"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardInfoItem,
                                    children: "+7 (977) 721-04-52"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            lastOrder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                onClick: handleOrdersClick,
                role: "button",
                tabIndex: 0,
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOrdersClick();
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContent,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContentInner,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContentInnerLeft,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                            children: "Активные заказы"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitleCart,
                                            children: [
                                                "Заказ от ",
                                                lastOrder.date
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                            lineNumber: 115,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 113,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/images/account/arrowRight.png",
                                    alt: "Стрелка",
                                    width: 41,
                                    height: 39,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnailImageArrow
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                            lineNumber: 112,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsContainer,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsLeft,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsTop,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardInfoItem,
                                                    children: [
                                                        "№",
                                                        lastOrder.id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderStatus,
                                                    children: lastOrder.status === "не оплачен" ? "Ожидает оплаты" : "Оплачен"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsBottom,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderState,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderStateText,
                                                        children: [
                                                            "Новый (",
                                                            lastOrder.status,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                        lineNumber: 140,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsRight,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderThumbnails,
                                        children: [
                                            lastOrder.products.slice(0, 3).map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnail,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: product.image || "/images/catalogs/placeholder.png",
                                                        alt: product.name || "Товар",
                                                        width: 60,
                                                        height: 60,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnailImage
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, index, false, {
                                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))),
                                            lastOrder.products.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnailMore,
                                                children: [
                                                    "+",
                                                    lastOrder.products.length - 3
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                                lineNumber: 160,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                onClick: handleOrdersClick,
                role: "button",
                tabIndex: 0,
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOrdersClick();
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContent,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContentInner,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContentInnerLeft,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                        children: "Активные заказы"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitleCart,
                                        children: "Нет активных заказов"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                lineNumber: 184,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/account/arrowRight.png",
                                alt: "Стрелка",
                                width: 41,
                                height: 39,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thumbnailImageArrow
                            }, void 0, false, {
                                fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AccountPage/MyAccount/MyAccount.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(MyAccount, "YEO4PiiCmJ+mO1zKQMLJCBQFFNI=");
_c = MyAccount;
const __TURBOPACK__default__export__ = MyAccount;
var _c;
__turbopack_context__.k.register(_c, "MyAccount");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AccountPage/Orders/Orders.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "amount": "Orders-module__SUWVqW__amount",
  "amountWord": "Orders-module__SUWVqW__amountWord",
  "bottom": "Orders-module__SUWVqW__bottom",
  "buyerColumn": "Orders-module__SUWVqW__buyerColumn",
  "buyerSection": "Orders-module__SUWVqW__buyerSection",
  "buyerSectionInfo": "Orders-module__SUWVqW__buyerSectionInfo",
  "buyerSectionInfoItem": "Orders-module__SUWVqW__buyerSectionInfoItem",
  "buyerSectionText": "Orders-module__SUWVqW__buyerSectionText",
  "category": "Orders-module__SUWVqW__category",
  "deliveryField": "Orders-module__SUWVqW__deliveryField",
  "deliverySection": "Orders-module__SUWVqW__deliverySection",
  "deliverySectionInfo": "Orders-module__SUWVqW__deliverySectionInfo",
  "deliverySectionText": "Orders-module__SUWVqW__deliverySectionText",
  "emptyState": "Orders-module__SUWVqW__emptyState",
  "emptyText": "Orders-module__SUWVqW__emptyText",
  "emptyTitle": "Orders-module__SUWVqW__emptyTitle",
  "label": "Orders-module__SUWVqW__label",
  "labelBottom": "Orders-module__SUWVqW__labelBottom",
  "left": "Orders-module__SUWVqW__left",
  "leftBottom": "Orders-module__SUWVqW__leftBottom",
  "orderCard": "Orders-module__SUWVqW__orderCard",
  "orderCardActive": "Orders-module__SUWVqW__orderCardActive",
  "orderCardArrow": "Orders-module__SUWVqW__orderCardArrow",
  "orderCardArrowRotated": "Orders-module__SUWVqW__orderCardArrowRotated",
  "orderCardContent": "Orders-module__SUWVqW__orderCardContent",
  "orderCardDetails": "Orders-module__SUWVqW__orderCardDetails",
  "orderCardDetailsBottom": "Orders-module__SUWVqW__orderCardDetailsBottom",
  "orderCardDetailsLeft": "Orders-module__SUWVqW__orderCardDetailsLeft",
  "orderCardDetailsRight": "Orders-module__SUWVqW__orderCardDetailsRight",
  "orderCardDetailsTop": "Orders-module__SUWVqW__orderCardDetailsTop",
  "orderCardHeader": "Orders-module__SUWVqW__orderCardHeader",
  "orderCardNumber": "Orders-module__SUWVqW__orderCardNumber",
  "orderCardState": "Orders-module__SUWVqW__orderCardState",
  "orderCardStateText": "Orders-module__SUWVqW__orderCardStateText",
  "orderCardStatus": "Orders-module__SUWVqW__orderCardStatus",
  "orderCardThumbnail": "Orders-module__SUWVqW__orderCardThumbnail",
  "orderCardThumbnailImage": "Orders-module__SUWVqW__orderCardThumbnailImage",
  "orderCardThumbnailMore": "Orders-module__SUWVqW__orderCardThumbnailMore",
  "orderCardThumbnails": "Orders-module__SUWVqW__orderCardThumbnails",
  "orderCardTitle": "Orders-module__SUWVqW__orderCardTitle",
  "orderDetailsClosed": "Orders-module__SUWVqW__orderDetailsClosed",
  "orderDetailsContent": "Orders-module__SUWVqW__orderDetailsContent",
  "orderDetailsOpen": "Orders-module__SUWVqW__orderDetailsOpen",
  "orderDetailsWrapper": "Orders-module__SUWVqW__orderDetailsWrapper",
  "orderHeader": "Orders-module__SUWVqW__orderHeader",
  "orderHeaderLeft": "Orders-module__SUWVqW__orderHeaderLeft",
  "orderIcon": "Orders-module__SUWVqW__orderIcon",
  "orderInfo": "Orders-module__SUWVqW__orderInfo",
  "orderNumber": "Orders-module__SUWVqW__orderNumber",
  "orderStatus": "Orders-module__SUWVqW__orderStatus",
  "orderStatusLabel": "Orders-module__SUWVqW__orderStatusLabel",
  "orderStatusPaid": "Orders-module__SUWVqW__orderStatusPaid",
  "orderStatusUnpaid": "Orders-module__SUWVqW__orderStatusUnpaid",
  "ordersContainer": "Orders-module__SUWVqW__ordersContainer",
  "ordersList": "Orders-module__SUWVqW__ordersList",
  "ordersListContainer": "Orders-module__SUWVqW__ordersListContainer",
  "otherOrdersSection": "Orders-module__SUWVqW__otherOrdersSection",
  "otherOrdersTitle": "Orders-module__SUWVqW__otherOrdersTitle",
  "panel": "Orders-module__SUWVqW__panel",
  "payButton": "Orders-module__SUWVqW__payButton",
  "paymentField": "Orders-module__SUWVqW__paymentField",
  "paymentSection": "Orders-module__SUWVqW__paymentSection",
  "paymentSectionInfo": "Orders-module__SUWVqW__paymentSectionInfo",
  "paymentSectionText": "Orders-module__SUWVqW__paymentSectionText",
  "paymentValueContainer": "Orders-module__SUWVqW__paymentValueContainer",
  "priceLabel": "Orders-module__SUWVqW__priceLabel",
  "priceText": "Orders-module__SUWVqW__priceText",
  "productCount": "Orders-module__SUWVqW__productCount",
  "productDetail": "Orders-module__SUWVqW__productDetail",
  "productDetailColumn": "Orders-module__SUWVqW__productDetailColumn",
  "productDetails": "Orders-module__SUWVqW__productDetails",
  "productDetailsRow": "Orders-module__SUWVqW__productDetailsRow",
  "productImage": "Orders-module__SUWVqW__productImage",
  "productInfo": "Orders-module__SUWVqW__productInfo",
  "productItem": "Orders-module__SUWVqW__productItem",
  "productLabel": "Orders-module__SUWVqW__productLabel",
  "productName": "Orders-module__SUWVqW__productName",
  "productPrice": "Orders-module__SUWVqW__productPrice",
  "productText": "Orders-module__SUWVqW__productText",
  "productsList": "Orders-module__SUWVqW__productsList",
  "productsSection": "Orders-module__SUWVqW__productsSection",
  "right": "Orders-module__SUWVqW__right",
  "rightBottom": "Orders-module__SUWVqW__rightBottom",
  "sectionIcon": "Orders-module__SUWVqW__sectionIcon",
  "sectionTitle": "Orders-module__SUWVqW__sectionTitle",
  "selectedOrderSection": "Orders-module__SUWVqW__selectedOrderSection",
  "title": "Orders-module__SUWVqW__title",
  "totalAmount": "Orders-module__SUWVqW__totalAmount",
  "totalAmountValue": "Orders-module__SUWVqW__totalAmountValue",
  "totalInfo": "Orders-module__SUWVqW__totalInfo",
  "totalItems": "Orders-module__SUWVqW__totalItems",
  "totalSection": "Orders-module__SUWVqW__totalSection",
  "totalTitle": "Orders-module__SUWVqW__totalTitle",
  "upper": "Orders-module__SUWVqW__upper",
  "value": "Orders-module__SUWVqW__value",
  "valuePay": "Orders-module__SUWVqW__valuePay",
  "word": "Orders-module__SUWVqW__word",
  "wordColor": "Orders-module__SUWVqW__wordColor",
});
}),
"[project]/src/components/AccountPage/Orders/Orders.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/AccountPage/Orders/Orders.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const getPaymentSystemName = (method)=>{
    const paymentNames = {
        sberbank: "Оплата по СПБ",
        yandexpay: "Яндекс Pay",
        installment: "Долями",
        card: "Картой онлайн"
    };
    return paymentNames[method] || "Оплата по СПБ";
};
const getDeliveryServiceName = (type, method)=>{
    if (type === "cdek") {
        return method === "pickup" ? "СДЭК: доставка в пункт выдачи" : "СДЭК: курьером";
    } else if (type === "yandex") {
        return method === "pickup" ? "Яндекс.Курьер: пункт выдачи" : "Яндекс.Курьер: курьером";
    }
    return "СДЭК: доставка в пункт выдачи";
};
const Orders = (param)=>{
    let { initialOrderId } = param;
    _s();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedOrder, setSelectedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isDetailsOpen, setIsDetailsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Orders.useEffect": ()=>{
            // Загружаем заказы из sessionStorage
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    const storedOrders = sessionStorage.getItem("znves:orders");
                    if (storedOrders) {
                        const parsedOrders = JSON.parse(storedOrders);
                        // Сортируем заказы по дате (новые первыми)
                        const sortedOrders = parsedOrders.sort({
                            "Orders.useEffect.sortedOrders": (a, b)=>{
                                const dateA = new Date(a.date.split(".").reverse().join("-"));
                                const dateB = new Date(b.date.split(".").reverse().join("-"));
                                return dateB.getTime() - dateA.getTime();
                            }
                        }["Orders.useEffect.sortedOrders"]);
                        setOrders(sortedOrders);
                        // Если передан initialOrderId, выбираем заказ по ID
                        if (initialOrderId) {
                            const orderToSelect = sortedOrders.find({
                                "Orders.useEffect.orderToSelect": (order)=>order.id === initialOrderId
                            }["Orders.useEffect.orderToSelect"]);
                            if (orderToSelect) {
                                setSelectedOrder(orderToSelect);
                                setIsDetailsOpen(true);
                            } else if (sortedOrders.length > 0) {
                                setSelectedOrder(sortedOrders[0]);
                                setIsDetailsOpen(true);
                            }
                        } else if (sortedOrders.length > 0 && !selectedOrder) {
                            // Если нет initialOrderId, выбираем первый заказ
                            setSelectedOrder(sortedOrders[0]);
                            setIsDetailsOpen(true);
                        }
                    }
                } catch (error) {
                    console.error("Failed to load orders from sessionStorage:", error);
                }
            }
        }
    }["Orders.useEffect"], [
        initialOrderId
    ]);
    // Автоматически открываем детали при смене выбранного заказа
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Orders.useEffect": ()=>{
            if (selectedOrder) {
                setIsDetailsOpen(true);
            }
        }
    }["Orders.useEffect"], [
        selectedOrder === null || selectedOrder === void 0 ? void 0 : selectedOrder.id
    ]);
    // Если нет заказов, показываем пустое состояние
    if (orders.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].panel,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyTitle,
                        children: "У вас пока нет заказов"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyText,
                        children: "После оформления заказа он появится здесь"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                lineNumber: 137,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
            lineNumber: 136,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Разделяем заказы на выбранный и остальные
    const otherOrders = orders.filter((order)=>order.id !== (selectedOrder === null || selectedOrder === void 0 ? void 0 : selectedOrder.id));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].panel,
        children: [
            selectedOrder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedOrderSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCard, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardActive),
                        onClick: ()=>setIsDetailsOpen(!isDetailsOpen),
                        role: "button",
                        tabIndex: 0,
                        onKeyDown: (e)=>{
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setIsDetailsOpen(!isDetailsOpen);
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardTitle,
                                            children: [
                                                "Заказ от ",
                                                selectedOrder.date
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/images/account/arrowRight.png",
                                            alt: "Стрелка",
                                            width: 41,
                                            height: 39,
                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardArrow, " ").concat(isDetailsOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardArrowRotated : "")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetails,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsLeft,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsTop,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardNumber,
                                                            children: [
                                                                "№",
                                                                selectedOrder.id
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 185,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardStatus,
                                                            children: selectedOrder.status === "не оплачен" ? "Ожидает оплаты" : "Оплачен"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 188,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsBottom,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardState,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "•"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 196,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardStateText,
                                                                children: [
                                                                    "Новый (",
                                                                    selectedOrder.status,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 197,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                        lineNumber: 195,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsRight,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnails,
                                                children: [
                                                    selectedOrder.products.slice(0, 3).map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnail,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: product.image,
                                                                alt: product.name,
                                                                width: 60,
                                                                height: 60,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnailImage
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 209,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, index, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))),
                                                    selectedOrder.products.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnailMore,
                                                        children: [
                                                            "+",
                                                            selectedOrder.products.length - 3
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                lineNumber: 204,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                            lineNumber: 167,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsWrapper, " ").concat(isDetailsOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsOpen : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsClosed),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderDetailsContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ordersContainer,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderHeader,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderHeaderLeft,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderIcon,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "/images/account/info.png",
                                                                alt: "Заказ",
                                                                width: 20,
                                                                height: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 242,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderInfo,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderNumber,
                                                                children: [
                                                                    "Заказ: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: [
                                                                            "№",
                                                                            selectedOrder.id
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                        lineNumber: 251,
                                                                        columnNumber: 32
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " от",
                                                                    " ",
                                                                    selectedOrder.date
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 250,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderStatus,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderStatusLabel,
                                                            children: "Статус:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: selectedOrder.status.toLowerCase().includes("не оплачен") || selectedOrder.status.toLowerCase().includes("неоплачен") ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderStatusUnpaid : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderStatusPaid,
                                                            children: selectedOrder.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerSection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionIcon,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/images/account/accountImage.png",
                                                        alt: "Заказ",
                                                        width: 20,
                                                        height: 23
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerSectionText,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                                            children: "Покупатель"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerSectionInfo,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerColumn,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerSectionInfoItem,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                                    children: "Имя"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 287,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].value,
                                                                                    children: selectedOrder.buyer.firstName
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 288,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 286,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerSectionInfoItem,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                                    children: "Email"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 293,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].value,
                                                                                    children: selectedOrder.buyer.email
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 294,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 292,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 285,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerColumn,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerSectionInfoItem,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                                    children: "Фамилия"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 301,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].value,
                                                                                    children: selectedOrder.buyer.lastName
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 302,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 300,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buyerSectionInfoItem,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                                    children: "Номер телефона"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 307,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].value,
                                                                                    children: selectedOrder.buyer.phone
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 308,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 306,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 299,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentSection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionIcon,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/images/account/buyImage.png",
                                                        alt: "Заказ",
                                                        width: 21.5,
                                                        height: 19.65
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentSectionText,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                                            children: "Способ оплаты"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentSectionInfo,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentField,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                            children: "Система оплаты"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 330,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].value, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentValueContainer),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: getPaymentSystemName(selectedOrder.payment.method)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 334,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                selectedOrder.payment.method === "sberbank" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                    src: "/images/account/sbpAcc.png",
                                                                                    alt: "СБП",
                                                                                    width: 18,
                                                                                    height: 18
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 338,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 331,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 329,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentField,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                            children: "Сумма"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 348,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].valuePay,
                                                                            children: selectedOrder.payment.amount
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 349,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 347,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 317,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliverySection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionIcon,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: "/images/account/delivery.png",
                                                        alt: "Заказ",
                                                        width: 23,
                                                        height: 18.4
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliverySectionText,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                                            children: "Способ доставки"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliverySectionInfo,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryField,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                            children: "Служба доставки"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 370,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].value,
                                                                            children: getDeliveryServiceName(selectedOrder.delivery.type, selectedOrder.delivery.method)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 371,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 369,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryField,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                                                            children: "Адрес"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 379,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].value,
                                                                            children: selectedOrder.delivery.city || selectedOrder.delivery.street || selectedOrder.delivery.house ? [
                                                                                selectedOrder.delivery.city,
                                                                                selectedOrder.delivery.street,
                                                                                selectedOrder.delivery.house,
                                                                                selectedOrder.delivery.apartment
                                                                            ].filter(Boolean).join(", ") : "г. Москва"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 380,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 378,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 357,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productsSection,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                                    children: "Товары"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 400,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productsList,
                                                    children: selectedOrder.products.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productItem,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: product.image,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productImage,
                                                                    alt: product.name,
                                                                    width: 104,
                                                                    height: 149
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 407,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].productDetails,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].upper,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].left,
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].category,
                                                                                            children: product.category
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 417,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                                                                            children: product.name
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 420,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 416,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].right,
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].amountWord,
                                                                                            children: "Сумма"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 423,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].amount,
                                                                                            children: product.price
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 424,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 422,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 415,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bottom,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].leftBottom,
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].labelBottom,
                                                                                            children: "Цвет"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 429,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wordColor,
                                                                                            children: product.color
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 430,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 428,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].rightBottom,
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].labelBottom,
                                                                                            children: "Размер"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 435,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].word,
                                                                                            children: product.size
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                            lineNumber: 436,
                                                                                            columnNumber: 31
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                                    lineNumber: 434,
                                                                                    columnNumber: 29
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                            lineNumber: 427,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 414,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, "".concat(product.id, "-").concat(index), true, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 399,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalSection,
                                    children: [
                                        selectedOrder.status === "не оплачен" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].payButton,
                                            children: "Оплатить заказ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 449,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalInfo,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalAmount,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalTitle,
                                                            children: "Итого"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalAmountValue,
                                                            children: selectedOrder.total.totalAmount
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalItems,
                                                    children: [
                                                        "Товары, ",
                                                        selectedOrder.total.itemsCount,
                                                        " шт"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                            lineNumber: 451,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                    lineNumber: 447,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                            lineNumber: 237,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            otherOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].otherOrdersSection,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ordersList,
                    children: otherOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCard,
                            onClick: ()=>{
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                            },
                            role: "button",
                            tabIndex: 0,
                            onKeyDown: (e)=>{
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedOrder(order);
                                    setIsDetailsOpen(true);
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardTitle,
                                                children: [
                                                    "Заказ от ",
                                                    order.date
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                lineNumber: 492,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/images/account/arrowRight.png",
                                                alt: "Стрелка",
                                                width: 41,
                                                height: 39,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardArrow
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                lineNumber: 495,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                        lineNumber: 491,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetails,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsLeft,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsTop,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardNumber,
                                                                children: [
                                                                    "№",
                                                                    order.id
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardStatus,
                                                                children: order.status === "не оплачен" ? "Ожидает оплаты" : "Оплачен"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 509,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsBottom,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardState,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 517,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardStateText,
                                                                    children: [
                                                                        "Новый (",
                                                                        order.status,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 518,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 516,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                lineNumber: 504,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardDetailsRight,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnails,
                                                    children: [
                                                        order.products.slice(0, 3).map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnail,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: product.image,
                                                                    alt: product.name,
                                                                    width: 60,
                                                                    height: 60,
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnailImage
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, index, false, {
                                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                                lineNumber: 527,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))),
                                                        order.products.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardThumbnailMore,
                                                            children: [
                                                                "+",
                                                                order.products.length - 3
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                            lineNumber: 541,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                    lineNumber: 525,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                                lineNumber: 524,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                        lineNumber: 503,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                                lineNumber: 490,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, order.id, false, {
                            fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                            lineNumber: 473,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                    lineNumber: 471,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
                lineNumber: 470,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AccountPage/Orders/Orders.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Orders, "FCuoBOKQgznACKVFCmVeLctt6Xk=");
_c = Orders;
const __TURBOPACK__default__export__ = Orders;
var _c;
__turbopack_context__.k.register(_c, "Orders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/account/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accountPage": "page-module__rM2rjG__accountPage",
  "actions": "page-module__rM2rjG__actions",
  "aside": "page-module__rM2rjG__aside",
  "asideTitle": "page-module__rM2rjG__asideTitle",
  "backLink": "page-module__rM2rjG__backLink",
  "card": "page-module__rM2rjG__card",
  "editButton": "page-module__rM2rjG__editButton",
  "editInlineButton": "page-module__rM2rjG__editInlineButton",
  "fieldHeader": "page-module__rM2rjG__fieldHeader",
  "fieldLabel": "page-module__rM2rjG__fieldLabel",
  "fieldRow": "page-module__rM2rjG__fieldRow",
  "footerWrapper": "page-module__rM2rjG__footerWrapper",
  "infoPanel": "page-module__rM2rjG__infoPanel",
  "input": "page-module__rM2rjG__input",
  "inputReadOnly": "page-module__rM2rjG__inputReadOnly",
  "inputWrapper": "page-module__rM2rjG__inputWrapper",
  "linkButton": "page-module__rM2rjG__linkButton",
  "main": "page-module__rM2rjG__main",
  "mobileNav": "page-module__rM2rjG__mobileNav",
  "mobileNavItem": "page-module__rM2rjG__mobileNavItem",
  "mobileNavItemActive": "page-module__rM2rjG__mobileNavItemActive",
  "mobileNavSeparator": "page-module__rM2rjG__mobileNavSeparator",
  "navList": "page-module__rM2rjG__navList",
  "navListItem": "page-module__rM2rjG__navListItem",
  "navListItemActive": "page-module__rM2rjG__navListItemActive",
  "noticeCard": "page-module__rM2rjG__noticeCard",
  "noticeCardError": "page-module__rM2rjG__noticeCardError",
  "noticeCardSuccess": "page-module__rM2rjG__noticeCardSuccess",
  "noticeContent": "page-module__rM2rjG__noticeContent",
  "noticeText": "page-module__rM2rjG__noticeText",
  "noticeTitle": "page-module__rM2rjG__noticeTitle",
  "panel": "page-module__rM2rjG__panel",
  "passwordField": "page-module__rM2rjG__passwordField",
  "passwordForm": "page-module__rM2rjG__passwordForm",
  "passwordHeader": "page-module__rM2rjG__passwordHeader",
  "passwordInput": "page-module__rM2rjG__passwordInput",
  "passwordInputWrapper": "page-module__rM2rjG__passwordInputWrapper",
  "passwordLabel": "page-module__rM2rjG__passwordLabel",
  "passwordMessage": "page-module__rM2rjG__passwordMessage",
  "passwordMessageError": "page-module__rM2rjG__passwordMessageError",
  "passwordMessageSuccess": "page-module__rM2rjG__passwordMessageSuccess",
  "primaryButton": "page-module__rM2rjG__primaryButton",
  "secondaryButton": "page-module__rM2rjG__secondaryButton",
  "sectionDescription": "page-module__rM2rjG__sectionDescription",
  "sectionHeading": "page-module__rM2rjG__sectionHeading",
  "togglePassword": "page-module__rM2rjG__togglePassword",
});
}),
"[project]/src/app/account/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Footer/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AccountPage/PersonalData/PersonalData.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AccountPage/MyAccount/MyAccount.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AccountPage/Orders/Orders.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/account/page.module.css [app-client] (css module)");
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
const AccountPage = ()=>{
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("account");
    const [selectedOrderId, setSelectedOrderId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].accountPage,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                variant: "green"
            }, void 0, false, {
                fileName: "[project]/src/app/account/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNav,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavItem, " ").concat(activeTab === "account" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavItemActive : ""),
                        onClick: ()=>setActiveTab("account"),
                        children: "Мой кабинет"
                    }, void 0, false, {
                        fileName: "[project]/src/app/account/page.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavSeparator
                    }, void 0, false, {
                        fileName: "[project]/src/app/account/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavItem, " ").concat(activeTab === "profile" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavItemActive : ""),
                        onClick: ()=>setActiveTab("profile"),
                        children: "Личные данные"
                    }, void 0, false, {
                        fileName: "[project]/src/app/account/page.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavSeparator
                    }, void 0, false, {
                        fileName: "[project]/src/app/account/page.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavItem, " ").concat(activeTab === "orders" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mobileNavItemActive : ""),
                        onClick: ()=>setActiveTab("orders"),
                        children: "Заказы"
                    }, void 0, false, {
                        fileName: "[project]/src/app/account/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/account/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].aside,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/catalog",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backLink,
                                children: "Вернуться в каталог"
                            }, void 0, false, {
                                fileName: "[project]/src/app/account/page.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].asideTitle,
                                children: "Личный кабинет"
                            }, void 0, false, {
                                fileName: "[project]/src/app/account/page.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navList,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navListItem, " ").concat(activeTab === "account" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navListItemActive : ""),
                                        onClick: ()=>setActiveTab("account"),
                                        children: "Мой кабинет"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/account/page.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navListItem, " ").concat(activeTab === "profile" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navListItemActive : ""),
                                        onClick: ()=>setActiveTab("profile"),
                                        children: "Личные данные"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/account/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navListItem, " ").concat(activeTab === "orders" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navListItemActive : ""),
                                        onClick: ()=>setActiveTab("orders"),
                                        children: "Заказы"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/account/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/account/page.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/account/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                        children: [
                            activeTab === "account" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$MyAccount$2f$MyAccount$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onNavigate: (tab, orderId)=>{
                                    setActiveTab(tab);
                                    if (orderId) {
                                        setSelectedOrderId(orderId);
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/account/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            activeTab === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$PersonalData$2f$PersonalData$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/app/account/page.tsx",
                                lineNumber: 99,
                                columnNumber: 39
                            }, ("TURBOPACK compile-time value", void 0)),
                            activeTab === "orders" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AccountPage$2f$Orders$2f$Orders$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                initialOrderId: selectedOrderId
                            }, void 0, false, {
                                fileName: "[project]/src/app/account/page.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/account/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/account/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$account$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerWrapper,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Footer$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/account/page.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/account/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/account/page.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AccountPage, "kD9FYuYn8pkTP7f42n19VMOHgac=");
_c = AccountPage;
const __TURBOPACK__default__export__ = AccountPage;
var _c;
__turbopack_context__.k.register(_c, "AccountPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_cbd10da8._.js.map
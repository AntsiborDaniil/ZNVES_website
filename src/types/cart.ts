import type { CatalogProduct } from "./products";

export type CartItem = {
    /** UUID warehouse_item из API или numeric id — для positions[].id в заказе используется UUID */
    productId: number | string;
    size: string;
    /** Slug цвета (для сопоставления и API) */
    color: string;
    /** Название цвета на русском для отображения в корзине */
    colorLabel?: string;
    quantity: number;
    product: CatalogProduct;
    /** @deprecated используйте productId когда это UUID */
    warehouseProduct?: string;
};

export type AppliedPromo = {
    promoCode: string;
    discount: string;
};

export type CartContextType = {
    items: CartItem[];
    addItem: (
        product: CatalogProduct,
        size: string,
        color: string,
        quantity?: number,
        warehouseProductId?: string,
        colorLabel?: string
    ) => Promise<void>;
    removeItem: (productId: number | string, size: string, color: string) => void;
    updateQuantity: (
        productId: number | string,
        size: string,
        color: string,
        quantity: number
    ) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    /** Применённый промокод (скидка в рублях, строка из API) */
    appliedPromo: AppliedPromo | null;
    setAppliedPromo: (promo: AppliedPromo | null) => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
};

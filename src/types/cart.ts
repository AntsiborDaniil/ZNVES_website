import type { CatalogProduct } from "./products";

export type CartItem = {
    productId: number;
    size: string;
    color: string;
    quantity: number;
    product: CatalogProduct;
    /** UUID warehouse_product из POST /api/cart/ — для positions[].id в заказе */
    warehouseProduct?: string;
};

export type CartContextType = {
    items: CartItem[];
    addItem: (
        product: CatalogProduct,
        size: string,
        color: string,
        quantity?: number
    ) => Promise<void>;
    removeItem: (productId: number, size: string, color: string) => void;
    updateQuantity: (
        productId: number,
        size: string,
        color: string,
        quantity: number
    ) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
};

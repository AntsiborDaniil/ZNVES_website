import type { CatalogProduct } from "./products";

export type CartItem = {
    productId: number;
    size: string;
    color: string;
    quantity: number;
    product: CatalogProduct;
};

export type CartContextType = {
    items: CartItem[];
    addItem: (
        product: CatalogProduct,
        size: string,
        color: string,
        quantity?: number
    ) => void;
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

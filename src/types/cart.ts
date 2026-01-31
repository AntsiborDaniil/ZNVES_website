import type { CatalogProduct } from "./products";

export type CartItem = {
    /** UUID warehouse_item из API или numeric id — для positions[].id в заказе используется UUID */
    productId: number | string;
    size: string;
    color: string;
    quantity: number;
    product: CatalogProduct;
    /** @deprecated используйте productId когда это UUID */
    warehouseProduct?: string;
};

export type CartContextType = {
    items: CartItem[];
    addItem: (
        product: CatalogProduct,
        size: string,
        color: string,
        quantity?: number,
        warehouseProductId?: string
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
};

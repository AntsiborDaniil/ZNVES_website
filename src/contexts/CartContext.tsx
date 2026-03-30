"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem, CartContextType, AppliedPromo } from "../types/cart";
import type { CatalogProduct } from "../types/products";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "znves:cart";

const getCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Инициализируем с пустым массивом для SSR совместимости
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>(null);

  // Загружаем данные из localStorage только после монтирования на клиенте
  useEffect(() => {
    const storedItems = getCartFromStorage();
    setItems(storedItems);
    setIsHydrated(true);
  }, []);

  // Сохраняем в localStorage только после гидратации
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items);
    }
  }, [items, isHydrated]);

  // Сбрасываем применённый промокод при изменении состава корзины
  useEffect(() => {
    setAppliedPromo(null);
  }, [items]);

  const addItem = useCallback(
    async (
      product: CatalogProduct,
      size: string,
      color: string,
      quantity: number = 1,
      warehouseProductId?: string,
      colorLabel?: string
    ): Promise<void> => {
      setItems((prevItems) => {
        // UUID warehouse_item — главный id; иначе product.id
        const itemId: number | string =
          warehouseProductId ?? product.id;

        const existingIndex = prevItems.findIndex(
          (item) =>
            item.productId === itemId && item.size === size && item.color === color
        );

        if (existingIndex >= 0) {
          const updated = [...prevItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
            ...(colorLabel != null && { colorLabel }),
          };
          if (warehouseProductId) {
          }
          return updated;
        }

        const newItem: CartItem = {
          productId: itemId,
          size,
          color,
          ...(colorLabel != null && { colorLabel }),
          quantity,
          product,
        };
        if (warehouseProductId) {
        }
        return [...prevItems, newItem];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: number | string, size: string, color: string) => {
      setItems((prevItems) =>
        prevItems.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.size === size &&
              item.color === color
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number | string, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedPromo(null);
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => {
      return total + item.product.priceValue * item.quantity;
    }, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        appliedPromo,
        setAppliedPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

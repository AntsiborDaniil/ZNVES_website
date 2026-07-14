import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CartProvider, useCart } from "../CartContext";
import { ToastProvider } from "../../components/ui/ToastProvider/ToastProvider";
import type { CatalogProduct } from "../types/products";

const mockProduct: CatalogProduct = {
  id: 1,
  slug: "test-product",
  title: "Test Product",
  price: "1 000 ₽",
  priceValue: 1000,
  images: ["/images/catalogs/placeholder.png"],
  isNew: false,
  category: "T-shirts",
  color: "black",
  size: "m",
  sortOrder: 1,
};

const PromoCartControls = () => {
  const { addItem, setAppliedPromo, appliedPromo } = useCart();

  return (
    <div>
      <p data-testid="promo">{appliedPromo?.promoCode ?? "none"}</p>
      <button
        type="button"
        onClick={() =>
          setAppliedPromo({ promoCode: "SALE10", discount: "100" })
        }
      >
        Apply promo
      </button>
      <button
        type="button"
        onClick={() => addItem(mockProduct, "m", "black", 1)}
      >
        Add item
      </button>
    </div>
  );
};

describe("CartProvider promo reset", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("shows toast and clears promo when cart items change", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <CartProvider>
          <PromoCartControls />
        </CartProvider>
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("promo")).toHaveTextContent("none");
    });

    await user.click(screen.getByRole("button", { name: "Apply promo" }));
    expect(screen.getByTestId("promo")).toHaveTextContent("SALE10");

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Add item" }));
    });

    await waitFor(() => {
      expect(screen.getByTestId("promo")).toHaveTextContent("none");
    });

    expect(
      screen.getByText("Промокод сброшен — изменился состав корзины")
    ).toBeInTheDocument();
  });

  it("does not show toast when cart changes without applied promo", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <CartProvider>
          <PromoCartControls />
        </CartProvider>
      </ToastProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("promo")).toHaveTextContent("none");
    });

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Add item" }));
    });

    expect(
      screen.queryByText("Промокод сброшен — изменился состав корзины")
    ).not.toBeInTheDocument();
  });
});

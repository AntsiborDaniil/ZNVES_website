import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProductCard from "../ProductCard";

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("ProductCard", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("769px"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("does not render quick add to cart button", () => {
    render(
      <ProductCard
        title="Hoodie"
        price="5 000 ₽"
        images={["/images/catalogs/placeholder.png"]}
        isNew={true}
        variant="grid"
      />
    );

    expect(screen.getByText("Hoodie")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Добавить в корзину" })
    ).not.toBeInTheDocument();
  });
});

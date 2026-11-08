import { afterEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ fetchProduct: vi.fn() }));
vi.mock("../../../../api/product/productApi", () => ({ fetchProductWithWarehouse: mocks.fetchProduct, fetchProductBySlug: vi.fn() }));
vi.mock("../ProductPageClient", () => ({ default: () => null }));
vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));
import ProductPage from "../page";
afterEach(() => vi.resetAllMocks());
it("falls back to a client BFF request after a transient server fetch error", async () => {
  mocks.fetchProduct.mockRejectedValue(new Error("ConnectTimeoutError"));
  const element = await ProductPage({ params: Promise.resolve({ slug: "TS9" }) });
  expect(element.props.slug).toBe("TS9");
  expect(element.props.initialProduct).toBeUndefined();
});
it("keeps genuine missing products as 404", async () => {
  mocks.fetchProduct.mockResolvedValue(null);
  await expect(ProductPage({ params: Promise.resolve({ slug: "missing" }) })).rejects.toThrow("NOT_FOUND");
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProductWithWarehouse } from "../productApi";

vi.mock("../../../lib/useMocks", () => ({
  shouldUseMocks: () => false,
}));

const baseProduct = {
  name: "Футболка",
  price: "2999.00",
  description: "Описание",
  is_new: false,
  images: [],
  sizes: [],
  colors: [],
  warehouse_items: [],
};

let slugCounter = 0;

const loadSections = async (overrides: Record<string, unknown>) => {
  const slug = `product-${++slugCounter}`;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ ...baseProduct, slug, ...overrides })))
  );
  const data = await fetchProductWithWarehouse(slug);
  return data?.product.sections ?? [];
};

describe("productApi sizes_table", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds table from columns and rows, filling empty cells", async () => {
    const sections = await loadSections({
      sizes_table: {
        columns: ["Размер", "Рост", "Вес"],
        rows: [
          ["XS", "150-160", ""],
          ["XXL", "185-190", "120"],
        ],
      },
    });

    expect(sections.find((section) => section.id === "sizes_table")?.table).toEqual({
      columns: ["Размер", "Рост", "Вес"],
      rows: [
        ["XS", "150-160", "—"],
        ["XXL", "185-190", "120"],
      ],
    });
  });

  it("aligns rows to column count and skips empty rows", async () => {
    const sections = await loadSections({
      sizes_table: {
        columns: ["Размер", "Рост"],
        rows: [["S"], ["M", "165-170", "лишнее"], ["", ""], "не массив"],
      },
    });

    expect(sections.find((section) => section.id === "sizes_table")?.table).toEqual({
      columns: ["Размер", "Рост"],
      rows: [
        ["S", "—"],
        ["M", "165-170"],
      ],
    });
  });

  it("hides the section when table is empty", async () => {
    const sections = await loadSections({ sizes_table: { columns: ["Размер"], rows: [] } });

    expect(sections.some((section) => section.id === "sizes_table")).toBe(false);
  });

  it("keeps the legacy text format", async () => {
    const sections = await loadSections({ sizes_table: "S — 44, M — 46" });

    const section = sections.find((item) => item.id === "sizes_table");
    expect(section?.content).toBe("S — 44, M — 46");
    expect(section?.table).toBeUndefined();
  });

  it("does not break the page on unexpected sizes_table shape", async () => {
    const sections = await loadSections({ sizes_table: [{ size: "S" }], model_params: 42 });

    expect(sections.map((section) => section.id)).toEqual(["description"]);
  });
});

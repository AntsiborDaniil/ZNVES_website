import type { ApiProduct } from "../../types/api";
import type { ApiProductDetail, ApiWarehouseItem } from "../../api/product/productApi";
import type {
  ApiCatalogCategory,
  ApiCatalogColor,
  ApiCatalogSize,
} from "../../api/catalog/catalogApi";

const mockImg = (name: string): string => `/images/catalogs/mock/${name}.svg`;

export const MOCK_CATALOG_CATEGORIES: ApiCatalogCategory[] = [
  { slug: "t-shirt", name: "T-shirts" },
  { slug: "hoodies", name: "Hoodies" },
  { slug: "zip-hoodie", name: "Zip hoodies" },
  { slug: "jeans", name: "Jeans" },
  { slug: "jackets", name: "Jackets" },
  { slug: "pants", name: "Pants" },
  { slug: "shorts", name: "Shorts" },
  { slug: "bags", name: "Bags" },
];

export const MOCK_CATALOG_COLORS: ApiCatalogColor[] = [
  { slug: "green", value: "Зеленый", hex: "#1f4c38" },
  { slug: "navy", value: "Темно-синий", hex: "#1c2743" },
  { slug: "gray", value: "Серый", hex: "#d1cdcb" },
  { slug: "rust", value: "Ржавчина", hex: "#7b3f2f" },
  { slug: "blue", value: "Синий", hex: "#2b4c7e" },
  { slug: "brown", value: "Коричневый", hex: "#5c3d2e" },
  { slug: "olive", value: "Оливковый", hex: "#4a5240" },
  { slug: "black", value: "Черный", hex: "#1a1a1a" },
  { slug: "sand", value: "Песочный", hex: "#c4b59a" },
];

export const MOCK_CATALOG_SIZES: ApiCatalogSize[] = [
  { slug: "s", value: "S" },
  { slug: "m", value: "M" },
  { slug: "l", value: "L" },
  { slug: "xl", value: "XL" },
];

const color = (slug: string): ApiCatalogColor =>
  MOCK_CATALOG_COLORS.find((item) => item.slug === slug) ?? MOCK_CATALOG_COLORS[0];

const sizesFor = (...slugs: string[]): ApiCatalogSize[] =>
  MOCK_CATALOG_SIZES.filter((item) => slugs.includes(item.slug));

/** Детерминированный UUID v4-like для warehouse_item (нужен фронту для заказа/промо). */
export const mockWarehouseUuid = (key: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const hex = "0123456789abcdef";
  const chars: string[] = [];
  for (let i = 0; i < 32; i += 1) {
    hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
    chars.push(hex[(hash >>> 0) % 16]!);
  }
  const s = chars.join("");
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-4${s.slice(13, 16)}-a${s.slice(17, 20)}-${s.slice(20, 32)}`;
};

const warehouseItems = (
  prefix: string,
  colorSlug: string,
  sizeSlugs: string[],
  weight: number
): ApiWarehouseItem[] =>
  sizeSlugs.map((sizeSlug) => ({
    id: mockWarehouseUuid(`${prefix}-${colorSlug}-${sizeSlug}`),
    color_slug: colorSlug,
    size_slug: sizeSlug,
    quantity: 8,
    weight,
  }));

type MockProductSeed = {
  slug: string;
  name: string;
  price: string;
  is_new: boolean;
  image: string;
  gallery?: string[];
  colors: string[];
  sizes: string[];
  variants: ApiProduct["variants"];
  description: string;
  weight: number;
};

const PRODUCT_SEEDS: MockProductSeed[] = [
  {
    slug: "znves-ski-suit",
    name: "ZNVES SKI SUIT",
    price: "22900",
    is_new: true,
    image: "/images/catalogs/mock/ski-suit-1.png",
    gallery: [
      "/images/catalogs/mock/ski-suit-1.png",
      "/images/catalogs/mock/ski-suit-2.png",
      "/images/catalogs/mock/ski-suit-m.png",
    ],
    colors: ["black", "navy"],
    sizes: ["s", "m", "l", "xl"],
    variants: [
      { color_slug: "black", size_slugs: ["s", "m", "l", "xl"] },
      { color_slug: "navy", size_slugs: ["m", "l", "xl"] },
    ],
    description: "Горнолыжный костюм ZNVES из плотной мембранной ткани.",
    weight: 1400,
  },
  {
    slug: "znves-bag",
    name: "ZNVES BAG",
    price: "4490",
    is_new: true,
    image: "/images/catalogs/mock/bag-1.png",
    gallery: [
      "/images/catalogs/mock/bag-1.png",
      "/images/catalogs/mock/bag-2.png",
      "/images/catalogs/mock/bag-m.png",
    ],
    colors: ["green", "gray"],
    sizes: ["s", "m"],
    variants: [
      { color_slug: "green", size_slugs: ["s", "m"] },
      { color_slug: "gray", size_slugs: ["s", "m"] },
    ],
    description: "Сумка ZNVES из плотного текстиля.",
    weight: 380,
  },
  {
    slug: "znves-bag-low",
    name: "ZNVES BAG LOW",
    price: "3390",
    is_new: true,
    image: "/images/catalogs/mock/bag-low-1.png",
    gallery: [
      "/images/catalogs/mock/bag-low-1.png",
      "/images/catalogs/mock/bag-low-2.png",
    ],
    colors: ["green", "sand"],
    sizes: ["s", "m"],
    variants: [
      { color_slug: "green", size_slugs: ["s", "m"] },
      { color_slug: "sand", size_slugs: ["s", "m"] },
    ],
    description: "Компактная сумка ZNVES низкого силуэта.",
    weight: 280,
  },
  {
    slug: "znves-bag-sport",
    name: "ZNVES BAG SPORT",
    price: "4490",
    is_new: true,
    image: "/images/catalogs/mock/bag-sport.png",
    colors: ["black", "olive"],
    sizes: ["s", "m", "l"],
    variants: [
      { color_slug: "black", size_slugs: ["s", "m", "l"] },
      { color_slug: "olive", size_slugs: ["m", "l"] },
    ],
    description: "Спортивная сумка ZNVES.",
    weight: 420,
  },
  {
    slug: "znves-bag-square",
    name: "ZNVES BAG SQUARE",
    price: "5390",
    is_new: true,
    image: "/images/catalogs/mock/bag-square.png",
    colors: ["green", "black"],
    sizes: ["s", "m"],
    variants: [
      { color_slug: "green", size_slugs: ["s", "m"] },
      { color_slug: "black", size_slugs: ["s", "m"] },
    ],
    description: "Квадратная сумка ZNVES.",
    weight: 360,
  },
  {
    slug: "t-shirt-voyage",
    name: "T-SHIRT VOYAGE",
    price: "4990",
    is_new: true,
    image: mockImg("tshirt-green"),
    gallery: [mockImg("tshirt-green"), mockImg("tshirt-navy"), mockImg("tshirt-rust")],
    colors: ["green", "navy", "rust"],
    sizes: ["s", "m", "l", "xl"],
    variants: [
      { color_slug: "green", size_slugs: ["s", "m", "l", "xl"] },
      { color_slug: "navy", size_slugs: ["m", "l", "xl"] },
      { color_slug: "rust", size_slugs: ["s", "m", "l"] },
    ],
    description: "Свободная футболка из плотного хлопка с фирменной вышивкой ZNVES.",
    weight: 260,
  },
  {
    slug: "t-shirt-navy",
    name: "T-SHIRT CLASSIC",
    price: "4590",
    is_new: false,
    image: mockImg("tshirt-navy"),
    gallery: [mockImg("tshirt-navy"), mockImg("tshirt-green")],
    colors: ["navy", "gray"],
    sizes: ["s", "m", "l"],
    variants: [
      { color_slug: "navy", size_slugs: ["s", "m", "l"] },
      { color_slug: "gray", size_slugs: ["m", "l"] },
    ],
    description: "Базовая футболка прямого кроя на каждый день.",
    weight: 250,
  },
  {
    slug: "t-shirt-rust",
    name: "T-SHIRT RUST",
    price: "4790",
    is_new: true,
    image: mockImg("tshirt-rust"),
    colors: ["rust"],
    sizes: ["s", "m", "l", "xl"],
    variants: [{ color_slug: "rust", size_slugs: ["s", "m", "l", "xl"] }],
    description: "Футболка в оттенке ржавчины с вышивкой ZNVES.",
    weight: 255,
  },
  {
    slug: "zip-hoodie-green",
    name: "ZIP HOODIE GREEN",
    price: "6590",
    is_new: false,
    image: mockImg("zip-hoodie-green"),
    gallery: [mockImg("zip-hoodie-green"), mockImg("zip-hoodie-blue")],
    colors: ["green", "blue"],
    sizes: ["s", "m", "l", "xl"],
    variants: [
      { color_slug: "green", size_slugs: ["s", "m", "l", "xl"] },
      { color_slug: "blue", size_slugs: ["m", "l", "xl"] },
    ],
    description: "Тёплый худи на молнии из плотного футера.",
    weight: 620,
  },
  {
    slug: "zip-hoodie-blue",
    name: "ZIP HOODIE BLUE",
    price: "6790",
    is_new: true,
    image: mockImg("zip-hoodie-blue"),
    colors: ["blue", "navy"],
    sizes: ["m", "l", "xl"],
    variants: [
      { color_slug: "blue", size_slugs: ["m", "l", "xl"] },
      { color_slug: "navy", size_slugs: ["l", "xl"] },
    ],
    description: "Худи на молнии с капюшоном и карманами.",
    weight: 630,
  },
  {
    slug: "hoodie-classic",
    name: "HOODIE CLASSIC",
    price: "5990",
    is_new: false,
    image: mockImg("hoodie-gray"),
    colors: ["gray", "green"],
    sizes: ["s", "m", "l", "xl"],
    variants: [
      { color_slug: "gray", size_slugs: ["s", "m", "l", "xl"] },
      { color_slug: "green", size_slugs: ["m", "l"] },
    ],
    description: "Классический худи без молнии, мягкий внутренний слой.",
    weight: 580,
  },
  {
    slug: "jeans-classic",
    name: "CLASSIC JEANS",
    price: "7990",
    is_new: false,
    image: mockImg("jeans-navy"),
    gallery: [mockImg("jeans-navy"), mockImg("jeans-light")],
    colors: ["navy", "blue"],
    sizes: ["s", "m", "l", "xl"],
    variants: [
      { color_slug: "navy", size_slugs: ["s", "m", "l", "xl"] },
      { color_slug: "blue", size_slugs: ["m", "l"] },
    ],
    description: "Классические джинсы прямого кроя.",
    weight: 720,
  },
  {
    slug: "jeans-light",
    name: "LIGHT WASH JEANS",
    price: "8290",
    is_new: true,
    image: mockImg("jeans-light"),
    colors: ["blue", "gray"],
    sizes: ["m", "l", "xl"],
    variants: [
      { color_slug: "blue", size_slugs: ["m", "l", "xl"] },
      { color_slug: "gray", size_slugs: ["l", "xl"] },
    ],
    description: "Джинсы светлого оттенка с современным кроем.",
    weight: 710,
  },
  {
    slug: "jacket-brown",
    name: "BROWN JACKET",
    price: "11990",
    is_new: false,
    image: mockImg("jacket-brown"),
    gallery: [mockImg("jacket-brown"), mockImg("jacket-olive")],
    colors: ["brown", "olive"],
    sizes: ["m", "l", "xl"],
    variants: [
      { color_slug: "brown", size_slugs: ["m", "l", "xl"] },
      { color_slug: "olive", size_slugs: ["l", "xl"] },
    ],
    description: "Куртка из плотной ткани с утеплителем.",
    weight: 900,
  },
  {
    slug: "jacket-olive",
    name: "OLIVE JACKET",
    price: "12490",
    is_new: true,
    image: mockImg("jacket-olive"),
    colors: ["olive", "brown"],
    sizes: ["m", "l", "xl"],
    variants: [
      { color_slug: "olive", size_slugs: ["m", "l", "xl"] },
      { color_slug: "brown", size_slugs: ["m", "l"] },
    ],
    description: "Оливковая куртка в стиле utility.",
    weight: 920,
  },
  {
    slug: "pants-black",
    name: "BLACK PANTS",
    price: "6990",
    is_new: false,
    image: mockImg("pants-black"),
    colors: ["black", "gray"],
    sizes: ["s", "m", "l", "xl"],
    variants: [
      { color_slug: "black", size_slugs: ["s", "m", "l", "xl"] },
      { color_slug: "gray", size_slugs: ["m", "l"] },
    ],
    description: "Брюки прямого кроя из смесовой ткани.",
    weight: 540,
  },
  {
    slug: "shorts-sand",
    name: "SAND SHORTS",
    price: "3990",
    is_new: true,
    image: mockImg("shorts-sand"),
    colors: ["sand", "olive"],
    sizes: ["s", "m", "l"],
    variants: [
      { color_slug: "sand", size_slugs: ["s", "m", "l"] },
      { color_slug: "olive", size_slugs: ["m", "l"] },
    ],
    description: "Лёгкие шорты для тёплого сезона.",
    weight: 220,
  },
];

const toApiProduct = (seed: MockProductSeed): ApiProduct => ({
  slug: seed.slug,
  name: seed.name,
  price: seed.price,
  is_new: seed.is_new,
  images: seed.gallery ?? [seed.image],
  colors: seed.colors.map(color),
  sizes: sizesFor(...seed.sizes),
  variants: seed.variants,
});

const toProductDetail = (seed: MockProductSeed): ApiProductDetail => ({
  slug: seed.slug,
  name: seed.name,
  price: seed.price,
  description: seed.description,
  is_new: seed.is_new,
  images: seed.gallery ?? [seed.image],
  sizes: sizesFor(...seed.sizes),
  colors: seed.colors.map(color),
  warehouse_items: (seed.variants ?? []).flatMap((variant) =>
    warehouseItems(seed.slug, variant.color_slug, variant.size_slugs, seed.weight)
  ),
  print_application: "Логотип ZNVES нанесен методом вышивки.",
  sizes_table: "S — 44, M — 46, L — 48, XL — 50.",
  model_params: "Рост модели 175 см, размер M.",
  composition_and_care: "Натуральные и смесовые материалы. Деликатная стирка до 30°C.",
  delivery_info: "Доставка СДЭК и Яндекс по России.",
  return_info: "Возврат в течение 14 дней при сохранении товарного вида.",
});

export const MOCK_CATALOG_PRODUCTS: ApiProduct[] = PRODUCT_SEEDS.map(toApiProduct);

const productDetails: Record<string, ApiProductDetail> = Object.fromEntries(
  PRODUCT_SEEDS.map((seed) => [seed.slug, toProductDetail(seed)])
);

export const getMockProductDetail = (slug: string): ApiProductDetail | null =>
  productDetails[slug] ?? null;

export const filterMockCatalogProducts = (params: {
  category?: string | null;
  is_new?: boolean | null;
}): ApiProduct[] => {
  let list = [...MOCK_CATALOG_PRODUCTS];

  if (params.category) {
    const cat = params.category.toLowerCase();
    list = list.filter(
      (product) =>
        product.slug.includes(cat) ||
        product.slug.startsWith(cat) ||
        (cat === "hoodies" && product.slug.includes("hoodie")) ||
        (cat === "zip-hoodie" && product.slug.includes("zip-hoodie")) ||
        (cat === "bags" && product.slug.includes("bag")) ||
        (cat === "jackets" &&
          (product.slug.includes("jacket") ||
            product.slug.includes("ski") ||
            product.slug.includes("suit")))
    );
  }

  if (params.is_new === true) {
    list = list.filter((product) => product.is_new);
  }

  return list;
};

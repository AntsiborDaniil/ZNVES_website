export type CatalogProductColor = {
    slug: string;
    value: string;
    hex: string;
};

export type CatalogProductSize = {
    slug: string;
    value: string;
};

/** Вариант товара: цвет и доступные размеры для этого цвета (для фильтра «цвет + размер»). Поддерживается и массив size_slugs, и одиночный size_slug. */
export type CatalogProductVariant = {
    color_slug: string;
    size_slugs?: string[];
    size_slug?: string;
};

export type CatalogProduct = {
    id: number;
    slug?: string; // Добавляем slug для ссылок на товары
    title: string;
    price: string;
    priceValue: number;
    images: string[];
    isNew: boolean;
    category: string;
    /** Цвет по умолчанию (первый из списка), для отображения и корзины */
    color: string;
    /** Размер по умолчанию (первый из списка), для отображения и корзины */
    size: string;
    /** Все доступные цвета товара — для фильтрации в каталоге */
    colors?: CatalogProductColor[];
    /** Все доступные размеры товара — для фильтрации в каталоге */
    sizes?: CatalogProductSize[];
    /** Реальные варианты (цвет + размеры для этого цвета). Если есть — фильтр «красный + S» покажет только товары, у которых у красного есть размер S */
    variants?: CatalogProductVariant[];
    sortOrder: number;
};

export type ProductAccordionSection = {
    id: string;
    title: string;
    content: string;
};

export type ProductColorOption = {
    label: string;
    value: string;
    hex?: string;
};

export type ProductDetail = CatalogProduct & {
    sku: string;
    slug?: string; // Добавляем slug для ссылок
    defaultSize: string;
    availableSizes: string[];
    availableColors: ProductColorOption[];
    sections: ProductAccordionSection[];
};

export type CatalogProduct = {
    id: number;
    slug?: string; // Добавляем slug для ссылок на товары
    title: string;
    price: string;
    priceValue: number;
    images: string[];
    isNew: boolean;
    category: string;
    color: string;
    size: string;
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

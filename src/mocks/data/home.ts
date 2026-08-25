import type { HomePageContent } from "../../types/home";

/** Контент главной: hero, lookbook-коллаж, баннеры коллекций */
export const MOCK_HOME_PAGE: HomePageContent = {
  hero: {
    desktop_image: "/images/home/hero-desktop.webp",
    mobile_image: "/images/home/hero-mobile.webp",
    title: "NEW COLLECTION",
    cta_text: "Перейти в каталог",
    cta_href: "/catalog",
  },
  catalog_featured_image: "/images/home/collage-featured.png",
  collections: [
    {
      title: "Ski suit",
      // файл collection-bag.png содержит фото ski suit
      image: "/images/home/collection-bag.png",
      href: "/catalog?category=jackets",
      cta: "Shop now",
    },
    {
      title: "Bag square",
      // файл collection-ski.png содержит фото сумки
      image: "/images/home/collection-ski.png",
      href: "/catalog?category=bags",
      cta: "Shop now",
    },
  ],
};

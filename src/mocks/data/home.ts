import type { HomePageContent } from "../../types/home";

/** Контент главной: hero, lookbook-коллаж */
export const MOCK_HOME_PAGE: HomePageContent = {
  hero: {
    desktop_image: "/images/home/hero-desktop.webp",
    mobile_image: "/images/home/hero-mobile.webp",
    title: "ZNVES",
    cta_text: "Перейти в каталог",
    cta_href: "/catalog",
  },
  catalog_featured_image: "/images/home/collage-featured.webp",
  collections: [],
};

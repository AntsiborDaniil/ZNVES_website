export type HomeCollection = {
  title: string;
  image: string;
  href: string;
  cta?: string;
};

export type HomeHero = {
  desktop_image: string;
  mobile_image: string;
  title: string;
  cta_text: string;
  cta_href: string;
};

export type HomePageContent = {
  hero: HomeHero;
  catalog_featured_image: string;
  collections: HomeCollection[];
};

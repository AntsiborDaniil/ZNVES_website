export type HomeCollection = {
  title: string;
  image: string;
  href: string;
  cta?: string;
};

export type HomeHero = {
  desktop_image: string;
  mobile_image: string;
  /** Опционально: фоновое видео hero (MP4) */
  desktop_video?: string;
  mobile_video?: string;
  title: string;
  cta_text: string;
  cta_href: string;
};

export type HomePageContent = {
  hero: HomeHero;
  catalog_featured_image: string;
  collections: HomeCollection[];
};

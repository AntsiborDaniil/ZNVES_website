declare module "swiper/react" {
  import type { FC, ReactNode } from "react";

  type SwiperProps = {
    direction?: "vertical" | "horizontal";
    slidesPerView?: number | "auto";
    spaceBetween?: number;
    mousewheel?: unknown;
    freeMode?: unknown;
    navigation?: boolean | unknown;
    pagination?: boolean | { clickable?: boolean } | unknown;
    speed?: number;
    modules?: unknown[];
    onSlideChange?: (swiperInstance: { activeIndex: number }) => void;
    className?: string;
    children?: ReactNode;
  };

  type SwiperSlideProps = {
    children?: ReactNode;
    className?: string;
  };

  export const Swiper: FC<SwiperProps>;
  export const SwiperSlide: FC<SwiperSlideProps>;
}

declare module "swiper/modules" {
  export const Mousewheel: unknown;
  export const FreeMode: unknown;
  export const Navigation: unknown;
  export const Pagination: unknown;
}

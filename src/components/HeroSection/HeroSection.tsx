import styles from "./HeroSection.module.css";
import Button from "../ui/Button/Button";

/** Локальные ассеты hero (не берём URL картинок с API — там могут быть старые). */
const HERO_DESKTOP_IMAGE = "/images/home/hero-desktop.webp";
const HERO_MOBILE_IMAGE = "/images/home/hero-mobile.webp";

/**
 * Один `<picture>`: браузер качает только desktop или mobile по media.
 * Без двух priority Image — иначе оба файла всегда уходят в сеть.
 */
const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        {/* eslint-disable-next-line @next/next/no-img-element -- picture + media = один файл, без двойной загрузки */}
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={HERO_MOBILE_IMAGE}
            type="image/webp"
          />
          <img
            src={HERO_DESKTOP_IMAGE}
            alt=""
            className={styles.heroImage}
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className={styles.heroContent}>
        <Button href="/catalog" variant="underline" className={styles.cta}>
          Смотреть больше
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

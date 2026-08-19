import Image from "next/image";
import Button from "../ui/Button/Button";
import styles from "./CollectionBanner.module.css";

export type CollectionBannerItem = {
  title: string;
  image: string;
  href: string;
  cta?: string;
};

type CollectionBannerProps = CollectionBannerItem;

export const CollectionBanner = ({
  title,
  image,
  href,
  cta = "Shop now",
}: CollectionBannerProps) => {
  return (
    <article className={styles.banner}>
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={styles.image}
      />
      <div className={styles.gradient} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <Button href={href} variant="primary" className={styles.cta}>
          {cta}
        </Button>
      </div>
    </article>
  );
};

type CollectionBannersProps = {
  id?: string;
  items: readonly CollectionBannerItem[];
};

const CollectionBanners = ({ id = "collections", items }: CollectionBannersProps) => {
  return (
    <section id={id} className={styles.section}>
      {items.map((item) => (
        <CollectionBanner key={item.title} {...item} />
      ))}
    </section>
  );
};

export default CollectionBanners;

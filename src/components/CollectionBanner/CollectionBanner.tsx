"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button/Button";
import styles from "./CollectionBanner.module.css";
import { fetchHomePage } from "../../api/home/homeApi";
import type { HomeCollection } from "../../types/home";

export type CollectionBannerItem = HomeCollection;

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
};

const CollectionBanners = ({ id = "collections" }: CollectionBannersProps) => {
  const [items, setItems] = useState<HomeCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHomePage()
      .then((data) => setItems(data.collections))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section id={id} className={styles.section} aria-busy aria-label="Загрузка коллекций">
        <div className={styles.skeleton} />
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={id} className={styles.section}>
      {items.map((item) => (
        <CollectionBanner key={item.title} {...item} />
      ))}
    </section>
  );
};

export default CollectionBanners;

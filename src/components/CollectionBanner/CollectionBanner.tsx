"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CollectionBanner.module.css";
import buttonStyles from "../ui/Button/Button.module.css";
import { fetchHomePage } from "../../api/home/homeApi";
import type { HomeCollection } from "../../types/home";

export type CollectionBannerItem = HomeCollection;

type CollectionBannerProps = CollectionBannerItem;

/** Shop now всегда ведёт в общий каталог без category= */
export const resolveCollectionHref = (_item?: HomeCollection): string => "/catalog";

export const CollectionBanner = ({
  title,
  image,
  href,
  cta = "Shop now",
}: CollectionBannerProps) => {
  const resolvedHref = resolveCollectionHref({ title, image, href, cta });

  return (
    <article className={styles.banner}>
      <Link href={resolvedHref} className={styles.bannerLink} prefetch={false}>
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={styles.image}
        />
        <div className={styles.gradient} aria-hidden />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <span
            className={`${buttonStyles.button} ${buttonStyles.primary} ${styles.cta}`}
          >
            {cta}
          </span>
        </div>
      </Link>
    </article>
  );
};

type CollectionBannersProps = {
  id?: string;
  items?: HomeCollection[];
};

const CollectionBanners = ({
  id = "collections",
  items: itemsProp,
}: CollectionBannersProps) => {
  const hasServerData = itemsProp != null;
  const [items, setItems] = useState<HomeCollection[]>(itemsProp ?? []);
  const [isLoading, setIsLoading] = useState(!hasServerData);

  useEffect(() => {
    if (hasServerData) return;

    fetchHomePage()
      .then((data) => setItems(data.collections))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));
  }, [hasServerData]);

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

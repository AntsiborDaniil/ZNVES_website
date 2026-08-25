"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CollectionBanner.module.css";
import buttonStyles from "../ui/Button/Button.module.css";
import { fetchHomePage } from "../../api/home/homeApi";
import { buildCatalogCategoryHref } from "../../api/catalog/catalogApi";
import type { HomeCollection } from "../../types/home";

export type CollectionBannerItem = HomeCollection;

type CollectionBannerProps = CollectionBannerItem;

/** Категория каталога по названию баннера коллекции */
const resolveCollectionCategorySlug = (title: string): string | null => {
  const t = title.toLowerCase().replace(/\s+/g, " ").trim();
  if (t.includes("bag") || t.includes("сумк")) return "bags";
  if (
    t.includes("ski") ||
    t.includes("suit") ||
    t.includes("jacket") ||
    t.includes("куртк")
  ) {
    return "jackets";
  }
  return null;
};

const catalogHrefHasCategory = (href: string): boolean => {
  try {
    const url = new URL(href, "https://znves.local");
    return Boolean(url.searchParams.get("category")?.trim());
  } catch {
    return /[?&]category=/i.test(href);
  }
};

/**
 * Приоритет: href с category= → slug из title → любой непустой href → /catalog.
 * Так Shop now не сваливается на общий каталог, если бэкенд отдал href="/catalog".
 */
export const resolveCollectionHref = (item: HomeCollection): string => {
  const rawHref = (item.href || "").trim();
  if (rawHref && catalogHrefHasCategory(rawHref)) {
    return rawHref.startsWith("http")
      ? rawHref.replace(/^https?:\/\/[^/]+/i, "") || rawHref
      : rawHref;
  }

  const categorySlug = resolveCollectionCategorySlug(item.title);
  if (categorySlug) {
    return buildCatalogCategoryHref(categorySlug);
  }

  if (rawHref && rawHref !== "/catalog" && rawHref !== "/catalog/") {
    return rawHref;
  }

  return "/catalog";
};

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

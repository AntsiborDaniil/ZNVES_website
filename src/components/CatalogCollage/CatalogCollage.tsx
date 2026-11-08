"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import Button from "../ui/Button/Button";
import styles from "./CatalogCollage.module.css";
import type { CatalogProduct } from "../../types/products";
import { useGetAllCatalogProductsQuery } from "../../store/api";
import { buildProductHref } from "../../lib/productNavigation";
import { releaseHomeHero } from "../NavigationTracker/NavigationTracker";

type CatalogCollageProps = {
  id?: string;
  title?: string;
  moreHref?: string;
  products?: CatalogProduct[];
  featuredImage?: string;
};

const DEFAULT_FEATURED_IMAGE = "/images/home/collage-catalog.webp";

/** Lookbook всегда из репозитория — с API может прийти старое фото. */
const resolveFeaturedImage = (_src?: string) => DEFAULT_FEATURED_IMAGE;

const CatalogCollage = ({
  id = "catalog-section",
  title = "Catalog",
  moreHref = "/catalog",
  products: productsProp,
  featuredImage: featuredImageProp,
}: CatalogCollageProps) => {
  const hasServerData = productsProp != null && productsProp.length > 0;
  const { data, isLoading, isError, refetch } = useGetAllCatalogProductsQuery(undefined, { skip: hasServerData });
  const products = hasServerData ? productsProp : data ?? [];
  const featuredImage = resolveFeaturedImage(featuredImageProp);

  const gridProducts = products.slice(0, 4);

  return (
    <section id={id} className={styles.section}>
      <SectionHeader title={title} href={moreHref} actionLabel="Смотреть больше" />

      {isLoading ? (
        <div className={styles.skeleton} aria-busy aria-label="Загрузка каталога" />
      ) : products.length === 0 ? (
        <div className={styles.empty}>{isError ? <>
          <p role="alert">Не удалось загрузить товары.</p>
          <button type="button" onClick={() => void refetch()}>Повторить попытку</button>
        </> : "Товары не найдены"}</div>
      ) : (
        <>
          <div className={styles.desktopGrid}>
            <Link href={moreHref} className={styles.lookbook} prefetch={false}>
              <Image
                src={featuredImage}
                alt="Catalog lookbook"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.lookbookImage}
              />
              <span className={styles.goLink}>Перейти</span>
            </Link>
            <div className={styles.productGrid}>
              {gridProducts.map((product) => (
                <Link
                  key={product.id}
                  href={buildProductHref(product.slug || product.id, {
                    from: "home",
                  })}
                  className={styles.productLink}
                  prefetch={false}
                  onPointerDown={() => releaseHomeHero()}
                >
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    images={product.images}
                    isNew={false}
                    variant="grid"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.mobileGrid}>
            {gridProducts.map((product) => (
              <Link
                key={product.id}
                href={buildProductHref(product.slug || product.id, {
                  from: "home",
                })}
                className={styles.productLink}
                prefetch={false}
                onPointerDown={() => releaseHomeHero()}
              >
                <ProductCard
                  title={product.title}
                  price={product.price}
                  images={product.images}
                  isNew={false}
                  variant="grid"
                />
              </Link>
            ))}
          </div>

          <div className={styles.mobileMore}>
            <Button href={moreHref} variant="outline" fullWidth>
              Смотреть больше
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default CatalogCollage;

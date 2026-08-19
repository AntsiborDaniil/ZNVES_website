"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import Button from "../ui/Button/Button";
import styles from "./CatalogCollage.module.css";
import type { CatalogProduct } from "../../types/products";
import { fetchAllCatalogProducts } from "../../api/home/catalogApi";
import { HOME_FEATURED_IMAGES } from "../../data/homeContent";

type CatalogCollageProps = {
  id?: string;
  title?: string;
  moreHref?: string;
};

const CatalogCollage = ({
  id = "catalog-section",
  title = "Catalog",
  moreHref = "/catalog",
}: CatalogCollageProps) => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const catalogProducts = await fetchAllCatalogProducts();
        setProducts(catalogProducts);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

  const desktopProducts = products.slice(0, 4);
  const mobileProducts = products.slice(0, 2);

  return (
    <section id={id} className={styles.section}>
      <SectionHeader title={title} href={moreHref} actionLabel="Смотреть больше" />

      {isLoading ? (
        <div className={styles.skeleton} aria-busy aria-label="Загрузка каталога" />
      ) : products.length === 0 ? (
        <div className={styles.empty}>Товары не найдены</div>
      ) : (
        <>
          <div className={styles.desktopGrid}>
            <Link href={moreHref} className={styles.lookbook} prefetch={false}>
              <Image
                src={HOME_FEATURED_IMAGES[0]}
                alt="Catalog lookbook"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.lookbookImage}
              />
              <span className={styles.goLink}>Перейти</span>
            </Link>
            <div className={styles.productGrid}>
              {desktopProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalog/${product.slug || product.id}`}
                  className={styles.productLink}
                  prefetch={false}
                >
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    images={product.images}
                    isNew={false}
                    zoomOnHover
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.mobileGrid}>
            <div className={styles.mobileCol}>
              <Link href={moreHref} className={`${styles.lookbook} ${styles.lookbookTall}`} prefetch={false}>
                <Image
                  src={HOME_FEATURED_IMAGES[0]}
                  alt="Catalog lookbook"
                  fill
                  sizes="50vw"
                  className={styles.lookbookImage}
                />
              </Link>
              {mobileProducts[0] && (
                <Link
                  href={`/catalog/${mobileProducts[0].slug || mobileProducts[0].id}`}
                  className={styles.productLink}
                  prefetch={false}
                >
                  <ProductCard
                    title={mobileProducts[0].title}
                    price={mobileProducts[0].price}
                    images={mobileProducts[0].images}
                    isNew={false}
                    zoomOnHover
                  />
                </Link>
              )}
            </div>
            <div className={styles.mobileCol}>
              {mobileProducts[1] && (
                <Link
                  href={`/catalog/${mobileProducts[1].slug || mobileProducts[1].id}`}
                  className={styles.productLink}
                  prefetch={false}
                >
                  <ProductCard
                    title={mobileProducts[1].title}
                    price={mobileProducts[1].price}
                    images={mobileProducts[1].images}
                    isNew={false}
                    zoomOnHover
                  />
                </Link>
              )}
              <Link href={moreHref} className={`${styles.lookbook} ${styles.lookbookTall}`} prefetch={false}>
                <Image
                  src={HOME_FEATURED_IMAGES[1]}
                  alt="Catalog lookbook"
                  fill
                  sizes="50vw"
                  className={styles.lookbookImage}
                />
              </Link>
            </div>
          </div>

          <Button href={moreHref} variant="outline" className={styles.mobileMore}>
            Смотреть больше
          </Button>
        </>
      )}
    </section>
  );
};

export default CatalogCollage;

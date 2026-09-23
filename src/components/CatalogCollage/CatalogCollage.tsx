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
import { fetchHomePage } from "../../api/home/homeApi";
import { buildProductHref } from "../../lib/productNavigation";

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
  const hasServerData = productsProp != null;
  const [products, setProducts] = useState<CatalogProduct[]>(
    productsProp ?? []
  );
  const [featuredImage, setFeaturedImage] = useState(
    resolveFeaturedImage(featuredImageProp)
  );
  const [isLoading, setIsLoading] = useState(!hasServerData);

  useEffect(() => {
    if (hasServerData) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const [catalogProducts, homePage] = await Promise.all([
          fetchAllCatalogProducts(),
          fetchHomePage(),
        ]);
        setProducts(catalogProducts);
        setFeaturedImage(resolveFeaturedImage(homePage.catalog_featured_image));
      } catch {
        setProducts([]);
        setFeaturedImage(DEFAULT_FEATURED_IMAGE);
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [hasServerData]);

  const gridProducts = products.slice(0, 4);

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

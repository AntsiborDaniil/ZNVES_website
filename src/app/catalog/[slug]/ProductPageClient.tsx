"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductPageView from "../../../components/ProductPage/ProductPageView";
import LoadingStub from "../../../components/LoadingStub/LoadingStub";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { fetchProductWithWarehouse } from "../../../api/product/productApi";
import type { ProductDetail } from "../../../types/products";
import type { ApiWarehouseItem } from "../../../api/product/productApi";
import styles from "../../not-found.module.css";

type ProductPageClientProps = {
  slug: string;
  initialProduct?: ProductDetail | null;
  initialWarehouseItems?: ApiWarehouseItem[];
};

type LoadState =
  | { status: "loading" }
  | {
      status: "ready";
      product: ProductDetail;
      warehouseItems: ApiWarehouseItem[];
    }
  | { status: "not-found" }
  | { status: "error" };

const ProductPageBody = ({
  slug,
  initialProduct = null,
  initialWarehouseItems = [],
}: ProductPageClientProps) => {
  const hasSsr = initialProduct != null;

  const [state, setState] = useState<LoadState>(() =>
    hasSsr && initialProduct
      ? {
          status: "ready",
          product: initialProduct,
          warehouseItems: initialWarehouseItems,
        }
      : { status: "loading" }
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    // SSR уже отдал товар — тихий soft-refresh без скелетона
    const quiet = hasSsr && attempt === 0;
    if (!quiet) {
      setState({ status: "loading" });
    }

    fetchProductWithWarehouse(slug)
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setState({
            status: "ready",
            product: data.product,
            warehouseItems: data.warehouseItems,
          });
          return;
        }
        if (!quiet) {
          setState({ status: "not-found" });
        }
      })
      .catch((error) => {
        if (cancelled) return;
        console.error(`Не удалось загрузить товар «${slug}»`, error);
        if (!quiet) {
          setState({ status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, attempt, hasSsr]);

  const handleRetry = useCallback(() => setAttempt((value) => value + 1), []);

  if (state.status === "loading") {
    return <LoadingStub label="Загрузка товара…" />;
  }

  if (state.status === "not-found") {
    notFound();
  }

  if (state.status === "error") {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.card}>
            <h1 className={styles.title}>Не удалось загрузить товар</h1>
            <p className={styles.description}>
              Произошла ошибка при загрузке. Попробуйте обновить страницу чуть
              позже.
            </p>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleRetry}
              >
                Повторить
              </button>
              <Link href="/catalog" className={styles.secondaryButton}>
                В каталог
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ProductPageView
      product={state.product}
      warehouseItems={state.warehouseItems}
    />
  );
};

const ProductPageClient = ({
  slug,
  initialProduct = null,
  initialWarehouseItems = [],
}: ProductPageClientProps) => {
  return (
    <Suspense fallback={<LoadingStub label="Загрузка товара…" />}>
      <ProductPageBody
        slug={slug}
        initialProduct={initialProduct}
        initialWarehouseItems={initialWarehouseItems}
      />
    </Suspense>
  );
};

export default ProductPageClient;

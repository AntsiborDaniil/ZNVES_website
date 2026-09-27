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
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; product: ProductDetail; warehouseItems: ApiWarehouseItem[] }
  | { status: "not-found" }
  | { status: "error" };

const ProductPageBody = ({ slug }: ProductPageClientProps) => {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    fetchProductWithWarehouse(slug)
      .then((data) => {
        if (cancelled) return;
        setState(
          data
            ? { status: "ready", product: data.product, warehouseItems: data.warehouseItems }
            : { status: "not-found" }
        );
      })
      .catch((error) => {
        if (cancelled) return;
        // Сетевые ошибки и ошибки разбора ответа — не 404, показываем их как ошибку загрузки
        console.error(`Не удалось загрузить товар «${slug}»`, error);
        setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, attempt]);

  const handleRetry = useCallback(() => setAttempt((value) => value + 1), []);

  if (state.status === "loading") {
    return <LoadingStub label="Загрузка товара…" />;
  }

  // notFound() вызываем только при рендере — из async-колбэка Next его не перехватывает
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
              Произошла ошибка при загрузке. Попробуйте обновить страницу чуть позже.
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.primaryButton} onClick={handleRetry}>
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
    <ProductPageView product={state.product} warehouseItems={state.warehouseItems} />
  );
};

const ProductPageClient = ({ slug }: ProductPageClientProps) => {
  return (
    <Suspense fallback={<LoadingStub label="Загрузка товара…" />}>
      <ProductPageBody slug={slug} />
    </Suspense>
  );
};

export default ProductPageClient;

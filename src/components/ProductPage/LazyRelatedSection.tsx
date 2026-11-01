"use client";

import { useEffect, useRef, useState } from "react";
import ProductDisplaySection from "../ProductDisplaySection/ProductDisplaySection";

const RELATED_MAX = 8;

/**
 * На LTE related не должен стартовать вместе с галереей —
 * иначе fetchAllCatalog + картинки душат слоты соединения.
 */
const LazyRelatedSection = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "320px 0px", threshold: 0.01 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      {shouldMount ? (
        <ProductDisplaySection
          title="Вам также может понравиться"
          showShopNow={false}
          headerAlign="center"
          navFrom="catalog"
          maxProducts={RELATED_MAX}
        />
      ) : (
        <div style={{ minHeight: 280 }} aria-hidden />
      )}
    </div>
  );
};

export default LazyRelatedSection;

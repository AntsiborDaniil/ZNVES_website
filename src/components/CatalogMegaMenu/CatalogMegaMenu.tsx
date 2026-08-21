"use client";

import Link from "next/link";
import {
  buildCatalogCategoryHref,
  getCatalogCategoryLabel,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import styles from "./CatalogMegaMenu.module.css";

type CatalogMegaMenuProps = {
  categories: ApiCatalogCategory[];
  onNavigate?: () => void;
};

const splitColumns = (
  categories: ApiCatalogCategory[]
): [ApiCatalogCategory[], ApiCatalogCategory[]] => {
  const mid = Math.ceil(categories.length / 2);
  return [categories.slice(0, mid), categories.slice(mid)];
};

const CatalogMegaMenu = ({ categories, onNavigate }: CatalogMegaMenuProps) => {
  const [left, right] = splitColumns(categories);

  return (
    <div className={styles.panel} role="menu" aria-label="Категории каталога">
      <div className={styles.linksPane}>
        <div className={styles.columns}>
          <ul className={styles.column}>
            {left.map((category) => (
              <li key={category.slug}>
                <Link
                  href={buildCatalogCategoryHref(category.slug)}
                  className={styles.link}
                  onClick={onNavigate}
                  prefetch={false}
                  role="menuitem"
                >
                  {getCatalogCategoryLabel(category)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.column}>
            {right.map((category) => (
              <li key={category.slug}>
                <Link
                  href={buildCatalogCategoryHref(category.slug)}
                  className={styles.link}
                  onClick={onNavigate}
                  prefetch={false}
                  role="menuitem"
                >
                  {getCatalogCategoryLabel(category)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.mediaPane} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG with embedded crop/gradient from Figma */}
        <img
          src="/images/header/catalog-mega.svg"
          alt=""
          width={720}
          height={376}
          className={styles.mediaSvg}
        />
      </div>
    </div>
  );
};

export default CatalogMegaMenu;

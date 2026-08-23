"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  buildCatalogCategoryHref,
  getCatalogCategoryLabel,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import styles from "./CatalogMegaMenu.module.css";

const PANEL_ANIMATION_MS = 450;

type CatalogMegaMenuProps = {
  isOpen: boolean;
  categories: ApiCatalogCategory[];
  onNavigate?: () => void;
};

const splitColumns = (
  categories: ApiCatalogCategory[]
): [ApiCatalogCategory[], ApiCatalogCategory[]] => {
  const mid = Math.ceil(categories.length / 2);
  return [categories.slice(0, mid), categories.slice(mid)];
};

const CatalogMegaMenu = ({ isOpen, categories, onNavigate }: CatalogMegaMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [left, right] = splitColumns(categories);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsActive(true));
      });
      return;
    }

    setIsActive(false);
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, PANEL_ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (!isVisible && !isOpen) {
    return null;
  }

  return (
    <div
      className={`${styles.panel} ${isActive ? styles.panelOpen : ""}`}
      role="menu"
      aria-label="Категории каталога"
      aria-hidden={!isActive}
    >
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
                  tabIndex={isActive ? 0 : -1}
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
                  tabIndex={isActive ? 0 : -1}
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

"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import {
  buildCatalogCategoryHref,
  getCatalogCategoryLabel,
  type ApiCatalogCategory,
} from "../../api/catalog/catalogApi";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";
import styles from "./CatalogMegaMenu.module.css";

const PANEL_ANIMATION_MS = 450;

type CatalogMegaMenuProps = {
  isOpen: boolean;
  categories: ApiCatalogCategory[];
  onNavigate?: () => void;
  onClose?: () => void;
  onCollectionsClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const CatalogMegaMenu = ({
  isOpen,
  categories,
  onNavigate,
  onClose,
  onCollectionsClick,
}: CatalogMegaMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsCategoriesOpen(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsActive(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setIsActive(false);
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, PANEL_ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useKeyboardEvent("Escape", handleClose, isOpen);

  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    // Клик по прозрачной зоне вне чёрной панели — закрыть
    if (event.target === event.currentTarget) {
      handleClose();
      return;
    }
    event.stopPropagation();
  };

  const stopMenuEvent = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleNavigate = (event: MouseEvent) => {
    event.stopPropagation();
    onNavigate?.();
  };

  const handleCollections = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    if (onCollectionsClick) {
      onCollectionsClick(event);
      return;
    }
    onNavigate?.();
  };

  const toggleCategories = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsCategoriesOpen((open) => !open);
  };

  if (!isVisible && !isOpen) {
    return null;
  }

  return (
    <div
      className={`${styles.panel} ${isActive ? styles.panelOpen : ""}`}
      role="menu"
      aria-label="Каталог"
      aria-hidden={!isActive}
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        className={styles.linksPane}
        onMouseDown={stopMenuEvent}
        onClick={stopMenuEvent}
      >
        <div className={styles.menuBody}>
          <ul className={styles.primaryList}>
            <li>
              <Link
                href="/new-in"
                className={styles.link}
                onClick={handleNavigate}
                prefetch={false}
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
              >
                Новинки
              </Link>
            </li>
            <li>
              <Link
                href="/#collections"
                className={styles.link}
                onClick={handleCollections}
                prefetch={false}
                role="menuitem"
                tabIndex={isActive ? 0 : -1}
              >
                Коллекции
              </Link>
            </li>
          </ul>

          <div className={styles.catalogSection}>
            <button
              type="button"
              className={styles.catalogToggle}
              aria-expanded={isCategoriesOpen}
              onClick={toggleCategories}
              tabIndex={isActive ? 0 : -1}
            >
              Catalog {isCategoriesOpen ? "−" : "+"}
            </button>

            <div
              className={`${styles.categoriesWrap} ${
                isCategoriesOpen ? styles.categoriesWrapOpen : ""
              }`}
              aria-hidden={!isCategoriesOpen}
            >
              <ul className={styles.categoryList} aria-label="Категории">
                <li>
                  <Link
                    href="/catalog"
                    className={`${styles.link} ${styles.categoryLink}`}
                    onClick={handleNavigate}
                    prefetch={false}
                    role="menuitem"
                    tabIndex={isActive && isCategoriesOpen ? 0 : -1}
                  >
                    All
                  </Link>
                </li>
                {categories.length === 0 ? (
                  <li className={styles.emptyHint}>Нет категорий</li>
                ) : (
                  categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={buildCatalogCategoryHref(category.slug)}
                        className={`${styles.link} ${styles.categoryLink}`}
                        onClick={handleNavigate}
                        prefetch={false}
                        role="menuitem"
                        tabIndex={isActive && isCategoriesOpen ? 0 : -1}
                      >
                        {getCatalogCategoryLabel(category)}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogMegaMenu;

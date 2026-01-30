"use client";

import React from "react";
import styles from "./CartItem.module.css";
import Link from "next/link";
import Image from "next/image";
import type { CartItem as CartItemType } from "../../../types/cart";

interface CartItemProps {
  item: CartItemType;
  colorLabel: string;
  sku?: string;
  onRemove: () => void;
  onQuantityDecrease: () => void;
  onQuantityIncrease: () => void;
  formatPrice: (price: number) => string;
}

const CartItem = ({
  item,
  colorLabel,
  sku,
  onRemove,
  onQuantityDecrease,
  onQuantityIncrease,
  formatPrice,
}: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <Link
        href={`/catalog/${item.product.slug || item.productId}`}
        className={styles.cartItemImageLink}
      >
        <Image
          className={styles.cartItemImage}
          src={item.product.images[0] || "/images/catalogs/placeholder.png"}
          alt={item.product.title}
          width={127}
          height={170}
          loading="lazy"
        />
      </Link>
      <div className={styles.cartItemInfoWrapper}>
        <div className={styles.cartItemInfo}>
          <div className={styles.cartItemInfoTop}>
            <h2 className={styles.cartItemCategory}>{item.product.category}</h2>
            <Link
              href={`/catalog/${item.product.slug || item.productId}`}
              className={styles.cartItemTitle}
            >
              {item.product.title}
            </Link>
          </div>
          <div className={styles.cartItemInfoCenter}>
            <div className={styles.cartItemInfoCenterLeft}>
              <p className={styles.cartItemInfoCenterLeftLabel}>Цвет</p>
              <p className={styles.cartItemInfoCenterLeftText}>{colorLabel}</p>
            </div>
            <div className={styles.cartItemInfoCenterRight}>
              <p className={styles.cartItemInfoCenterLeftLabel}>Размер</p>
              <p className={styles.cartItemInfoCenterLeftText}>
                {item.size.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cartItemPrice}>
          <p className={styles.cartItemPriceText}>
            {formatPrice(item.product.priceValue * item.quantity)}
          </p>
          <div className={styles.priceWrapper}>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Удалить товар"
              className={styles.cancelButton}
            >
              <Image
                src="/images/Trash.png"
                alt="cancel"
                width={24}
                height={24}
                loading="lazy"
              />
            </button>
            <div className={styles.quantityControls}>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={onQuantityDecrease}
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className={styles.quantityValue}>{item.quantity}</span>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={onQuantityIncrease}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <div className={styles.mobileHeader}>
          <Link
            href={`/catalog/${item.product.slug || item.productId}`}
            className={styles.mobileLink}
          >
            <Image
              className={styles.mobileImage}
              src={item.product.images[0] || "/images/catalogs/placeholder.png"}
              alt={item.product.title}
              width={127}
              height={170}
              loading="lazy"
            />
          </Link>
          <div className={styles.mobileContent}>
            <div className={styles.mobileContentTop}>
              <p className={styles.mobileCategory}>{item.product.category}</p>
              <h1 className={styles.mobileTitle}>{item.product.title}</h1>
            </div>
            <div className={styles.mobileInfoWrapper}>
              <div className={styles.mobileInfo}>
                <p className={styles.mobileInfoLabel}>Цвет</p>
                <p className={styles.mobileInfoText}>{colorLabel}</p>
              </div>
              <div className={styles.mobileInfo}>
                <p className={styles.mobileInfoLabel}>Размер</p>
                <p className={styles.mobileInfoText}>
                  {item.size.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mobilePriceWrapper}>
          <p className={styles.mobilePriceText}>
            {formatPrice(item.product.priceValue * item.quantity)}
          </p>
          <div className={styles.priceWrapper}>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Удалить товар"
              className={styles.cancelButton}
            >
              <Image
                src="/images/Trash.png"
                alt="cancel"
                width={24}
                height={24}
                loading="lazy"
              />
            </button>
            <div className={styles.quantityControls}>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={onQuantityDecrease}
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span className={styles.quantityValue}>{item.quantity}</span>
              <button
                type="button"
                className={styles.quantityButton}
                onClick={onQuantityIncrease}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

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
            <Link href={`/catalog/${item.productId}`}>
                <Image
                    className={styles.cartItemImage}
                    src={
                        item.product.images[0] ||
                        "/images/catalogs/placeholder.png"
                    }
                    alt={item.product.title}
                    width={127}
                    height={170}
                />
            </Link>
            <div className={styles.cartItemInfoWrapper}>
                <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemInfoTop}>
                        <h2 className={styles.cartItemCategory}>
                            {item.product.category}
                        </h2>
                        <Link
                            href={`/catalog/${item.productId}`}
                            className={styles.cartItemTitle}
                        >
                            {item.product.title}
                        </Link>
                    </div>
                    <div className={styles.cartItemInfoCenter}>
                        <div className={styles.cartItemInfoCenterLeft}>
                            <p className={styles.cartItemInfoCenterLeftLabel}>
                                Цвет
                            </p>
                            <p className={styles.cartItemInfoCenterLeftText}>
                                {colorLabel}
                            </p>
                        </div>
                        <div className={styles.cartItemInfoCenterRight}>
                            <p className={styles.cartItemInfoCenterLeftLabel}>
                                Размер
                            </p>
                            <p className={styles.cartItemInfoCenterLeftText}>
                                {item.size.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.cartItemPrice}>
                    <div className={styles.priceWrapper}>
                        <p className={styles.cartItemPriceText}>
                            {formatPrice(
                                item.product.priceValue * item.quantity
                            )}
                        </p>
                        <button
                            type="button"
                            onClick={onRemove}
                            aria-label="Удалить товар"
                            className={styles.cancelButton}
                        >
                            <Image
                                src="/images/cancel.png"
                                alt="cancel"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                    <div className={styles.quantityControls}>
                        <button
                            type="button"
                            className={styles.quantityButton}
                            onClick={onQuantityDecrease}
                            aria-label="Уменьшить количество"
                        >
                            −
                        </button>
                        <span className={styles.quantityValue}>
                            {item.quantity}
                        </span>
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
            <button
                type="button"
                onClick={onRemove}
                aria-label="Удалить товар"
                className={styles.cancelButtonMobile}
            >
                <Image
                    src="/images/cancel.png"
                    alt="cancel"
                    width={11}
                    height={11}
                />
            </button>
        </div>
    );
};

export default CartItem;

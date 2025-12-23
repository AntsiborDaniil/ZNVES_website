"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./MobileCartItem.module.css";

export interface MobileCartItemProps {
    productId: number;
    productTitle: string;
    productImage: string;
    colorLabel: string;
    size: string;
    sku?: string;
    price: number;
    quantity: number;
    onRemove: () => void;
    onQuantityDecrease: () => void;
    onQuantityIncrease: () => void;
    formatPrice: (price: number) => string;
}

const MobileCartItem = ({
    productId,
    productTitle,
    productImage,
    colorLabel,
    size,
    sku,
    price,
    quantity,
    onRemove,
    onQuantityDecrease,
    onQuantityIncrease,
    formatPrice,
}: MobileCartItemProps) => {
    return (
        <div className={styles.cartItem}>
            <button
                type="button"
                className={styles.cancelButton}
                onClick={onRemove}
                aria-label="Удалить товар"
            >
                <Image
                    src="/images/cancel.png"
                    alt="Удалить товар"
                    width={24}
                    height={24}
                />
            </button>

            <Link
                href={`/catalog/${productId}`}
                className={styles.itemImageLink}
            >
                <div className={styles.itemImageWrapper}>
                    <Image
                        src={productImage || "/images/catalogs/placeholder.png"}
                        alt={productTitle}
                        fill
                        className={styles.itemImage}
                        sizes="(max-width: 480px) 100vw, 200px"
                    />
                </div>
            </Link>

            <div className={styles.itemInfo}>
                <Link
                    href={`/catalog/${productId}`}
                    className={styles.itemTitle}
                >
                    {productTitle}
                </Link>
                <div className={styles.itemDetails}>
                    <div className={styles.detailsContainer}>
                        <div className={styles.spanContainer}>
                            <span className={styles.itemLabel}>Цвет</span>
                            <span className={styles.itemDetail}>
                                {colorLabel}
                            </span>
                        </div>
                        <div className={styles.spanContainer}>
                            <span className={styles.itemLabel}>Размер</span>
                            <span className={styles.itemDetail}>
                                {size.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    {sku && (
                        <span className={styles.itemLabel}>Артикул: {sku}</span>
                    )}
                </div>
            </div>

            <div className={styles.itemPriceSection}>
                <span className={styles.itemPriceValue}>
                    {formatPrice(price)}
                </span>
                <div className={styles.quantityControls}>
                    <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={onQuantityDecrease}
                        aria-label="Уменьшить количество"
                    >
                        −
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
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
    );
};

export default MobileCartItem;

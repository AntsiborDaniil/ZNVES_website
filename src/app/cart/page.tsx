"use client";

import { useCart } from "../../contexts/CartContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "../../data/products";
import styles from "./page.module.css";

const CartPage = () => {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
        useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (items.length === 0) {
        return (
            <div className={styles.cartPage}>
                <Header variant="green" />
                <main className={styles.main}>
                    <div className={styles.emptyCart}>
                        <h1 className={styles.emptyTitle}>Корзина пуста</h1>
                        <p className={styles.emptyText}>
                            Добавьте товары в корзину, чтобы продолжить покупки
                        </p>
                        <Link href="/catalog" className={styles.shopButton}>
                            Перейти в каталог
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <Header variant="green" />
            <main className={styles.main}>
                <div className={styles.wrapper}>
                    <Link href="/catalog" className={styles.backLink}>
                        Вернуться в каталог
                    </Link>
                    <h1 className={styles.title}>Корзина</h1>
                    <div className={styles.content}>
                        <div className={styles.itemsList}>
                            {items.map((item, index) => {
                                const fullProduct = getProductById(
                                    item.productId
                                );
                                const colorLabel =
                                    fullProduct?.availableColors.find(
                                        (c) => c.value === item.color
                                    )?.label || item.color;

                                return (
                                    <div
                                        key={`${item.productId}-${item.size}-${item.color}-${index}`}
                                        className={styles.cartItem}
                                    >
                                        <Link
                                            href={`/catalog/${item.productId}`}
                                            className={styles.itemImageLink}
                                        >
                                            <div
                                                className={
                                                    styles.itemImageWrapper
                                                }
                                            >
                                                <Image
                                                    src={
                                                        item.product
                                                            .images[0] ||
                                                        "/images/catalogs/placeholder.png"
                                                    }
                                                    alt={item.product.title}
                                                    fill
                                                    className={styles.itemImage}
                                                    sizes="(max-width: 768px) 150px, 200px"
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.itemInfo}>
                                            <Link
                                                href={`/catalog/${item.productId}`}
                                                className={styles.itemTitle}
                                            >
                                                {item.product.title}
                                            </Link>
                                            <div className={styles.itemDetails}>
                                                <span
                                                    className={
                                                        styles.itemDetail
                                                    }
                                                >
                                                    Артикул:{" "}
                                                    {fullProduct?.sku ||
                                                        item.productId}
                                                </span>
                                                <span
                                                    className={
                                                        styles.itemDetail
                                                    }
                                                >
                                                    ЦВЕТ:{" "}
                                                    {colorLabel.toUpperCase()}
                                                </span>
                                                <span
                                                    className={
                                                        styles.itemDetail
                                                    }
                                                >
                                                    РАЗМЕР:{" "}
                                                    {item.size.toUpperCase()}
                                                </span>
                                                <span
                                                    className={
                                                        styles.itemDetail
                                                    }
                                                >
                                                    Количество: {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.itemPriceSection}
                                        >
                                            <div
                                                className={
                                                    styles.priceAndCancel
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.itemPriceValue
                                                    }
                                                >
                                                    {formatPrice(
                                                        item.product
                                                            .priceValue *
                                                            item.quantity
                                                    )}
                                                </span>
                                                <button
                                                    type="button"
                                                    className={
                                                        styles.cancelButton
                                                    }
                                                    onClick={() =>
                                                        removeItem(
                                                            item.productId,
                                                            item.size,
                                                            item.color
                                                        )
                                                    }
                                                    aria-label="Удалить товар"
                                                >
                                                    <Image src="/images/cancel.png" alt="Удалить товар" width={24} height={24} />
                                                </button>
                                            </div>
                                            <div
                                                className={
                                                    styles.quantityControls
                                                }
                                            >
                                                <button
                                                    type="button"
                                                    className={
                                                        styles.quantityButton
                                                    }
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId,
                                                            item.size,
                                                            item.color,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    aria-label="Уменьшить количество"
                                                >
                                                    −
                                                </button>
                                                <span
                                                    className={
                                                        styles.quantityValue
                                                    }
                                                >
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    className={
                                                        styles.quantityButton
                                                    }
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId,
                                                            item.size,
                                                            item.color,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    aria-label="Увеличить количество"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.summary}>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>
                                    Итого
                                </span>
                                <span className={styles.summaryTotal}>
                                    {formatPrice(getTotalPrice())}
                                </span>
                            </div>
                            <div className={styles.promoSection}>
                                <input
                                    id="promo-code"
                                    type="text"
                                    className={styles.promoInput}
                                    placeholder="Промокод"
                                />
                            </div>
                            <button
                                type="button"
                                className={styles.checkoutButton}
                            >
                                Перейти к оформлению
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;

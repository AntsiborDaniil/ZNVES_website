"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../contexts/CartContext";
import styles from "./CartIcon.module.css";

const CartIcon = () => {
    const { getTotalItems } = useCart();
    const totalItems = getTotalItems();

    return (
        <Link href="/cart" className={styles.cartIcon} aria-label="Корзина">
            <div className={styles.cartIconWrapper}>
                <Image
                    src="/images/cart.png"
                    alt="Корзина"
                    width={30}
                    height={30}
                    className={styles.cartImage}
                />
                {totalItems > 0 && (
                    <span className={styles.cartBadge}>{totalItems}</span>
                )}
            </div>
        </Link>
    );
};

export default CartIcon;

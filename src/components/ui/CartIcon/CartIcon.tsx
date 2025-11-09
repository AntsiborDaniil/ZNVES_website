"use client";

import Image from "next/image";
import styles from "./CartIcon.module.css";

const CartIcon = () => {
    return (
        <button className={styles.cartIcon} aria-label="Корзина" type="button">
            <Image
                src="/images/cart.png"
                alt="Корзина"
                width={38}
                height={38}
                className={styles.cartImage}
            />
        </button>
    );
};

export default CartIcon;

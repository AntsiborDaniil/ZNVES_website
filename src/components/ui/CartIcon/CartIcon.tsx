"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../contexts/CartContext";
import styles from "./CartIcon.module.css";

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link
      href="/cart"
      className={styles.cartIcon}
      aria-label="Корзина"
      prefetch={false}
    >
      <div className={styles.cartIconWrapper}>
        <Image
        src="/images/icons/cart.svg"
        alt="Корзина"
        width={24}
        height={24}
          className={styles.cartImage}
          loading="lazy"
          unoptimized
        />
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;

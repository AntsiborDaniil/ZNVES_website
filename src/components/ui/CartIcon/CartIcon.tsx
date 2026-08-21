"use client";

import Image from "next/image";
import { useCart } from "../../../contexts/CartContext";
import styles from "./CartIcon.module.css";

const CartIcon = () => {
  const { getTotalItems, openCart } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      type="button"
      className={styles.cartIcon}
      aria-label="Корзина"
      onClick={openCart}
    >
      <div className={styles.cartIconWrapper}>
        <Image
          src="/images/icons/cart.svg"
          alt=""
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
    </button>
  );
};

export default CartIcon;

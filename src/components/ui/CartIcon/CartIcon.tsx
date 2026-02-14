"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../../../contexts/CartContext";
import styles from "./CartIcon.module.css";

const CartIcon = () => {
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const shouldPrefetch = pathname !== "/checkout" && pathname !== "/cart";

  return (
    <Link
      href="/cart"
      className={styles.cartIcon}
      aria-label="Корзина"
      prefetch={shouldPrefetch}
    >
      <div className={styles.cartIconWrapper}>
        <Image
          src="/images/cart.png"
          alt="Корзина"
          width={12}
          height={11.5}
          className={styles.cartImage}
          loading="lazy"
        />
        {totalItems > 0 && (
          <span className={styles.cartBadge}>{totalItems}</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;

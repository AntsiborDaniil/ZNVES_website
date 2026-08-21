"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./AccountPopover.module.css";

type AccountPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AccountPopover = ({ isOpen, onClose }: AccountPopoverProps) => {
  const { user, requestLogout } = useAuth();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const displayName =
    user?.first_name?.trim() ||
    user?.username?.trim() ||
    user?.email?.split("@")[0] ||
    "Профиль";

  const handleLogoutClick = () => {
    onClose();
    requestLogout();
  };

  return (
    <div
      ref={rootRef}
      className={styles.popover}
      role="menu"
      aria-label="Меню аккаунта"
    >
      <div className={styles.headerRow}>
        <div className={styles.userBlock}>
          <p className={styles.userName}>{displayName}</p>
          <Link
            href="/account?tab=profile"
            className={styles.editLink}
            onClick={onClose}
            prefetch={false}
            role="menuitem"
          >
            Редактировать профиль
          </Link>
        </div>
        <button
          type="button"
          className={styles.logoutBtn}
          onClick={handleLogoutClick}
          aria-label="Выйти"
        >
          <Image
            src="/images/account/logout.svg"
            alt=""
            width={18}
            height={18}
            unoptimized
          />
        </button>
      </div>

      <div className={styles.divider} aria-hidden />

      <div className={styles.links}>
        <Link
          href="/account?tab=profile"
          className={styles.link}
          onClick={onClose}
          prefetch={false}
          role="menuitem"
        >
          Личный кабинет
        </Link>
        <Link
          href="/account?tab=orders"
          className={styles.link}
          onClick={onClose}
          prefetch={false}
          role="menuitem"
        >
          Мои заказы
        </Link>
      </div>
    </div>
  );
};

export default AccountPopover;

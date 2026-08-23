"use client";

import Image from "next/image";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./AccountIcon.module.css";

type AccountIconProps = {
  isMenuOpen?: boolean;
  onAuthenticatedClick?: () => void;
};

const AccountIcon = ({
  isMenuOpen = false,
  onAuthenticatedClick,
}: AccountIconProps) => {
  const { isAuthenticated, openAuth } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      onAuthenticatedClick?.();
      return;
    }
    openAuth("login");
  };

  return (
    <button
      className={styles.accountIcon}
      aria-label="Личный кабинет"
      aria-expanded={isAuthenticated ? isMenuOpen : undefined}
      aria-haspopup={isAuthenticated ? "menu" : undefined}
      type="button"
      onClick={handleClick}
    >
      <Image
        src="/images/icons/user.svg"
        alt="Личный кабинет"
        width={16}
        height={20}
        className={styles.accountImage}
        loading="lazy"
        unoptimized
      />
    </button>
  );
};

export default AccountIcon;

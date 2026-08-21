"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./AccountIcon.module.css";

const AccountIcon = () => {
  const router = useRouter();
  const { isAuthenticated, openAuth } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/account");
      return;
    }
    openAuth("login");
  };

  return (
    <button
      className={styles.accountIcon}
      aria-label="Личный кабинет"
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

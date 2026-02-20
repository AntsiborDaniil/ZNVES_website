"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./AccountIcon.module.css";

const AccountIcon = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    router.push("/account");
  };

  return (
    <button
      className={styles.accountIcon}
      aria-label="Личный кабинет"
      type="button"
      onClick={handleClick}
    >
      <Image
        src="/images/account.png"
        alt="Личный кабинет"
        width={12}
        height={12}
        className={styles.accountImage}
        loading="lazy"
      />
    </button>
  );
};

export default AccountIcon;

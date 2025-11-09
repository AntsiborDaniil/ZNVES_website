"use client";

import Image from "next/image";
import styles from "./AccountIcon.module.css";

const AccountIcon = () => {
    return (
        <button
            className={styles.accountIcon}
            aria-label="Личный кабинет"
            type="button"
        >
            <Image
                src="/images/account.png"
                alt="Личный кабинет"
                width={38}
                height={38}
                className={styles.accountImage}
            />
        </button>
    );
};

export default AccountIcon;

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./AccountIcon.module.css";

const AccountIcon = () => {
    const router = useRouter();

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
                width={30}
                height={30}
                className={styles.accountImage}
            />
        </button>
    );
};

export default AccountIcon;

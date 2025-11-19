"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AuthHeader.module.css";

type AuthHeaderProps = {
    title: string;
    theme?: "default" | "transparent";
};

const PREVIOUS_PATH_KEY = "znves:previousPath";

const AuthHeader = ({ title, theme = "default" }: AuthHeaderProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const [previousRoute, setPreviousRoute] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);

        if (typeof window === "undefined") {
            return;
        }

        const storedPreviousPath = sessionStorage.getItem(PREVIOUS_PATH_KEY);

        if (storedPreviousPath && storedPreviousPath !== pathname) {
            setPreviousRoute(storedPreviousPath);
        }
    }, [pathname]);

    const handleBack = () => {
        if (!isMounted) {
            router.push("/");
            return;
        }

        if (previousRoute) {
            router.push(previousRoute);
            return;
        }

        // В Next.js всегда можно использовать router.back()
        router.back();
    };

    const handleClose = () => {
        router.push("/");
    };

    return (
        <header
            className={`${styles.authHeader} ${
                theme === "transparent" ? styles.transparent : ""
            }`}
        >
            <button
                className={styles.backButton}
                onClick={handleBack}
                aria-label="Назад"
                type="button"
            >
                <img
                    src="/images/login/arrow-back.png"
                    alt="Назад"
                    width={57}
                    height={57}
                />
            </button>
            <h1 className={styles.title}>{title}</h1>
            <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Закрыть"
                type="button"
            >
                <img
                    src="/images/login/cancel-btn.png"
                    alt="Закрыть"
                    width={57}
                    height={57}
                />
            </button>
        </header>
    );
};

export default AuthHeader;

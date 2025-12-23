"use client";

import { useRouter } from "next/navigation";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import ApplicationForm from "../../components/ui/ApplicationForm/ApplicationForm";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const RegisterPage = () => {
    const router = useRouter();

    return (
        <div className={styles.authPage}>
            <AuthHeader title="Личный кабинет" theme="transparent" />
            <div className={styles.authContainer}>
                <ApplicationForm
                    onNavigateToLogin={() => router.push("/login")}
                    onSuccess={() => router.push("/account")}
                />
            </div>
        </div>
    );
};

export default RegisterPage;

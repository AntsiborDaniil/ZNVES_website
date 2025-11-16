"use client";

import { useEffect } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
    message: string;
    onClose: () => void;
    duration?: number;
};

const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={styles.toast}>
            <span className={styles.toastMessage}>{message}</span>
        </div>
    );
};

export default Toast;

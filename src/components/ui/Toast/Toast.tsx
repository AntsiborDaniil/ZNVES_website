"use client";

import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
    message: string;
    onClose: () => void;
    duration?: number;
};

const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        let closeTimer: NodeJS.Timeout | null = null;
        
        const timer = setTimeout(() => {
            setIsClosing(true);
            // Ждем завершения анимации исчезновения перед вызовом onClose
            closeTimer = setTimeout(() => {
                onClose();
            }, 300); // Длительность анимации slideOut
        }, duration);

        return () => {
            clearTimeout(timer);
            if (closeTimer) {
                clearTimeout(closeTimer);
            }
        };
    }, [duration, onClose]);

    return (
        <div className={`${styles.toast} ${isClosing ? styles.toastClosing : ""}`}>
            <span className={styles.toastMessage}>{message}</span>
        </div>
    );
};

export default Toast;

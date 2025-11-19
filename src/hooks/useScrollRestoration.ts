import { useEffect, useRef } from "react";

export const useScrollRestoration = (restoreOnUnmount: boolean = true) => {
    const previousRestorationRef = useRef<"auto" | "manual" | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        // Сохраняем текущее состояние scroll restoration
        previousRestorationRef.current = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";

        // Прокручиваем к началу страницы
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        return () => {
            // Восстанавливаем scroll restoration при размонтировании
            if (restoreOnUnmount && previousRestorationRef.current) {
                window.history.scrollRestoration =
                    previousRestorationRef.current;
            }
        };
    }, [restoreOnUnmount]);
};

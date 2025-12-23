import { useEffect } from "react";

export const useKeyboardEvent = (
    key: string,
    handler: (event: KeyboardEvent) => void,
    enabled: boolean = true
) => {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === key) {
                handler(event);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [key, handler, enabled]);
};

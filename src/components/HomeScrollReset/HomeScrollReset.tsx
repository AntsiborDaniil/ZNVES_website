"use client";

import { useEffect, useRef } from "react";

/** Сброс скролла на главной при монтировании. */
const HomeScrollReset = () => {
  const previousRestorationRef = useRef<"auto" | "manual" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    previousRestorationRef.current = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      if (previousRestorationRef.current) {
        window.history.scrollRestoration = previousRestorationRef.current;
      }
    };
  }, []);

  return null;
};

export default HomeScrollReset;

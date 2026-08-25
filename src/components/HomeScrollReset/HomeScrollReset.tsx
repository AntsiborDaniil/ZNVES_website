"use client";

import { useEffect, useRef } from "react";

/** Сброс скролла на главной; hash #collections — плавный переход к блоку. */
const HomeScrollReset = () => {
  const previousRestorationRef = useRef<"auto" | "manual" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    previousRestorationRef.current = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "collections") {
      const scrollToCollections = () => {
        const el = document.getElementById("collections");
        if (!el) return false;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      };

      let tries = 0;
      const timer = window.setInterval(() => {
        tries += 1;
        if (scrollToCollections() || tries > 40) {
          window.clearInterval(timer);
        }
      }, 50);

      return () => {
        window.clearInterval(timer);
        if (previousRestorationRef.current) {
          window.history.scrollRestoration = previousRestorationRef.current;
        }
      };
    }

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

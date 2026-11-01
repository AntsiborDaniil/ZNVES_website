"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LAST_PATH_KEY = "znves:lastPath";
const PREVIOUS_PATH_KEY = "znves:previousPath";

/** Hero освобождает сеть, когда уходим с главной на каталог / другие страницы */
export const HERO_RELEASE_EVENT = "znves:hero-release";

const NavigationTracker = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !pathname) {
      return;
    }

    const lastPath = sessionStorage.getItem(LAST_PATH_KEY);

    if (lastPath && lastPath !== pathname) {
      sessionStorage.setItem(PREVIOUS_PATH_KEY, lastPath);
      if (lastPath === "/" || pathname.startsWith("/catalog") || pathname.startsWith("/new-in")) {
        window.dispatchEvent(new Event(HERO_RELEASE_EVENT));
      }
    }

    sessionStorage.setItem(LAST_PATH_KEY, pathname);
  }, [pathname, isMounted]);

  return null;
};

export default NavigationTracker;

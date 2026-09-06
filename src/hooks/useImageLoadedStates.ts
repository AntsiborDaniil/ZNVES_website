"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/**
 * Tracks which images inside a container have finished loading.
 * Next/Image often skips onLoad for cached/decoded images; we also poll the DOM
 * and attach native load listeners so CSS blur is not stuck forever.
 */
export const useImageLoadedStates = (
  imageList: string[],
  containerRef: RefObject<HTMLElement | null>
) => {
  const [loadedStates, setLoadedStates] = useState<boolean[]>(() =>
    new Array(imageList.length).fill(false)
  );

  const markImageLoaded = useCallback((index: number) => {
    setLoadedStates((prev) => {
      if (index < 0 || index >= prev.length || prev[index]) {
        return prev;
      }
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  useEffect(() => {
    setLoadedStates(new Array(imageList.length).fill(false));

    const listeners: Array<{ img: HTMLImageElement; onLoad: () => void }> = [];

    const syncFromDom = (): boolean => {
      const container = containerRef.current;
      if (!container || imageList.length === 0) return true;

      const imgs = container.querySelectorAll("img");
      if (imgs.length === 0) return false;

      let allReady = true;
      imgs.forEach((img, index) => {
        if (index >= imageList.length) return;

        if (img.complete && img.naturalWidth > 0) {
          markImageLoaded(index);
          return;
        }

        allReady = false;
        const alreadyBound = listeners.some((entry) => entry.img === img);
        if (alreadyBound) return;

        const onLoad = () => markImageLoaded(index);
        img.addEventListener("load", onLoad);
        listeners.push({ img, onLoad });
      });

      return allReady && imgs.length >= imageList.length;
    };

    if (syncFromDom()) {
      return () => {
        listeners.forEach(({ img, onLoad }) =>
          img.removeEventListener("load", onLoad)
        );
      };
    }

    const intervalId = window.setInterval(() => {
      if (syncFromDom()) {
        window.clearInterval(intervalId);
      }
    }, 150);

    // Safety stop — don't poll forever if images never resolve
    const maxWaitId = window.setTimeout(() => {
      window.clearInterval(intervalId);
    }, 15_000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(maxWaitId);
      listeners.forEach(({ img, onLoad }) =>
        img.removeEventListener("load", onLoad)
      );
    };
  }, [imageList, containerRef, markImageLoaded]);

  return { loadedStates, markImageLoaded };
};

export const isSvgImageSrc = (src: string): boolean =>
  src.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;

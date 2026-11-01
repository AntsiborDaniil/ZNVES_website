"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./HeroSection.module.css";

const HERO_DESKTOP_VIDEO = "/videos/home/hero-desktop-v3.mp4";
const HERO_MOBILE_VIDEO = "/videos/home/hero-mobile-v2.mp4";

/** Узкий экран ИЛИ тач-телефон (в т.ч. landscape >768px) — только mobile-ролик. */
const NARROW_MQ = "(max-width: 768px)";
const TOUCH_PHONE_MQ = "(pointer: coarse) and (max-width: 1024px)";

const shouldUseMobileHeroVideo = (): boolean => {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia(NARROW_MQ).matches ||
    window.matchMedia(TOUCH_PHONE_MQ).matches
  );
};

/* Инлайн, чтобы заполнение не зависело от загрузки CSS-модуля */
const heroStyle: CSSProperties = {
  position: "relative",
  display: "block",
  overflow: "hidden",
  width: "100%",
  background: "var(--color-black)",
};

const videoStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center center",
};

const forcePlay = (video: HTMLVideoElement) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
};

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // null до выбора на клиенте — в DOM не попадает desktop URL на мобилке
  const [src, setSrc] = useState<string | null>(null);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);

  // На мобилке при скролле адресная строка прячется и меняет высоту
  // окна — в этот момент не пересчитываем, чтобы hero не прыгал.
  useLayoutEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let lastWidth = window.innerWidth;

    const measure = () => setScreenHeight(window.innerHeight);

    const onResize = () => {
      const widthChanged = window.innerWidth !== lastWidth;
      lastWidth = window.innerWidth;
      if (isTouch && !widthChanged && window.scrollY > 0) return;
      measure();
    };
    const onOrientation = () => window.setTimeout(measure, 300);

    measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, []);

  useLayoutEffect(() => {
    const narrowMq = window.matchMedia(NARROW_MQ);
    const touchPhoneMq = window.matchMedia(TOUCH_PHONE_MQ);

    const sync = () => {
      // В DOM только один URL: на телефоне desktop-ролик даже не упоминается
      setSrc(
        shouldUseMobileHeroVideo() ? HERO_MOBILE_VIDEO : HERO_DESKTOP_VIDEO
      );
    };

    sync();
    narrowMq.addEventListener("change", sync);
    touchPhoneMq.addEventListener("change", sync);
    return () => {
      narrowMq.removeEventListener("change", sync);
      touchPhoneMq.removeEventListener("change", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    forcePlay(video);

    const onReady = () => forcePlay(video);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, [src]);

  return (
    <section
      className={styles.hero}
      style={
        screenHeight ? { ...heroStyle, height: `${screenHeight}px` } : heroStyle
      }
    >
      {src ? (
        <video
          key={src}
          ref={videoRef}
          className={styles.heroVideo}
          style={videoStyle}
          src={src}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-hidden
          tabIndex={-1}
        />
      ) : null}
    </section>
  );
};

export default HeroSection;

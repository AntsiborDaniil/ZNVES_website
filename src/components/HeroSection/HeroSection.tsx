"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./HeroSection.module.css";

const HERO_DESKTOP_VIDEO = "/videos/home/hero-desktop-v3.mp4";
const HERO_MOBILE_VIDEO = "/videos/home/hero-mobile-v3.mp4";
const HERO_MOBILE_POSTER = "/images/home/hero-mobile-poster.jpg";

/** Узкий экран ИЛИ тач-телефон (в т.ч. landscape >768px) — mobile-ролик. */
const NARROW_MQ = "(max-width: 768px)";
const TOUCH_PHONE_MQ = "(pointer: coarse) and (max-width: 1024px)";

/** На мобилке даём сети сначала отдать HTML/JS/картинки, потом качаем ролик. */
const MOBILE_VIDEO_DELAY_MS = 1500;

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

const posterStyle: CSSProperties = {
  ...videoStyle,
  zIndex: 0,
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
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // null до выбора на клиенте — desktop URL не попадает в DOM на мобилке
  const [src, setSrc] = useState<string | null>(null);
  const [useMobile, setUseMobile] = useState(false);
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

    const clearDelay = () => {
      if (delayTimerRef.current != null) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
    };

    const sync = () => {
      clearDelay();
      const mobile = shouldUseMobileHeroVideo();
      setUseMobile(mobile);

      if (mobile) {
        // Сразу постер; ролик — после короткой паузы (и на узком desktop тоже)
        setSrc(null);
        delayTimerRef.current = setTimeout(() => {
          setSrc(HERO_MOBILE_VIDEO);
          delayTimerRef.current = null;
        }, MOBILE_VIDEO_DELAY_MS);
        return;
      }

      // Широкий desktop — сразу desktop-ролик
      setSrc(HERO_DESKTOP_VIDEO);
    };

    sync();
    narrowMq.addEventListener("change", sync);
    touchPhoneMq.addEventListener("change", sync);
    return () => {
      clearDelay();
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
      {useMobile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HERO_MOBILE_POSTER}
          alt=""
          aria-hidden
          style={posterStyle}
          decoding="async"
          fetchPriority="high"
        />
      ) : null}
      {src ? (
        <video
          key={src}
          ref={videoRef}
          className={styles.heroVideo}
          style={{ ...videoStyle, zIndex: 1 }}
          src={src}
          poster={useMobile ? HERO_MOBILE_POSTER : undefined}
          muted
          autoPlay
          loop
          playsInline
          preload={useMobile ? "metadata" : "auto"}
          disablePictureInPicture
          aria-hidden
          tabIndex={-1}
        />
      ) : null}
    </section>
  );
};

export default HeroSection;

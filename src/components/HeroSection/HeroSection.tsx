"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { HERO_RELEASE_EVENT } from "../NavigationTracker/NavigationTracker";
import styles from "./HeroSection.module.css";

const HERO_DESKTOP_VIDEO = "/videos/home/hero-desktop-v4.mp4";
const HERO_MOBILE_VIDEO = "/videos/home/hero-mobile-v3.mp4";
const HERO_MOBILE_POSTER = "/images/home/hero-mobile-poster.jpg";

/** Узкий экран ИЛИ тач-телефон (в т.ч. landscape >768px) — mobile-ролик. */
const NARROW_MQ = "(max-width: 768px)";
const TOUCH_PHONE_MQ = "(pointer: coarse) and (max-width: 1024px)";

/** После window.load — запас, затем idle, чтобы каталог/карточки успели занять сеть. */
const MOBILE_VIDEO_AFTER_LOAD_MS = 2000;

type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
};

const shouldUseMobileHeroVideo = (): boolean => {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia(NARROW_MQ).matches ||
    window.matchMedia(TOUCH_PHONE_MQ).matches
  );
};

/** 2g / Save-Data — оставляем только постер, видео не качаем. */
const isConstrainedMobileNetwork = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike })
    .connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  const type = conn.effectiveType;
  return type === "slow-2g" || type === "2g";
};

const releaseVideo = (video: HTMLVideoElement | null) => {
  if (!video) return;
  try {
    video.pause();
  } catch {
    /* ignore */
  }
  video.removeAttribute("src");
  video.load();
};

const forcePlay = (video: HTMLVideoElement) => {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("loop", "");
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
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

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cancelScheduleRef = useRef<(() => void) | null>(null);
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

    const clearSchedule = () => {
      cancelScheduleRef.current?.();
      cancelScheduleRef.current = null;
    };

    const scheduleMobileVideoStart = () => {
      if (isConstrainedMobileNetwork()) {
        setSrc(null);
        return;
      }

      let idleId: number | null = null;
      let delayId: ReturnType<typeof setTimeout> | null = null;
      let cancelled = false;

      const startVideo = () => {
        if (cancelled) return;
        setSrc(HERO_MOBILE_VIDEO);
      };

      const afterLoad = () => {
        if (cancelled) return;
        delayId = setTimeout(() => {
          if (cancelled) return;
          if (typeof window.requestIdleCallback === "function") {
            idleId = window.requestIdleCallback(() => startVideo(), {
              timeout: 3000,
            });
          } else {
            startVideo();
          }
        }, MOBILE_VIDEO_AFTER_LOAD_MS);
      };

      if (document.readyState === "complete") {
        afterLoad();
      } else {
        window.addEventListener("load", afterLoad, { once: true });
      }

      cancelScheduleRef.current = () => {
        cancelled = true;
        window.removeEventListener("load", afterLoad);
        if (delayId != null) clearTimeout(delayId);
        if (idleId != null && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        }
      };
    };

    const sync = () => {
      clearSchedule();
      const mobile = shouldUseMobileHeroVideo();
      setUseMobile(mobile);

      if (mobile) {
        // Не сбрасываем уже играющий mobile-ролик при ложном re-sync
        setSrc((prev) => (prev === HERO_MOBILE_VIDEO ? prev : null));
        if (videoRef.current?.getAttribute("src")?.includes("hero-mobile")) {
          forcePlay(videoRef.current);
          return;
        }
        scheduleMobileVideoStart();
        return;
      }

      setSrc(HERO_DESKTOP_VIDEO);
    };

    sync();
    narrowMq.addEventListener("change", sync);
    touchPhoneMq.addEventListener("change", sync);

    // Только уход с главной — освобождаем сеть для каталога.
    // pagehide/visibility НЕ трогаем: на iOS они срабатывают при скролле/сворачивании.
    const onHeroRelease = () => {
      clearSchedule();
      releaseVideo(videoRef.current);
      setSrc(null);
    };
    window.addEventListener(HERO_RELEASE_EVENT, onHeroRelease);

    return () => {
      clearSchedule();
      releaseVideo(videoRef.current);
      narrowMq.removeEventListener("change", sync);
      touchPhoneMq.removeEventListener("change", sync);
      window.removeEventListener(HERO_RELEASE_EVENT, onHeroRelease);
    };
  }, []);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    forcePlay(video);

    const onReady = () => forcePlay(video);
    const onEnded = () => forcePlay(video);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("ended", onEnded);
    // Если браузер поставил на pause сам — возвращаем play (кроме реального ухода)
    const onPause = () => {
      if (document.visibilityState !== "visible") return;
      // После releaseVideo src пустой — не реанимируем
      if (!video.getAttribute("src") && !video.currentSrc) return;
      forcePlay(video);
    };
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("pause", onPause);
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

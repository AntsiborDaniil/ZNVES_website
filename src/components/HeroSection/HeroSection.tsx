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

/** Короткий запас после load — сеть для LCP, но автоплей не «остывает». */
const MOBILE_VIDEO_AFTER_LOAD_MS = 600;

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

/** Mute + playsInline ДО play — иначе iOS показывает кнопку запуска. */
const armAutoplay = (video: HTMLVideoElement) => {
  video.muted = true;
  video.defaultMuted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  video.setAttribute("muted", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("loop", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("disablepictureinpicture", "");
  video.removeAttribute("controls");
  if ("disableRemotePlayback" in video) {
    try {
      (video as HTMLVideoElement & { disableRemotePlayback: boolean }).disableRemotePlayback =
        true;
    } catch {
      /* ignore */
    }
  }
};

const forcePlay = (video: HTMLVideoElement) => {
  armAutoplay(video);
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {
      // Повтор после жеста/готовности кадра
      window.setTimeout(() => {
        armAutoplay(video);
        void video.play().catch(() => {});
      }, 250);
    });
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
  const releasedRef = useRef(false);
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
    releasedRef.current = false;

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
        if (cancelled || releasedRef.current) return;
        setSrc(HERO_MOBILE_VIDEO);
      };

      const afterLoad = () => {
        if (cancelled) return;
        delayId = setTimeout(() => {
          if (cancelled) return;
          if (typeof window.requestIdleCallback === "function") {
            idleId = window.requestIdleCallback(() => startVideo(), {
              timeout: 1500,
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

    const onHeroRelease = () => {
      releasedRef.current = true;
      clearSchedule();
      releaseVideo(videoRef.current);
      setSrc(null);
    };
    window.addEventListener(HERO_RELEASE_EVENT, onHeroRelease);

    // Любой первый жест — добиваем autoplay, если iOS блокировал
    const unlock = () => {
      const video = videoRef.current;
      if (video && !releasedRef.current && video.paused && video.currentSrc) {
        forcePlay(video);
      }
    };
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("click", unlock, { once: true });

    return () => {
      clearSchedule();
      releaseVideo(videoRef.current);
      narrowMq.removeEventListener("change", sync);
      touchPhoneMq.removeEventListener("change", sync);
      window.removeEventListener(HERO_RELEASE_EVENT, onHeroRelease);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };
  }, []);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || !src || releasedRef.current) return;

    forcePlay(video);

    const onReady = () => {
      if (!releasedRef.current) forcePlay(video);
    };
    const onEnded = () => {
      if (!releasedRef.current) forcePlay(video);
    };
    const onPause = () => {
      if (releasedRef.current) return;
      if (document.visibilityState !== "visible") return;
      if (!video.getAttribute("src") && !video.currentSrc) return;
      forcePlay(video);
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("ended", onEnded);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("pause", onPause);
    };
  }, [src]);

  const bindVideoRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) armAutoplay(el);
  };

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
          ref={bindVideoRef}
          className={styles.heroVideo}
          style={{ ...videoStyle, zIndex: 1 }}
          src={src}
          poster={useMobile ? HERO_MOBILE_POSTER : undefined}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
        />
      ) : null}
    </section>
  );
};

export default HeroSection;

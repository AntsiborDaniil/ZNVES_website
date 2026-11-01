"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { HERO_RELEASE_EVENT } from "../NavigationTracker/NavigationTracker";
import styles from "./HeroSection.module.css";

const HERO_DESKTOP_VIDEO = "/videos/home/hero-desktop-v4.mp4";
const HERO_MOBILE_VIDEO = "/videos/home/hero-mobile-v5.mp4";
/** webp легче jpg — маска до playing */
const HERO_MOBILE_POSTER = "/images/home/hero-mobile.webp";

/** Узкий экран ИЛИ тач-телефон (в т.ч. landscape >768px) — mobile-ролик. */
const NARROW_MQ = "(max-width: 768px)";
const TOUCH_PHONE_MQ = "(pointer: coarse) and (max-width: 1024px)";

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

/** Mute + playsInline ДО play — иначе мобильные браузеры показывают кнопку. */
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
      (
        video as HTMLVideoElement & { disableRemotePlayback: boolean }
      ).disableRemotePlayback = true;
    } catch {
      /* ignore */
    }
  }
};

const forcePlay = (video: HTMLVideoElement) => {
  armAutoplay(video);
  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch(() => {});
  }
};

const heroStyle: CSSProperties = {
  position: "relative",
  display: "block",
  overflow: "hidden",
  width: "100%",
  background: "var(--color-black)",
};

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const releasedRef = useRef(false);
  const playRetryRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [useMobile, setUseMobile] = useState(false);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  /** Постер/маска сверху, пока video не в playing — нативная ▶/❚❚ не видна. */
  const [coverVisible, setCoverVisible] = useState(true);

  const stopPlayRetry = () => {
    if (playRetryRef.current != null) {
      clearInterval(playRetryRef.current);
      playRetryRef.current = null;
    }
  };

  const ensurePlaying = (video: HTMLVideoElement) => {
    if (releasedRef.current) return;
    forcePlay(video);
    stopPlayRetry();
    let attempts = 0;
    playRetryRef.current = setInterval(() => {
      attempts += 1;
      if (releasedRef.current || attempts > 50) {
        stopPlayRetry();
        return;
      }
      if (!video.paused && !video.ended && video.currentTime > 0) {
        stopPlayRetry();
        setCoverVisible(false);
        return;
      }
      forcePlay(video);
    }, 160);
  };

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
    let mobileSrcTimer: ReturnType<typeof setTimeout> | null = null;

    const clearMobileSrcTimer = () => {
      if (mobileSrcTimer != null) {
        clearTimeout(mobileSrcTimer);
        mobileSrcTimer = null;
      }
    };

    const sync = () => {
      const mobile = shouldUseMobileHeroVideo();
      setUseMobile(mobile);
      setCoverVisible(true);
      clearMobileSrcTimer();

      if (mobile) {
        if (isConstrainedMobileNetwork()) {
          setSrc(null);
          return;
        }
        // Даём covers bestsellers занять канал (~1.2s постер), потом видео
        mobileSrcTimer = setTimeout(() => {
          if (releasedRef.current) return;
          setSrc((prev) =>
            prev === HERO_MOBILE_VIDEO ? prev : HERO_MOBILE_VIDEO
          );
        }, 1200);
        if (videoRef.current?.currentSrc?.includes("hero-mobile")) {
          ensurePlaying(videoRef.current);
        }
        return;
      }

      setSrc(HERO_DESKTOP_VIDEO);
    };

    sync();
    narrowMq.addEventListener("change", sync);
    touchPhoneMq.addEventListener("change", sync);

    const onHeroRelease = () => {
      releasedRef.current = true;
      stopPlayRetry();
      releaseVideo(videoRef.current);
      setSrc(null);
      setCoverVisible(true);
    };
    window.addEventListener(HERO_RELEASE_EVENT, onHeroRelease);

    const unlock = () => {
      const video = videoRef.current;
      if (!video || releasedRef.current) return;
      if (video.paused && video.currentSrc) ensurePlaying(video);
    };
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });

    return () => {
      clearMobileSrcTimer();
      stopPlayRetry();
      releaseVideo(videoRef.current);
      narrowMq.removeEventListener("change", sync);
      touchPhoneMq.removeEventListener("change", sync);
      window.removeEventListener(HERO_RELEASE_EVENT, onHeroRelease);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
  }, []);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || !src || releasedRef.current) return;

    setCoverVisible(true);
    ensurePlaying(video);

    const onReady = () => {
      if (!releasedRef.current) ensurePlaying(video);
    };
    const onPlaying = () => {
      stopPlayRetry();
      setCoverVisible(false);
    };
    const onEnded = () => {
      if (!releasedRef.current) ensurePlaying(video);
    };
    const onPause = () => {
      if (releasedRef.current) return;
      if (document.visibilityState !== "visible") return;
      if (!video.getAttribute("src") && !video.currentSrc) return;
      // Снова маска — нативная кнопка паузы/play не должна мелькать
      setCoverVisible(true);
      ensurePlaying(video);
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnded);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("pause", onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const bindVideoRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      armAutoplay(el);
      if (src && !releasedRef.current) ensurePlaying(el);
    }
  };

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
          ref={bindVideoRef}
          className={styles.heroVideo}
          src={src}
          muted
          autoPlay
          loop
          playsInline
          preload={useMobile ? "metadata" : "auto"}
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
        />
      ) : null}

      {/* Непрозрачная маска: нативный ▶/❚❚ браузера остаётся под ней */}
      <div
        className={`${styles.cover} ${
          coverVisible ? styles.coverVisible : styles.coverHidden
        }`}
        aria-hidden
      >
        {useMobile ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={HERO_MOBILE_POSTER}
            alt=""
            className={styles.coverImage}
            decoding="async"
            fetchPriority="high"
          />
        ) : (
          <div className={styles.coverSolid} />
        )}
      </div>
    </section>
  );
};

export default HeroSection;

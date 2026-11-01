"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./HeroSection.module.css";

const HERO_DESKTOP_VIDEO = "/videos/home/hero-desktop-v2.mp4";
const HERO_MOBILE_VIDEO = "/videos/home/hero-mobile-v2.mp4";

const MOBILE_MQ = "(max-width: 768px)";

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
    const mobileMq = window.matchMedia(MOBILE_MQ);
    const sync = () =>
      setSrc(mobileMq.matches ? HERO_MOBILE_VIDEO : HERO_DESKTOP_VIDEO);

    sync();
    mobileMq.addEventListener("change", sync);
    return () => mobileMq.removeEventListener("change", sync);
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
          preload="auto"
          disablePictureInPicture
          aria-hidden
          tabIndex={-1}
        />
      ) : null}
    </section>
  );
};

export default HeroSection;

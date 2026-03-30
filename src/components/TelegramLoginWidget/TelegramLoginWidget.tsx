"use client";

import { useEffect, useRef, useState } from "react";
import {
  TELEGRAM_BOT_USERNAME,
  getTelegramLoginCallbackUrl,
} from "../../api/auth/authApi";
import styles from "./TelegramLoginWidget.module.css";

const WIDGET_SCRIPT_URL = "https://telegram.org/js/telegram-widget.js?22";

type WidgetSize = "large" | "medium" | "small";

interface TelegramLoginWidgetProps {
  /** Размер кнопки виджета */
  size?: WidgetSize;
  /** Дополнительный CSS-класс для контейнера */
  className?: string;
  /** Скругление кнопки (число или строка с единицами) */
  radius?: number;
}

/**
 * Виджет «Войти через Telegram».
 * При клике идёт запрос к сервису Telegram, после успешной проверки Telegram
 * редиректит на ручку бэкенда (data-auth-url) с данными пользователя;
 * бэкенд выставляет куки и редиректит на бота с параметром start.
 */
export default function TelegramLoginWidget({
  size = "large",
  className,
  radius = 8,
}: TelegramLoginWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.setAttribute("data-telegram-login", TELEGRAM_BOT_USERNAME);
    script.setAttribute("data-auth-url", getTelegramLoginCallbackUrl());
    script.setAttribute("data-size", size);
    script.setAttribute("data-radius", String(radius));
    script.onload = () => setLoaded(true);

    container.appendChild(script);

    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, [size, radius]);

  return (
    <>
      {!loaded && <div className={styles.skeleton} aria-hidden="true" />}
      <div ref={containerRef} className={className} />
    </>
  );
}

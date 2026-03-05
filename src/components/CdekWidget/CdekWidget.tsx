"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    ISDEKWidjet?: new (options: Record<string, unknown>) => {
      destroy?: () => void;
    };
  }
}

type CdekWidgetProps = {
  /** id DOM-элемента, куда будет монтироваться виджет */
  containerId?: string;
};

const SCRIPT_ID = "ISDEKscript";

const CdekWidget = ({ containerId = "cdek-widget-container" }: CdekWidgetProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const widgetRef = useRef<{ destroy?: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingScript = document.getElementById(SCRIPT_ID) as
      | HTMLScriptElement
      | null;

    const initWidget = () => {
      if (!window.ISDEKWidjet) return;
      const container = document.getElementById(containerId);
      if (!container) return;

      try {
        widgetRef.current = new window.ISDEKWidjet({
          // Тестовый режим: просто отображаем карту ПВЗ
          // Документация: https://github.com/cdek-it/widget
          defaultCity: "Москва",
          cityFrom: "Москва",
          link: containerId,
          hidedelt: true,
          hidecash: true,
          hidedress: true,
          onChoose: function () {
            // В тестовом режиме просто логируем выбор в консоль
          },
        });
        setIsLoaded(true);
      } catch {
        // В тестовом режиме можем молча игнорировать ошибку
      }
    };

    if (existingScript && window.ISDEKWidjet) {
      initWidget();
      return () => {
        if (widgetRef.current?.destroy) {
          widgetRef.current.destroy();
        }
      };
    }

    const script = existingScript ?? document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "text/javascript";
    script.src = "https://widget.cdek.ru/widget/widjet.js";
    script.charset = "utf-8";
    script.async = true;

    script.onload = () => {
      initWidget();
    };

    if (!existingScript) {
      document.body.appendChild(script);
    }

    return () => {
      if (widgetRef.current?.destroy) {
        widgetRef.current.destroy();
      }
    };
  }, [containerId]);

  return (
    <div>
      <div
        id={containerId}
        style={{
          width: "100%",
          minHeight: 420,
          borderRadius: 8,
          overflow: "hidden",
        }}
      />
      {!isLoaded && (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: "#777",
          }}
        >
          Загрузка виджета СДЭК…
        </div>
      )}
    </div>
  );
};

export default CdekWidget;


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Footer.module.css";

const SERVICE_LINKS = [
  { href: "/delivery-payment", label: "Доставка и оплата" },
  { href: "/returns", label: "Обмен и возврат" },
] as const;

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "/cart", label: "Корзина" },
  { href: "/account", label: "Личный кабинет" },
] as const;

const Footer = () => {
  const { openCart } = useCart();
  const { isAuthenticated, openAuth } = useAuth();
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeModal = useCallback(() => {
    if (isModalClosing) return;
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    setIsModalClosing(true);
  }, [isModalClosing]);

  const handleModalAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target !== e.currentTarget || !isModalClosing) return;
    setShowSubscribeModal(false);
    setIsModalClosing(false);
  };

  useEffect(() => {
    if (!showSubscribeModal) return;
    setIsModalClosing(false);
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onEscape);
    autoCloseTimerRef.current = setTimeout(() => setIsModalClosing(true), 4000);
    return () => {
      document.removeEventListener("keydown", onEscape);
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
        autoCloseTimerRef.current = null;
      }
    };
  }, [showSubscribeModal, closeModal]);

  return (
    <footer className={styles.footer}>
      <Image
        src="/images/logo-white.svg"
        className={styles.logoMobile}
        alt="ZNVES"
        width={64}
        height={31}
        unoptimized
      />
      <div className={styles.upper}>
        <div className={styles.brand}>
          <Image
            src="/images/logo-white.svg"
            className={styles.logo}
            alt="ZNVES"
            width={86}
            height={41}
            unoptimized
          />
          <NewsletterForm
            layout="row"
            onSuccess={() => setShowSubscribeModal(true)}
          />
        </div>

        <div className={styles.columns}>
          <ul className={styles.column}>
            {SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link className={styles.columnItem} href={link.href} prefetch={false}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className={styles.column} data-testid="footer-catalog">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.href === "/cart" ? (
                  <button
                    type="button"
                    className={styles.columnItem}
                    onClick={openCart}
                  >
                    {link.label}
                  </button>
                ) : link.href === "/account" && !isAuthenticated ? (
                  <button
                    type="button"
                    className={styles.columnItem}
                    onClick={() => openAuth("login")}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link className={styles.columnItem} href={link.href} prefetch={false}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.column}>
            <Link
              href="https://t.me/znves"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnItem}
            >
              Telegram
            </Link>
            <Link
              href="https://www.instagram.com/real.ponama?igsh=b2w5YWdoNmJ2djVo"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.columnInst}
            >
              Instagram*
            </Link>
            <p className={styles.instagramNote}>
              *запрещёны в России,
              <br />
              принадлежат Meta
            </p>
          </div>
        </div>
      </div>

      {showSubscribeModal && (
        <div
          className={`${styles.modalOverlay} ${isModalClosing ? styles.modalOverlayClosing : ""}`}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="subscribe-modal-title"
          onAnimationEnd={handleModalAnimationEnd}
        >
          <div className={styles.modalContent}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Закрыть"
            >
              ×
            </button>
            <p id="subscribe-modal-title" className={styles.modalText}>
              Вы подписались на получение рассылки
            </p>
          </div>
        </div>
      )}

      <div className={styles.lower}>
        <p className={styles.copyright}>© ZNVES: 2026г все права защищены</p>
        <Link className={styles.lowerLink} href="/privacy" prefetch={false}>
          Политика конфиденциальности
        </Link>
        <Link className={styles.lowerLink} href="/public-offer" prefetch={false}>
          Публичная оферта
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

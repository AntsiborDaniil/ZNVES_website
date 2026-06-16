"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/ToastProvider/ToastProvider";
import { subscribeToMailing } from "../../api/mailing/mailingApi";
import styles from "./Footer.module.css";

const Footer = () => {
  const pathname = usePathname();
  const { showToast } = useToast();
  const shouldPrefetch = pathname !== "/account";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  }, [showSubscribeModal]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (isSubmitting) return;
    setEmailError(null);
    if (!value) return;
    if (!value.includes("@")) {
      setEmailError("Введите корректный email (должен содержать @)");
      return;
    }
    setIsSubmitting(true);
    try {
      await subscribeToMailing(value);
      setShowSubscribeModal(true);
      setEmail("");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Не удалось подписаться на рассылку");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.upper}>
        <div className={styles.upperLeft}>
          <Image
            src="/images/logo.png"
            className={styles.logo}
            alt="logo"
            width={65}
            height={31}
            loading="lazy"
          />
          <h1 className={styles.subText}>
            Подпишитесь на получение рассылки рекламно-информационных материалов
          </h1>
          <form className={styles.inputContainer} onSubmit={handleSubscribe}>
            <div className={styles.inputWrap}>
              <input
                type="email"
                className={`${styles.input} ${emailError ? styles.inputError : ""}`}
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(null);
                }}
                required
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "footer-email-error" : undefined}
              />
              {emailError && (
                <span id="footer-email-error" className={styles.inputErrorMsg} role="alert">
                  {emailError}
                </span>
              )}
            </div>
            <button type="submit" className={styles.button} disabled={isSubmitting}>
              {isSubmitting ? "Отправка…" : "Подписаться"}
            </button>
          </form>
          <h2 className={styles.politics}>
            Нажимая на кнопку «Подписаться», вы даете согласие на обработку
            персональных данных в соответствии с{" "}
            <Link href="/privacy" className={styles.politicsLink} prefetch={shouldPrefetch}>
              Политикой конфиденциальности
            </Link>
          </h2>
        </div>
        <div className={styles.upperRight}>
          <div className={styles.rowColumns}>
            <div className={styles.column}>
              <button
                type="button"
                className={styles.columnTitleButton}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
              >
                <h1 className={styles.columnTitle}>MENU</h1>
                <span className={styles.columnToggle}>
                  {isMenuOpen ? "−" : "+"}
                </span>
              </button>
              <ul
                className={`${styles.columnList} ${
                  isMenuOpen ? styles.columnListOpen : ""
                }`}
              >
                <li className={styles.columnLi}>
                  <Link className={styles.columnItem} href="/account" prefetch={shouldPrefetch}>
                    Личный кабинет
                  </Link>
                </li>
                <li className={styles.columnLi}>
                  <Link className={styles.columnItem} href="/cart" prefetch={shouldPrefetch}>
                    Корзина
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.column}>
              <button
                type="button"
                className={styles.columnTitleButton}
                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                aria-expanded={isCatalogOpen}
              >
                <h1 className={styles.columnTitle}>CATALOG</h1>
                <span className={styles.columnToggle}>
                  {isCatalogOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className={`${styles.catalogColumns} ${
                  isCatalogOpen ? styles.catalogColumnsOpen : ""
                }`}
              >
                <ul
                  className={`${styles.columnList} ${
                    isCatalogOpen ? styles.columnListOpen : ""
                  }`}
                >
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/new-in"
                      prefetch={shouldPrefetch}
                    >
                      New in
                    </Link>
                  </li>
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/catalog?category=t-shirts"
                      prefetch={shouldPrefetch}
                    >
                      T-shirt
                    </Link>
                  </li>
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/catalog?category=hoodies"
                      prefetch={shouldPrefetch}
                    >
                      Hoodies
                    </Link>
                  </li>
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/catalog?category=zip%20hoodies"
                      prefetch={shouldPrefetch}
                    >
                      Zip hoodies
                    </Link>
                  </li>
                </ul>
                <ul
                  className={`${styles.columnList} ${
                    isCatalogOpen ? styles.columnListOpen : ""
                  }`}
                >
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/catalog?category=jeans"
                      prefetch={shouldPrefetch}
                    >
                      Jeans
                    </Link>
                  </li>
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/catalog?category=pants"
                      prefetch={shouldPrefetch}
                    >
                      Pants
                    </Link>
                  </li>
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/catalog?category=shorts"
                      prefetch={shouldPrefetch}
                    >
                      Shorts
                    </Link>
                  </li>
                  <li className={styles.columnLi}>
                    <Link
                      className={styles.columnItem}
                      href="/catalog?category=jackets"
                      prefetch={shouldPrefetch}
                    >
                      Jackets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.column}>
              <button
                type="button"
                className={styles.columnTitleButton}
                onClick={() => setIsContactOpen(!isContactOpen)}
                aria-expanded={isContactOpen}
              >
                <h1 className={styles.columnTitle}>CONTACT</h1>
                <span className={styles.columnToggle}>
                  {isContactOpen ? "−" : "+"}
                </span>
              </button>
              <ul
                className={`${styles.columnList} ${
                  isContactOpen ? styles.columnListOpen : ""
                }`}
              >
                <li className={styles.columnLi}>
                  <Link
                    href="https://t.me/znves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.columnItem}
                  >
                    Telegram
                  </Link>
                </li>
                <li className={styles.columnLi}>
                  <Link
                    href="https://www.instagram.com/real.ponama?igsh=b2w5YWdoNmJ2djVo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.columnInst}
                  >
                    Instagram*
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.links}>
            <Link className={styles.link} href="/delivery-payment" prefetch={shouldPrefetch}>
              Доставка и оплата
            </Link>
            <Link className={styles.link} href="/returns" prefetch={shouldPrefetch}>
              Обмен и возврат
            </Link>
            <Link className={styles.link} href="/public-offer" prefetch={shouldPrefetch}>
              Публичная оферта
            </Link>
            <Link className={styles.link} href="/privacy" prefetch={shouldPrefetch}>
              Политика конфиденциальности
            </Link>
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
        <p className={styles.copyright}>© 2026 Все права защищены</p>
        <p className={styles.copyrightInsta}>
          <span>* Instagram принадлежит компании Meta, признанной экстремистской организацией</span>
          <span> и запрещенной в РФ</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

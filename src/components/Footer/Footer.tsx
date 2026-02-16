"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

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
          <div className={styles.inputContainer}>
            <input
              type="email"
              className={styles.input}
              placeholder="Введите ваш email"
            />
            <button type="submit" className={styles.button}>
              Подписаться
            </button>
          </div>
          <h2 className={styles.politics}>
            Нажимая на кнопку «Подписаться», вы даете согласие на обработку
            персональных данных в соответствии с{" "}
            <Link href="/privacy" className={styles.politicsLink} prefetch={false}>
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
                  <Link className={styles.columnItem} href="/account">
                    Личный кабинет
                  </Link>
                  <Link className={styles.columnItem} href="/cart">
                    Корзина
                  </Link>
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
                    <Link className={styles.columnItem} href="/new-in">
                      New in
                    </Link>
                    <Link className={styles.columnItem} href="/catalog/t-shirt">
                      T-shirt
                    </Link>
                  
                    <Link className={styles.columnItem} href="/catalog/hoodies">
                      Hoodies
                    </Link>
                    <Link
                      className={styles.columnItem}
                      href="/catalog/zip-hoodies"
                    >
                      Zip hoodies
                    </Link>
                </ul>
                <ul
                  className={`${styles.columnList} ${
                    isCatalogOpen ? styles.columnListOpen : ""
                  }`}
                >
                    <Link className={styles.columnItem} href="/catalog/jeans">
                      Jeans
                    </Link>
                    <Link className={styles.columnItem} href="/catalog/pants">
                      Pants
                    </Link>
                    <Link className={styles.columnItem} href="/catalog/shorts">
                      Shorts
                    </Link>
                    <Link className={styles.columnItem} href="/catalog/jackets">
                      Jackets
                    </Link>
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
              </ul>
            </div>
          </div>
          <div className={styles.links}>
            <Link className={styles.link} href="/public-offer">
              Публичная оферта
            </Link>
            <Link className={styles.link} href="/privacy" prefetch={false}>
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.lower}>
        <p className={styles.copyright}>© 2025 Все права защищены</p>
        <p className={styles.copyrightInsta}>
          * Instagram принадлежит компании Meta, признанной экстремистской
          организацией <br/> и запрещенной в РФ
        </p>
      </div>
    </footer>
  );
};

export default Footer;

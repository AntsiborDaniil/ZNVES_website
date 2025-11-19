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
            <div className={styles.footerContent}>
                <div className={styles.footerColumn}>
                    <div className={styles.leftPart}>
                        <Image
                            src="/images/logo.png"
                            alt="ZNVES"
                            width={125}
                            height={60}
                            className={styles.logo}
                        />
                        <p className={styles.subscriptionTitle}>
                            Подпишитесь на получение рассылки
                            рекламно-информационных материалов
                        </p>
                    </div>

                    <div className={styles.rightSide}>
                        <div className={styles.navColumn}>
                            <h3 className={styles.columnTitle}>MENU</h3>
                            <ul className={styles.footerLinks}>
                                <li>
                                    <a href="#znves-club">Znves club</a>
                                </li>
                                <li>
                                    <a href="#gift-card">Gift card</a>
                                </li>
                                <li>
                                    <a href="#account">Личный кабинет</a>
                                </li>
                                <li>
                                    <a href="#cart">Корзина</a>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.navColumn}>
                            <h1 className={styles.columnTitle}>CATALOG</h1>
                            <div className={styles.catalogColumns}>
                                <ul className={styles.footerLinks}>
                                    <li>
                                        <Link href="/new-in">New in</Link>
                                    </li>
                                    <li>
                                        <Link href="/catalog?category=t-shirts">
                                            T-shirt
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/catalog?category=hoodies">
                                            Hoodies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/catalog?category=zip%20hoodies">
                                            Zip hoodies
                                        </Link>
                                    </li>
                                </ul>
                                <ul className={styles.footerLinks}>
                                    <li>
                                        <Link href="/catalog?category=jeans">
                                            Jeans
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/catalog?category=pants">
                                            Pants
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/catalog?category=shorts">
                                            Shorts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/catalog?category=jackets">
                                            Jackets
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.navColumn}>
                            <h3 className={styles.columnTitle}>CONTACT</h3>
                            <ul className={styles.footerLinks}>
                                <li>
                                    <a href="#telegram">Telegram</a>
                                </li>
                                <li>
                                    <a
                                        href="#instagram"
                                        className={styles.underlinedLink}
                                    >
                                        Instagram*
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.newsletter}>
                    <input
                        type="email"
                        placeholder="Введите e-mail"
                        className={styles.newsletterInput}
                    />
                    <button className={styles.newsletterButton} type="button">
                        Подписаться
                    </button>
                </div>

                <div className={styles.consentSection}>
                    <p className={styles.privacyText}>
                        Нажимая на кнопку «Подписаться», вы даете согласие на
                        обработку персональных данных в соответствии с{" "}
                        <Link href="/privacy" className={styles.privacyLink}>
                            Политикой конфиденциальности
                        </Link>
                    </p>
                    <div className={styles.legalLinks}>
                        <Link href="/public-offer" className={styles.legalLink}>
                            Публичная оферта
                        </Link>
                        <Link href="/privacy" className={styles.legalLink}>
                            Политика конфиденциальности
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile footer section */}
            <div className={styles.mobileFooter}>
                <div className={styles.mobileLogoSection}>
                    <Image
                        src="/images/logo.png"
                        alt="ZNVES"
                        width={125}
                        height={60}
                        className={styles.mobileLogo}
                    />
                    <p className={styles.mobileSubscriptionTitle}>
                        Подпишитесь на получение рассылки
                        рекламно-информационных материалов
                    </p>
                </div>

                <div className={styles.mobileNewsletter}>
                    <input
                        type="email"
                        placeholder="Введите e-mail"
                        className={styles.mobileNewsletterInput}
                    />
                    <button
                        className={styles.mobileNewsletterButton}
                        type="button"
                    >
                        Подписаться
                    </button>
                    <p className={styles.mobilePrivacyText}>
                        Нажимая на кнопку «Подписаться», вы даете согласие на
                        обработку персональных данных в соответствии с{" "}
                        <Link
                            href="/privacy"
                            className={styles.mobilePrivacyLink}
                        >
                            Политикой конфиденциальности
                        </Link>
                    </p>
                </div>

                <div className={styles.mobileNavSection}>
                    <div className={styles.mobileNavItem}>
                        <button
                            className={styles.mobileNavHeader}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                        >
                            <span>MENU</span>
                            <span className={styles.plusIcon}>
                                {isMenuOpen ? "−" : "+"}
                            </span>
                        </button>
                        {isMenuOpen && (
                            <ul className={styles.mobileNavLinks}>
                                <li>
                                    <a href="#znves-club">Znves club</a>
                                </li>
                                <li>
                                    <a href="#gift-card">Gift card</a>
                                </li>
                                <li>
                                    <a href="#account">Личный кабинет</a>
                                </li>
                                <li>
                                    <a href="#cart">Корзина</a>
                                </li>
                            </ul>
                        )}
                    </div>

                    <div className={styles.mobileNavItem}>
                        <button
                            className={styles.mobileNavHeader}
                            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                            type="button"
                        >
                            <span>CATALOG</span>
                            <span className={styles.plusIcon}>
                                {isCatalogOpen ? "−" : "+"}
                            </span>
                        </button>
                        {isCatalogOpen && (
                            <ul className={styles.mobileNavLinks}>
                                <li>
                                    <Link href="/new-in">New in</Link>
                                </li>
                                <li>
                                    <Link href="/catalog?category=t-shirts">
                                        T-shirt
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?category=hoodies">
                                        Hoodies
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?category=zip%20hoodies">
                                        Zip hoodies
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?category=jeans">
                                        Jeans
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?category=pants">
                                        Pants
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?category=shorts">
                                        Shorts
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog?category=jackets">
                                        Jackets
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    <div className={styles.mobileNavItem}>
                        <button
                            className={styles.mobileNavHeader}
                            onClick={() => setIsContactOpen(!isContactOpen)}
                            type="button"
                        >
                            <span>CONTACT</span>
                            <span className={styles.plusIcon}>
                                {isContactOpen ? "−" : "+"}
                            </span>
                        </button>
                        {isContactOpen && (
                            <ul className={styles.mobileNavLinks}>
                                <li>
                                    <a href="#telegram">Telegram</a>
                                </li>
                                <li>
                                    <a
                                        href="#instagram"
                                        className={styles.mobileUnderlinedLink}
                                    >
                                        Instagram*
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className={styles.mobileLegalLinks}>
                    <Link
                        href="/public-offer"
                        className={styles.mobileLegalLink}
                    >
                        Публичная оферта
                    </Link>
                    <Link href="/privacy" className={styles.mobileLegalLink}>
                        Политика конфиденциальности
                    </Link>
                </div>
            </div>

            <div className={styles.metaNote}>
                <div className={styles.metaPrimary}>
                    <span>© 2025 Все права защищены</span>
                    {/* <span className={styles.studioNote}>
                        Выполнено студией RisePoint
                    </span> */}
                </div>
                <span>
                    * продукт принадлежит компании Meta, признанной
                    экстремистской организацией <br />и запрещенной в РФ
                </span>
            </div>
        </footer>
    );
};

export default Footer;

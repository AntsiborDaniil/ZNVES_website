import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "ZNVES — Страница заглушка",
    description:
        "Мы временно обновляем витрину ZNVES. Вернитесь позже или свяжитесь с нами.",
};

const PlaceholderPage = () => {
    return (
        <main className={styles.page}>
            <div className={styles.decor} aria-hidden="true">
                <span className={styles.glowTop} />
                <span className={styles.glowBottom} />
            </div>
            <div className={styles.card}>
                <div className={styles.brandBlock}>
                    <Image
                        src="/images/logo.png"
                        alt="Логотип ZNVES"
                        className={styles.logo}
                        width={160}
                        height={76}
                        priority
                    />
                    <span className={styles.badge}>Скоро запуск</span>
                </div>
                <h1 className={styles.title}>Мы обновляем витрину ZNVES</h1>
                <p className={styles.description}>
                    Команда завершает последние штрихи, чтобы показать новые
                    коллекции и сервисы. Совсем скоро страница снова будет
                    доступна. Спасибо за ваше терпение!
                </p>
                <div className={styles.statusGrid}>
                    <div className={styles.statusCard}>
                        <span className={styles.statusLabel}>
                            Что происходит
                        </span>
                        <p className={styles.statusText}>
                            Мы обновляем ассортимент и настраиваем удобную
                            навигацию для нового сезона.
                        </p>
                    </div>
                    <div className={styles.statusCard}>
                        <span className={styles.statusLabel}>
                            Когда вернёмся
                        </span>
                        <p className={styles.statusText}>
                            Планируем открыть доступ в ближайшие дни. Следите за
                            новостями в наших соцсетях.
                        </p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Link href="/" className={styles.primaryButton}>
                        На главную
                    </Link>
                    <Link
                        href="mailto:hello@znves.com"
                        className={styles.secondaryLink}
                    >
                        Написать нам
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default PlaceholderPage;

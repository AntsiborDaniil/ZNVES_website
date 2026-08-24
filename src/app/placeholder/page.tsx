import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ZNVES — Страница временно недоступна",
  description:
    "Мы обновляем витрину ZNVES. Вернитесь позже или свяжитесь с нами.",
};

const PlaceholderPage = () => {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.page}>
        <div className={styles.card}>
          <p className={styles.badge}>Скоро</p>
          <h1 className={styles.title}>Мы обновляем витрину</h1>
          <p className={styles.description}>
            Команда завершает последние штрихи, чтобы показать новые коллекции и
            сервисы. Совсем скоро страница снова будет доступна.
          </p>
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <span className={styles.statusLabel}>Что происходит</span>
              <p className={styles.statusText}>
                Обновляем ассортимент и настраиваем навигацию для нового сезона.
              </p>
            </div>
            <div className={styles.statusCard}>
              <span className={styles.statusLabel}>Когда вернёмся</span>
              <p className={styles.statusText}>
                Планируем открыть доступ в ближайшие дни. Следите за новостями.
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              На главную
            </Link>
            <Link
              href="mailto:znves.ru@yandex.ru"
              className={styles.secondaryButton}
            >
              Написать нам
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;

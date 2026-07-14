import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description: "Запрашиваемая страница не существует или была перемещена.",
};

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.description}>
            Возможно, ссылка устарела или адрес введён с ошибкой. Перейдите в
            каталог или вернитесь на главную.
          </p>
          <div className={styles.actions}>
            <Link href="/catalog" className={styles.primaryButton}>
              В каталог
            </Link>
            <Link href="/" className={styles.secondaryButton}>
              На главную
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;

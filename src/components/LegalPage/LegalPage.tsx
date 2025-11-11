"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./LegalPage.module.css";

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
};

type LegalPageProps = {
  title: string;
  updatedAt?: string;
  sections: LegalSection[];
};

const LegalPage = ({ title, updatedAt, sections }: LegalPageProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBack = () => {
    if (!isMounted) {
      router.push("/");
      return;
    }

    // Используем router.back() - Next.js безопасно обработает это
    router.back();
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button type="button" onClick={handleBack} className={styles.backLink}>
          ← Вернуться назад
        </button>

        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {updatedAt && (
            <p className={styles.meta}>Последнее обновление: {updatedAt}</p>
          )}
        </header>

        <div className={styles.sections}>
          {sections.map(
            ({ id, title: sectionTitle, paragraphs, listItems }) => (
              <section key={id} className={styles.section} id={id}>
                <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
                {paragraphs.map((paragraph, index) => (
                  <p key={`${id}-p-${index}`} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
                {listItems && listItems.length > 0 && (
                  <ul className={styles.list}>
                    {listItems.map((item, index) => (
                      <li key={`${id}-l-${index}`} className={styles.listItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default LegalPage;

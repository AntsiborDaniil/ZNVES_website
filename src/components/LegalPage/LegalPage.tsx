"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, Fragment } from "react";
import styles from "./LegalPage.module.css";

/** Фрагмент текста с опциональной ссылкой */
export type LegalRichPart = { text: string; href?: string };

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "paragraphRich"; parts: LegalRichPart[] }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

type LegalPageProps = {
  title: string;
  updatedAt?: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
};

function RichParagraph({ parts }: { parts: LegalRichPart[] }) {
  return (
    <p className={styles.paragraph}>
      {parts.map((p, i) =>
        p.href ? (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            {p.text}
          </a>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        )
      )}
    </p>
  );
}

function renderBlock(block: LegalBlock, key: string) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={key} className={styles.paragraph}>
          {block.text}
        </p>
      );
    case "paragraphRich":
      return <RichParagraph key={key} parts={block.parts} />;
    case "subheading":
      return (
        <h3 key={key} className={styles.subheading}>
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul key={key} className={styles.list}>
          {block.items.map((item, i) => (
            <li key={`${key}-li-${i}`} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

const LegalPage = ({ title, updatedAt, intro, sections }: LegalPageProps) => {
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

        {intro && intro.length > 0 && (
          <div className={styles.intro}>
            {intro.map((b, i) => renderBlock(b, `intro-${i}`))}
          </div>
        )}

        <div className={styles.sections}>
          {sections.map(({ id, title: sectionTitle, blocks }) => (
            <section key={id} className={styles.section} id={id}>
              <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
              {blocks.map((block, index) => renderBlock(block, `${id}-b-${index}`))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default LegalPage;

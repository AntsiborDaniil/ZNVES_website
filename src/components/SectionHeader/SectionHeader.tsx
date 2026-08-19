import Button from "../ui/Button/Button";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: string;
  href?: string;
  actionLabel?: string;
  align?: "split" | "center";
};

const SectionHeader = ({
  title,
  href,
  actionLabel = "Смотреть больше",
  align = "split",
}: SectionHeaderProps) => {
  return (
    <div className={`${styles.header} ${align === "center" ? styles.center : ""}`}>
      <h2 className={styles.title}>{title}</h2>
      {href && (
        <Button href={href} variant="underline" className={styles.action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;

import styles from "./AccountAuthCheckFallback.module.css";

const AccountAuthCheckFallback = () => (
  <div
    className={styles.root}
    role="status"
    aria-live="polite"
    aria-label="Проверяем авторизацию"
  >
    <nav className={styles.mobileNav} aria-hidden="true">
      <span className={styles.navPill} />
      <span className={styles.navSep} />
      <span className={styles.navPill} />
      <span className={styles.navSep} />
      <span className={styles.navPill} />
    </nav>

    <div className={styles.main}>
      <aside className={styles.aside} aria-hidden="true">
        <div className={`${styles.shimmer} ${styles.backLine}`} />
        <div className={`${styles.shimmer} ${styles.titleLine}`} />
        <div className={styles.navLines}>
          <div className={`${styles.shimmer} ${styles.navLine}`} />
          <div className={`${styles.shimmer} ${styles.navLine}`} />
          <div className={`${styles.shimmer} ${styles.navLine}`} />
        </div>
      </aside>

      <article className={styles.card}>
        <div className={styles.cardInner}>
          <div className={styles.spinnerWrap} aria-hidden="true">
            <div className={styles.spinner} />
          </div>
          <p className={styles.label}>Проверяем авторизацию…</p>

          <div className={styles.contentBlock} aria-hidden="true">
            <div className={`${styles.shimmer} ${styles.blockLineWide}`} />
            <div className={`${styles.shimmer} ${styles.blockLine}`} />
            <div className={`${styles.shimmer} ${styles.blockLine}`} />
            <div className={`${styles.shimmer} ${styles.blockLineShort}`} />
          </div>
        </div>
      </article>
    </div>
  </div>
);

export default AccountAuthCheckFallback;

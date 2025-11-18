"use client";

import styles from "./MyAccount.module.css";

const MyAccount = () => {
  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionHeading}>Мой кабинет</h2>
      <p className={styles.sectionDescription}>
        Добро пожаловать в личный кабинет. Здесь вы можете управлять своими
        данными и настройками.
      </p>
    </section>
  );
};

export default MyAccount;

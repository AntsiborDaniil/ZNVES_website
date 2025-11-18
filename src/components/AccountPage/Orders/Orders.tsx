"use client";

import styles from "./Orders.module.css";

const Orders = () => {
  return (
    <section className={styles.panel}>
      <h2 className={styles.sectionHeading}>Заказы</h2>
      <p className={styles.sectionDescription}>
        Здесь появится история ваших заказов после оформления.
      </p>
    </section>
  );
};

export default Orders;

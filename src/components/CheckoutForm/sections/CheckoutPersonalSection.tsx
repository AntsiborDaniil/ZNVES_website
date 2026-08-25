"use client";

import type { RefObject, ChangeEvent } from "react";
import PhoneInput from "../../PhoneInput/PhoneInput";
import styles from "../CheckoutFormModal.module.css";

export interface CheckoutPersonalSectionProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  errors: Record<string, boolean>;
  firstNameRef: RefObject<HTMLInputElement | null>;
  lastNameRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  phoneRef: RefObject<HTMLDivElement | null>;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onPhoneChange: (value: string) => void;
}

export default function CheckoutPersonalSection({
  firstName,
  lastName,
  email,
  phone,
  errors,
  firstNameRef,
  lastNameRef,
  emailRef,
  phoneRef,
  onInputChange,
  onPhoneChange,
}: CheckoutPersonalSectionProps) {
  return (
    <div className={`${styles.section} ${styles.modalPersonalSection}`}>
      <div className={styles.inputWrapper}>
        <label htmlFor="firstName" className={styles.label}>
          Имя
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Екатерина"
          value={firstName}
          onChange={onInputChange}
          className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
          ref={firstNameRef}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="lastName" className={styles.label}>
          Фамилия
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Смирнов"
          value={lastName}
          onChange={onInputChange}
          className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
          ref={lastNameRef}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
          value={email}
          onChange={onInputChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          ref={emailRef}
        />
      </div>
      <div className={`${styles.inputWrapper} ${styles.modalVisuallyHidden}`} ref={phoneRef}>
        <label htmlFor="phone" className={styles.label}>
          Телефон
        </label>
        <PhoneInput
          id="phone"
          value={phone}
          onChange={onPhoneChange}
          error={!!errors.phone}
          className={styles.phoneWrap}
        />
      </div>
    </div>
  );
}

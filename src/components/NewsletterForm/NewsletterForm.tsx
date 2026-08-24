"use client";

import Link from "next/link";
import { useState } from "react";
import { subscribeToMailing } from "../../api/mailing/mailingApi";
import { useToast } from "../ui/ToastProvider/ToastProvider";
import Button from "../ui/Button/Button";
import styles from "./NewsletterForm.module.css";

type NewsletterFormProps = {
  onSuccess?: () => void;
  layout?: "row" | "stack";
};

const NewsletterForm = ({
  onSuccess,
  layout = "row",
}: NewsletterFormProps) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (isSubmitting) return;
    setEmailError(null);
    if (!value) return;
    if (!value.includes("@")) {
      setEmailError("Введите корректный email (должен содержать @)");
      return;
    }
    setIsSubmitting(true);
    try {
      await subscribeToMailing(value);
      setEmail("");
      onSuccess?.();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Не удалось подписаться на рассылку"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={`${styles.form} ${layout === "stack" ? styles.stack : ""}`}
      onSubmit={handleSubscribe}
    >
      <p className={styles.lead}>
        Подпишитесь на получение рассылки рекламно-информационных материалов
      </p>
      <div className={styles.row}>
        <div className={styles.field}>
          <input
            type="email"
            className={`${styles.input} ${emailError ? styles.inputError : ""}`}
            placeholder="Введите e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            required
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "newsletter-email-error" : undefined}
          />
          {emailError && (
            <span
              id="newsletter-email-error"
              className={styles.error}
              role="alert"
            >
              {emailError}
            </span>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className={styles.submitBtn}
        >
          {isSubmitting ? "Отправка…" : "Подписаться"}
        </Button>
      </div>
      <p className={styles.legal}>
        Нажимая кнопку «Подписаться», я соглашаюсь с{" "}
        <Link href="/privacy" className={styles.legalLink} prefetch={false}>
          Политикой конфиденциальности
        </Link>
      </p>
    </form>
  );
};

export default NewsletterForm;

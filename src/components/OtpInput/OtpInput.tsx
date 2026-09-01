"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import styles from "./OtpInput.module.css";

const CODE_LENGTH = 6;

type OtpInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  "aria-label"?: string;
};

const normalizeCode = (raw: string): string =>
  raw.replace(/\D/g, "").slice(0, CODE_LENGTH);

const OtpInput = ({
  id,
  value,
  onChange,
  onBlur,
  error = false,
  disabled = false,
  autoFocus = true,
  "aria-label": ariaLabel = "Код подтверждения",
}: OtpInputProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const code = normalizeCode(value);

  const focusIndex = useCallback((index: number) => {
    const el = inputsRef.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  }, []);

  useEffect(() => {
    if (autoFocus) {
      focusIndex(0);
    }
  }, [autoFocus, focusIndex]);

  const setDigitAt = (index: number, digit: string) => {
    const current = code.split("");
    while (current.length < CODE_LENGTH) current.push("");
    current[index] = digit;
    onChange(normalizeCode(current.join("")));
  };

  const handleChange = (index: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, "");
    if (!cleaned) {
      setDigitAt(index, "");
      return;
    }

    // Вставка нескольких цифр в одно поле (мобильные OTP / автозаполнение)
    if (cleaned.length > 1) {
      const current = code.split("");
      while (current.length < CODE_LENGTH) current.push("");
      for (let i = 0; i < cleaned.length && index + i < CODE_LENGTH; i += 1) {
        current[index + i] = cleaned[i]!;
      }
      const next = normalizeCode(current.join(""));
      onChange(next);
      focusIndex(Math.min(index + cleaned.length, CODE_LENGTH - 1));
      return;
    }

    setDigitAt(index, cleaned);
    if (index < CODE_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (code[index]) {
        setDigitAt(index, "");
      } else if (index > 0) {
        setDigitAt(index - 1, "");
        focusIndex(index - 1);
      }
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
    }
    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      event.preventDefault();
      focusIndex(index + 1);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = normalizeCode(event.clipboardData.getData("text"));
    if (!pasted) return;
    onChange(pasted);
    focusIndex(Math.min(pasted.length, CODE_LENGTH) - 1);
  };

  return (
    <div className={styles.wrap} data-otp-input>
      <div
        className={styles.boxes}
        role="group"
        aria-label={ariaLabel}
        id={id}
      >
        {Array.from({ length: CODE_LENGTH }, (_, index) => {
          const char = code[index] ?? "";
          return (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={CODE_LENGTH}
              className={`${styles.box} ${char ? styles.boxFilled : ""} ${
                error ? styles.boxError : ""
              }`}
              value={char}
              disabled={disabled}
              aria-label={`Цифра ${index + 1} из ${CODE_LENGTH}`}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              onBlur={onBlur}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OtpInput;
export { CODE_LENGTH };

"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  CIS_COUNTRIES,
  DEFAULT_CIS_COUNTRY,
  buildFullPhone,
  digitsOnly,
  formatNationalNumber,
  parseFullPhone,
} from "../../lib/phoneCountries";
import styles from "./PhoneInput.module.css";

type PhoneInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  disabled?: boolean;
  "aria-invalid"?: boolean;
};

const PhoneInput = ({
  id,
  value,
  onChange,
  onBlur,
  error = false,
  disabled = false,
  "aria-invalid": ariaInvalid,
}: PhoneInputProps) => {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [countryIso, setCountryIso] = useState(
    () => parseFullPhone(value).country.iso
  );

  // Внешний reset формы
  useEffect(() => {
    if (!value) {
      setCountryIso(DEFAULT_CIS_COUNTRY.iso);
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const country =
    CIS_COUNTRIES.find((item) => item.iso === countryIso) ?? DEFAULT_CIS_COUNTRY;
  const { national } = parseFullPhone(value, countryIso);
  const display = formatNationalNumber(national, country);

  const handleNationalChange = (raw: string) => {
    const next = digitsOnly(raw).slice(0, country.nationalLength);
    onChange(buildFullPhone(country, next));
  };

  const handleSelectCountry = (iso: string) => {
    const next =
      CIS_COUNTRIES.find((item) => item.iso === iso) ?? DEFAULT_CIS_COUNTRY;
    const clipped = national.slice(0, next.nationalLength);
    setCountryIso(next.iso);
    onChange(buildFullPhone(next, clipped));
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${error ? styles.wrapError : ""}`}
    >
      <button
        type="button"
        className={styles.countryBtn}
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        aria-label="Выбор страны"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <span className={styles.flag} aria-hidden="true">
          {country.flag}
        </span>
        <span className={styles.dialCode}>+{country.dialCode}</span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={country.placeholder}
        className={styles.input}
        value={display}
        disabled={disabled}
        aria-invalid={ariaInvalid ?? error}
        onChange={(e) => handleNationalChange(e.target.value)}
        onBlur={onBlur}
      />

      {open && (
        <ul id={listId} className={styles.dropdown} role="listbox">
          {CIS_COUNTRIES.map((item) => (
            <li key={item.iso} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={item.iso === country.iso}
                className={`${styles.option} ${
                  item.iso === country.iso ? styles.optionActive : ""
                }`}
                onClick={() => handleSelectCountry(item.iso)}
              >
                <span className={styles.flag} aria-hidden="true">
                  {item.flag}
                </span>
                <span className={styles.optionName}>{item.name}</span>
                <span className={styles.optionDial}>+{item.dialCode}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhoneInput;

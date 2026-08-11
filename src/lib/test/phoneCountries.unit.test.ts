import { describe, expect, it } from "vitest";
import {
  DEFAULT_CIS_COUNTRY,
  applyNationalInput,
  buildFullPhone,
  formatNationalNumber,
  parseFullPhone,
} from "../phoneCountries";

describe("phoneCountries", () => {
  it("defaults to Russia", () => {
    expect(DEFAULT_CIS_COUNTRY.iso).toBe("RU");
    expect(DEFAULT_CIS_COUNTRY.dialCode).toBe("7");
  });

  it("formats Russian national numbers", () => {
    expect(formatNationalNumber("9991234567", DEFAULT_CIS_COUNTRY)).toBe(
      "(999) 123-45-67"
    );
    expect(formatNationalNumber("312", DEFAULT_CIS_COUNTRY)).toBe("(312");
    expect(formatNationalNumber("3121", DEFAULT_CIS_COUNTRY)).toBe("(312) 1");
  });

  it("deletes a digit when backspace hits a mask character", () => {
    // Старая маска закрывала ")" на 3 цифрах — Backspace снимал ")" без смены digits
    expect(
      applyNationalInput("(312", "312", "(312)", DEFAULT_CIS_COUNTRY)
    ).toBe("31");
    // Пробел после кода: "(312) 1" → стёрли пробел → "(312)1"
    expect(
      applyNationalInput("(312)1", "3121", "(312) 1", DEFAULT_CIS_COUNTRY)
    ).toBe("312");
    // Обычное удаление цифры
    expect(
      applyNationalInput("(31", "312", "(312", DEFAULT_CIS_COUNTRY)
    ).toBe("31");
  });

  it("builds full phone with dial code", () => {
    expect(buildFullPhone(DEFAULT_CIS_COUNTRY, "9991234567")).toBe("+79991234567");
    expect(buildFullPhone(DEFAULT_CIS_COUNTRY, "")).toBe("");
  });

  it("parses Belarus numbers by longer dial code first", () => {
    const parsed = parseFullPhone("+375291234567");
    expect(parsed.country.iso).toBe("BY");
    expect(parsed.national).toBe("291234567");
  });

  it("keeps Kazakhstan when preferred", () => {
    const parsed = parseFullPhone("+77011234567", "KZ");
    expect(parsed.country.iso).toBe("KZ");
    expect(parsed.national).toBe("7011234567");
  });
});

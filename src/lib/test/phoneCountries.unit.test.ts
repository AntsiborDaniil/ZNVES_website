import { describe, expect, it } from "vitest";
import {
  DEFAULT_CIS_COUNTRY,
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

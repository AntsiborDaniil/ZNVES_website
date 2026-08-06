export type CisCountry = {
  iso: string;
  name: string;
  /** Код страны без «+» */
  dialCode: string;
  flag: string;
  /** Ожидаемое число национальных цифр */
  nationalLength: number;
  placeholder: string;
};

/** Страны СНГ; Россия — первая (по умолчанию). */
export const CIS_COUNTRIES: CisCountry[] = [
  {
    iso: "RU",
    name: "Россия",
    dialCode: "7",
    flag: "🇷🇺",
    nationalLength: 10,
    placeholder: "(999) 123-45-67",
  },
  {
    iso: "BY",
    name: "Беларусь",
    dialCode: "375",
    flag: "🇧🇾",
    nationalLength: 9,
    placeholder: "(29) 123-45-67",
  },
  {
    iso: "KZ",
    name: "Казахстан",
    dialCode: "7",
    flag: "🇰🇿",
    nationalLength: 10,
    placeholder: "(701) 123-45-67",
  },
  {
    iso: "UA",
    name: "Украина",
    dialCode: "380",
    flag: "🇺🇦",
    nationalLength: 9,
    placeholder: "(67) 123-45-67",
  },
  {
    iso: "AM",
    name: "Армения",
    dialCode: "374",
    flag: "🇦🇲",
    nationalLength: 8,
    placeholder: "(91) 123456",
  },
  {
    iso: "AZ",
    name: "Азербайджан",
    dialCode: "994",
    flag: "🇦🇿",
    nationalLength: 9,
    placeholder: "(50) 123-45-67",
  },
  {
    iso: "GE",
    name: "Грузия",
    dialCode: "995",
    flag: "🇬🇪",
    nationalLength: 9,
    placeholder: "(555) 12-34-56",
  },
  {
    iso: "MD",
    name: "Молдова",
    dialCode: "373",
    flag: "🇲🇩",
    nationalLength: 8,
    placeholder: "(69) 123456",
  },
  {
    iso: "KG",
    name: "Кыргызстан",
    dialCode: "996",
    flag: "🇰🇬",
    nationalLength: 9,
    placeholder: "(700) 123-456",
  },
  {
    iso: "TJ",
    name: "Таджикистан",
    dialCode: "992",
    flag: "🇹🇯",
    nationalLength: 9,
    placeholder: "(90) 123-4567",
  },
  {
    iso: "TM",
    name: "Туркменистан",
    dialCode: "993",
    flag: "🇹🇲",
    nationalLength: 8,
    placeholder: "(65) 12-34-56",
  },
  {
    iso: "UZ",
    name: "Узбекистан",
    dialCode: "998",
    flag: "🇺🇿",
    nationalLength: 9,
    placeholder: "(90) 123-45-67",
  },
];

export const DEFAULT_CIS_COUNTRY = CIS_COUNTRIES[0];

export const digitsOnly = (value: string): string => value.replace(/\D/g, "");

/** Форматирование национальных цифр для отображения в инпуте. */
export const formatNationalNumber = (digits: string, country: CisCountry): string => {
  const d = digitsOnly(digits).slice(0, country.nationalLength);

  if (country.iso === "RU" || country.iso === "KZ") {
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 8);
    const p4 = d.slice(8, 10);
    if (d.length <= 3) return p1 ? `(${p1}` + (d.length === 3 ? ")" : "") : "";
    if (d.length <= 6) return `(${p1}) ${p2}`;
    if (d.length <= 8) return `(${p1}) ${p2}-${p3}`;
    return `(${p1}) ${p2}-${p3}-${p4}`;
  }

  if (country.dialCode === "375" || country.dialCode === "380") {
    const p1 = d.slice(0, 2);
    const p2 = d.slice(2, 5);
    const p3 = d.slice(5, 7);
    const p4 = d.slice(7, 9);
    if (d.length <= 2) return p1 ? `(${p1}` + (d.length === 2 ? ")" : "") : "";
    if (d.length <= 5) return `(${p1}) ${p2}`;
    if (d.length <= 7) return `(${p1}) ${p2}-${p3}`;
    return `(${p1}) ${p2}-${p3}-${p4}`;
  }

  // Общий шаблон: (XX…) остаток с дефисами по 2–3
  if (d.length <= 2) return d ? `(${d}` : "";
  const areaLen = Math.min(3, Math.max(2, Math.floor(country.nationalLength / 3)));
  const p1 = d.slice(0, areaLen);
  const rest = d.slice(areaLen);
  if (!rest) return `(${p1}` + (d.length >= areaLen ? ")" : "");
  const chunks: string[] = [];
  for (let i = 0; i < rest.length; i += 3) {
    chunks.push(rest.slice(i, i + 3));
  }
  return `(${p1}) ${chunks.join("-")}`;
};

export const buildFullPhone = (country: CisCountry, nationalDigits: string): string => {
  const national = digitsOnly(nationalDigits).slice(0, country.nationalLength);
  if (!national) return "";
  return `+${country.dialCode}${national}`;
};

/**
 * Угадывает страну по полному номеру. Для +7 по умолчанию Россия.
 * `preferredIso` сохраняет выбор пользователя (RU vs KZ).
 */
export const parseFullPhone = (
  value: string,
  preferredIso?: string
): { country: CisCountry; national: string } => {
  const digits = digitsOnly(value);
  if (!digits) {
    const preferred = preferredIso
      ? CIS_COUNTRIES.find((c) => c.iso === preferredIso)
      : undefined;
    return { country: preferred ?? DEFAULT_CIS_COUNTRY, national: "" };
  }

  if (preferredIso === "KZ" && digits.startsWith("7")) {
    const kz = CIS_COUNTRIES.find((c) => c.iso === "KZ")!;
    return { country: kz, national: digits.slice(1) };
  }

  const sorted = [...CIS_COUNTRIES]
    .filter((c) => c.iso !== "KZ") // KZ только через preferredIso
    .sort((a, b) => b.dialCode.length - a.dialCode.length);

  for (const country of sorted) {
    if (digits.startsWith(country.dialCode)) {
      return {
        country,
        national: digits.slice(country.dialCode.length),
      };
    }
  }

  return { country: DEFAULT_CIS_COUNTRY, national: digits };
};

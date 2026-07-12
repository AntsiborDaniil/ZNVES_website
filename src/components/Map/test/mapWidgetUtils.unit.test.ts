import { describe, expect, it } from "vitest";
import type { CdekPvzPoint } from "../../../api/delivery/cdekApi";
import {
  buildCdekPvzSelection,
  buildYaDeliveryWidgetParams,
  filterCdekPvzPoints,
  getMapDeliveryMode,
  isInMoscow,
  normalizePvzSearch,
  parseAddressFromGeoObject,
  parseYaNddWidgetSelection,
} from "../mapWidgetUtils";

const samplePvz: CdekPvzPoint = {
  code: "MSK001",
  name: "ПВЗ СДЭК (Тверская)",
  address: "г. Москва, ул. Тверская, д. 1",
  location: { lat: 55.7657, lon: 37.6056 },
  work_time: "Пн-Пт 9:00–21:00",
};

describe("getMapDeliveryMode", () => {
  it("detects pickup modes and courier", () => {
    expect(getMapDeliveryMode("pickup", "yandex")).toBe("pickup-yandex");
    expect(getMapDeliveryMode("pickup", "cdek")).toBe("pickup-cdek");
    expect(getMapDeliveryMode("yandex", "yandex")).toBe("courier");
    expect(getMapDeliveryMode("pickup", "other")).toBe("idle");
  });
});

describe("filterCdekPvzPoints", () => {
  const list = [
    samplePvz,
    {
      ...samplePvz,
      code: "MSK002",
      name: "ПВЗ СДЭК (Арбат)",
      address: "г. Москва, ул. Арбат, д. 10",
    },
  ];

  it("returns full list for empty query", () => {
    expect(filterCdekPvzPoints(list, "")).toHaveLength(2);
    expect(filterCdekPvzPoints(list, "   ")).toHaveLength(2);
  });

  it("filters by address, name, code and work time", () => {
    expect(filterCdekPvzPoints(list, "арбат")).toHaveLength(1);
    expect(filterCdekPvzPoints(list, "msk001")).toHaveLength(1);
    expect(filterCdekPvzPoints(list, "пн-пт")).toHaveLength(2);
    expect(filterCdekPvzPoints(list, "нет такого")).toHaveLength(0);
  });

  it("normalizes whitespace in search", () => {
    expect(normalizePvzSearch("  Тверская   1  ")).toBe("тверская 1");
  });
});

describe("buildCdekPvzSelection", () => {
  it("builds address payload and pvz option", () => {
    const result = buildCdekPvzSelection(samplePvz, "Москва");
    expect(result.addressData).toMatchObject({
      city: "Москва",
      pvzCode: "MSK001",
      pvzAddress: samplePvz.address,
      fullAddress: samplePvz.address,
      lat: 55.7657,
      lon: 37.6056,
    });
    expect(result.pvzOption.name).toBe(samplePvz.name);
    expect(result.pvzOption.code).toBe("MSK001");
  });
});

describe("parseYaNddWidgetSelection", () => {
  it("returns null for empty detail", () => {
    expect(parseYaNddWidgetSelection(null, "Москва")).toBeNull();
  });

  it("parses widget point with full address", () => {
    const result = parseYaNddWidgetSelection(
      {
        id: "ya-1",
        address: {
          full_address: "Москва, ул. Ленина, 1",
          locality: "Москва",
          street: "ул. Ленина",
          house: "1",
        },
      },
      "Москва"
    );

    expect(result?.fullAddress).toBe("Москва, ул. Ленина, 1");
    expect(result?.addressData.pvzId).toBe("ya-1");
    expect(result?.pvzOption.id).toBe("ya-1");
  });

  it("falls back to id when address parts are missing", () => {
    const result = parseYaNddWidgetSelection({ id: "ya-42" }, "Москва");
    expect(result?.fullAddress).toBe("ПВЗ ya-42");
    expect(result?.pvzOption.name).toBe("ПВЗ ya-42");
  });
});

describe("buildYaDeliveryWidgetParams", () => {
  it("uses minimum weight and widget filter defaults", () => {
    const params = buildYaDeliveryWidgetParams("Москва", "Москва, тест, 1", 0);
    expect(params.city).toBe("Москва");
    expect(params.source_address).toBe("Москва, тест, 1");
    expect(params.physical_dims_weight_gross).toBe(100);
    expect(params.filter.type).toEqual(["pickup_point", "terminal"]);
    expect(params.show_select_button).toBe(true);
  });

  it("keeps provided weight when above minimum", () => {
    const params = buildYaDeliveryWidgetParams("Москва", "addr", 2500);
    expect(params.physical_dims_weight_gross).toBe(2500);
  });
});

describe("isInMoscow", () => {
  it("recognizes Moscow variants", () => {
    expect(isInMoscow({ city: "Москва" })).toBe(true);
    expect(isInMoscow({ city: "Moscow" })).toBe(true);
    expect(isInMoscow({ city: "Московская область" })).toBe(true);
    expect(isInMoscow({ city: "Санкт-Петербург" })).toBe(false);
  });
});

describe("parseAddressFromGeoObject", () => {
  it("extracts city, street and house from geocoder metadata", () => {
    const result = parseAddressFromGeoObject({
      properties: {
        get: () => ({
          GeocoderMetaData: {
            text: "Россия, Москва, Тверская улица, 1",
            Address: {
              Components: [
                { kind: "locality", name: "Москва" },
                { kind: "street", name: "Тверская улица" },
                { kind: "house", name: "1" },
              ],
            },
          },
        }),
      },
      getAddressLine: () => "fallback line",
    });

    expect(result).toEqual({
      city: "Москва",
      street: "Тверская улица",
      house: "1",
      fullAddress: "Россия, Москва, Тверская улица, 1",
    });
  });
});

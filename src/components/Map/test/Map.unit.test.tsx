import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CdekPvzPoint } from "../../../api/delivery/cdekApi";
import Map from "../Map";
import { YANDEX_PVZ_CONTAINER_ID } from "../mapWidgetUtils";

const mockPvzList: CdekPvzPoint[] = [
  {
    code: "MSK001",
    name: "ПВЗ СДЭК (Тверская)",
    address: "г. Москва, ул. Тверская, д. 1",
    location: { lat: 55.7657, lon: 37.6056 },
    work_time: "Пн-Пт 9:00–21:00",
  },
  {
    code: "MSK002",
    name: "ПВЗ СДЭК (Арбат)",
    address: "г. Москва, ул. Арбат, д. 10",
    location: { lat: 55.7522, lon: 37.5932 },
    work_time: "Пн-Вс 10:00–20:00",
  },
];

const getRegionPvzCdek = vi.fn();

vi.mock("../../../api/delivery/pvzRegionCache", () => ({
  getRegionPvzCdek: (...args: unknown[]) => getRegionPvzCdek(...args),
  getRegionPvzYandex: vi.fn(),
}));

describe("Map", () => {
  const createWidget = vi.fn();

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  beforeEach(() => {
    getRegionPvzCdek.mockReset();
    getRegionPvzCdek.mockResolvedValue(mockPvzList);
    createWidget.mockReset();
    window.YaDelivery = { createWidget };
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        yaDeliverySourceAddress: "Москва, тест, 1",
        cdekConfigured: true,
      }),
    } as Response);
  });

  it("shows idle placeholder when delivery mode is not selected", () => {
    render(<Map city="Москва" />);
    expect(screen.getByText("Выберите способ доставки.")).toBeInTheDocument();
  });

  it("loads CDEK PVZ via region cache and handles search and selection", async () => {
    const user = userEvent.setup();
    const onAddressSelect = vi.fn();

    render(
      <Map
        city="Москва"
        deliveryMethod="pickup"
        deliveryType="cdek"
        onAddressSelect={onAddressSelect}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/СДЭК · Пункты выдачи · Москва/)).toBeInTheDocument();
    });

    expect(getRegionPvzCdek).toHaveBeenCalledWith("Москва", expect.any(AbortSignal));
    expect(screen.getByRole("button", { name: /Тверская/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Арбат/ })).toBeInTheDocument();

    const search = screen.getByRole("textbox", { name: "Поиск по адресу ПВЗ" });
    await user.type(search, "арбат");
    expect(screen.queryByRole("button", { name: /Тверская/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Арбат/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Арбат/ }));
    expect(onAddressSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        city: "Москва",
        pvzCode: "MSK002",
        pvzAddress: "г. Москва, ул. Арбат, д. 10",
      })
    );
  });

  it("initializes Yandex PVZ widget container", async () => {
    render(
      <Map
        city="Москва"
        deliveryMethod="pickup"
        deliveryType="yandex"
        totalWeightGrams={500}
      />
    );

    await waitFor(() => {
      expect(document.getElementById(YANDEX_PVZ_CONTAINER_ID)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(createWidget).toHaveBeenCalledWith(
        expect.objectContaining({
          containerId: YANDEX_PVZ_CONTAINER_ID,
          params: expect.objectContaining({
            city: "Москва",
            source_address: "Москва, тест, 1",
            physical_dims_weight_gross: 500,
          }),
        })
      );
    });
  });

  it("does not re-create Yandex widget when only weight changes", async () => {
    const { rerender } = render(
      <Map
        city="Москва"
        deliveryMethod="pickup"
        deliveryType="yandex"
        totalWeightGrams={500}
      />
    );

    await waitFor(() => {
      expect(createWidget).toHaveBeenCalledTimes(1);
    });

    rerender(
      <Map
        city="Москва"
        deliveryMethod="pickup"
        deliveryType="yandex"
        totalWeightGrams={2500}
      />
    );

    await waitFor(() => {
      expect(document.getElementById(YANDEX_PVZ_CONTAINER_ID)).toBeInTheDocument();
    });

    // cleanup+recreate would bump createWidget; weight-only update must not
    expect(createWidget).toHaveBeenCalledTimes(1);
  });

  it("forwards Yandex widget point selection event", async () => {
    const onAddressSelect = vi.fn();
    const onPvzListLoaded = vi.fn();

    render(
      <Map
        city="Москва"
        deliveryMethod="pickup"
        deliveryType="yandex"
        onAddressSelect={onAddressSelect}
        onPvzListLoaded={onPvzListLoaded}
      />
    );

    document.dispatchEvent(
      new CustomEvent("YaNddWidgetPointSelected", {
        detail: {
          id: "ya-100",
          address: {
            full_address: "Москва, ул. Ленина, 5",
            locality: "Москва",
            street: "ул. Ленина",
            house: "5",
          },
        },
      })
    );

    await waitFor(() => {
      expect(onAddressSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          pvzId: "ya-100",
          fullAddress: "Москва, ул. Ленина, 5",
        })
      );
      expect(onPvzListLoaded).toHaveBeenCalledWith([
        expect.objectContaining({
          id: "ya-100",
          address: "Москва, ул. Ленина, 5",
        }),
      ]);
    });
  });
});

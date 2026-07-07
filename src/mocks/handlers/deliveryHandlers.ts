import { http, HttpResponse } from "msw";
import { getFallbackPvzForCity } from "../../api/delivery/cdekApi";
import { getMockApiBase } from "../config";

const MOCK_DELIVERY_CONFIG = {
  yaDeliverySourceAddress: "Москва, Промышленная улица, 12А, 115516",
  cdekConfigured: true,
};

const MOCK_CDEK_CALCULATE = {
  price: 350,
  days_min: 2,
  days_max: 4,
  from_api: false,
};

const getCityFromUrl = (request: Request): string => {
  const url = new URL(request.url);
  return url.searchParams.get("city") ?? "Москва";
};

export const createDeliveryHandlers = () => {
  const base = getMockApiBase();

  const pvzHandler = ({ request }: { request: Request }) => {
    const city = getCityFromUrl(request);
    return HttpResponse.json(getFallbackPvzForCity(city));
  };

  const calculateHandler = () => HttpResponse.json(MOCK_CDEK_CALCULATE);

  const configHandler = () => HttpResponse.json(MOCK_DELIVERY_CONFIG);

  return [
    http.get("/api/cdek/pvz", pvzHandler),
    http.get("/api/cdek/calculate", calculateHandler),
    http.get("/api/delivery/config", configHandler),

    http.get(`${base}/api/delivery/cdek/pvz`, pvzHandler),
    http.get(`${base}/api/delivery/yandex/pvz`, pvzHandler),
  ];
};

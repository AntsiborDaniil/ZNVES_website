import { http, HttpResponse } from "msw";
import { getMockApiBase } from "../config";
import { MOCK_HOME_PAGE } from "../data/home";

export const createHomeHandlers = () => {
  const base = getMockApiBase();

  return [
    http.get(`${base}/api/home/`, () => HttpResponse.json(MOCK_HOME_PAGE)),
  ];
};

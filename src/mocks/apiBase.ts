import { API_BASE_URL } from "../lib/apiConfig";

/** База URL для MSW handlers — без barrel `config`, чтобы не тянуть данные в HMR-граф. */
export const getMockApiBase = (): string => API_BASE_URL.replace(/\/$/, "");

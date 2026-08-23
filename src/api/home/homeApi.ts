import { API_BASE_URL } from "../../lib/apiConfig";
import { shouldUseMocks } from "../../mocks/config";
import { MOCK_HOME_PAGE } from "../../mocks/data/home";
import type { HomePageContent } from "../../types/home";

const HOME_API_URL = `${API_BASE_URL}/api/home/`;

let cache: { data: HomePageContent; timestamp: number } | null = null;
const CACHE_DURATION = 15 * 60 * 1000;

export const fetchHomePage = async (): Promise<HomePageContent> => {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  if (shouldUseMocks()) {
    cache = { data: MOCK_HOME_PAGE, timestamp: Date.now() };
    return MOCK_HOME_PAGE;
  }

  try {
    const response = await fetch(HOME_API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as HomePageContent;
    cache = { data, timestamp: Date.now() };
    return data;
  } catch {
    return MOCK_HOME_PAGE;
  }
};

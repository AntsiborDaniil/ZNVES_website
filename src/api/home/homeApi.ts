import { API_BASE_URL } from "../../lib/apiConfig";
import { API_REVALIDATE } from "../../lib/apiCache";
import { shouldUseMocks } from "../../mocks/config";
import { MOCK_HOME_PAGE } from "../../mocks/data/home";
import type { HomePageContent } from "../../types/home";

const HOME_API_URL = `${API_BASE_URL}/api/home/`;

let memoryCache: { data: HomePageContent; timestamp: number } | null = null;

export const fetchHomePage = async (): Promise<HomePageContent> => {
  if (
    memoryCache &&
    Date.now() - memoryCache.timestamp < API_REVALIDATE.home * 1000
  ) {
    return memoryCache.data;
  }

  if (shouldUseMocks()) {
    memoryCache = { data: MOCK_HOME_PAGE, timestamp: Date.now() };
    return MOCK_HOME_PAGE;
  }

  try {
    const response = await fetch(HOME_API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: API_REVALIDATE.home },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as HomePageContent;
    memoryCache = { data, timestamp: Date.now() };
    return data;
  } catch {
    return MOCK_HOME_PAGE;
  }
};

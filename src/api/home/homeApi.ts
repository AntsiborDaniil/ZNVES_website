import { API_BASE_URL } from "../../lib/apiConfig";
import { shouldUseMocks } from "../../lib/useMocks";
import type { HomePageContent } from "../../types/home";

const HOME_API_URL = `${API_BASE_URL}/api/home/`;

/** ISR cache for home content (seconds). */
const REVALIDATE_SECONDS = 15 * 60;

let memoryCache: { data: HomePageContent; timestamp: number } | null = null;

export const fetchHomePage = async (): Promise<HomePageContent> => {
  if (memoryCache && Date.now() - memoryCache.timestamp < REVALIDATE_SECONDS * 1000) {
    return memoryCache.data;
  }

  if (shouldUseMocks()) {
    const { MOCK_HOME_PAGE } = await import("../../mocks/data/home");
    memoryCache = { data: MOCK_HOME_PAGE, timestamp: Date.now() };
    return MOCK_HOME_PAGE;
  }

  try {
    const response = await fetch(HOME_API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = (await response.json()) as HomePageContent;
    memoryCache = { data, timestamp: Date.now() };
    return data;
  } catch {
    const { MOCK_HOME_PAGE } = await import("../../mocks/data/home");
    return MOCK_HOME_PAGE;
  }
};

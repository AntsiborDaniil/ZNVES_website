import { fetchWithTimeout } from "../../lib/fetchWithTimeout";
import { resolveApiImageUrl } from "../../lib/imageUrl";
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
    const response = await fetchWithTimeout(HOME_API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const raw = (await response.json()) as HomePageContent;
    const data = { ...raw, catalog_featured_image: raw.catalog_featured_image ? resolveApiImageUrl(raw.catalog_featured_image, API_BASE_URL) : raw.catalog_featured_image };
    memoryCache = { data, timestamp: Date.now() };
    return data;
  } catch {
    const { MOCK_HOME_PAGE } = await import("../../mocks/data/home");
    return MOCK_HOME_PAGE;
  }
};

import { resolveApiImageUrl } from "./imageUrl";

/** Картинка с каталога/товара: строка (legacy) или объект с is_main */
export type ApiProductImage =
  | string
  | {
      url?: string | null;
      image?: string | null;
      src?: string | null;
      path?: string | null;
      is_main?: boolean | null;
    };

type ParsedImage = {
  url: string;
  isMain: boolean;
};

const parseApiProductImages = (
  images: ApiProductImage[] | undefined | null
): ParsedImage[] => {
  if (!Array.isArray(images)) return [];

  const parsed: ParsedImage[] = [];
  for (const item of images) {
    if (typeof item === "string") {
      const url = item.trim();
      if (url) parsed.push({ url, isMain: false });
      continue;
    }
    if (!item || typeof item !== "object") continue;
    const url = String(
      item.url ?? item.image ?? item.src ?? item.path ?? ""
    ).trim();
    if (!url) continue;
    parsed.push({ url, isMain: Boolean(item.is_main) });
  }
  return parsed;
};

/**
 * Фото для карточки каталога / hover:
 * если есть is_main — только они (в порядке ответа API);
 * иначе весь список (бэк уже отдаёт main первыми).
 */
export const resolveCardImages = (
  images: ApiProductImage[] | undefined | null,
  baseUrl: string
): string[] => {
  const parsed = parseApiProductImages(images);
  if (parsed.length === 0) return [];

  const hasMainFlag = parsed.some((image) => image.isMain);
  const selected = hasMainFlag
    ? parsed.filter((image) => image.isMain)
    : parsed;

  return selected.map((image) => resolveApiImageUrl(image.url, baseUrl));
};

/**
 * Галерея на странице товара: все фото, is_main первыми.
 */
export const resolveGalleryImages = (
  images: ApiProductImage[] | undefined | null,
  baseUrl: string
): string[] => {
  const parsed = parseApiProductImages(images);
  if (parsed.length === 0) return [];

  const hasMainFlag = parsed.some((image) => image.isMain);
  const ordered = hasMainFlag
    ? [
        ...parsed.filter((image) => image.isMain),
        ...parsed.filter((image) => !image.isMain),
      ]
    : parsed;

  return ordered.map((image) => resolveApiImageUrl(image.url, baseUrl));
};

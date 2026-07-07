/** Локальные ассеты из /public — не дополняем API_BASE_URL. */
export const resolveApiImageUrl = (img: string, baseUrl: string): string => {
  if (img.startsWith("http")) return img;
  if (img.startsWith("/images/")) return img;
  return img.startsWith("/") ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
};

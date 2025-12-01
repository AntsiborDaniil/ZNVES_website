/**
 * Проверяет, является ли URL изображения внешним (не с того же домена)
 */
export const isExternalImage = (src: string): boolean => {
  if (!src) return false;

  // Если это относительный путь, то это локальное изображение
  if (src.startsWith("/")) return false;

  // Если это data URL, то это локальное изображение
  if (src.startsWith("data:")) return false;

  // Проверяем, начинается ли URL с http:// или https://
  return src.startsWith("http://") || src.startsWith("https://");
};

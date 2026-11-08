/** Use a same-origin image URL in SSR and browser output to keep hydration consistent. */
export const resolveApiImageUrl = (img: string, baseUrl: string): string => {
  if (img.startsWith("/images/") || img.startsWith("/api/media/")) return img;
  try {
    const base = new URL(baseUrl);
    const url = new URL(img, `${base.origin}/`);
    if (url.origin === base.origin && url.pathname.startsWith("/media/")) {
      return `/api/media/${url.pathname.slice("/media/".length)}`;
    }
    return url.toString();
  } catch { return img; }
};

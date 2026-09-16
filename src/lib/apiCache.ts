/** Shared Next.js fetch revalidate windows (seconds). */
export const API_REVALIDATE = {
  /** Home / catalog lists / new-in */
  catalog: 5 * 60,
  /** Categories, colors, sizes */
  filters: 15 * 60,
  /** Product detail (stock can change) */
  product: 60,
  /** Home CMS block */
  home: 15 * 60,
} as const;

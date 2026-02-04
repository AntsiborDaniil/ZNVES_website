/**
 * Подсказки адресов для поля «Адрес пункта выдачи».
 * Ручка: GET /api/address-suggest?q=... (прокси к Yandex Suggest).
 */

export type AddressSuggestion = {
  displayName: string;
  value: string;
};

export async function getAddressSuggestions(query: string): Promise<AddressSuggestion[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const params = new URLSearchParams({ q });
  const res = await fetch(`/api/address-suggest?${params.toString()}`);
  if (!res.ok) return [];

  const data = await res.json();
  const list = data?.suggestions ?? [];
  return Array.isArray(list)
    ? list.filter(
        (s: AddressSuggestion) => s && (s.displayName || s.value)
      )
    : [];
}

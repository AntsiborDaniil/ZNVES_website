/**
 * Публичный конфиг доставки. Читает env на сервере в runtime — на проде переменные
 * задаются в настройках хоста (Vercel и т.д.), не только при сборке.
 * GET /api/delivery/config
 */

import { NextResponse } from "next/server";

const DEFAULT_YA_SOURCE_ADDRESS = "Москва, Промышленная улица, 12А, 115516";

export async function GET() {
  // Адрес ПВЗ «откуда везём» — можно задать серверной переменной без NEXT_PUBLIC_
  const yaSource =
    process.env.YA_DELIVERY_SOURCE_ADDRESS ??
    process.env.NEXT_PUBLIC_YA_DELIVERY_SOURCE_ADDRESS ??
    DEFAULT_YA_SOURCE_ADDRESS;

  const cdekConfigured =
    !!(process.env.CDEK_ACCOUNT ?? process.env.CDEK_CLIENT_ID) &&
    !!(process.env.CDEK_SECURE_PASSWORD ?? process.env.CDEK_CLIENT_SECRET);

  return NextResponse.json({
    yaDeliverySourceAddress: yaSource.trim(),
    cdekConfigured,
  });
}

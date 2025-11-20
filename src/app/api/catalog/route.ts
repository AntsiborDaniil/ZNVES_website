import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://158.160.115.103:8000";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const is_new = searchParams.get("is_new");

    // Формируем URL для запроса к внешнему API
    const apiUrl = new URL(`${API_BASE_URL}/api/catalog/`);

    if (category) {
      apiUrl.searchParams.append("category", category);
    }
    if (is_new !== null) {
      apiUrl.searchParams.append("is_new", is_new);
    }

    // Делаем запрос к внешнему API
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // Отключаем кеширование на уровне fetch, чтобы всегда получать свежие данные
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Возвращаем данные с CORS заголовками
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Error proxying catalog request:", error);
    return NextResponse.json(
      { error: "Failed to fetch catalog" },
      { status: 500 }
    );
  }
}

// Обработка OPTIONS запросов для CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

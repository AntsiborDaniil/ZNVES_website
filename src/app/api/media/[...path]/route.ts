import { NextRequest } from "next/server";
import { proxyMedia } from "../../../../lib/server/mediaProxy";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ path: string[] }> };
async function handle(request: NextRequest, context: Context) {
  return proxyMedia(request, (await context.params).path);
}
export { handle as GET, handle as HEAD };

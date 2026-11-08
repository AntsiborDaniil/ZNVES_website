import { NextRequest } from "next/server";
import { proxyShopRequest } from "../../../../lib/server/shopBff";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ path: string[] }> };
async function handle(request: NextRequest, context: Context) {
  return proxyShopRequest(request, (await context.params).path);
}
export { handle as GET, handle as POST, handle as PATCH };

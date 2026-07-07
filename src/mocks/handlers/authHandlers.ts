import { http, HttpResponse } from "msw";
import { getMockApiBase } from "../config";
import {
  buildSessionCookies,
  getUserByToken,
  parseAccessToken,
  resendCode,
  startLogin,
  startRegistration,
  updateDeliveryByToken,
  updateUserByToken,
  verifyCode,
} from "../state/authStore";

const jsonError = (message: string, status = 400) =>
  HttpResponse.json({ detail: message }, { status });

const readJson = async <T>(request: Request): Promise<T> =>
  (await request.json()) as T;

export const createAuthHandlers = () => {
  const base = getMockApiBase();

  return [
    http.post(`${base}/register/`, async ({ request }) => {
      const body = await readJson<{
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        phone_number: string;
      }>(request);

      const result = startRegistration(body);
      if (!result.ok) return jsonError(result.error);
      return HttpResponse.json({}, { status: 200 });
    }),

    http.post(`${base}/register/verify/`, async ({ request }) => {
      const body = await readJson<{ email: string; code: string }>(request);
      const result = verifyCode(body.email, body.code);
      if (!result.ok) return jsonError(result.error);

      return HttpResponse.json(
        {},
        {
          status: 200,
          headers: {
            "Set-Cookie": buildSessionCookies(result.token).join(", "),
          },
        }
      );
    }),

    http.post(`${base}/login/`, async ({ request }) => {
      const body = await readJson<{ email: string; password: string }>(request);
      const result = startLogin(body);
      if (!result.ok) return jsonError(result.error, 401);
      return HttpResponse.json({}, { status: 200 });
    }),

    http.post(`${base}/login/verify/`, async ({ request }) => {
      const body = await readJson<{ email: string; code: string }>(request);
      const result = verifyCode(body.email, body.code);
      if (!result.ok) return jsonError(result.error);

      return HttpResponse.json(
        {},
        {
          status: 200,
          headers: {
            "Set-Cookie": buildSessionCookies(result.token).join(", "),
          },
        }
      );
    }),

    http.post(`${base}/api/auth/register/resend-code/`, async ({ request }) => {
      const body = await readJson<{ email: string }>(request);
      const result = resendCode(body.email);
      if (!result.ok) return jsonError(result.error);
      return HttpResponse.json({}, { status: 200 });
    }),

    http.get(`${base}/api/auth/user/`, ({ request }) => {
      const token = parseAccessToken(request.headers.get("cookie"));
      const user = getUserByToken(token);
      if (!user) return HttpResponse.json({ detail: "Unauthorized" }, { status: 401 });
      return HttpResponse.json(user);
    }),

    http.patch(`${base}/api/auth/user/`, async ({ request }) => {
      const token = parseAccessToken(request.headers.get("cookie"));
      const patch = await readJson<Record<string, string>>(request);
      const user = updateUserByToken(token, patch);
      if (!user) return HttpResponse.json({ detail: "Unauthorized" }, { status: 401 });
      return HttpResponse.json(user);
    }),

    http.patch(`${base}/api/auth/user/delivery-data/`, async ({ request }) => {
      const token = parseAccessToken(request.headers.get("cookie"));
      const patch = await readJson<Record<string, string>>(request);
      const data = updateDeliveryByToken(token, patch);
      if (!data) return HttpResponse.json({ detail: "Unauthorized" }, { status: 401 });
      return HttpResponse.json(data);
    }),
  ];
};

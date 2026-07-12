import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseAuthUser, verifyLogin } from "../authApi";

describe("authApi verify flow", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);

        if (url.includes("/api/auth/login/verify/")) {
          return new Response(JSON.stringify({ detail: "Вход выполнен." }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (url.includes("/api/auth/user/")) {
          return new Response(
            JSON.stringify({
              email: "user@yandex.ru",
              first_name: "Test",
              last_name: "User",
              phone_number: "+79990000000",
              delivery_data: null,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        return new Response(JSON.stringify({ detail: "Not found" }), { status: 404 });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("parseAuthUser ignores detail-only payloads", () => {
    expect(parseAuthUser({ detail: "Вход выполнен." })).toBeNull();
    expect(
      parseAuthUser({
        email: "user@yandex.ru",
        first_name: "Test",
        last_name: "User",
        phone_number: "+79990000000",
      })?.email
    ).toBe("user@yandex.ru");
  });

  it("verifyLogin loads profile when verify returns detail message", async () => {
    const user = await verifyLogin({ email: "user@yandex.ru", code: "123456" });
    expect(user.email).toBe("user@yandex.ru");
    expect(user.first_name).toBe("Test");
  });
});

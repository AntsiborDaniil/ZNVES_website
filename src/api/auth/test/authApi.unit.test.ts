import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  AUTH_VERIFY_SESSION_ERROR_MESSAGE,
  AuthApiError,
  getCurrentUserWithRetry,
  parseAuthUser,
  verifyLogin,
} from "../authApi";

const mockUserResponse = () =>
  new Response(
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
          return mockUserResponse();
        }

        return new Response(JSON.stringify({ detail: "Not found" }), { status: 404 });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
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

  it("verifyLogin retries /user/ when cookie is not ready on first attempt", async () => {
    let userCalls = 0;

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
          userCalls += 1;
          if (userCalls === 1) {
            return new Response(
              JSON.stringify({ detail: "Учетные данные не были предоставлены." }),
              { status: 401, headers: { "Content-Type": "application/json" } }
            );
          }
          return mockUserResponse();
        }

        return new Response(JSON.stringify({ detail: "Not found" }), { status: 404 });
      })
    );

    vi.useFakeTimers();

    const verifyPromise = verifyLogin({ email: "user@yandex.ru", code: "123456" });
    await vi.runAllTimersAsync();
    const user = await verifyPromise;

    expect(user.email).toBe("user@yandex.ru");
    expect(userCalls).toBe(2);
  });

  it("verifyLogin throws AuthApiError when session is never established", async () => {
    let userCalls = 0;

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
          userCalls += 1;
          return new Response(
            JSON.stringify({ detail: "Учетные данные не были предоставлены." }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }

        return new Response(JSON.stringify({ detail: "Not found" }), { status: 404 });
      })
    );

    vi.useFakeTimers();

    const verifyPromise = verifyLogin({ email: "user@yandex.ru", code: "123456" });
    const assertion = expect(verifyPromise).rejects.toMatchObject({
      name: "AuthApiError",
      message: AUTH_VERIFY_SESSION_ERROR_MESSAGE,
    });
    await vi.runAllTimersAsync();
    await assertion;
    expect(userCalls).toBe(3);
  });
});

describe("getCurrentUserWithRetry", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("returns user on second attempt after delay", async () => {
    let userCalls = 0;

    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (!url.includes("/api/auth/user/")) {
          return new Response(null, { status: 404 });
        }

        userCalls += 1;
        if (userCalls === 1) {
          return new Response(JSON.stringify({ detail: "Unauthorized" }), { status: 401 });
        }
        return mockUserResponse();
      })
    );

    vi.useFakeTimers();

    const userPromise = getCurrentUserWithRetry(3, 100);
    await vi.runAllTimersAsync();
    const user = await userPromise;

    expect(user?.email).toBe("user@yandex.ru");
    expect(userCalls).toBe(2);
  });
});

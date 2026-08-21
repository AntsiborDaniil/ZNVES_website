import { afterEach, describe, expect, it } from "vitest";
import { MOCK_AUTH_CODE, MOCK_DEV_USER } from "../config";
import {
  changePasswordByToken,
  getUserByToken,
  parseAccessToken,
  resetAuthStore,
  startLogin,
  startRegistration,
  verifyCode,
} from "../state/authStore";

describe("authStore", () => {
  afterEach(() => {
    resetAuthStore();
  });

  it("seeds dev user on reset", () => {
    const login = startLogin({
      email: MOCK_DEV_USER.email,
      password: MOCK_DEV_USER.password,
    });
    expect(login.ok).toBe(true);
  });

  it("changes password for authenticated mock user", () => {
    startLogin({
      email: MOCK_DEV_USER.email,
      password: MOCK_DEV_USER.password,
    });
    const session = verifyCode(MOCK_DEV_USER.email, MOCK_AUTH_CODE);
    expect(session.ok).toBe(true);
    if (!session.ok) return;

    const wrong = changePasswordByToken(session.token, {
      current_password: "wrong",
      new_password: "newpass123",
    });
    expect(wrong.ok).toBe(false);

    const ok = changePasswordByToken(session.token, {
      current_password: MOCK_DEV_USER.password,
      new_password: "newpass123",
    });
    expect(ok.ok).toBe(true);

    const loginWithOld = startLogin({
      email: MOCK_DEV_USER.email,
      password: MOCK_DEV_USER.password,
    });
    expect(loginWithOld.ok).toBe(false);

    const loginWithNew = startLogin({
      email: MOCK_DEV_USER.email,
      password: "newpass123",
    });
    expect(loginWithNew.ok).toBe(true);
  });

  it("rejects duplicate registration", () => {
    const first = startRegistration({
      email: "new@znves.ru",
      password: "secret123",
      first_name: "New",
      last_name: "User",
      phone_number: "+79990001122",
    });
    expect(first.ok).toBe(true);

    const verify = verifyCode("new@znves.ru", MOCK_AUTH_CODE);
    expect(verify.ok).toBe(true);

    const duplicate = startRegistration({
      email: "new@znves.ru",
      password: "other",
      first_name: "Dup",
      last_name: "User",
      phone_number: "+79990001123",
    });
    expect(duplicate.ok).toBe(false);
  });

  it("verifies registration with mock code and creates session", () => {
    startRegistration({
      email: "buyer@znves.ru",
      password: "secret123",
      first_name: "Buyer",
      last_name: "Test",
      phone_number: "+79991112233",
    });

    const wrong = verifyCode("buyer@znves.ru", "000000");
    expect(wrong.ok).toBe(false);

    const ok = verifyCode("buyer@znves.ru", MOCK_AUTH_CODE);
    expect(ok.ok).toBe(true);
    if (!ok.ok) return;

    const user = getUserByToken(ok.token);
    expect(user?.email).toBe("buyer@znves.ru");
    expect(user?.first_name).toBe("Buyer");
  });

  it("parses access token from cookie header", () => {
    expect(parseAccessToken("access-token=abc123; other=1")).toBe("abc123");
    expect(parseAccessToken(null)).toBeNull();
  });
});

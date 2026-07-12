import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearPendingAccountAuthFlow,
  getPendingAccountAuthFlow,
  getResendCooldownRemaining,
  savePendingAccountAuthFlow,
} from "../accountAuthFlowStorage";

describe("accountAuthFlowStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("stores and restores pending verify flow", () => {
    savePendingAccountAuthFlow({
      step: "verify",
      mode: "login",
      pendingEmail: "user@yandex.ru",
      loginPassword: "secret",
      resendCooldownEndsAt: Date.now() + 30_000,
    });

    const pending = getPendingAccountAuthFlow();
    expect(pending?.pendingEmail).toBe("user@yandex.ru");
    expect(pending?.mode).toBe("login");
    expect(getResendCooldownRemaining(pending?.resendCooldownEndsAt)).toBeGreaterThan(0);
  });

  it("clears pending flow", () => {
    savePendingAccountAuthFlow({
      step: "verify",
      mode: "register",
      pendingEmail: "user@yandex.ru",
    });
    clearPendingAccountAuthFlow();
    expect(getPendingAccountAuthFlow()).toBeNull();
  });
});

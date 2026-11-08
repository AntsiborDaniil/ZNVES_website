import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ getCurrentUser: vi.fn(), updateCurrentUser: vi.fn(), logoutUser: vi.fn(), loginUser: vi.fn() }));
vi.mock("../../api/auth/authApi", async (importOriginal) => ({
  ...await importOriginal<typeof import("../../api/auth/authApi")>(),
  getCurrentUser: mocks.getCurrentUser,
  updateCurrentUser: mocks.updateCurrentUser,
  logoutUser: mocks.logoutUser,
  loginUser: mocks.loginUser,
}));
import { shopApi, toApiError } from "../api";
import { makeStore, type AppStore } from "../store";
import { AuthApiError } from "../../api/auth/authApiErrors";
const stores: AppStore[] = [];
const newStore = () => { const store = makeStore(); stores.push(store); return store; };
const user = { first_name: "A", last_name: "", email: "a@example.com", phone_number: "" };
beforeEach(() => { vi.resetAllMocks(); mocks.getCurrentUser.mockResolvedValue(user); mocks.updateCurrentUser.mockResolvedValue(user); });
afterEach(() => { for (const store of stores) store.dispatch(shopApi.util.resetApiState()); stores.length = 0; });

describe("RTK Query state ownership", () => {
  it("isolates cached user data between application instances", async () => {
    const first = newStore(); const second = newStore();
    await first.dispatch(shopApi.endpoints.getCurrentUser.initiate()).unwrap();
    expect(shopApi.endpoints.getCurrentUser.select()(first.getState()).data).toEqual(user);
    expect(shopApi.endpoints.getCurrentUser.select()(second.getState()).data).toBeUndefined();
  });

  it("deduplicates simultaneous requests for the same profile", async () => {
    const store = newStore();
    await Promise.all([
      store.dispatch(shopApi.endpoints.getCurrentUser.initiate()).unwrap(),
      store.dispatch(shopApi.endpoints.getCurrentUser.initiate()).unwrap(),
    ]);
    expect(mocks.getCurrentUser).toHaveBeenCalledTimes(1);
  });

  it("refreshes a subscribed profile after a profile mutation", async () => {
    const store = newStore();
    await store.dispatch(shopApi.endpoints.getCurrentUser.initiate()).unwrap();
    await store.dispatch(shopApi.endpoints.updateCurrentUser.initiate({ first_name: "Changed" })).unwrap();
    await vi.waitFor(() => expect(mocks.getCurrentUser).toHaveBeenCalledTimes(2));
  });

  it("reset prevents late responses from restoring the previous identity", async () => {
    let resolve!: (value: typeof user) => void;
    mocks.getCurrentUser.mockImplementationOnce(() => new Promise((done) => { resolve = done; }));
    const store = newStore();
    const pending = store.dispatch(shopApi.endpoints.getCurrentUser.initiate());
    store.dispatch(shopApi.util.resetApiState());
    resolve(user);
    await pending;
    expect(shopApi.endpoints.getCurrentUser.select()(store.getState()).data).toBeUndefined();
  });

  it("successful logout clears private state before another account loads", async () => {
    const store = newStore();
    await store.dispatch(shopApi.endpoints.getCurrentUser.initiate()).unwrap();
    await store.dispatch(shopApi.endpoints.logout.initiate()).unwrap();
    await vi.waitFor(() => expect(shopApi.endpoints.getCurrentUser.select()(store.getState()).data).toBeNull());
    const secondUser = { ...user, email: "b@example.com" };
    mocks.getCurrentUser.mockResolvedValue(secondUser);
    await store.dispatch(shopApi.endpoints.getCurrentUser.initiate(undefined, { forceRefetch: true })).unwrap();
    expect(shopApi.endpoints.getCurrentUser.select()(store.getState()).data).toEqual(secondUser);
    expect(JSON.stringify(store.getState())).not.toContain("a@example.com");
  });

  it("does not retain login passwords in Redux state", async () => {
    const store = newStore();
    await store.dispatch(shopApi.endpoints.login.initiate({ email: user.email, password: "never-persist-this-password" })).unwrap();
    expect(JSON.stringify(store.getState())).not.toContain("never-persist-this-password");
  });

  it("serializes auth field errors without retaining Error objects", async () => {
    const error = new AuthApiError("Invalid email", { email: "Invalid email" });
    const serializable = toApiError(error);
    expect(JSON.parse(JSON.stringify(serializable))).toEqual({ message: "Invalid email", fieldErrors: { email: "Invalid email" } });
    expect(serializable).not.toBeInstanceOf(Error);
  });
});

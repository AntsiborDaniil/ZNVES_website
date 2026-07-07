import { resetAuthStore } from "./state/authStore";
import { resetOrderStore } from "./state/orderStore";

/** Сбрасывает in-memory состояние всех моков (для тестов) */
export const resetAllMockStores = (): void => {
  resetAuthStore();
  resetOrderStore();
};

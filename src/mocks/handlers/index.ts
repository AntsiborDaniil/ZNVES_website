import { createAuthHandlers } from "./authHandlers";
import { createCatalogHandlers } from "./catalogHandlers";
import { createDeliveryHandlers } from "./deliveryHandlers";
import { createOrderHandlers } from "./orderHandlers";

export const createMockHandlers = () => [
  ...createAuthHandlers(),
  ...createCatalogHandlers(),
  ...createOrderHandlers(),
  ...createDeliveryHandlers(),
];

export const mockHandlers = createMockHandlers();

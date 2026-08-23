import { createAuthHandlers } from "./authHandlers";
import { createCatalogHandlers } from "./catalogHandlers";
import { createDeliveryHandlers } from "./deliveryHandlers";
import { createDiscountHandlers } from "./discountHandlers";
import { createHomeHandlers } from "./homeHandlers";
import { createOrderHandlers } from "./orderHandlers";

export const createMockHandlers = () => [
  ...createAuthHandlers(),
  ...createCatalogHandlers(),
  ...createHomeHandlers(),
  ...createOrderHandlers(),
  ...createDeliveryHandlers(),
  ...createDiscountHandlers(),
];

export const mockHandlers = createMockHandlers();

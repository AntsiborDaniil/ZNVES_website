import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "./api";

/** Each Provider owns its store; server requests never share private state. */
export function makeStore() {
  return configureStore({
    reducer: { [shopApi.reducerPath]: shopApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware),
    // Auth mutation arguments can contain credentials; do not expose Redux DevTools.
    devTools: false,
  });
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

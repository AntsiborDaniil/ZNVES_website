"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { makeStore, type AppStore } from "../../store/store";
export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();
  useEffect(() => setupListeners(storeRef.current!.dispatch), []);
  return <Provider store={storeRef.current}>{children}</Provider>;
}

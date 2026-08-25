"use client";

import dynamic from "next/dynamic";

const CartModalHost = dynamic(
  () => import("../CartModal/CartModalHost"),
  { ssr: false }
);

const AuthModalHost = dynamic(
  () => import("../AuthModal/AuthModalHost"),
  { ssr: false }
);

/** Client-only hosts so root layout can stay a Server Component. */
export default function ClientModalHosts() {
  return (
    <>
      <CartModalHost />
      <AuthModalHost />
    </>
  );
}

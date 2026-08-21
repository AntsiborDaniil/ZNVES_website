"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import CartModal from "./CartModal";

const CartModalRouteHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openCart, clearCart } = useCart();
  const [paymentReturnStatus, setPaymentReturnStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment !== "success" && payment !== "error") return;

    setPaymentReturnStatus(payment);
    clearCart();
    openCart();

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("payment");
    const nextQuery = nextParams.toString();
    const nextPath = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(nextPath, { scroll: false });
  }, [searchParams, pathname, router, openCart, clearCart]);

  useEffect(() => {
    if (pathname !== "/cart" && pathname !== "/checkout") return;
    openCart();
    router.replace("/catalog", { scroll: false });
  }, [pathname, router, openCart]);

  return (
    <CartModal
      paymentReturnStatus={paymentReturnStatus}
      onPaymentReturnHandled={() => setPaymentReturnStatus(null)}
    />
  );
};

const CartModalHost = () => (
  <Suspense fallback={null}>
    <CartModalRouteHandler />
  </Suspense>
);

export default CartModalHost;

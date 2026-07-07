"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account");
  }, [router]);

  return null;
};

export default LoginPage;

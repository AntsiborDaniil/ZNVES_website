"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account");
  }, [router]);

  return null;
};

export default RegisterPage;

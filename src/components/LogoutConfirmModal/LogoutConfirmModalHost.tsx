"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import LogoutConfirmModal from "./LogoutConfirmModal";

const LogoutConfirmModalHost = () => {
  const router = useRouter();
  const {
    isLogoutConfirmOpen,
    isLoggingOut,
    confirmLogout,
    cancelLogout,
  } = useAuth();

  const handleConfirm = async () => {
    await confirmLogout();
    router.push("/");
  };

  return (
    <LogoutConfirmModal
      isOpen={isLogoutConfirmOpen}
      isLoading={isLoggingOut}
      onCancel={cancelLogout}
      onConfirm={() => void handleConfirm()}
    />
  );
};

export default LogoutConfirmModalHost;

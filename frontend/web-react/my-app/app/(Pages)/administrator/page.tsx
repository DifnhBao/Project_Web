"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import { useAdminUser } from "@/app/context/AdminUserContext";

export default function AdminPage() {
  const { admin, loading } = useAdminUser();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (loading) return;
    if (!admin) {
      openModal("signin-admin");
    }
    // chỉ đóng modal nếu có admin và modal đang mở signin-admin
  }, [admin, loading]);

  return (
    <h1
      style={{ fontSize: "100px", padding: "150px 10px", textAlign: "center" }}
    >
      Welcome to Admin Page!
    </h1>
  );
}

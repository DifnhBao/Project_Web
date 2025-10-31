"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";

export default function AdminPage() {
  // const router = useRouter();
  const { openModal, closeModal } = useModal();
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    openModal("signin");
  }, []);

  return <h1>Welcome to Admin Page!</h1>;
}

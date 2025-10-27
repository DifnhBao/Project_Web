"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";

export default function AdminPage() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(true);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      closeModal();
    } else {
      openModal("signin");
    }
  }, [isAdmin]);

  return <h1>Hello Next.js!</h1>;
}

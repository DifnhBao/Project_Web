"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";

export default function Home() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // chỉ chạy khi đã mount client-side

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      closeModal();
      router.replace("/explore");
    } else {
      router.replace("/explore");
      openModal("signin"); // Chưa đăng nhập, mở modal đăng nhập
    }
  }, [isClient]);
  //nếu đăng xuất xóa localStorage

  return null;
}

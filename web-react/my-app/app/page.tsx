"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";

export default function Home() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (pathname === "/") {
      if (isLoggedIn === "true") {
        closeModal();
        router.replace("/explore");
      } else {
        router.replace("/explore");
        openModal("signin");
      }
    }
  }, [isClient, pathname]);
  //nếu đăng xuất xóa localStorage

  return null;
}

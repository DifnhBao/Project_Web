"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";

export default function Home() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkLoginStatus = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include", // gửi cookie kèm theo
        });

        if (res.ok) {
          // Có token hợp lệ → user đang đăng nhập
          closeModal();
          router.replace("/explore");
        } else {
          // Không có token hoặc token hết hạn → chưa đăng nhập
          router.replace("/explore");
          openModal("signin");
        }
      } catch (error) {
        console.error("Lỗi kiểm tra đăng nhập:", error);
        router.replace("/explore");
        openModal("signin");
      } finally {
        setIsChecking(false);
      }
    };

    checkLoginStatus();
  }, [isClient, pathname]);

  return null;
}

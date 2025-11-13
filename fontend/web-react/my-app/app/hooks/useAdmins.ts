"use client";
import useSWR, { mutate } from "swr";
import { getAdmins, AcceptOrReject } from "@/app/utils/authApi";
import { deleteAccount } from "@/app/utils/accountApi";

export interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
  account_status: string;
}

// Fetcher dùng chung
const fetcher = async () => {
  const res = await getAdmins();
  if (!res.ok) throw new Error("Không thể tải danh sách admin");
  return res.json();
};

// Hook dùng chung
export function useAdmins() {
  const { data, error, isLoading } = useSWR<Admin[]>("admins", fetcher);

  // Hàm cập nhật trạng thái admin
  const updateAdminStatus = async (id: number, status: string) => {
    try {
      const res = await AcceptOrReject(id, status);
      const dataRes = await res.json();

      alert(dataRes.message);

      if (res.ok)
        // Optimistic update: cập nhật UI ngay
        mutate<any[]>(
          "admins",
          (admins) => admins?.map((a) => (a.id === id ? { ...a, status } : a)),
          false
        );

      // Sau đó fetch lại từ server
      mutate("admins");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Lỗi hệ thống khi cập nhật trạng thái.");
    }
  };

  const deleteAdmin = async (id: number) => {
    try {
      const res = await deleteAccount(id);

      let dataRes;
      try {
        dataRes = await res.json();
      } catch {
        dataRes = { message: "Không thể đọc phản hồi từ máy chủ." };
      }

      // Luôn hiển thị thông báo
      alert(dataRes.message || "Không có phản hồi từ server.");

      if (res.ok) {
        // Cập nhật UI nếu thành công
        mutate<any[]>(
          "admins",
          (admins) => admins?.filter((a) => a.id !== id),
          false
        );
        mutate("admins");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Không thể kết nối đến máy chủ.");
    }
  };

  return {
    admins: data ?? [],
    isLoading,
    error,
    updateAdminStatus,
    deleteAdmin,
    refreshAdmins: () => mutate("admins"),
  };
}

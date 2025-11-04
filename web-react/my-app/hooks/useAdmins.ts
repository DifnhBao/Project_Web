"use client";
import useSWR, { mutate } from "swr";
import { getAdmins, AcceptOrReject } from "@/app/utils/authApi";
import { deleteAccount } from "@/app/utils/accountApi";

export interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
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
    const res = await AcceptOrReject(id, status);
    const dataRes = await res.json();
    if (!res.ok) throw new Error(dataRes.message);

    // Optimistic update: cập nhật UI ngay
    mutate<any[]>(
      "admins",
      (admins) => admins?.map((a) => (a.id === id ? { ...a, status } : a)),
      false
    );

    // Sau đó fetch lại từ server
    mutate("admins");
    return alert(dataRes.message);
  };

  const deleteAdmin = async (id: number) => {
    const res = await deleteAccount(id);
    const dataRes = await res.json();
    if (!res.ok) throw new Error(dataRes.message);

    // Cập nhật UI sau khi xóa
    mutate<any[]>(
      "admins",
      (admins) => admins?.filter((a) => a.id !== id),
      false
    );
    mutate("admins");
    return alert(dataRes.message);
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

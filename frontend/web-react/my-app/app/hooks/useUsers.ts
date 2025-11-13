"use client";
import useSWR, { mutate } from "swr";
import { getUsers } from "@/app/utils/authApi";
import { deleteAccount } from "@/app/utils/accountApi";
import { User } from "../types/music";

// Fetcher dùng chung
const fetcher = async () => {
  const res = await getUsers();
  if (!res.ok) throw new Error("Không thể tải danh sách user");
  return res.json();
};

export function useUsers() {
  const { data, error, isLoading } = useSWR<User[]>("users", fetcher);

  // Hàm cập nhật trạng thái admin
  //   const updateUserStatus = async (id: number, status: string) => {
  //     try {
  //       const res = await AcceptOrReject(id, status);
  //       const dataRes = await res.json();

  //       alert(dataRes.message);

  //       if (res.ok)
  //         // Optimistic update: cập nhật UI ngay
  //         mutate<any[]>(
  //           "admins",
  //           (admins) => admins?.map((a) => (a.id === id ? { ...a, status } : a)),
  //           false
  //         );

  //       // Sau đó fetch lại từ server
  //       mutate("admins");
  //     } catch (error) {
  //       console.error("Lỗi khi cập nhật trạng thái:", error);
  //       alert("Lỗi hệ thống khi cập nhật trạng thái.");
  //     }
  //   };

  const deleteUser = async (id: number) => {
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
          "users",
          (users) => users?.filter((a) => a.id !== id),
          false
        );
        mutate("users");
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Không thể kết nối đến máy chủ.");
    }
  };

  return {
    users: data ?? [],
    isLoading,
    error,
    deleteUser,
    refreshUsers: () => mutate("users"),
  };
}

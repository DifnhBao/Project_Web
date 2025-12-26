import { URL } from "./authApi";

// API refresh access token admin
export async function refreshTokenByAdmin() {
  return await fetch(URL + "/refresh/admin-refresh", {
    method: "POST",
    credentials: "include", // gửi cookie kèm theo
  });
}

// API refresh access token user
export async function refreshTokenByUser() {
  return await fetch(URL + "/auth/refresh-token", {
    method: "POST",
    credentials: "include", // gửi cookie kèm theo
  });
}

// Fetch API bất kì cần access token
export async function fetchWithAutoRefresh(
  url: string,
  options: RequestInit & { role?: "admin" | "user" } = {},
  retry: boolean = true
) {
  try {
    // Gọi API chính
    let res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    // Nếu token hết hạn -> gọi API refresh
    if (res.status === 401) {
      console.warn("Access token có thể đã hết hạn, đang thử refresh...");

      // chọn API refresh tương ứng
      const refreshRes =
        options.role === "admin"
          ? await refreshTokenByAdmin()
          : await refreshTokenByUser();

      if (refreshRes.ok && retry) {
        console.log("Refresh token thành công, thử gọi lại request ban đầu...");
        // Gọi lại request ban đầu 1 lần duy nhất
        res = await fetch(url, {
          ...options,
          credentials: "include",
        });
        console.log("res: ", res);
      } else {
        console.error("Không thể refresh token, yêu cầu đăng nhập lại.");
      }
    }

    return res;
  } catch (error) {
    console.error("Lỗi trong fetchWithAutoRefresh:", error);
    throw error;
  }
}

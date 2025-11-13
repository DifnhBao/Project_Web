export const URL = "http://localhost:5000";
// USER PAGE

// Đăng kí cho user
export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  return await fetch(URL + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
}

// Đăng nhập cho user page
export async function loginUser(email: string, password: string) {
  return await fetch(URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // để nhận cookie refresh token
  });
}

export async function logoutUser() {
  return await fetch(URL + "/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

// API xác thực user vừa đăng nhập và lưu thông tin đăng nhập
export async function fetchCurrentUser() {
  return await fetch(URL + "/auth/me", {
    credentials: "include",
  });
}

// ADMINISTRATOR PAGE

// Đăng kí
export async function registerAdmin(
  username: string,
  email: string,
  password: string
) {
  return await fetch(URL + "/auth-admin/register-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
}

// Đăng nhập
export async function loginAdmin(email: string, password: string) {
  return await fetch(URL + "/auth-admin/login-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
}

// Đăng xuất
export async function logoutAdmin() {
  return await fetch(URL + "/auth-admin/logout-admin", {
    method: "POST",
    credentials: "include",
  });
}

// API Xác thực admin vừa đăng nhập và lưu thông tin đăng nhập
export async function fetchCurrentAdmin() {
  return await fetch(URL + "/auth-admin/me", {
    credentials: "include",
  });
}

// API refresh access token
export async function refreshTokenByAdmin() {
  return await fetch(URL + "/auth-admin/refresh", {
    method: "POST",
    credentials: "include", // gửi cookie kèm theo
  });
}

// Fetch API bất kì cần access token
export async function fetchWithAutoRefresh(
  url: string,
  options: RequestInit = {},
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

      const refreshRes = await refreshTokenByAdmin();
      console.log("refreshRes: ", refreshRes);

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

// Accept role admin or reject
export async function AcceptOrReject(id: number, status: string) {
  return await fetchWithAutoRefresh(URL + `/auth-admin/approve-admin/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    credentials: "include",
  });
}

//API Lấy danh sách user
export async function getUsers() {
  return await fetchWithAutoRefresh(URL + "/users/all-users", {
    method: "GET",
  });
}

// API Lấy danh sách admin
export async function getAdmins() {
  return await fetchWithAutoRefresh(URL + "/users/all-admins", {
    method: "GET",
  });
}

// Thêm admin  mới
export async function addNewAdmin(
  username: string,
  email: string,
  password: string
) {
  return await fetchWithAutoRefresh(URL + "/auth-admin/add-new-admin", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
}

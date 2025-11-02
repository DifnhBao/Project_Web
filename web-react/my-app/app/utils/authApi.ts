// USER PAGE

// Đăng nhập cho user page
export async function loginUser(email: string, password: string) {
  return await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // để nhận cookie refresh token
  });
}

// ADMINISTRATOR PAGE

// Đăng kí
export async function registerAdmin(
  username: string,
  email: string,
  password: string
) {
  return await fetch("http://localhost:5000/auth-admin/register-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
}

// Đăng nhập
export async function loginAdmin(email: string, password: string) {
  return await fetch("http://localhost:5000/auth-admin/login-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
}

// Đăng xuất
export async function logoutAdmin() {
  return await fetch("http://localhost:5000/auth-admin/logout-admin", {
    method: "POST",
    credentials: "include",
  });
}

// API xác thực user vừa đăng nhập và lưu thông tin đăng nhập
export async function fetchCurrentUser() {
  return await fetch("http://localhost:5000/auth/me", {
    credentials: "include",
  });
}

// API Xác thực admin vừa đăng nhập và lưu thông tin đăng nhập
export async function fetchCurrentAdmin() {
  return await fetch("http://localhost:5000/auth-admin/me", {
    credentials: "include",
  });
}

// API refresh access token
export async function refreshTokenByAdmin() {
  return await fetch("http://localhost:5000/auth-admin/refresh", {
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
    if (res.status === 401 || res.status === 403) {
      console.warn("Access token có thể đã hết hạn, đang thử refresh...");

      const refreshRes = await refreshTokenByAdmin(); //dùng hàm sẵn có

      if (refreshRes.ok && retry) {
        console.log("Refresh token thành công, thử gọi lại request ban đầu...");
        // Gọi lại request ban đầu 1 lần duy nhất
        res = await fetch(url, {
          ...options,
          credentials: "include",
        });
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

//API Lấy danh sách user
export async function getUsers() {
  return await fetchWithAutoRefresh("http://localhost:5000/users/all-users", {
    method: "GET",
  });
}

// API Lấy danh sách admin
export async function getAdmins() {
  return await fetchWithAutoRefresh("http://localhost:5000/users/all-admins", {
    method: "GET",
  });
}

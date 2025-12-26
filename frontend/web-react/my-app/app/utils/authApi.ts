import { fetchWithAutoRefresh } from "./refreshToken";

export const URL = "http://localhost:5000/api";
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
export async function loginUser(username: string, password: string) {
  return await fetch(URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
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
  return await fetchWithAutoRefresh(URL + "/users/me", {
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
export async function loginAdmin(username: string, password: string) {
  return fetch(URL + "/auth/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
}

// Đăng xuất
export async function logoutAdmin() {
  return await fetch(URL + "/auth/admin/logout", {
    method: "POST",
    credentials: "include",
  });
}

// API Xác thực admin vừa đăng nhập và lưu thông tin đăng nhập
export async function fetchCurrentAdmin() {
  return await fetchWithAutoRefresh(URL + "/users/admin/me", {
    credentials: "include",
  });
}

// Accept role admin or reject
export async function AcceptOrReject(id: number, status: string) {
  return await fetchWithAutoRefresh(URL + `/auth-admin/approve-admin/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
    credentials: "include",
    role: "admin",
  });
}

//API Lấy danh sách user
export async function getUsers() {
  return await fetchWithAutoRefresh(URL + "/users/all-users", {
    method: "GET",
    role: "admin",
  });
}

// API Lấy danh sách admin
export async function getAdmins() {
  return await fetchWithAutoRefresh(URL + "/users/all-admins", {
    method: "GET",
    role: "admin",
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
    role: "admin",
  });
}

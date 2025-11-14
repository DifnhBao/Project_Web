import { fetchWithAutoRefresh, URL } from "./authApi";

// admin xóa tài khoản
export async function deleteAccount(id: number) {
  return await fetchWithAutoRefresh(URL + `/acc/account/${id}`, {
    method: "DELETE",
  });
}

// Người dùng thêm mới profile
export async function addNewProfile(formData: object) {
  return await fetchWithAutoRefresh(URL + "/acc/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

// cập nhật thông tin người dùng
export async function updateProfile(formData: object) {
  return await fetchWithAutoRefresh(URL + "/acc/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

// lấy thông tin người dùng bằng id
export async function getUserProfile(userId: number) {
  return await fetchWithAutoRefresh(URL + `/users/user-profile/${userId}`, {
    method: "GET",
  });
}

// admin thay đổi thông tin người dùng
export async function adminUpdateUserProfile(userId: number, formData: object) {
  return fetchWithAutoRefresh(URL + `/acc/admin-update/profile/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

// thay đổi mật khẩu
export async function changePassword(oldPassword: string, confirmPW: string) {
  return await fetchWithAutoRefresh(URL + "/acc/password/change", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldPassword, confirmPW }),
  });
}

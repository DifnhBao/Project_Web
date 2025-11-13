import { fetchWithAutoRefresh, URL } from "./authApi";

export async function deleteAccount(id: number) {
  return await fetchWithAutoRefresh(URL + `/acc/account/${id}`, {
    method: "DELETE",
  });
}

export async function addNewProfile(formData: object) {
  return await fetchWithAutoRefresh(URL + "/acc/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

export async function updateProfile(formData: object) {
  return await fetchWithAutoRefresh(URL + "/acc/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

export async function getUserProfile(userId: number) {
  return await fetchWithAutoRefresh(URL + `/users/user-profile/${userId}`, {
    method: "GET",
  });
}

export async function adminUpdateUserProfile(userId: number, formData: object) {
  return fetchWithAutoRefresh(URL + `/acc/admin-update/profile/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

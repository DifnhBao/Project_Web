import { fetchWithAutoRefresh } from "./authApi";

export async function deleteAccount(id: number) {
  return await fetchWithAutoRefresh(`http://localhost:5000/acc/account/${id}`, {
    method: "DELETE",
  });
}

export async function addNewProfile(formData: object) {
  return await fetchWithAutoRefresh("http://localhost:5000/acc/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

export async function updateProfile(formData: object) {
  return await fetchWithAutoRefresh("http://localhost:5000/acc/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}

import { fetchWithAutoRefresh } from "./authApi";

export async function deleteAccount(id: number) {
  return await fetchWithAutoRefresh(`http://localhost:5000/acc/account/${id}`, {
    method: "DELETE",
  });
}

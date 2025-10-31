export async function loginUser(email: string, password: string) {
  return await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // để nhận cookie refresh token
  });
}

export async function loginAdmin(email: string, password: string) {
  return await fetch("http://localhost:5000/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
}

export async function fetchCurrentUser() {
  return await fetch("http://localhost:5000/auth/me", {
    credentials: "include",
  });
}


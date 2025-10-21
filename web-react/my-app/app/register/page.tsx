"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Đăng ký:", email, password);
    // Đăng ký xong chuyển đến đăng nhập
    router.push("/sign-in");
  };

  return (
    <div className="auth-container register-page">
      <header>
        <div className="logo">
          <a>
            <img src="/images/Logo/logo.png" alt="logo" />
          </a>
        </div>
      </header>

      <form onSubmit={handleRegister}>
        <label className="form_label">User Name</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="form_label">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form_label">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form_label">Password Confirmation</label>
        <input
          type="password"
          placeholder="Password Confirmation"
          value={confirmPW}
          onChange={(e) => setConfirmPW(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        You already have an account?{" "}
        <a href="/sign-in" className="create">
          Sign in
        </a>
      </p>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import "@/app/styles/auth.css";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { openModal, closeModal } = useModal();

  // const handleSignIn = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Đăng nhập:", email, password);
  //   // Giả sử đăng nhập thành công
  //   localStorage.setItem("isLoggedIn", "true");
  //   closeModal();
  //   router.push("/explore"); // quay lại trang chủ
  // };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
    console.log(">>> Đăng nhập thành công: ", { email, password });

    localStorage.setItem("isLoggedIn", "true");
    closeModal();
    router.push("/explore"); // quay lại trang chủ
  };

  return (
    <div className="auth-container sign-in-page">
      <header>
        <div className="logo">
          <a>
            <img src="/images/Logo/logo.png" alt="logo" />
          </a>
        </div>
      </header>

      <h1>Sign in to Enjoy</h1>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email" className="form_label">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="form_label">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="options">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <label style={{ fontSize: "13px" }}>Remember me</label>
        </div>
        <button type="submit" className="submit">
          Sign In
        </button>
      </form>
      <div className="fogot-password">
        <a href="#">Forgot your password?</a>
      </div>
      <p>
        Not registered?{" "}
        <a className="create" onClick={() => openModal("register")}>
          Create an account
        </a>
      </p>
    </div>
  );
}

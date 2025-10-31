"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import { useUser } from "@/app/context/UserContext";
import { loginUser, loginAdmin, fetchCurrentUser } from "@/app/utils/authApi";
import "@/app/styles/auth.css";

export default function SignInPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { openModal, closeModal } = useModal();
  const { setUser } = useUser();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const page = pathname.startsWith("/explore");
      const res = page
        ? await loginUser(email, password)
        : await loginAdmin(email, password);

      const data = await res.json();
      alert(data.message);

      if (!res.ok) {
        alert(data.message || "Đăng nhập thất bại!");
        return;
      }

      // console.log(">>> Đăng nhập thành công: ", { email, password });

      // const meRes = await fetchCurrentAdmin();
      // if (meRes.ok) {
      //   const meData = await meRes.json();
      //   setUser(meData.user);
      // }

      // Đóng modal
      closeModal();

      if (pathname.startsWith("/administrator")) {
        router.refresh();
      } else {
        router.replace("/explore");
        router.refresh();
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đăng nhập thất bại, vui lòng thử lại!");
    }
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

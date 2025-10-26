"use client";
import "@/app/styles/header-bar.css";
import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";

import dynamic from "next/dynamic";

const SignInPage = dynamic(() => import("@/app/sign-in/page"));
const RegisterPage = dynamic(() => import("@/app/register/page"));

export default function Header() {
  const { openModal } = useModal();
  const [q, setQ] = useState("");

  return (
    <header className="header">
      <div className="search-box">
        <i className="fa-solid fa-magnifying-glass i-search" />
        <input
          className="input-text"
          placeholder="Bạn muốn phát nội dung gì?"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="header-right">
        {/* button user giả */}
        <button className="profile" onClick={() => openModal("profile")}>
          <i className="fa-solid fa-user"></i>
          Profile
        </button>

        <button className="sign-in" onClick={() => openModal("signin")}>
          Sign In
        </button>

        <button className="register" onClick={() => openModal("register")}>
          Sign Up
        </button>
      </div>
    </header>
  );
}

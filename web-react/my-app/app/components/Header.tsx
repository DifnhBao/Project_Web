"use client";
import "@/app/styles/header-bar.css";
import { useState } from "react";
import { useModal } from "@/app/context/ModalContext";
import { useUser } from "@/app/context/UserContext";

export default function Header() {
  const { openModal } = useModal();
  const [q, setQ] = useState("");
  const { user, loading } = useUser();

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
        {user ? (
          <div>
            Hi, {user?.username}
            <button className="profile" onClick={() => openModal("profile")}>
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        ) : (
          <>
            <button className="sign-in" onClick={() => openModal("signin")}>
              Sign In
            </button>

            <button className="register" onClick={() => openModal("register")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

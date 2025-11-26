"use client";
import "@/app/styles/header-bar.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";
import { useUser } from "@/app/context/UserContext";
import { logoutUser } from "../utils/authApi";
import PopUp from "./PopUp";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { openModal } = useModal();
  const [q, setQ] = useState("");
  const { user, loading, setUser } = useUser();
  const router = useRouter();

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

      <div className="user-area">
        {user ? (
          <div className="user-greeting">
            <span>Hi, {user?.username}</span>
            <button
              className="profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                src="/images/Avatar/avt01.png"
                alt="Avatar"
                className="avatar"
              />
            </button>
            {showUserMenu && (
              <PopUp show={showUserMenu} onClose={() => setShowUserMenu(false)}>
                <div className="user-popup">
                  <div className="user-info">
                    <img src="/images/Avatar/avt01.png" className="avatar" />
                    <div>
                      <strong>{user.username}</strong>
                      <p>Thành viên Miễn phí</p>
                    </div>
                  </div>

                  <button
                    className="logout-btn"
                    onClick={() => openModal("profile")}
                  >
                    <i className="fa-regular fa-user"></i>
                    Xem hồ sơ
                  </button>

                  <button
                    className="logout-btn"
                    onClick={() => openModal("change-password")}
                  >
                    <i className="fa-solid fa-key"></i>
                    Thay đổi mật khẩu
                  </button>

                  <button
                    className="logout-btn"
                    onClick={async () => {
                      await logoutUser();
                      setUser(null);
                      router.replace("/explore");
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Đăng xuất
                  </button>
                </div>
              </PopUp>
            )}
          </div>
        ) : (
          <div className="auth-box">
            <button className="sign-in" onClick={() => openModal("signin")}>
              Sign In
            </button>

            <button className="register" onClick={() => openModal("register")}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

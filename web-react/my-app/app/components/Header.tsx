"use client";
import { useState } from "react";
import Modal from "./Modal";
import Profile from "./Profile";

import dynamic from "next/dynamic";

const SignInPage = dynamic(() => import("@/app/sign-in/page"));
const RegisterPage = dynamic(() => import("@/app/register/page"));

export default function Header() {
  const [q, setQ] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [modalContent, setModalContent] = useState<
    "profile" | "signin" | "register" | null
  >(null);

  const openModal = (type: "profile" | "signin" | "register") => {
    setModalContent(type);
    setIsOpen(true);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case "profile":
        return <Profile />;
      case "signin":
        return <SignInPage />;
      case "register":
        return <RegisterPage />;
      default:
        return null;
    }
  };

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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* Nội dung trống hoặc tùy bạn */}
        {renderModalContent()}
      </Modal>
    </header>
  );
}

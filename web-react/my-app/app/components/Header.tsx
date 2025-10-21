"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [q, setQ] = useState("");
  return (
    <header className="header">
      <div className="back-next-search">
        <div className="back chevron">
          <button>
            <i className="fa-solid fa-chevron-left" />
          </button>
        </div>
        <div className="next chevron">
          <button>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass i-search" />
          <input
            className="input-text"
            placeholder="Bạn muốn phát nội dung gì?"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        <button className="sign-in">
          <a href="/sign-in" className="a-sign-up">
            Sign In
          </a>
        </button>
        <button className="register">
          <a href="/register">Sign Up</a>
        </button>
      </div>
    </header>
  );
}

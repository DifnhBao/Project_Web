"use client";
import { useModal } from "@/app/context/ModalContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { openModal } = useModal();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/administrator");
  };

  return (
    <div className="header">
      <h2 id="page-title">Dashboard</h2>
      <div className="admin-info">
        <span>Hi, Admin</span>
        <i className="fa-solid fa-user-circle"></i>
        <button onClick={handleLogout} className="logout-from-dashboard">
          <i className="fa-solid fa-power-off"></i> log out
        </button>
      </div>
    </div>
  );
}

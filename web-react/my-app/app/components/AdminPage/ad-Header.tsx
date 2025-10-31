"use client";
// import { useModal } from "@/app/context/ModalContext";
import { useRouter } from "next/navigation";
import { useAdminUser } from "@/app/context/AdminUserContext";

export default function Header() {
  const { admin, loading } = useAdminUser();

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/auth/signout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("isLoggedIn");
      router.push("/administrator");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Đăng xuất thất bại!");
    }
  };

  return (
    <div className="header">
      <h2 id="page-title">Dashboard</h2>
      <div className="admin-info">
        {admin ? <span>Hi, {admin.username}</span> : <span>Hi, Admin</span>}
        <i className="fa-solid fa-user"></i>
        <button onClick={handleLogout} className="logout-from-dashboard">
          <i className="fa-solid fa-power-off"></i> log out
        </button>
      </div>
    </div>
  );
}

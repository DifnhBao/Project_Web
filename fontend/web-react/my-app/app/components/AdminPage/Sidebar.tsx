"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <Link href="/administrator/ManageUser">
          <i className="fa-solid fa-users"></i> Manage User
        </Link>
        <Link href="/administrator/ManageAdmin">
          <i className="fa-solid fa-user-shield"></i> Manage Admin
        </Link>
        <Link href="/administrator/Statistics">
          <i className="fa-solid fa-chart-line"></i> Statistics
        </Link>
        <Link href="#">
          <i className="fa-solid fa-gear"></i> Settings
        </Link>
      </nav>
    </div>
  );
}

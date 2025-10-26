"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link
            href="/administrator"
            className={
              pathname === "/administrator" ? "font-bold text-blue-400" : ""
            }
          >
            Dashboard
          </Link>
          <Link
            href="/administrator/users"
            className={
              pathname.includes("/users") ? "font-bold text-blue-400" : ""
            }
          >
            Quản lý người dùng
          </Link>
          <Link
            href="/administrator/songs"
            className={
              pathname.includes("/songs") ? "font-bold text-blue-400" : ""
            }
          >
            Quản lý bài hát
          </Link>
          <Link
            href="/administrator/playlists"
            className={
              pathname.includes("/playlists") ? "font-bold text-blue-400" : ""
            }
          >
            Quản lý playlist
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

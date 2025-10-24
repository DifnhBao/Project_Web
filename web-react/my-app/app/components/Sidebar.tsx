"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/app/context/ModalContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { openModal } = useModal();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="menu">
      <div className="logo">
        <Link href="/">
          <img src="/images/Logo/logo.png" alt="logo web page" />
        </Link>
      </div>

      <nav>
        <Link
          href="/explore"
          onClick={() => openModal("profile")}
          className={pathname === "/explore" ? "active" : ""}
        >
          <i className="fa-regular fa-compass" /> Explore
        </Link>
        <Link
          href="/library"
          onClick={() => openModal("profile")}
          className={pathname.startsWith("/library") ? "active" : ""}
        >
          <i className="fa-solid fa-book" /> Library
        </Link>
        <Link
          href="/myplaylists"
          onClick={() => openModal("profile")}
          className={pathname.startsWith("/myplaylists") ? "active" : ""}
        >
          <i className="fa-solid fa-list" /> My Playlist
        </Link>
      </nav>
    </div>
  );
}

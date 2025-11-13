"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

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
          className={pathname === "/explore" ? "active" : ""}
        >
          <i className="fa-regular fa-compass" /> Explore
        </Link>
        <Link
          href="/library"
          className={pathname.startsWith("/library") ? "active" : ""}
        >
          <i className="fa-solid fa-book" /> Library
        </Link>
        <Link
          href="/myplaylists"
          className={pathname.startsWith("/myplaylists") ? "active" : ""}
        >
          <i className="fa-solid fa-list" /> My Playlist
        </Link>
      </nav>
    </div>
  );
}

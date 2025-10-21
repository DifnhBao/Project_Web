"use client";

// import "../styles/home.css";
import "../styles/library.css";
import "../styles/myplaylists.css";
import "../styles/banner-category.css";
import "@/app/styles/feature-playlists.css";

import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { PlayerProvider } from "../context/PlayerContext";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <Sidebar />
      <div className="main">
        <Header />
        <div id="content" className="content">
          {children}
        </div>
      </div>
      <Player />
    </PlayerProvider>
  );
}

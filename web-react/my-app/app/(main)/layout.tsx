"use client";

import Player from "../components/MusicContainer/Player";
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

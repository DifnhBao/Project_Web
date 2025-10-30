"use client";

import "@/app/styles/globals.css";

import Player from "../../components/MusicContainer/Player";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { PlayerProvider } from "@/app/context/PlayerContext";
import { UserProvider } from "@/app/context/UserContext";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <Sidebar />
      <div className="main">
        <UserProvider>
          <Header />
        </UserProvider>

        <div id="content" className="content">
          {children}
        </div>
      </div>
      <Player />
    </PlayerProvider>
  );
}

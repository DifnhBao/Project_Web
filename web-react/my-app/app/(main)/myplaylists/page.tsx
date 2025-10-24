"use client";
import MyPlaylistGrid from "../../components/MyPlaylistGrid";

export default function MyPlaylistsPage() {
  return (
    <div id="playlist_menu">
      <div className="main-header">
        <h2>My Playlist</h2>
        <button className="new-playlist-btn">+ New Playlist</button>
      </div>

      <MyPlaylistGrid />
    </div>
  );
}

"use client";
import MyPlaylistGrid from "../../components/MyPlaylistGrid";

export default function MyPlaylistsPage() {
  return (
    <div id="playlist" className="myplaylist-menu">
      <div className="main-header">
        <h1>My Playlist</h1>
        <button className="new-playlist-btn">+ New Playlist</button>
      </div>
      <div className="playlist-grid">
        <MyPlaylistGrid />
      </div>
    </div>
  );
}

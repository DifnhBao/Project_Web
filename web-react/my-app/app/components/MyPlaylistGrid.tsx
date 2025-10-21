"use client";
import React from "react";
import "../styles/myplaylists.css";

interface Playlist {
  title: string;
  songs: number;
  image: string;
}

const playlists: Playlist[] = [
  {
    title: "Chill Vibes",
    songs: 12,
    image:
      "https://image-cdn.nct.vn/playlist/2025/07/25/a/2/1/0/1753435482545_300.jpg",
  },
  {
    title: "Workout Mix",
    songs: 8,
    image:
      "https://image-cdn.nct.vn/playlist/2025/06/12/a/1/0/0/1753435123563_300.jpg",
  },
  {
    title: "Love Songs",
    songs: 20,
    image:
      "https://image-cdn.nct.vn/playlist/2025/03/20/a/5/2/0/1753435111111_300.jpg",
  },
  {
    title: "Hip Hop Hits",
    songs: 15,
    image:
      "https://image-cdn.nct.vn/playlist/2025/05/05/a/8/3/0/1753435223455_300.jpg",
  },
];

const MyPlaylistGrid: React.FC = () => {
  return (
    <div className="myplaylist-menu">
      <div className="playlist-grid" id="playlistGrid">
        {playlists.map((playlist, index) => (
          <div className="playlist-card" key={index}>
            <img src={playlist.image} alt={playlist.title} />
            <p className="playlist-title">{playlist.title}</p>
            <p className="playlist-count">{playlist.songs} songs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylistGrid;

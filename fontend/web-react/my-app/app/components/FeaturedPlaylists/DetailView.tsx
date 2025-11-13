"use client";

import React from "react";
import type { Playlist, Artist, Track } from "@/app/types/music";
import { usePlayer } from "@/app/context/PlayerContext";

interface Props {
  data: Playlist | Artist;
  onBack: () => void;
}

const DetailView: React.FC<Props> = ({ data, onBack }) => {
  const { playlist, setPlaylist, currentIndex, setIndex } = usePlayer();

  const isPlaylist =
    (data as Playlist).tracks !== undefined && "description" in data;

  const title = data.name;
  const cover = isPlaylist
    ? (data as Playlist).coverImage
    : (data as Artist).image;

  const tracks = data.tracks || [];

  const handlePlaySong = (index: number) => {
    if (playlist !== tracks) {
      setPlaylist(tracks);
    }
    setIndex(index);
  };

  return (
    <>
      <button onClick={onBack} className="back-button">
        ← Back
      </button>

      <div
        className="playlist-detail"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="overlay"></div>

        <div className="playlist-header">
          <div className="playlist-info">
            <img src={cover} alt={title} className="playlist-cover" />

            <div className="playlist-content">
              <div className="playlist-type">
                {isPlaylist
                  ? `Playlist · ${tracks.length} bài hát`
                  : `Artist · ${tracks.length} bài hát`}
              </div>

              <h1 className="playlist-title">{title}</h1>

              {isPlaylist && (
                <div className="playlist-artists">Nhiều nghệ sĩ</div>
              )}

              <div className="playlist-actions">
                <div className="playlist-icons">
                  <span className="icon">❤️</span>
                  <span className="count">999</span>
                  <span className="icon">↗</span>
                  <span className="count">0</span>
                  <span className="icon more">⋯</span>
                </div>
                <button
                  className="play-playlists"
                  onClick={() => setPlaylist(tracks)}
                >
                  ▶ Phát tất cả
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-view">
          <div className="table">
            <div className="table_header">
              <div className="col_index">#</div>
              <div className="col_title">Title</div>
              <div className="col_artist">Artist</div>
              <div className="col_duration">Duration</div>
            </div>

            {tracks.map((song: Track, index: number) => (
              <div
                key={song.id}
                className={`row song-item ${
                  playlist === tracks && currentIndex === index ? "active" : ""
                }`}
                onClick={() => handlePlaySong(index)}
              >
                <div className="col_index">{index + 1}</div>
                <div className="col_title">
                  <img src={song.image} alt={song.title} />
                  <span>{song.title}</span>
                </div>
                <div className="col_artist">{song.artist}</div>
                <div className="col_duration">3:45</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailView;

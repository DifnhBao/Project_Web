"use client";
import React from "react";
import { useMusicData } from "../context/MusicDataContext";

const FeaturedPlaylists = () => {
  const { tracks, playlists, artists, loaded } = useMusicData();

  if (!loaded) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <div className="explore-container">
      {/* Popular Songs */}
      <section>
        <h2 className="title">Popular Songs</h2>
        <div className="scroll-row">
          {tracks.map((song) => (
            <div key={song.id} className="card">
              <img src={song.image} alt={song.title} />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="title">Featured Playlists</h2>
        <div className="scroll-row">
          {playlists.map((pl) => (
            <div key={pl.id} className="card">
              <img src={pl.coverImage} alt={pl.name} />
              <h3>{pl.name}</h3>
              <p>{pl.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Artists */}
      <section>
        <h2 className="title">Top Artists</h2>
        <div className="scroll-row">
          {artists.map((artist) => (
            <div key={artist.id} className="card card_artist">
              <img src={artist.image} alt={artist.name} />
              <h3>{artist.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedPlaylists;

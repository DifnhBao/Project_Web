"use client";

import React, { useState } from "react";
import "../styles/home.css";

const Player: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0); // thêm state cho thanh tiến trình

  const toggleLike = () => setLiked(!liked);

  return (
    <footer className="info">
      <div className="info-player">
        <a className="background-singer">
          <img
            src="/images/default-song.jpg"
            alt="Singer"
            style={{ width: 60, height: 60, borderRadius: "8px" }}
          />
        </a>

        <div className="info-song">
          <a href="#" className="song-tittle">
            Song Title
          </a>
          <a href="#" className="artist-name">
            Artist Name
          </a>
        </div>

        <button className="icon-btn like-icon" onClick={toggleLike}>
          <i
            className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        </button>

        <button className="icon-btn expand-icon">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <div className="player-center">
        <div className="control">
          <button className="play">
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button id="prevBtn" className="play">
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button id="playBtn" className="play-btn">
            <i className="fas fa-play"></i>
          </button>
          <button id="nextBtn" className="play">
            <i className="fa-solid fa-forward-step"></i>
          </button>
          <button className="play">
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>

        <div className="run">
          <span className="current-time">00:00</span>
          <input
            type="range"
            className="seek-bar"
            value={progress}
            min={0}
            max={100}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
          <span className="music-time">00:00</span>
        </div>
      </div>

      <div className="vol">
        <button className="volume">
          <i className="fa-solid fa-volume-high"></i>
        </button>
        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </footer>
  );
};

export default Player;

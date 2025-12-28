"use client";

import React, { useEffect, useState } from "react";
import { usePlayer } from "@/app/context/PlayerContext";
import PopUp from "../PopUp";
import "@/app/styles/PlayerBar.css";

const Player: React.FC = () => {
  const {
    playlist,
    play,
    pause,
    togglePlay,
    isPlaying,
    currentIndex,
    setIndex,
  } = usePlayer();

  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Lấy bài hiện tại
  const currentSong = playlist[currentIndex];

  // Like button
  const toggleLike = () => setLiked(!liked);

  // Theo dõi tiến trình phát
  useEffect(() => {
    const audio = (window as any)._audioRef as HTMLAudioElement;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [playlist, currentIndex]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = (window as any)._audioRef as HTMLAudioElement;
    if (!audio || !duration) return;

    const newProgress = Number(e.target.value);
    const newTime = (newProgress / 100) * duration;

    setProgress(newProgress);
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  // Xử lý next / prev
  const handleNext = () => {
    if (playlist.length > 0) {
      setIndex((currentIndex + 1) % playlist.length);
    }
  };

  const handlePrev = () => {
    if (playlist.length > 0) {
      setIndex((currentIndex - 1 + playlist.length) % playlist.length);
    }
  };

  // Khi kéo thanh volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    const audio = (window as any)._audioRef as HTMLAudioElement;
    if (audio) {
      audio.volume = newVolume / 100;
      setIsMuted(audio.volume === 0);
    }
  };

  // Khi click icon volume
  const toggleMute = () => {
    const audio = (window as any)._audioRef as HTMLAudioElement;
    if (!audio) return;

    if (isMuted) {
      // Bật lại âm thanh
      audio.volume = volume / 100;
      setIsMuted(false);
    } else {
      // Tắt âm thanh
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // format theo thời gian
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // icon thay đổi theo trạng thái âm lượng
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "fa-volume-xmark";
    if (volume < 50) return "fa-volume-low";
    return "fa-volume-high";
  };

  return (
    <footer className="info">
      <div className="info-player">
        <a className="background-singer">
          <img
            src={currentSong?.imageUrl || "/images/default-song.jpg"}
            alt="Singer"
          />
        </a>

        <div className="info-song">
          <a href="#" className="song-tittle">
            {currentSong?.title || "No song"}
          </a>
          <a href="#" className="artist-name">
            {currentSong?.artistName || "Unknown"}
          </a>
        </div>

        <button className="icon-btn like-icon" onClick={toggleLike}>
          <i
            className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        </button>

        <button
          className="icon-btn expand-icon"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>
        {showUserMenu && (
          <PopUp show={showUserMenu} onClose={() => setShowUserMenu(false)}>
            <div className="Other-options-popup">
              <button>
                <i className="fa-regular fa-heart"></i>
                <span>Thêm vào yêu thích</span>
              </button>

              <button>
                <i className="fa-solid fa-circle-plus"></i>
                <span>Thêm vào playlist</span>
              </button>

              <button>
                <i className="fa-regular fa-flag"></i>
                <span>Báo cáo</span>
              </button>
            </div>
          </PopUp>
        )}
      </div>

      <div className="player-center">
        <div className="control">
          <button className="play">
            <i className="fa-solid fa-shuffle"></i>
          </button>
          <button id="prevBtn" className="play" onClick={handlePrev}>
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button id="playBtn" className="play-btn" onClick={togglePlay}>
            <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
          </button>
          <button id="nextBtn" className="play" onClick={handleNext}>
            <i className="fa-solid fa-forward-step"></i>
          </button>
          <button className="play">
            <i className="fa-solid fa-repeat"></i>
          </button>
        </div>

        <div className="run">
          <span className="current-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="seek-bar"
            value={progress}
            min={0}
            max={100}
            onChange={handleSeek}
          />
          <span className="music-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="vol">
        <button className="volume" onClick={toggleMute}>
          <i className={`fa-solid ${getVolumeIcon()}`}></i>
        </button>
        <input
          className="seek-volume"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
        />
      </div>
    </footer>
  );
};

export default Player;

"use client";

import React, { useEffect, useState } from "react";
import { usePlayer } from "@/app/context/PlayerContext";

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

  // Like button
  const toggleLike = () => setLiked(!liked);

  // Lấy bài hiện tại
  const currentSong = playlist[currentIndex];

  // Theo dõi tiến trình phát
  useEffect(() => {
    const audio = (window as any)._audioRef as HTMLAudioElement;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration)
        setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);

    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [playlist, currentIndex]);

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
            src={currentSong?.image || "/images/default-song.jpg"}
            alt="Singer"
          />
        </a>

        <div className="info-song">
          <a href="#" className="song-tittle">
            {currentSong?.title || "No song"}
          </a>
          <a href="#" className="artist-name">
            {currentSong?.artist || "Unknown"}
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
            onChange={(e) => setProgress(Number(e.target.value))}
          />
          <span className="music-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="vol">
        <button className="volume" onClick={toggleMute}>
          <i className={`fa-solid ${getVolumeIcon()}`}></i>
        </button>
        <input
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

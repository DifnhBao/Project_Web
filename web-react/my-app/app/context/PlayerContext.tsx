"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Song = {
  id: number | string;
  title: string;
  artist?: string;
  image?: string;
  audio?: string;
  duration?: number;
};

type PlayerContextType = {
  playlist: Song[];
  setPlaylist: (pl: Song[], startIndex?: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
  currentIndex: number;
  setIndex: (i: number) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playlist, setPlaylistState] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;
    (window as any)._audioRef = audioRef.current;
    const a = audioRef.current;
    const onEnded = () => {
      setCurrentIndex((idx) =>
        playlist.length ? (idx + 1) % playlist.length : 0
      );
    };
    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, []);

  useEffect(() => {
    if (!playlist.length) return;
    const s = playlist[currentIndex];
    if (!s) return;
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = s.audio || "";
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [playlist, currentIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const setPlaylist = (pl: Song[], startIndex = 0) => {
    setPlaylistState(pl);
    setCurrentIndex(startIndex);
    setIsPlaying(true);
  };

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  };
  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const togglePlay = () => (isPlaying ? pause() : play());

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        setPlaylist,
        play,
        pause,
        togglePlay,
        isPlaying,
        currentIndex,
        setIndex: setCurrentIndex,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchPlaylists,
  fetchArtists,
  fetchPopularTracks,
} from "@/app/utils/jamendo";
import type { Track, Playlist, Artist } from "@/app/types/music";

interface MusicDataContextType {
  tracks: Track[];
  playlists: Playlist[];
  artists: Artist[];
  loaded: boolean;
}

const MusicDataContext = createContext<MusicDataContextType | undefined>(
  undefined
);

export function MusicDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MusicDataContextType>({
    tracks: [],
    playlists: [],
    artists: [],
    loaded: false,
  });

  useEffect(() => {
    async function load() {
      if (data.loaded) return;
      const [tracks, playlists, artists] = await Promise.all([
        fetchPopularTracks(),
        fetchPlaylists(),
        fetchArtists(),
      ]);
      setData({ tracks, playlists, artists, loaded: true });
    }
    load();
  }, [data.loaded]);

  return (
    <MusicDataContext.Provider value={data}>
      {children}
    </MusicDataContext.Provider>
  );
}

export function useMusicData(): MusicDataContextType {
  const context = useContext(MusicDataContext);
  if (!context) {
    throw new Error("useMusicData must be used within a MusicDataProvider");
  }
  return context;
}

"use client";
import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchPlaylists,
  fetchArtists,
  fetchPopularTracks,
} from "@/app/utils/jamendo";

const MusicDataContext = createContext(null);

export function MusicDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState({
    tracks: [],
    playlists: [],
    artists: [],
    loaded: false,
  });

  useEffect(() => {
    async function load() {
      if (data.loaded) return;
      const [tracks, playlists, artists] = await Promise.all([
        fetchPopularTracks(10),
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

export function useMusicData() {
  return useContext(MusicDataContext);
}

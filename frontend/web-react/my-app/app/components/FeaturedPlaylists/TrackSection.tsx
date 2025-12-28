import React from "react";
import { useState, useEffect } from "react";

import { fetchDailySongs } from "@/app/utils/songApi";
import type { Track } from "@/app/types/music";
import { usePlayer } from "@/app/context/PlayerContext";
import HorizontalScroll from "@/app/components/HorizontalScroll";

const TrackSection = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { setPlaylist } = usePlayer();

  useEffect(() => {
    fetchDailySongs().then(setTracks).catch(console.error);
  }, []);

  return (
    <HorizontalScroll>
      <section>
        <div className="scroll-row">
          {tracks.map((song: Track, index) => (
            <div
              key={song.trackId}
              className="card"
              onClick={() => setPlaylist(tracks, index)}
            >
              <img src={song.imageUrl} alt={song.title} />
              <h3>{song.title}</h3>
              <p>{song.artistName}</p>
            </div>
          ))}
        </div>
      </section>
    </HorizontalScroll>
  );
};

export default TrackSection;

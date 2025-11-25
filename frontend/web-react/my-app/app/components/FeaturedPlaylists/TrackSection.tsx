import React from "react";
import { useState, useEffect } from "react";

import { fetchDailySongs } from "@/app/services/songsService";
import type { Track } from "@/app/types/music";
import { usePlayer } from "@/app/context/PlayerContext";
import HorizontalScroll from "@/app/components/HorizontalScroll";

const TrackSection = () => {
  const [tracks, setTracks] = useState([]);
  const { setPlaylist } = usePlayer();

  useEffect(() => {
    fetchDailySongs().then(setTracks);
  }, []);

  return (
    <HorizontalScroll>
      <section>
        <div className="scroll-row">
          {tracks.map((song: Track, index) => (
            <div
              key={song.jamendo_id}
              className="card"
              onClick={() => setPlaylist(tracks, index)}
            >
              <img src={song.image} alt={song.title} />
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </HorizontalScroll>
  );
};

export default TrackSection;

import React from "react";
import { useState, useEffect } from "react";

import { fetchSongs } from "@/app/services/songsService";
import type { Track } from "@/app/types/music";
import { usePlayer } from "@/app/context/PlayerContext";
import HorizontalScroll from "@/app/components/HorizontalScroll";

// interface Props {
//   tracks: Track[];
// }

const TrackSection = () => {
  //: React.FC<Props> = ({ tracks }) => {
  const [tracks, setTracks] = useState([]);
  const { setPlaylist } = usePlayer();

  useEffect(() => {
    fetchSongs().then(setTracks);
  }, []);

  console.log("tracks: ", tracks);
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

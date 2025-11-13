import React from "react";
import type { Playlist } from "@/app/types/music";
import { usePlayer } from "@/app/context/PlayerContext";
import HorizontalScroll from "@/app/components/HorizontalScroll";

interface Props {
  playlists: Playlist[];
  onSelect: (playlist: Playlist) => void;
}

const PlaylistSection: React.FC<Props> = ({ playlists, onSelect }) => {
  const { setPlaylist } = usePlayer();
  return (
    <HorizontalScroll>
      <section>
        <div className="scroll-row">
          {playlists.map((pl) => (
            <div key={pl.id} className="card" onClick={() => onSelect(pl)}>
              <img src={pl.coverImage} alt={pl.name} />
              <h3>{pl.name}</h3>
              <p>{pl.description}</p>
            </div>
          ))}
        </div>
      </section>
    </HorizontalScroll>
  );
};

export default PlaylistSection;

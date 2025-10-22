import React from "react";
import type { Artist } from "@/app/types/music";
import HorizontalScroll from "@/app/components/HorizontalScroll";

interface Props {
  artists: Artist[];
  onSelect: (artist: Artist) => void;
}

const ArtistSection: React.FC<Props> = ({ artists, onSelect }) => (
  <HorizontalScroll>
    <section>
      <div className="scroll-row">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="card card_artist"
            onClick={() => onSelect(artist)}
          >
            <img src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
          </div>
        ))}
      </div>
    </section>
  </HorizontalScroll>
);

export default ArtistSection;

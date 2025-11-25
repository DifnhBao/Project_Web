import React from "react";
import { useState, useEffect } from "react";

import { fetchDailyMixes } from "@/app/services/mixService";
import type { Playlist } from "@/app/types/music";
import HorizontalScroll from "@/app/components/HorizontalScroll";

interface Props {
  onSelect: (playlist: Playlist) => void;
}

const PlaylistSection: React.FC<Props> = ({ onSelect }) => {
  const [mixes, setMixes] = useState<Playlist[]>([]);

  useEffect(() => {
    fetchDailyMixes().then(setMixes);
  }, []);

  return (
    <HorizontalScroll>
      <section>
        <div className="scroll-row">
          {mixes.map((mix) => (
            <div className="card" key={mix.id} onClick={() => onSelect(mix)}>
              <img src={mix.coverImage} alt={mix.title} />
              <h3>{mix.title}</h3>
              <p>{mix.subtitle}</p>
            </div>
          ))}
        </div>
      </section>
    </HorizontalScroll>
  );
};

export default PlaylistSection;

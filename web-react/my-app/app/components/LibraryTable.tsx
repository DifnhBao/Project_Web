"use client";

import React, { useState, useEffect } from "react";
import "../styles/library.css";

interface Song {
  id: number;
  image: string;
  title: string;
  artist: string;
  duration: string;
}

const mockSongs: Song[] = [
  {
    id: 1,
    image: "https://picsum.photos/200?random=1",
    title: "Phép Màu",
    artist: "Hoàng Dũng",
    duration: "04:12",
  },
  {
    id: 2,
    image: "https://picsum.photos/200?random=2",
    title: "Tháng Tư Là Lời Nói Dối Của Em",
    artist: "Hà Anh Tuấn",
    duration: "05:03",
  },
  {
    id: 3,
    image: "https://picsum.photos/200?random=3",
    title: "Nàng Thơ",
    artist: "Hoàng Dũng",
    duration: "04:21",
  },
];

const LibraryTable: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    // sau này có thể fetch API ở đây

    setSongs(mockSongs);
  }, []);

  return (
    <div id="table_row">
      {songs.map((song, index) => (
        <div className="row" key={song.id}>
          <div className="col_index">{index + 1}</div>
          <div className="col_title">
            <img src={song.image} />
            <span>{song.title}</span>
          </div>
          <div className="col_artist">{song.artist}</div>
          <div className="col_duration">{song.duration}</div>
        </div>
      ))}
    </div>
  );
};

export default LibraryTable;

"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchSongs } from "@/app/services/songsService";
import "./SearchBar.css";
import { Track } from "@/app/types/music";

interface SearchBarProps {
  setResults: (results: Track[]) => void;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar = ({ setResults, setSearchTerm }: SearchBarProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Cập nhật dữ liệu ô input
  useEffect(() => {
    const handler = setTimeout(() => {
      const value = input.trim();

      if (value === "") {
        setResults([]);
        return;
      }

      fetchData(value);
    }, 200);

    return () => clearTimeout(handler);
  }, [input]);

  // Gọi api lấy data
  const fetchData = async (value: string) => {
    const currentValue = value;

    try {
      const Tracks = await fetchSongs();
      console.log(Tracks);
      console.log("Fetched Tracks:", Tracks);

      if (currentValue !== input.trim()) return;

      const results = Tracks.filter((track: Track) =>
        track.title.toLowerCase().includes(value.toLowerCase())
      );

      setResults(results);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  // Xử lí dữ liệu hiển thị trong result khi nhập input
  const handleChange = (value: string) => {
    setInput(value);
    setSearchTerm(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" onClick={() => inputRef.current?.focus()} />
      <input
        ref={inputRef}
        placeholder="Bạn muốn phát nội dung gì?"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

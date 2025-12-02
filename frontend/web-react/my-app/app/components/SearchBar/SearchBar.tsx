"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export interface User {
  id: number;
  name: string;
  email?: string;
  username?: string;
}

interface SearchBarProps {
  setResults: (results: User[]) => void;
}

const SearchBar = ({ setResults }: SearchBarProps) => {
  const [input, setInput] = useState("");

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

  const fetchData = async (value: string) => {
    const currentValue = value;

    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: User[] = await response.json();

    if (currentValue !== input.trim()) return;

    const results = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );

    setResults(results);
  };

  const handleChange = (value: string) => {
    setInput(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Bạn muốn phát nội dung gì?"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

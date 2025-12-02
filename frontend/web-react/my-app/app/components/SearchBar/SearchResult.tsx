"use client";

import React from "react";
import "./SearchResult.css";

export interface User {
  id: number;
  name: string;
  email?: string;
  username?: string;
}

interface SearchResultProps {
  result: User;
}

const SearchResult = ({ result }: SearchResultProps) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`You clicked on ${result.name}`)}
    >
      {result.name}
    </div>
  );
};

export default SearchResult;

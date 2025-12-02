"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import "./SearchBarComponent.css";

export interface User {
  id: number;
  name: string;
  email?: string;
  username?: string;
}

export default function SearchBarComponent() {
  const [results, setResults] = useState<User[]>([]);

  return (
    <div className="search-bar-container">
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
    </div>
  );
}

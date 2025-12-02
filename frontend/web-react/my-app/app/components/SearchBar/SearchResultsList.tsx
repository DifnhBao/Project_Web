"use client";

import React from "react";
import "./SearchResultsList.css";
import SearchResult from "./SearchResult";

export interface User {
  id: number;
  name: string;
  email?: string;
  username?: string;
}

interface SearchResultsListProps {
  results: User[];
}

const SearchResultsList = ({ results }: SearchResultsListProps) => {
  return (
    <div className="results-list">
      {results.map((user) => (
        <SearchResult key={user.id} result={user} />
      ))}
    </div>
  );
};

export default SearchResultsList;

import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar({ query, setQuery, handleSearch }) {
  return (
    <div className="search-bar">
      <FaSearch className="icon" />
      <input 
        type="text" 
        placeholder="Search" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
}

export default SearchBar;
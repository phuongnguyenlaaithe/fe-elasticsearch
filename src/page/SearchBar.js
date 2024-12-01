import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="google-search-clone">
      <div className="main">
        <img
          src="/elasticlogo.png"
          alt="Elastic Logo"
          className="logo"
        />
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
        <div className="buttons">
          <button onClick={handleSearch}>Elastic Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

import React, { useState } from "react";
import SearchBar from "../component/SearchBar";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

function SearchPage() {
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
        <SearchBar
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </div>
      <div className="buttons">
        <button onClick={handleSearch}>Elastic Search</button>
      </div>
    </div>
  );
}

export default SearchPage;
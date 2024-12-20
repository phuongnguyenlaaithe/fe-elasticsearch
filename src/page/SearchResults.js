import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar";
import config from "../config"; // Import the configuration file
import "./SearchResults.css"; // Import the CSS file

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search).get("q");
  const [query, setQuery] = useState(queryParam || "");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState(null); // State to manage expanded content
  const size = 10;

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`${config.baseURL}/api/v1/search?q=${query}&page=${page}&size=${size}`);
      const data = await response.json();
      setResults(data);
    };

    if (queryParam) {
      fetchResults();
    }
  }, [queryParam, page]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  const toggleContent = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="search-results-page">
        <SearchBar 
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      <div className="search-results">
        <ul>
          {results.map((result, index) => {
            const fields = Object.entries(result);
            const title = fields[0][1];
            const contentFields = fields.slice(1);
            const previewContent = contentFields.map(([key, value]) => `${key}: ${value}`).join(' ').slice(0, 200) + '...';

            return (
              <li key={index} onClick={() => toggleContent(index)}>
                <h3 className="result-title">
                  <strong>{title}</strong>
                </h3>
                {expandedIndex !== index && (
                  <p className="result-preview">{previewContent}</p>
                )}
                {expandedIndex === index && (
                  <div className="result-content">
                    {contentFields.map(([key, value], i) => (
                      <p key={i}>
                        <strong>{key}:</strong> {value}
                      </p>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="pagination">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          <span style={{ margin: '0 10px' }}>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
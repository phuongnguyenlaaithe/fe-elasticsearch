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
          {results.map((result, index) => (
            <li key={index} onClick={() => toggleContent(index)}>
              <p><strong>Tác giả:</strong> {result.author}</p>
              <p><strong>Thể loại:</strong> {result.poem_form}</p>
              <p><strong>Thời kỳ:</strong> {result.period}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                <h3 style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <strong>{result.title}</strong>
                </h3>
              </a>
              {expandedIndex === index && (
                <p style={{ textAlign: 'center' }}>
                  {result.content.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                </p>
              )}
            </li>
          ))}
        </ul>
        <div className="pagination" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
          <span style={{ margin: '0 10px' }}>Page {page}</span>
          <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
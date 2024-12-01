import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchResults.css"; // Import the CSS file

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const size = 10;

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(`http://localhost:8000/api/v1/search?q=${query}&page=${page}&size=${size}`);
      const data = await response.json();
      setResults(data);
    };

    if (query) {
      fetchResults();
    }
  }, [query, page]);

  return (
    <div className="search-results">
      <h2>Kết quả tìm kiếm cho: "{query}"</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <p><strong>Tác giả:</strong> {result.author}</p>
            <p><strong>Thể loại:</strong> {result.poem_form}</p>
            <p><strong>Thời kỳ:</strong> {result.period}</p>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              <h3 style={{ textAlign: 'center' }}><strong>{result.title}</strong></h3>
            </a>
            <p style={{ textAlign: 'center' }}>{result.content.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
          </li>
        ))}
      </ul>
      <div className="pagination" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default SearchResults;

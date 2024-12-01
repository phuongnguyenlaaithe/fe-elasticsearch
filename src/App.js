import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./page/SearchBar";
import SearchResults from "./page/SearchResults";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

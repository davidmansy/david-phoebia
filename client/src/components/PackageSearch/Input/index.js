import React from "react";

function Input({ showSuggestions, searchTerm, setSearchTerm }) {
  return (
    <input
      className={`search ${showSuggestions ? "search-with-suggestions" : ""}`}
      placeholder="type 're' to try"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default Input;

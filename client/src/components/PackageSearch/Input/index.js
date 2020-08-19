import React from "react";

function Input({ showSuggestions, searchTerm, setSearchTerm }) {
  return (
    <input
      className={`search ${showSuggestions ? "search-with-suggestions" : ""}`}
      placeholder="find package"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default Input;

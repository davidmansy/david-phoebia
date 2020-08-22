import React from "react";

function Input({ showSuggestions, searchTerm, setSearchTerm }) {
  return (
    <React.Fragment>
      <label className="hidden" htmlFor="searchterm">
        Search Term
      </label>
      <input
        className={`search ${showSuggestions ? "search-with-suggestions" : ""}`}
        id="searchterm"
        placeholder="type 're' to try"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </React.Fragment>
  );
}

export default Input;

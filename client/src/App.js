import React from "react";
import { getPackages } from "./api";
import useDebounce from "./hooks/useDebounce";
import "./App.css";
import { ReactComponent as Logo } from "./assets/logo.svg";

// TODO: Unit test
// TODO: react error boundaries
// TODO: E2E test

function App() {
  const [packages, setPackages] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const showSuggestions = packages.length > 0;

  React.useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      setIsLoading(true);
      getPackages(debouncedSearchTerm).then((packages) => {
        setIsLoading(false);
        setPackages(packages);
      });
    } else {
      setPackages([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="App">
      <div className="container">
        <Logo />
        <h1 class="main-title">
          <span class="first-word">DAVID</span>
          <span>PHOEBIA</span>
        </h1>
        <p class="main-description">
          find the cost of adding a npm package to your bundle
        </p>
        <div class="search-container">
          <input
            class={`search ${showSuggestions ? "search-with-suggestions" : ""}`}
            placeholder="find package"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading && <div>Loading ...</div>}
          {!showSuggestions ? null : (
            <ul class="suggestions">
              {packages.map(({ package: npmPackage }) => {
                return (
                  <li key={`${npmPackage.name}-${npmPackage.version}`}>
                    {npmPackage.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

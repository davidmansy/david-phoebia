import React from "react";
import { getPackages } from "./api";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

// TODO: Unit test
// TODO: react error boundaries
// TODO: E2E test

function App() {
  const [packages, setPackages] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  React.useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      setIsLoading(true);
      getPackages(debouncedSearchTerm).then((packages) => {
        setIsLoading(false);
        setPackages(packages);
      });
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="App">
      <p>Hello</p>
      <input
        placeholder="find package"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <div>Loading ...</div>}
      <ul>
        {packages.map(({ package: npmPackage }) => {
          return (
            <li key={`${npmPackage.name}-${npmPackage.version}`}>
              {npmPackage.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;

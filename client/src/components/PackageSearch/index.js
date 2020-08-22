import React from "react";
import { getPackages } from "../../api/core-api/index";
import useDebounce from "../../hooks/useDebounce";
import Suggestions from "./Suggestions";
import Input from "./Input";
import { ReactComponent as Loader } from "../../assets/loader.svg";

const VERSION_SEPARATOR = "@";
const WAIT = 400;

function PackageSearch({ setSelectedPackage }) {
  const [packages, setPackages] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, WAIT);
  const showSuggestions = packages.length > 0;

  const handleSelectPackage = (npmPackage) => {
    setSelectedPackage(npmPackage);
    setPackages([]);
    setSearchTerm(
      `${npmPackage.name}${VERSION_SEPARATOR}${npmPackage.version}`
    );
  };

  React.useEffect(() => {
    if (
      debouncedSearchTerm.length > 1 &&
      !debouncedSearchTerm.includes(VERSION_SEPARATOR)
    ) {
      setIsLoading(true);
      getPackages(debouncedSearchTerm)
        .then((packages) => {
          setIsLoading(false);
          setIsError(null);
          setPackages(packages);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(error);
          setPackages([]);
        });
    } else {
      setPackages([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <React.Fragment>
      <div className="search-container">
        <Input
          showSuggestions={showSuggestions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {isLoading && <Loader style={{ width: "50px" }} />}
        {isError && (
          <p
            style={{ color: "red" }}
          >{`Something went wrong: ${isError.message}`}</p>
        )}
        {showSuggestions ? (
          <Suggestions
            packages={packages}
            handleSelectPackage={handleSelectPackage}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default PackageSearch;

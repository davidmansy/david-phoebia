import React from "react";
import { getPackages } from "../../api/index";
import useDebounce from "../../hooks/useDebounce";
import Suggestions from "./Suggestions";
import Input from "./Input";
import { ReactComponent as Loader } from "../../assets/loader.svg";

const PACKAGE_VERSION_SEPARATOR = "@";

function PackageSearch({ setSelectedPackage }) {
  const [packages, setPackages] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const showSuggestions = packages.length > 0;

  const handleSelectPackage = (npmPackage) => {
    setSelectedPackage(npmPackage);
    setPackages([]);
    setSearchTerm(`${npmPackage.name}@${npmPackage.version}`);
  };

  React.useEffect(() => {
    if (
      debouncedSearchTerm.length > 1 &&
      !debouncedSearchTerm.includes(PACKAGE_VERSION_SEPARATOR)
    ) {
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
    <React.Fragment>
      <div className="search-container">
        <Input
          showSuggestions={showSuggestions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {isLoading && <Loader style={{ width: "50px" }} />}
        {!showSuggestions ? null : (
          <Suggestions
            packages={packages}
            handleSelectPackage={handleSelectPackage}
          />
        )}
      </div>
    </React.Fragment>
  );
}

export default PackageSearch;

import React from "react";
import { getLastVersionsAndPreviousMajor } from "../../api/index";
import { ReactComponent as Loader } from "../../assets/loader.svg";
import Chart from "./Chart/index";

function PackageDetail({ selectedPackage }) {
  const [versions, setVersions] = React.useState([]);
  const [currentVersion, setCurrentVersion] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(null);

  React.useEffect(() => {
    if (selectedPackage) {
      setIsLoading(true);
      getLastVersionsAndPreviousMajor(selectedPackage.name)
        .then((versions) => {
          setIsLoading(false);
          setIsError(null);
          setVersions(versions);
          setCurrentVersion(
            versions.filter((v) => v.version === selectedPackage.version)[0]
          );
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(error);
        });
    }
  }, [selectedPackage]);

  return (
    <div className="package-detail">
      {!selectedPackage ? null : (
        <div>
          {isLoading && (
            <Loader title="A double circle loader" style={{ width: "50px" }} />
          )}
          {isError && (
            <p
              style={{ color: "red" }}
            >{`Something went wrong: ${isError.message}`}</p>
          )}
          {versions.length === 0 ? null : (
            <React.Fragment>
              <p>NAME {currentVersion.name}</p>
              <p>VERSION {currentVersion.version}</p>
              <p>BUNDLE {currentVersion.size} bytes</p>
              <p>GZIP {currentVersion.gzip} bytes</p>
              <Chart versions={versions} />
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}

export default PackageDetail;

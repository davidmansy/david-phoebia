import React from "react";
import { getLastVersionsAndPreviousMajor } from "../../api/index";
import Chart from "./Chart/index";

function PackageDetail({ selectedPackage }) {
  const [versions, setVersions] = React.useState([]);
  const [currentVersion, setCurrentVersion] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedPackage) {
      setIsLoading(true);
      getLastVersionsAndPreviousMajor(selectedPackage.name).then((versions) => {
        setIsLoading(false);
        setVersions(versions);
        setCurrentVersion(
          versions.filter((v) => v.version === selectedPackage.version)[0]
        );
      });
    }
  }, [selectedPackage]);

  return (
    <div className="package-detail">
      {!selectedPackage ? null : (
        <div>
          {isLoading && <div>Loading ...</div>}
          {versions.length === 0 ? null : (
            <React.Fragment>
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

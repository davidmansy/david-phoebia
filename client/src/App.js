import React from "react";
import "./App.css";

function App() {
  const [packages, setPackages] = React.useState([]);
  const PACKAGE_URL = "/packages";
  const searchString = "rea";

  const callBackendAPI = async () => {
    const response = await fetch(`${PACKAGE_URL}?q=${searchString}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  React.useEffect(() => {
    callBackendAPI()
      .then((packages) => {
        setPackages(packages);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <p> Hello</p>
      {packages.map(({ package: npmPackage }) => {
        return (
          <p key={`${npmPackage.name}-${npmPackage.version}`}>
            {npmPackage.name}
          </p>
        );
      })}
    </div>
  );
}

export default App;

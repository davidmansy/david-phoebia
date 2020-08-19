import React from "react";
import "./App.css";
import { ReactComponent as Logo } from "./assets/logo.svg";
import Header from "./components/Header/index";
import PackageSearch from "./components/PackageSearch/index";

// TODO: use components
// TODO: chart library
// TODO: Unit test
// TODO: E2E test

function App() {
  const [selectedPackage, setSelectedPackage] = React.useState(null);

  return (
    <div className="App">
      <div className="container">
        <Logo />
        <Header />
        <PackageSearch setSelectedPackage={setSelectedPackage} />
        {!selectedPackage ? null : <p>{selectedPackage.name}</p>}
      </div>
    </div>
  );
}

export default App;

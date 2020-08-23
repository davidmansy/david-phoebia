import React from "react";
import "./App.css";
import Header from "./components/Header/index";
import PackageSearch from "./components/PackageSearch/index";
import PackageDetail from "./components/PackageDetail";

function App() {
  const [selectedPackage, setSelectedPackage] = React.useState(null);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <PackageSearch setSelectedPackage={setSelectedPackage} />
        <PackageDetail selectedPackage={selectedPackage} />
      </div>
    </div>
  );
}

export default App;

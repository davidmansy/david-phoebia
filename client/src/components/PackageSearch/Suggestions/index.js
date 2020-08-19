import React from "react";

function Suggestions({ packages, handleSelectPackage }) {
  return (
    <ul className="suggestions">
      {packages.map(({ package: npmPackage }) => {
        return (
          <li
            onClick={() => handleSelectPackage(npmPackage)}
            key={`${npmPackage.name}-${npmPackage.version}`}
          >
            {npmPackage.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Suggestions;

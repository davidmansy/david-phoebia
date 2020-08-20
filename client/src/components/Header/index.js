import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";

function Header() {
  return (
    <React.Fragment>
      <Logo />
      <h1 className="main-title">
        <span className="first-word">DAVID</span>
        <span>PHOEBIA</span>
      </h1>
      <p className="main-description">
        find the cost of adding a npm package to your bundle
      </p>
    </React.Fragment>
  );
}

export default Header;

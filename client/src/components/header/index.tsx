import React from "react";
import { LogoIcon } from "../../svg/logo";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const getPrimaryColor = () => {
    return getComputedStyle(document.documentElement).getPropertyValue(
      "--color-primary"
    );
  };

  getPrimaryColor();

  return (
    <div className="header px-4">
      <Link to="/">
        <div className="header__logo d-flex bg-transparent">
          <LogoIcon fill={getPrimaryColor()} />
          <div className="d-flex align-items-center ml-2 bg-transparent">
            Musicon
          </div>
        </div>
      </Link>

      <ul className="header__links d-flex bg-transparent align-items-center">
        <li className="d-flex bg-transparent align-items-center mr-4">
          <Link to="/explore">Explore</Link>
        </li>
        <li className="d-flex bg-transparent align-items-center">
          <Link to="/saved">Saved Songs</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

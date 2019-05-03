import React from "react";
import { LogoIcon } from "../../svg/logo";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header px-4">
      <div className=" header__logo bg-transparent d-flex align-items-center">
        <LogoIcon />
        <h3 className="header__title bg-transparent ml-2">
          <Link to="/">
            Musicon
          </Link>
        </h3>
      </div>
      <ul className="header__links d-flex bg-transparent align-items-center">
        <li className="bg-transparent mr-4">
          <Link to="/dashboard">Explore</Link>
        </li>
        <li className="bg-transparent">
          <Link to="/saved">Saved Songs</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;

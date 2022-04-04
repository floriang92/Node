import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { Name } from "../../Environnement";
import Button from "../Button/Button";
import TextField from "@material-ui/core/TextField";

function Header() {
  return (
    <div className="header">
      <img className="logo" src={process.env.PUBLIC_URL + "/Logo.png"} alt="" />
      <input type="text" className="Search" label="Search or jump to…"></input>
      <ul>
        <li>Pull requests</li>
        <li>Marketplace</li>
        <li>Issues</li>
        <li>Explore</li>
      </ul>
      <div className="right-part"></div>
    </div>
  );
}

export default Header;

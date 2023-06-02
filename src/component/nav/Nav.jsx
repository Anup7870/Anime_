import React from "react";
import "./nav.css";
import { BsFillHeartFill } from "react-icons/bs";
export default function Nav() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand d-flex gap-3" href="#">
          <img
            src="src\assets\logo-no-background.svg"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top w-50"
          />
          <p>AnimeWO</p>
        </a>
        <div className="donate d-flex  flex-row align-items-center text-lg-center">
          <BsFillHeartFill className="me-1 mb-2" fill="#f64c03" />
          <p>Help us</p>
        </div>
      </div>
    </nav>
  );
}

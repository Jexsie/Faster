import React from "react";
import "./LoadingApp.scss";
import Spinner from "./Spinner";
import logo from "../images/logo.jpg";

const LoadingApp = () => {
  return (
    <div className="loading-container">
      <div className="logo-controll">
        <img src={logo} alt="Faster" />
      </div>
      <Spinner />
    </div>
  );
};

export default LoadingApp;

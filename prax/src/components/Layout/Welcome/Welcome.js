import React from "react";
import { StackInfo } from "../StackInfo/StackInfo";
import "./welcome.scss";

export default function Welcome (props) {
  return (
    <div className="welcome-container">
      <div className="left-column">
        <StackInfo />
      </div>
      <div className="right-column">{props.children}</div>
    </div>
  );
};
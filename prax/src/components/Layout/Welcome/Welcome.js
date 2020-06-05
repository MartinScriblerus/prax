import React from "react";
// import { StackInfo } from "../StackInfo/StackInfo";
import "./welcome.scss";
import { StylesContext } from "@material-ui/styles";

const styles = {

  background: "url(http://davidhall.io/wp-content/uploads/2019/07/graphic-notation-John-Cage.jpg)",
}

export default function Welcome (props) {
  return (
    <div 
    style={styles.button}
    className="welcome-container">
   
      <div className="right-column">{props.children}</div>
    </div>
  );
};
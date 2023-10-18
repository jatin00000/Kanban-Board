import React from "react";
import { getInitials, ColorStatus } from "./helper";

export default function Profile(props) {
  let innerDivStyle, pStyle, outerDivStyle;
  if (props.isHeading === false) {
    innerDivStyle = {
      width: "8px",
      borderRadius: "50%",
      backgroundColor: ColorStatus(props.user.status),
      marginTop: "-20px",
      height: "8px",
      marginLeft: "17px",
      position: "absolute",
      border: "2px solid white",
      borderColor: "white",
    };
    pStyle = {
      height: "12px",
      width: "12px",
      fontSize: "11px",
      fontWeight: "100",
      color: "white",
      borderRadius: "50%",
      backgroundColor: props.user.color,
      padding: "7px",
    };
    outerDivStyle = {
      display: "inline",
      float: "right",
      marginTop: "-10px",
    };
  } else {
    pStyle = {
      height: "12px",
      width: "12px",
      fontSize: "11px",
      fontWeight: "100",
      color: "white",
      borderRadius: "50%",
      backgroundColor: props.user.color,
      padding: "7px",
      marginTop: "-6px",
    };
    innerDivStyle = {
      width: "8px",
      borderRadius: "50%",
      backgroundColor: ColorStatus(props.user.status),
      marginTop: "-20px",
      height: "8px",
      marginLeft: "17px",
      position: "absolute",
      border: "2px solid white",
      borderColor: "white",
    };
    outerDivStyle = {
      height: "10px",
      marginRight: "10px",
    };
  }

  return (
    <div style={outerDivStyle}>
      <p style={pStyle}>{getInitials(props.user.name)}</p>
      <div style={innerDivStyle}></div>
    </div>
  );
}

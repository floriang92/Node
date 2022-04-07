import React from "react";
import "./FileDisplay.css";

function FileDisplay(props) {
  return (
    <div className="container-fileContent">
      {props.lines.map((line, index) => {
        if (line !== "") {
          return <p>{line}</p>;
        }
      })}
      <i style={{color: "#c9d1d9"}}>End of document</i>;
    </div>
  );
}

export default FileDisplay;

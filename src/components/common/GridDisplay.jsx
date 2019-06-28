import React from "react";
import "./GridDisplay.css";

function GridDisplay({ children }) {
  return (
    <div className="grid-display mt-3">
      <div className="my-auto w-100">{children}</div>
    </div>
  );
}

export default GridDisplay;

import React from "react";
import "./CurrentStrategy.css";

function InfoUnit({ headline, value }) {
  return (
    <div className="info-unit d-flex flex-column mx-2">
      <div className="head-text mx-auto">{headline}</div>
      <div className="value-text">{value}</div>
    </div>
  );
}

export default InfoUnit;

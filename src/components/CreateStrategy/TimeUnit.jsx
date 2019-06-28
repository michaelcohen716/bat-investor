import React from "react";
import "./CreateStrategy.css";

export const TIME_UNITS = ["Hour", "Day", "Week", "Month"];

function TimeUnit({ unit, active, setActiveTimeUnit }) {
  return (
    <div
      onClick={() => setActiveTimeUnit(unit)}
      className={`time-unit m-1 ${
        active ? "time-unit-active" : "time-unit-inactive"
      }`}
    >
      <div className="time-unit-text">{unit}</div>
    </div>
  );
}

export default TimeUnit;

import React from "react";
import CurrentStrategy from "./CurrentStrategy"
import useGetStrategies from "../../hooks/useGetStrategies";

function CurrentStrategies() {
  const currentStrategies = useGetStrategies();

  return (
    <div className="d-flex flex-column">
      {currentStrategies.map((cs, i) => {
        return (
          <CurrentStrategy key={i} strategy={cs} />
        );
      })}
    </div>
  );
}

export default CurrentStrategies;

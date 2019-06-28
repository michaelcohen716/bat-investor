import React, { useState } from "react";
import GridDisplay from "../common/GridDisplay";
import CreateStrategyForm from "./CreateStrategyForm";
import ActionButton from "../common/ActionButton";
import "./CreateStrategy.css";

function CreateStrategy() {
  /* State */
  // const [showForm, toggleShowForm] = useState(true);
  const [showForm, toggleShowForm] = useState(false);

  /* Render */
  if (!showForm) {
    return (
      <GridDisplay>
        <ActionButton 
          text="Create Strategy" 
          onClick={() => toggleShowForm(true)} 
          showPlus={true}
          />
      </GridDisplay>
    );
  }

  return (
     <CreateStrategyForm />
  )
}

export default CreateStrategy;

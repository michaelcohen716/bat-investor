import React from "react";
import "./Button.css";

function ActionButton({ onClick, text, showPlus, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`action-button ${
        disabled ? "action-button-disabled" : "action-button-active"
      } my-auto d-flex mx-3`}
    >
      <div className="action-button-text d-flex my-auto px-2">
        {showPlus && <div className="plus-button mr-1 my-auto">+</div>}
        <div>{text}</div>
      </div>
    </button>
  );
}

export default ActionButton;

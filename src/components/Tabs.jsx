import React from "react";
import "./Tabs.css";

export const TABS = ["My Strategies", "Invest"];

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="d-flex justify-content-start ml-1">
      {TABS.map((t, i) => {
        return (
          <div
            onClick={() => setActiveTab(t)}
            className={`tab ${
              activeTab === t ? "active-tab" : "inactive-tab"
            } ${i > 0 ? "ml-4" : ""} px-2 py-4`}
            key={i}
          >
            {t}
          </div>
        );
      })}
    </div>
  );
}

export default Tabs;

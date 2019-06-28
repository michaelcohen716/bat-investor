import React, { useEffect, useState } from "react";
import { useWeb3Context } from "web3-react";
import CurrentStrategies from "./CurrentStrategy/CurrentStrategies";
import Tabs, { TABS } from "./Tabs";
import CreateStrategy from "./CreateStrategy/CreateStrategy";
import Invest from "./Invest/Invest";
import BATLogo from "../BATLogo.png";

import "./Home.css";

function Home() {
  /* State */
  const context = useWeb3Context();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  /* Lifecycle */
  useEffect(() => {
    context.setFirstValidConnector(["MetaMask"]);
  }, [context]);

  /* Render */
  if (!context.active && !context.error) {
    return <div>Loading...</div>;
  } else if (context.error) {
    return <div>Error...</div>;
  } else {
    return (
      <div className="mx-auto home mt-5 d-flex flex-column p-4">
        <div className="d-flex justify-content-between">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="d-flex mt-4">
            <img src={BATLogo} className="img-fluid bat" />
            <div className="bat-text mx-3">
              BAT Investor
            </div>
            <img src={BATLogo} className="img-fluid bat" />
          </div>
        </div>
        {activeTab === TABS[0] ? (
          <div className="d-flex flex-column">
            <CreateStrategy />
            <CurrentStrategies />
          </div>
        ) : (
          <Invest />
        )}
      </div>
    );
  }
}


export default Home;

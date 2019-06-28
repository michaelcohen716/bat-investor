import React from "react";
import Web3Provider, { Connectors } from "web3-react";
import Home from "./components/Home";
import "./App.css";

const { InjectedConnector } = Connectors;
const MetaMask = new InjectedConnector({ supportedNetworks: [4] });
const connectors = { MetaMask };

function App() {
  return (
    <div className="App">
      <Web3Provider
        connectors={connectors}
        libraryName={"ethers.js" | "web3.js" | null}
      >
        <Home />
      </Web3Provider>
    </div>
  );
}

export default App;

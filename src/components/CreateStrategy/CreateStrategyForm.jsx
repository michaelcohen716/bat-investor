import React, { useState } from "react";
import GridDisplay from "../common/GridDisplay";
import { _createStrategy } from "../../DCAContract";
import TimeUnit, { TIME_UNITS } from "./TimeUnit";
import { convertToSeconds } from "../../utils";
import ActionButton from "../common/ActionButton";
import BATLogo from "../../BATLogo.png";
import "./CreateStrategy.css";

import Web3 from "web3";
const web3 = new Web3();

function CreateStrategyForm() {
  /* State */
  const [activeTimeUnit, setActiveTimeUnit] = useState(TIME_UNITS[0]);
  const [etherAmount, setEtherAmount] = useState("");
  const [numTimeUnits, setNumTimeUnits] = useState("");
  const [txProcessing, toggleTxProcessing] = useState(false);

  /* Functions */
  const createStrategy = async () => {
    const _termPeriod = convertToSeconds(activeTimeUnit);
    const _periods = numTimeUnits;

    let value = etherAmount * _periods;
    value = web3.utils.toWei(value.toString(), "ether");
    value = web3.utils.toHex(value);

    toggleTxProcessing(true);

    await _createStrategy(_termPeriod, _periods, value, () => {
      toggleTxProcessing(false);
    });
  };

  /* Render */
  const investText = text => (
    <div className="invest-text mx-2 my-auto">{text}</div>
  );

  return (
    <GridDisplay>
      <div className="create-strategy-form d-flex px-4 ml-4">
        {investText("Invest")}

        <div className="my-auto d-flex mx-2">
          <input
            className="ether-input"
            type="text"
            value={etherAmount}
            autoFocus={true}
            onChange={evt => setEtherAmount(evt.target.value)}
          />
          <div className="ml-1">Ξ</div>
        </div>

        <div className="d-flex">
          {investText("In")}
          <img
            alt="bat"
            src={BATLogo}
            className="img-fluid bat-logo my-auto mr-3"
          />
        </div>

        {investText("Each")}
        <div className="d-flex time-units">
          {TIME_UNITS.map(u => (
            <TimeUnit
              unit={u}
              active={u === activeTimeUnit}
              setActiveTimeUnit={setActiveTimeUnit}
              key={u}
            />
          ))}
        </div>

        {investText("For")}

        <div className="my-auto d-flex mx-2">
          <input
            className="ether-input"
            type="text"
            value={numTimeUnits}
            onChange={evt => setNumTimeUnits(evt.target.value)}
          />
          {investText(activeTimeUnit + "s")}
        </div>

        <ActionButton
          onClick={createStrategy}
          text={`Deposit ${String(etherAmount * numTimeUnits).slice(0, 5)} Ξ`}
          disabled={txProcessing}
        />
      </div>
    </GridDisplay>
  );
}

export default CreateStrategyForm;

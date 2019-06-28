import React, { useEffect, useState } from "react";
import GridDisplay from "../common/GridDisplay";
import InfoUnit from "../CurrentStrategy/InfoUnit";
import ActionButton from "../common/ActionButton";
import Moment from "react-moment";
import { ethers } from "ethers";
import { _allocateToStrategy, _getEthToTokenInputPrice } from "../../DCAContract";

function InvestItem({
  strategy: { createdAt, nextAllowedAt, termPeriodAllocation, totalAllocated, id }
}) {
  /* State */
  const [ethTokenVal, setEthTokenVal] = useState(null)
  const [txProcessing, toggleTxProcessing] = useState(false);

  /* Lifecycle */
  useEffect(() => {
    const getEthValue = async() => {
      const val = await _getEthToTokenInputPrice(ethers.utils.parseUnits(totalAllocated, "wei"));
      setEthTokenVal(val);
    }

    getEthValue()
  }, [totalAllocated])


  /* Functions */
  const allocateToStrategy = async () => {
    toggleTxProcessing(true)
    await _allocateToStrategy(id, () => {
      toggleTxProcessing(false)
    });
  };

  /* Render */
  const momentCreated = (
    <Moment fromNow={true} unix={true}>
      {createdAt}
    </Moment>
  );
  const momentLastInvestment =
    nextAllowedAt > createdAt ? (
      <Moment fromNow={true} unix={true}>
        {createdAt}
      </Moment>
    ) : (
      "-"
    );

  const weiToEther = item => ethers.utils.formatEther(item).toString();
  
  return (
    <GridDisplay>
      <div className="d-flex justify-content-between px-2">
        <div className="d-flex">
          <InfoUnit headline="ID" value={`#${id}`} />
          <InfoUnit headline="Created At" value={momentCreated} />
          <InfoUnit headline="Last Investment" value={momentLastInvestment} />
          <InfoUnit headline="ETH Invested" value={weiToEther(totalAllocated)} />
          <InfoUnit headline="Token Value ETH" value={weiToEther(totalAllocated)} />
        </div>
        <div className="d-flex">
          <ActionButton
            disabled={Math.floor(Date.now() / 1000) < nextAllowedAt || txProcessing}
            onClick={allocateToStrategy}
            text={"Invest" + `${`   `}` + `${weiToEther(termPeriodAllocation)} Ξ`}
          />
        </div>
      </div>
    </GridDisplay>
  );
}

export default InvestItem;

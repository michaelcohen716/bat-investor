import React from "react";
import GridDisplay from "../common/GridDisplay";
import InfoUnit from "./InfoUnit";
import { shortenValue, convertWeiToEther, convertFromSeconds } from "../../utils";
import Moment from "react-moment";
import "./CurrentStrategy.css";

function CurrentStrategy({
  strategy,
  strategy: {
    owner,
    createdAt,
    totalAllocation,
    totalAllocated,
    termPeriod,
    termPeriodAllocation,
    nextAllowedAt,
    tokenBalance,
    id
  }
}) {
  const convert = convertWeiToEther;

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

  return (
    <GridDisplay>
      <div className="d-flex px-4">
        <InfoUnit headline="ID" value={`#${id}`} />
        <InfoUnit headline="Created At" value={momentCreated} />
        <InfoUnit headline="Last Investment" value={momentLastInvestment} />
        <InfoUnit headline="BAT Tokens" value={shortenValue(tokenBalance, true)} />
        <InfoUnit
          headline="ETH Per Period"
          value={shortenValue(convert(termPeriodAllocation), false)}
        />
        <InfoUnit
          headline="ETH Remaining"
          value={shortenValue(convert(totalAllocation) - convert(totalAllocated), false)}
        />
        <InfoUnit headline="ETH Invested" value={convert(totalAllocated)} />
        <InfoUnit headline="Investment Period" value={"Each " + convertFromSeconds(Number(termPeriod))} />
      </div>
    </GridDisplay>
  );
}

export default CurrentStrategy;

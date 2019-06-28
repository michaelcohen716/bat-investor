import React, { useEffect, useState } from "react";
import InvestItem from "./InvestItem";
import useGetStrategies from "../../hooks/useGetStrategies";

function Invest() {
  const currentStrategies = useGetStrategies();
  const [BATETH, setBATETH] = useState(null)

  useEffect(() => {
    const jsonFetch = url => fetch(url).then(res => res.json());
    const getBATPrice = async () => {
      const resp = await jsonFetch("https://apiv2.bitcoinaverage.com/indices/tokens/ticker/BATETH")
      const oneMonthChange = resp.changes.percent.month;
    }
    getBATPrice()

 
  }, [BATETH, setBATETH])

  return (
    <div className="d-flex flex-column">
      {currentStrategies.map((cs, i) => {
        return <InvestItem key={i} strategy={cs} />;
      })}
    </div>
  );
}

export default Invest;

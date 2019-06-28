import { useEffect, useState } from "react";
import { sanitize } from "../utils";
import { _getStrategiesByAddress, _getStrategyById } from "../DCAContract";

function useGetStrategies() {
  const [currentStrategies, setCurrentStrategies] = useState([]);

  useEffect(() => {
    const getStrategies = async () => {
      const ids = await _getStrategiesByAddress(
        window.ethereum.selectedAddress
      );

      const strategies = [];
      for (var i = 0; i < ids.length; i++) {
        let strategy = await _getStrategyById(ids[i]);
        strategy = sanitize(strategy, ids[i]);
        strategies.push(strategy);
      }
      setCurrentStrategies(strategies);
    };
    getStrategies();
  }, [setCurrentStrategies]);

  return currentStrategies;
}

export default useGetStrategies;

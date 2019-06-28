import { ethers } from "ethers";

import UNI_FACTORY_ABI from "./contracts/IUniswapFactory.json";
import UNI_EXCHANGE_ABI from "./contracts/IUniswapExchange.json";
import DCAInvestor from "./contracts/DCAInvestor.json";

const UNI_FACTORY_ADDRESS_RINKEBY =
  "0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36";
const BAT_TOKEN_ADDRESS_RINKEBY = "0xDA5B056Cfb861282B4b59d29c9B395bcC238D29B";

const DEPLOYED_DCA_CONTRACT_ADDRESS_RINKEBY =
  "0x05Ea43e2a63F535cef82844273Dc3d3e36883fE3";

export default function DCAContract() {
  if (!window.ethereum) {
    return;
  }

  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();

  return new ethers.Contract(
    DEPLOYED_DCA_CONTRACT_ADDRESS_RINKEBY,
    DCAInvestor.abi,
    signer
  );
}

async function _createStrategy(_termPeriod, _periods, value) {
  return await DCAContract().createStrategy(_termPeriod, _periods, {
    value
  });
}

async function _getStrategiesByAddress(_address) {
  return await DCAContract().getStrategiesByAddress(_address);
}

async function _getStrategyById(_id) {
  const info = await DCAContract().getStrategyAccountInfo(_id);
  const financials = await DCAContract().getStrategy(_id);
  return {
    info,
    financials
  };
}

async function _allocateToStrategy(_id) {
  return await DCAContract().allocateToStrategy(_id);
}

async function _getEthToTokenInputPrice(_ethSold) {
  return await DCAContract().getEthToTokenInputPrice(_ethSold);
}

export {
  _createStrategy,
  _getStrategiesByAddress,
  _getStrategyById,
  _allocateToStrategy,
  _getEthToTokenInputPrice
};

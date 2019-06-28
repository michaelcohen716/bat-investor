const DCAInvestor = artifacts.require("DCAInvestor");
const IUniswapFactory = artifacts.require("IUniswapFactory");
const IUniswapExchange = artifacts.require("IUniswapExchange");

const UNI_FACTORY_ADDRESS_MAINNET = "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95";
const UNI_FACTORY_ADDRESS_RINKEBY = "0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36";

// module.exports = function (deployer, network) {
//     if(network === 'rinkeby'){
//         deployer.deploy(Migrations);
//     }
// };
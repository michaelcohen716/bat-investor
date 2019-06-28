pragma solidity ^0.5.0;
import "./IUniswapExchange.sol";
import "./IUniswapFactory.sol";
import "./IERC20.sol";

contract DCAInvestor {
    uint256 constant UINT256_MAX = ~uint256(0);

    struct DCAStrategy {
        address owner;
        uint totalAllocation; // wei
        uint totalAllocated; // wei
        uint termPeriod; // seconds
        uint termPeriodAllocation; // wei
        uint numPeriods; // units of time
        uint createdAt; // timestamp
        uint nextAllowedAt; // timestamp
        uint tokenBalance; // BAT tokens
    }

    event TermPeriodAllocation(address indexed investor, uint timestamp);

    event StrategyCreated(address indexed investor, uint timestamp);

    IUniswapFactory public uniFactory;
    IUniswapExchange public uniExchange;
    address tokenAddress;

    uint strategyId = 1;

    mapping(address => uint[]) addressToStrategyIds;
    mapping(uint => DCAStrategy) idToStrategies;
    mapping(uint => uint) unallocatedFunds;

    constructor(address _factoryAddress, address _tokenAddress) public {
        uniFactory = IUniswapFactory(_factoryAddress);
        address exchangeAddress = uniFactory.getExchange(_tokenAddress);
        uniExchange = IUniswapExchange(exchangeAddress);
        tokenAddress = _tokenAddress;
    }

    /* 
        @dev Creates a dollar cost averaging strategy
        @param _termPeriod is the unit of time between each investment allocation - denominated in seconds.
        @param _periods is the number of term periods in the strategy.
        @return - .
    */
    function createStrategy(uint _termPeriod, uint _periods) public payable {
        require(msg.value > 0, "No investment allocated");
        require(_periods > 0, "Non-positive number of periods");
        require(_termPeriod > 0, "Non-positive length of period");

        DCAStrategy memory strategy = DCAStrategy({
            owner: msg.sender,
            totalAllocation: msg.value,
            totalAllocated: 0,
            termPeriod: _termPeriod,
            termPeriodAllocation: msg.value / _periods,
            numPeriods: _periods,
            createdAt: block.timestamp,
            nextAllowedAt: block.timestamp,
            tokenBalance: 0
        });

        unallocatedFunds[strategyId] = msg.value;

        idToStrategies[strategyId] = strategy;
        addressToStrategyIds[msg.sender].push(strategyId++);
        emit StrategyCreated(msg.sender, block.timestamp);
    }

    /* 
        @dev Allocates to an existing dollar cost averaging strategy
        @param _strategyId is the existing strategy id
        @return the number of BAT tokens bought in this term period
    */
    function allocateToStrategy(uint _strategyId)
        public
        returns (uint _tokensBought)
    {
        require(
            msg.sender == idToStrategies[_strategyId].owner,
            "You don't own this strategy"
        );
        require(
            unallocatedFunds[_strategyId] >= idToStrategies[_strategyId].termPeriodAllocation,
            "Strategy has completed its run"
        );
        require(
            idToStrategies[_strategyId].nextAllowedAt <= block.timestamp,
            "Not yet time to invest"
        );

        uint allocation = idToStrategies[_strategyId].termPeriodAllocation;
        uint termPeriod = idToStrategies[_strategyId].termPeriod;

        unallocatedFunds[_strategyId] -= allocation;
        _tokensBought = uniExchange.ethToTokenTransferInput.value(allocation)(
            1,
            UINT256_MAX,
            msg.sender
        );
        idToStrategies[_strategyId].tokenBalance += _tokensBought;

        idToStrategies[_strategyId].nextAllowedAt = idToStrategies[_strategyId].nextAllowedAt + termPeriod;
        idToStrategies[_strategyId].totalAllocated += allocation;
        emit TermPeriodAllocation(msg.sender, block.timestamp);
    }

    function getStrategy(uint _strategyId)
        public
        view
        returns (
            uint _totalAllocation,
            uint _totalAllocated,
            uint _termPeriod,
            uint _termPeriodAllocation,
            uint _numPeriods,
            uint _tokenBalance
        )
    {
        return (
            idToStrategies[_strategyId].totalAllocation,
            idToStrategies[_strategyId].totalAllocated,
            idToStrategies[_strategyId].termPeriod,
            idToStrategies[_strategyId].termPeriodAllocation,
            idToStrategies[_strategyId].numPeriods,
            idToStrategies[_strategyId].tokenBalance
        );
    }

    function getStrategyAccountInfo(uint _strategyId)
        public
        view
        returns (uint _createdAt, uint _nextAllowedAt, address _owner)
    {
        return (
            idToStrategies[_strategyId].createdAt,
            idToStrategies[_strategyId].nextAllowedAt,
            idToStrategies[_strategyId].owner
        );
    }

    function getStrategiesByAddress(address _investor)
        public
        view
        returns (uint[] memory _strategyIds)
    {
        return addressToStrategyIds[_investor];
    }

    function getEthToTokenInputPrice(uint256 _ethSold)
        public
        view
        returns (uint _)
    {
        return uniExchange.getEthToTokenInputPrice(_ethSold);
    }

}

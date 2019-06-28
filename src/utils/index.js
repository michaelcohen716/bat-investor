import { TIME_UNITS } from "../components/CreateStrategy/TimeUnit";
import { ethers } from "ethers";
import Web3 from "web3"
const web3 = new Web3();

const SECONDS_PER_HOUR = 60 * 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_WEEK = 24;
const DAYS_PER_MONTH = 30; // no native 'month' unit avail

export const convertToSeconds = (unit) => {
  switch (unit) {
    case TIME_UNITS[0]: {
      // HOUR
      return SECONDS_PER_HOUR;
    }

    case TIME_UNITS[1]: {
      // Day
      return SECONDS_PER_HOUR * HOURS_PER_DAY;
    }

    case TIME_UNITS[2]: {
      // Week
      return HOURS_PER_DAY * DAYS_PER_WEEK;
    }

    case TIME_UNITS[3]: {
      // Month
      return HOURS_PER_DAY * DAYS_PER_MONTH;
    }

    default: {
        return null;
    }
  }
};

export const convertFromSeconds = (seconds) => {
  switch (seconds) {
    case SECONDS_PER_HOUR: {
      return "Hour";
    }

    case SECONDS_PER_HOUR * HOURS_PER_DAY: {
      return "Day";
    }

    case HOURS_PER_DAY * DAYS_PER_WEEK: {
      return "Week";
    }

    case HOURS_PER_DAY * DAYS_PER_MONTH: {
      return "Month";
    }

    default: {
      return null;
    }
  }
};

export const sanitize = (strategy, id) => {
  const {
    _termPeriod,
    _termPeriodAllocation,
    _tokenBalance,
    _totalAllocated,
    _totalAllocation
  } = strategy["financials"];

  const { _createdAt, _owner, _nextAllowedAt } = strategy["info"];

  const convert = item => new ethers.utils.bigNumberify(item).toString();

  const financialInfo = {
    id: convert(id),
    termPeriod: convert(_termPeriod._hex),
    termPeriodAllocation: convert(_termPeriodAllocation._hex),
    tokenBalance: convert(_tokenBalance._hex),
    totalAllocated: convert(_totalAllocated._hex),
    totalAllocation: convert(_totalAllocation._hex),
    createdAt: convert(_createdAt._hex),
    nextAllowedAt: convert(_nextAllowedAt._hex),
    owner: _owner
  };

  return financialInfo;
};

export const shortenValue = (val, isBN) => {
  const newVal = isBN ? val / (10**18) : val;
  const parts = String(newVal).split(".")
  const newStr = `${parts[0]}${parts[1] ? "." + parts[1].slice(0, 3) : ""}`
  return newStr;
}

export const convertWeiToEther = wei => web3.utils.fromWei(wei);
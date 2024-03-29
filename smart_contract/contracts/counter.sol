// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract TestCounter {

    uint private count = 0;
    
    function incrementCounter() public {
        count += 1;
    }

    function decrementCounter() public {
      uint value = getCount();
      require(value > 0, "Counter: decrement overflow");
        count -= 1;
    }

    function getCount() public view returns (uint) {
        return count;
    }
}

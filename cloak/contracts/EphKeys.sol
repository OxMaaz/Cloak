// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract EphKeys {
    
  using SafeERC20 for IERC20;

  struct publickeys {
    bytes32 z;


  }
  
  event eph(
      bytes32 z
 
  );

  address private owner;
  
  publickeys[] keys;

  constructor() {
    owner = msg.sender;
  }

  function publishkeys(bytes32 z) private {
    keys.push(publickeys(z));
  }
  
  function SendTron(bytes32 z, address payable target) public payable {
    require(msg.value > 0, "Sending amount should be more than 0");
    require(target != address(0x0), " Target address required");

    publishkeys(z);
    emit eph(z);
    (bool sent, ) = target.call{value: msg.value}("");
    require(sent, " Failed to send Tron");
  }


  function SendTrc20(bytes32 z, address token, address target, uint256 amount) external {
    require(amount > 0, "Sending amount should be more than 0");
    require(token != address(0x0), " Token contract required");
    require(target != address(0x0), " Target address required");

    publishkeys(z);
    emit eph(z);

    IERC20(token).safeTransferFrom(msg.sender, target, amount);
  }



}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";



contract EphKeys {
    
  using SafeERC20 for IERC20;

  struct publickeys {
    bytes32 x;
    bytes32 y;
    bytes1 ss;

  }
  
  event eph(
      bytes32 r,
      bytes32 s,
      bytes1 secret,
      uint256 timestamp
  );

  address private owner;
  
  publickeys[] keys;

  constructor() {
    owner = msg.sender;
  }

  function publishkeys(bytes32 r, bytes32 s, bytes1 secret) private {
    keys.push(publickeys(r, s, secret));
  }
  
  function SendTron(bytes32 r, bytes32 s, bytes1 secret, address payable target) public payable {
    require(msg.value > 0, "Sending amount should be more than 0");
    require(target != address(0x0), " Target address required");

    publishkeys(r, s, secret);
    emit eph(r,s,secret,block.timestamp);
    (bool sent, ) = target.call{value: msg.value}("");
    require(sent, " Failed to send Tron");
  }


  function SendTrc20(bytes32 r, bytes32 s, bytes1 secret, address token, address target, uint256 amount) external {
    require(amount > 0, "Sending amount should be more than 0");
    require(token != address(0x0), " Token contract required");
    require(target != address(0x0), " Target address required");

    publishkeys(r, s, secret);
    emit eph(r,s,secret,block.timestamp);

    IERC20(token).safeTransferFrom(msg.sender, target, amount);
  }



}
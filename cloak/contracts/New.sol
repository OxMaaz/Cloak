// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract EphKeys {
    
    struct PublicKeys {
        bytes32 r;
        bytes32 s;
        bytes1 a;
    }

    uint256 private totalFunds;
    uint256 private limit;
    PublicKeys[] public logs;

    modifier validAddresses(address token, address target) {
        require(token != address(0x0), "Enter the token address");
        require(target != address(0x0), "Enter the recipient's address");
        _;
    }

    // event EphemeralKeys(uint256 indexed logIndex, uint256 indexed timestamp);

    function getLimit() external view returns (uint256) {
        return limit;
    }

    function getTotalFunds() external view returns (uint256) {
        return totalFunds;
    }

    function publishKeys(
        bytes32 r,
        bytes32 s,
        bytes1 a
    ) private {
        logs.push(PublicKeys(r, s, a));
    }

    function sendTron(
        bytes32 r,
        bytes32 s,
        bytes1 a,
        address payable target
    ) public payable {
        require(msg.value > 0, "Amount should be more than 0");
        require(target != address(0), "Target address required");

        publishKeys(r, s, a);

        // Perform calculations and updates using temporary variables
        uint256 updatedTotalFunds = totalFunds + msg.value;
        uint256 updatedLimit = limit + 1;

        target.transfer(msg.value);

        // Update storage variables with the updated values
        totalFunds = updatedTotalFunds;
        limit = updatedLimit;

        // emit EphemeralKeys(logs.length - 1, block.timestamp);
    }

    function sendTrc20(
        bytes32 r,
        bytes32 s,
        bytes1 a,
        address token,
        address target,
        uint256 amount
    ) external validAddresses(token, target) {
        require(amount > 0, "Amount should be more than 0");

        require(
            IERC20(token).balanceOf(msg.sender) >= amount,
            "Insufficient tokens"
        );

        publishKeys(r, s, a);

        uint256 updatedTotalFunds = totalFunds + amount;
        uint256 updatedLimit = limit + 1;

        IERC20(token).transferFrom(msg.sender, target, amount);

        // Update storage variables with the updated values
        totalFunds = updatedTotalFunds;
        limit = updatedLimit;

        // emit EphemeralKeys(logs.length - 1, block.timestamp);
    }

    function sendTrc721(
        bytes32 r,
        bytes32 s,
        bytes1 a,
        address nft,
        address target,
        uint256 tokenId

    ) external validAddresses(nft, target) {
        require(
            IERC721(nft).balanceOf(msg.sender) > 0,
            "You don't have enough tokens"
        );
        require(
            IERC721(nft).ownerOf(tokenId) == msg.sender,
            "You are not the owner"
        );

        publishKeys(r, s, a);

        uint256 updatedTotalFunds = totalFunds + tokenId;
        uint256 updatedLimit = limit + 1;

        IERC721(nft).safeTransferFrom(msg.sender, target, tokenId);
        totalFunds = updatedTotalFunds;
        limit = updatedLimit;

        // emit EphemeralKeys(logs.length - 1, block.timestamp);
    }
}

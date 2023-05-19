// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract EphKeys {
    using SafeERC20 for IERC20;

    struct publickeys {
        bytes32 r;
        bytes32 s;
        bytes1 ss;
    }

    uint256 internal totalFunds;


    uint256 internal limit;


    event ephKeys(bytes32 r, bytes32 s, bytes1 a, uint256 indexed timestamp);


    address private owner;


    publickeys[] public logs;


    constructor() {
        owner = msg.sender;
    }


    function getLimit() public view returns (uint256) {
        return limit;
    }


    function getTotalFunds() public view returns (uint256) {
        return totalFunds;
    }


    function publishkeys(bytes32 r, bytes32 s, bytes1 a) private {
        logs.push(publickeys(r, s, a));
    }


    function SendTron(
        bytes32 r,
        bytes32 s,
        bytes1 a,
        address payable target
    ) public payable {
        require(msg.value > 0, "amount should be more than 0");
        require(target != address(0x0), " Target address required");

        publishkeys(r, s, a);

        (bool sent, ) = target.call{value: msg.value}("");
        require(sent, " Failed to send ");
        limit++;
        totalFunds += msg.value;
        emit ephKeys(r, s, a, block.timestamp);
    }

    function SendTrc20(
        bytes32 r,
        bytes32 s,
        bytes1 a,
        address token,
        address target,
        uint256 amount
    ) external {
        require(amount > 0, "Amount should be more than 0");
        require(token  != address(0x0), " Enter the token address");
        require(target != address(0x0), " Enter the receipent address");
        require(IERC20(token).balanceOf(msg.sender) > 0, " You dont have enough tokens");

        publishkeys(r, s, a);
        IERC20(token).safeTransferFrom(msg.sender, target, amount);
        totalFunds += amount;
        limit++;
        emit ephKeys(r, s, a, block.timestamp);
    }


    function SendTrc721(
        bytes32 r,
        bytes32 s,
        bytes1 a,
        address Nft,
        address target,
        uint256 tokenId
    ) external {
        require(IERC721(Nft).balanceOf(msg.sender) > 0, " You dont have enough tokens");
        require(IERC721(Nft).ownerOf(tokenId)==msg.sender, "You are not owner");
        require(Nft != address(0x0), " Enter the token address");
        require(target != address(0x0), " Target address required");
        publishkeys(r, s, a);
        IERC721(Nft).safeTransferFrom(msg.sender, target, tokenId);
        totalFunds += 1;
        limit++;
        emit ephKeys(r, s, a, block.timestamp);
    }
}
//TFLwjm3o4zwseqbYYzgMuT8oWvWsAU9PFD
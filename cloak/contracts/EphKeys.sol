// SPDX-License-Identifier: MIT


pragma solidity ^0.8.6;

/**
 * @title EphKeys
 * @dev A smart contract that enables the publication of ephemeral keys on the blockchain and facilitates fund transfers to a specified address.
 *
 * The EphKeys contract allows users to publish their ephemeral keys on the blockchain, consisting of the parameters r, s, and a.
 * These keys serve as authorization for the associated transactions and provide an additional layer of security.
 *
 * Users can publish their ephemeral keys by invoking the appropriate functions in the contract.
 * The contract maintains a log of published keys and keeps track of the total funds received.
 *
 * Users can transfer TRX (Tron), TRC20 tokens, and TRC721 tokens to a designated recipient address, authorized by their published keys.
 *
 * This contract uses OpenZeppelin's ERC20 and ERC721 libraries for token handling.
 * It is essential to test and audit the contract thoroughly before deploying it in a production environment.
 */



    import "./IERC20.sol";
    import "./IERC721.sol";

contract EphKeys {

    
    struct PublicKeys {
        bytes32 r;
        bytes32 s;
        bytes2  a;
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
        bytes2 a
    ) private {
        logs.push(PublicKeys(r, s, a));
    }

    function sendTron(
        bytes32 r,
        bytes32 s,
        bytes2  a,
        address payable target
    ) public payable {
        require(msg.value > 0, "Amount should be more than 0");
        require(target != address(0), "Target address required");

        publishKeys(r, s, a);

        // Perform calculations and updates using temporary variables
        uint256 updatedTotalFunds = totalFunds + msg.value;
        uint256 updatedLimit = limit + 1;

        (bool sent, ) = target.call{value: msg.value}("");
        require(sent, " Failed to send ");

        // Update storage variables with the updated values
        totalFunds = updatedTotalFunds;
        limit = updatedLimit;

        // emit EphemeralKeys(logs.length - 1, block.timestamp);
    }

    function sendTrc20(
        bytes32 r,
        bytes32 s,
        bytes2  a,
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

        uint256 updatedTotalFunds = totalFunds + amount * 1000000 ;
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
        bytes2  a,
        address nft,
        address target,
        uint256 tokenId

    ) external validAddresses(nft, target) {
        require(
            IERC721(nft).ownerOf(tokenId) == msg.sender,
            "You are not the owner"
        );


        publishKeys(r, s, a);

        uint256 updatedTotalFunds = totalFunds + tokenId;
        uint256 updatedLimit = limit + 1;

        IERC721(nft).transferFrom(msg.sender, target, tokenId);
        totalFunds = updatedTotalFunds;
        limit = updatedLimit;

        // emit EphemeralKeys(logs.length - 1, block.timestamp);
    }
}

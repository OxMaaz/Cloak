// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

// Import the interfaces for ERC20 and ERC721 tokens
import "./TRC20.sol";
import "./TRC721.sol";
import "./SafeMath.sol";


/**
 * @title Logs
 * @dev The Logs contract allows users to publish their public keys on tron blockchain,
 * consisting of the parameters r, s, and v.
 * These keys allow the receiver to generate the private key associated with his stealth address.
 * Users publish their public keys by invoking the appropriate functions in the contract.
 * The contract maintains a log of published keys and keeps track of the total funds sent and received.
 * Users can transfer TRX, TRC20, and Non-fungible tokens to a designated recipient stealth address,
 * authorized by their published keys.
 */

contract Logs {
    using SafeMath for uint256;
    
    // using CalculateFee for uint256;

    // @notice Define a struct to represent public keys
    // @dev 'r' and 's' are the 32 bytes represent ephemeral key
    // where 'v' is 2 bytes shared secret key prefixed with ephemeral key used for verification
    // public keys = v+(r+s) or v + (ephemeral keys)

    struct publickeys {
        bytes32 r;
        bytes32 s;
        bytes2 v;
    }

    // @notice Define variables to keep track of the total funds received and the length of public keys

    uint256 internal totalFunds;
    uint256 internal totalAdd;

    // @notice Define a variable to store the owner of the contract

    address private owner;

    // @notice Define an array to store the logs of published public keys

    publickeys[] public logs;

    // @notice Define the contract name

    string public contractName;

    // @notice Events

    event publicKeys(bytes32 r, bytes32 s, bytes2 v, uint256 indexed timestamp);

    // @notice Modifiers

    modifier onlyOwner() {
        assert(msg.sender == owner);
        _;
    }

    modifier validateTokenAddr(address token) {
        require(token != address(0x0), "Token address required");
        _;
    }

    // @notice Constructor

    constructor() {
        owner = msg.sender;
        contractName = "cloak v1";
    }

    // @notice Getters

    function getTotalAddresses() public view returns (uint256) {
        return totalAdd;
    }

    function getTotalVolume() public view returns (uint256) {
        return totalFunds;
    }

    // @notice Function to update the total volume of the contract

    function updateTvl(uint256 _vol) internal {
        uint256 updatedTotalFunds;
        uint256 updatedtotalAddresses;

        assembly {
            // Load values from storage
            updatedTotalFunds := sload(totalFunds.slot)
            updatedtotalAddresses := sload(totalAdd.slot)

            // Perform operations
            updatedTotalFunds := add(updatedTotalFunds, _vol)
            updatedtotalAddresses := add(updatedtotalAddresses, 1)

            // Store the updated values back to storage
            sstore(totalFunds.slot, updatedTotalFunds)
            sstore(totalAdd.slot, updatedtotalAddresses)
        }
    }



    // @notice Function to publish public keys
    // @param r: 32-byte ephemeral key
    // @param s: 32-byte ephemeral key
    // @param v: 2-byte shared secret key prefixed with ephemeral key

    function publishPubkeys(bytes32 r, bytes32 s, bytes2 v) private {
        logs.push(publickeys(r, s, v));
    }

    // @notice Function to get the length of public keys array

    function pubKeysLen() public view returns (uint256) {
        return logs.length;
    }

    // @notice Function to transfer TRX to a target stealth address
    // @param r: 32-byte ephemeral key
    // @param s: 32-byte ephemeral key
    // @param v: 2-byte shared secret key prefixed with ephemeral key
    // @param target: The target address (i.e., the recipient's stealth address)

    function TransferTrx(
        bytes32 r,
        bytes32 s,
        bytes2 v,
        address payable target
    ) public payable returns (uint256) {
        // Check that the value being transferred is greater than 0.
        require(msg.value > 0, "Amount should be more than 0");


        // Publishing public keys on chain
        publishPubkeys(r, s, v);


        // @notice Transfer the funds to the targeted stealth address
        (bool transferSuccess, ) = target.call{value: msg.value}("");
       require(transferSuccess, "Transfer to recipient failed");

        // Perform calculations and updates using temporary variables
        updateTvl(msg.value);

        // Emit an event to log the publication of public keys

        emit publicKeys(r, s, v, block.timestamp);

        return (msg.value );
    }

    // @notice Function to transfer TRC20 tokens to a target stealth address
    // @param r: 32-byte ephemeral key
    // @param s: 32-byte ephemeral key
    // @param v: 2-byte shared secret key prefixed with ephemeral key
    // @param token: The TRC20 token address
    // @param target: The target address
    // @param amount: The amount of tokens to transfer

    function TransferTRC20(
        bytes32 r,
        bytes32 s,
        bytes2 v,
        address token,
        address target,
        uint256 amount

    ) external  validateTokenAddr(token) {

        // Check that the amount being transferred is greater than 0

        require(amount > 0, "Amount should be more than 0");

        require(
            TRC20(token).balanceOf(msg.sender) >= amount,
            "Not enough tokens"
        );

        if (TRC20(token).allowance(msg.sender, address(this)) < amount) {
            revert("Not enough allowance");
        }


        // Publish the public keys.
        publishPubkeys(r, s, v);

        // @notice Transfer tokens from sender's account to target account.
        TRC20(token).transferFrom(msg.sender, target, amount);

        // Perform calculations and updates using temporary variables.
        updateTvl(amount);

        // Emit an event to log the publication of public keys.
        emit publicKeys(r, s, v, block.timestamp);
    }

    function TransferNft(
        bytes32 r,
        bytes32 s,
        bytes2 v,
        address NftToken,
        address target,
        uint256 tokenId
    ) external {
        // Check thatNftToken is not empty.
        require(NftToken != address(0x0), " Enter the token address");

        require(
            TRC721(NftToken).ownerOf(tokenId) == msg.sender,
            "You are not the owner of this tokenId"
        );

        // check if the nft approval belongs to the owner

        if (TRC721(NftToken).getApproved(tokenId) != address(this)) {
            revert("Not approved");
        }

        // Publish the public keys.
        publishPubkeys(r, s, v);

        // @notice Transfer Non Fungible tokens (NFT) from sender's account to target account.

        TRC721(NftToken).transferFrom(msg.sender, target, tokenId);

        // Perform calculations and updates using temporary variables.
        updateTvl(1);

        // Emit an event to log the publication of public keys.
        emit publicKeys(r, s, v, block.timestamp);
    }

    // @notice Function to retrieve a range of public keys
    // @param initVal: The initial value required retreiving public keys

    function retrievePubKeys(
        uint256 initVal
    ) public view returns (publickeys[10] memory) {
        publickeys[10] memory Keys;

        uint256 len = pubKeysLen();
        uint256 end = initVal.add(10);
        uint256 finalVal = len.min(end);

        for (uint256 i = initVal; i < finalVal; i++) {
            Keys[i - initVal] = logs[i]; 
        }

        return Keys;
    }
}
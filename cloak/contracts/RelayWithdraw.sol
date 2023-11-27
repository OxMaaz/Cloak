// // SPDX-License-Identifier: MIT

// pragma solidity 0.8.20;

// import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
// import "./TRC20.sol";

// contract RelayWithdraw {
//     using ECDSA for bytes32;

//     function withrawtrx(
//         address sender,
//         uint256 amount,
//         address recipient,
//         bytes memory signature
//     ) public payable {
//         // Calculate the hash of all the requisite values
//         bytes32 messageHash = getHash(sender, amount, recipient);
//         // Convert it to a signed message hash
//         bytes32 prefixedHash = keccak256(
//             abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
//         );

//         address signer = ECDSA.recover(prefixedHash, signature);

//         // Make sure signer is the person on whose behalf we're executing the transaction
//         require(signer == sender, "Signature does not come from sender");
//         require((signer).balance >= 0, "Signature does not come from sender");

//         //Transfer tokens from sender(signer) to recipient
//         (bool transferSuccess, ) = recipient.call{value: msg.value}("");
//         require(transferSuccess, "Transfer to recipient failed");
//     }

//     function withrawtrc20(
//         address sender,
//         uint256 amount,
//         address recipient,
//         address tokenContract,
//         bytes memory signature
//     ) public {
//         // Calculate the hash of all the requisite values
//         bytes32 messageHash = getTokenHash(sender, amount, recipient, tokenContract);
//         // Convert it to a signed message hash
//         bytes32 prefixedHash = keccak256(
//             abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
//         );

//         address signer = ECDSA.recover(prefixedHash, signature);

//         // Make sure signer is the person on whose behalf we're executing the transaction
//         require(signer == sender, "Signature does not come from sender");
//         require(
//             TRC20(tokenContract).balanceOf(signer) >= 0,
//             "Signature does not come from sender"
//         );

//         // Transfer tokens from sender(signer) to recipient
//         bool sent = TRC20(tokenContract).transferFrom(
//             sender,
//             recipient,
//             amount
//         );
//         require(sent, "Transfer failed");
//     }

//     // Helper function to calculate the keccak256 hash
//     function getHash(
//         address sender,
//         uint256 amount,
//         address recipient
//     ) public pure returns (bytes32) {
//         return keccak256(abi.encodePacked(sender, amount, recipient));
//     }

//     function getTokenHash(
//         address sender,
//         uint256 amount,
//         address recipient,
//         address tokenContract
//     ) public pure returns (bytes32) {
//         return
//             keccak256(
//                 abi.encodePacked(sender, amount, recipient, tokenContract)
//             );
//     }
// }

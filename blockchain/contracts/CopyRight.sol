// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Signer.sol";

contract CopyRight is Signer{

    uint256 public contractId;

    struct ContractContents {
        address author;
        bytes contents;
        string url;
        bytes32 contentsHash;
        uint256 updatedBlocknumber;
    }

    enum type {
        
    }

    mapping (uint256 => ContractContents) public contractInfos;
    mapping (address => uint256[] ownedContractIds) public userContracts;

    event Registerd(uint256 indexed contractId, address indexed author, bytes contents, string url, bytes32 contentsHash, uint256 indexed updatedBlocknumber);
    event Changed(uint256 indexed contractId, address indexed author, bytes contents, string url, bytes32 contentsHash, uint256 indexed updatedBlocknumber);
    constructor() Signer(msg.sender) {}

    function register(bytes memory contents, string memory url, bytes32 contentsHash) public {
        ContractContents memory contractContents = ContractContents(msg.sender, contents, url, contentsHash, block.number);
        contractInfos[contractId] = contractContents;
        userContracts[msg.sender].push(contractId);
        emit Registerd(contractId ,msg.sender, contents, url, contentsHash, block.number);
        contractId++;
    }

    function change(bytes memory contents, string memory url, bytes32 contentsHash) public isSigner {
        ContractContents memory contractContents = ContractContents(msg.sender, contents, url, contentsHash, block.number);
        contractInfos[contractId] = contractContents;
        userContracts[msg.sender].push(contractId);
        emit Registerd(contractId ,msg.sender, contents, url, contentsHash, block.number);
        contractId++;
    }
}

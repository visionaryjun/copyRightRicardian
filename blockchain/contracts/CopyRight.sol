// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract CopyRight {

    uint256 public contractId;

    struct ContractContents {
        string author;
        bytes contents;
        string url;
        bytes32 contentsHash;
    }

    mapping (uint256 => ContractContents) public contractInfos;
    mapping (address => uint256[] ownedContractIds) public userContracts;

    event Registerd(uint256 indexed contractId, string name, bytes contents, string url, bytes32 contentsHash);

    constructor() {}

    function register(string memory name, bytes memory contents, string memory url, bytes32 contentsHash) public {
        ContractContents memory contractContents = ContractContents(name, contents, url, contentsHash);
        contractInfos[contractId] = contractContents;
        userContracts[msg.sender].push(contractId);
        emit Registerd(contractId ,name, contents, url, contentsHash);
        contractId++;
    }
}

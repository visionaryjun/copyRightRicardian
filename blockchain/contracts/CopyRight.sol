// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./Signer.sol";

contract CopyRight is Signer{

    uint256 public contractId;

    struct ContractContents {
        RightType rightType;
        address author;
        bytes contents;
        string url;
        bytes32 contentsHash;
        uint256 updatedBlocknumber;
    }

    enum RightType {
        CopyRight,
        Design,
        TradeMark
    }

    mapping (uint256 => ContractContents) public contractInfos;
    mapping (address => uint256[] ownedContractIds) public userContracts;

    event Registerd(RightType rightType, uint256 indexed contractId, address indexed author, bytes contents, string url, bytes32 contentsHash, uint256 indexed updatedBlocknumber);
    event Changed(RightType rightType, uint256 indexed contractId, address indexed author, bytes contents, string url, bytes32 contentsHash, uint256 indexed updatedBlocknumber);
    constructor() Signer(msg.sender) {}

    function register(RightType rightType,bytes memory contents, string memory url, bytes32 contentsHash) public {
        ContractContents memory contractContents = ContractContents(rightType,msg.sender, contents, url, contentsHash, block.number);
        contractInfos[contractId] = contractContents;
        userContracts[msg.sender].push(contractId);
        emit Registerd(rightType, contractId ,msg.sender, contents, url, contentsHash, block.number);
        contractId++;
    }

    function change(RightType rightType,bytes memory contents, string memory url, bytes32 contentsHash) public isSigner {
        ContractContents memory contractContents = ContractContents(rightType,msg.sender, contents, url, contentsHash, block.number);
        contractInfos[contractId] = contractContents;
        userContracts[msg.sender].push(contractId);
        emit Registerd(rightType, contractId ,msg.sender, contents, url, contentsHash, block.number);
        contractId++;
    }

    function getContractContents(uint256 _contractId) public view returns (RightType, address, bytes memory, string memory, bytes32, uint256) {
        ContractContents memory content = contractInfos[_contractId];
        return (content.rightType, content.author, content.contents, content.url, content.contentsHash, content.updatedBlocknumber);
    }

    function decodeContents(bytes memory contents) public pure returns (string memory) {
        return string(contents);
    }
}

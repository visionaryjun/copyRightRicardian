pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Signer is Ownable {
    event SignerAdded(address indexed signer);
    event SignerRemoved(address indexed signer);

    mapping(address => bool) private _isSigner;
    address[] private activeSigners;

    modifier isSigner() {
        require(getSigner(msg.sender), "Signer: msg.sender is not as signer");
        _;
    }

    constructor(address owner_) Ownable(owner_){
         _isSigner[owner_] = true;
        activeSigners.push(owner_);
        emit SignerAdded(owner_);
    }

    function getSigner(address signer) public view returns (bool) {
        return _isSigner[signer];
    }

    function addSigner(address signer) external onlyOwner {
        require(!_isSigner[signer], "Signer: Address is already a signer");
        _isSigner[signer] = true;
        activeSigners.push(signer);
        emit SignerAdded(signer);
    }

    function removeSigner(address signer) external onlyOwner {
        require(_isSigner[signer], "Signer: Address is not a signer");
        _isSigner[signer] = false;
        emit SignerRemoved(signer);

        // Remove signer from active signers
        for (uint256 i = 0; i < activeSigners.length; i++) {
            if (activeSigners[i] == signer) {
                activeSigners[i] = activeSigners[activeSigners.length - 1];
                activeSigners.pop();
                break;
            }
        }
    }

    function viewSigners() external view returns (address[] memory) {
        return activeSigners;
    }
}

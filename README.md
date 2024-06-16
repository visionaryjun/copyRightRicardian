## SmartContract Sequance diagram

``` mermaid
sequenceDiagram
    participant User
    participant Contract
    participant NFTContract as NFT Contract

    User->>Contract: register(RightType, contents, url, contentsHash)
    Contract-->>User: emit Registered event

    User->>Contract: registerNft(_nftAddress, _nftId, _rightId)
    Contract->>NFTContract: ownerOf(_nftId)
    NFTContract-->>Contract: returns owner address
    Contract-->>User: emit Registered event if owner
    Contract-->>User: Error if not owner

    User->>Contract: getContractContents(_contractId)
    Contract-->>User: returns contract contents

    User->>Contract: checkContractIdByAddress(_address)
    Contract-->>User: returns contract IDs

    User->>Contract: getRegisteredNfts(_rightId)
    Contract-->>User: returns registered NFT addresses

```

## flow chart

``` mermaid
flowchart TD
    A[User Registers Contract] -->|register| B{Is Author?}
    B -- Yes --> C[Store Contract]
    C --> D[Emit Registered Event]
    B -- No --> E[Reject Registration]

    F[User Registers NFT] -->|registerNft| G{Is Author?}
    G -- Yes --> H[Check NFT Ownership]
    H --> I[NFT Contract: ownerOf]
    I -->|Owner Matches| J[Store NFT Address]
    J --> K[Emit Registered Event]
    I -->|Owner Does Not Match| L[Reject NFT Registration]

    M[User Queries Contract Contents] -->|getContractContents| N[Return Contract Contents]
    O[User Queries Contract IDs] -->|checkContractIdByAddress| P[Return Contract IDs]
    Q[User Queries Registered NFTs] -->|getRegisteredNfts| R[Return Registered NFT Addresses]

```
## BlockLock
BlockLock was created during the Ethdam 2024 hackathon.


## Our purpose
BlockLock attempts to redefine the definition of secure password management. We are addressing a crucial problem, the improper storage and hadnling of user's passwords.


## Method and results



## Repository overview


├── README.md
├── data
├── gen
│   ├── analysis
│   ├── data-preparation
│   └── paper
└── src
    ├── analysis
    ├── data-preparation
    └── paper


## Running instructions

To run the extension:
```bash
pnpm install
pnpm run dev

```
To configure sapphire smart contract:

```bash
pnpm install
pnpm hardhat compile
```

To run on testnet:
```bash
npx hardhat run scripts/deploy.ts --network sapphire-testnet
```
To run on Mainnet:
```bash
npx hardhat run scripts/deploy.ts --network sapphire
```



## More resources

Point interested users to any related literature and/or documentation.


## About

Explain who has contributed to the repository. You can say it has been part of a class you've taken at Tilburg University.


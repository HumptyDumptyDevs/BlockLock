## BlockLock
BlockLock was created during the [Ethdam](https://www.ethdam.com/) 2024 Hackathon.


## Our purpose
BlockLock attempts to democratise decentralised privacy by lowering the barrier to entry.

## What is BlockLock
BlockLock is a web extension that works similarly to web2 password manager plugins like 1Pass, however the difference is that data is stored on chain.
Oasis was a great fit for the project with Sapphire's encrypted storage of data & private execution environment to maintain confidentiality.


## Layout
This mono-repo is made up of two main components:

1. `./extension` - Browser extension 
2. `./sapphire` - Sapphire smart contract

## Repository overview

- extension: Front end of the extension.   
      - public: Images used are stored here.   
      - src: main functionallity of the app.     
          -components: React components.   
          -pages: pages for the extension.
    
- sapphire: Where the smart contracts of the app are.   
      - contracts: smart contract is stored here.   
      - test: tests are written here.   

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

To deploy on testnet:
```bash
npx hardhat run scripts/deploy.ts --network sapphire-testnet
```
To deploy on Mainnet:
```bash
npx hardhat run scripts/deploy.ts --network sapphire
```

## More resources
```
Oasis Documentation - https://docs.oasis.io/
```

## Our Socails
Humpty Dumpty Devs - @hddevs | Charlie - @mackcee | Jack - @goodestacre | Jordan - @0xjordang | Vikrant - @vikr13nt










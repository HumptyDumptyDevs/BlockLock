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

**Extension**

1. Build the extension
```bash
cd extension
pnpm install
pnpm dev
```

2. This will create a `dist/` folder that can be loaded into any Chrome-based browser following steps [here](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

**Contract**

1. Compile the contract
```bash
cd sapphire
pnpm install
pnpm hardhat compile
```

2. Test the contract
```bash
npx hardhat test tests/SecretStore.test.ts
npx hardhat run scripts/deploy.ts --network sapphire-testnet
```

3. Deploy on testnet:
```bash
npx hardhat run scripts/deploy.ts --network sapphire-testnet
```

4. Deploy on mainnet:
```bash
npx hardhat run scripts/deploy.ts --network sapphire
```

## More resources
```
Oasis Documentation - https://docs.oasis.io/
```

## Our Socails
Humpty Dumpty Devs - @hddevs | Charlie - @mackcee | Jack - @goodestacre | Jordan - @0xjordang | Vikrant - @vikr13nt










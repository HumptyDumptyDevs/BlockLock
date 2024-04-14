## BlockLock
BlockLock was created during the Ethdam 2024 hackathon.


## Our purpose
BlockLock attempts to redefine the definition of secure password management. We are addressing a crucial problem, the improper storage and hadnling of user's passwords.

## What is BlockLock
BlockLock is a web extension that works similarly to web2 password manager plugins like 1Pass, however the difference is that the storing of sensitve data is done on chain.
We chose to store data on Oasis chain simply because they are privacy focused and it is easy to encrupt data and store it on chain.


## Layout
This repo is made up of two main sections, the extension(React.js) and the sapphire smart contract(Solidity)


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










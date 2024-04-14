## BlockLock
BlockLock was created during the [Ethdam](https://www.ethdam.com/) 2024 Hackathon.


## Our purpose
BlockLock attempts to bridge the gap between traditional web2 user experience and the advantages of using a confidential and decentralised environment. 


## What is BlockLock
BlockLock is a web extension that works similarly to web2 password manager plugins like 1Pass, however the difference is that data is stored on chain.
Oasis was a great fit for the project with Sapphire's encrypted storage of data & private execution environment to maintain confidentiality.


## Layout
This mono-repo is made up of two main components:

1. `./extension` - Browser extension 
2. `./sapphire` - Sapphire smart contract

## Running instructions
**Contract**
1. Create a `.env` file with your private key
```bash
cd sapphire
touch .env

Set the following keys:
PRIVATE_KEY=...
```

2. Compile the contract
```bash
cd sapphire
pnpm install
pnpm hardhat compile
```

3. Test the contract
```bash
npx hardhat test tests/SecretStore.test.ts
```

4. Deploy on testnet or mainnet:
```bash
testnet:
npx hardhat run scripts/deploy.ts --network sapphire-testnet

mainnet:
npx hardhat run scripts/deploy.ts --network sapphire
```

**Extension**

1. Create a `.env` file with your private key
```bash
cd extension
touch .env

Set the following keys:
VITE_METAMASK_EXT_ID=nkbihfbeogaeaoehlefnkodbefgpgknn
VITE_STORAGE_CONTRACT_ADDRESS=0x744c272c12D6c2417a0a99C69CaAD3719bc14E1C
```

2. Build the extension
```bash
pnpm install
pnpm dev
```

3. This will create a `dist/` folder that can be loaded into any Chrome-based browser following steps [here](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)



## More resources
```
Oasis Documentation - https://docs.oasis.io/
```
We have deployed & verified a version of this contract on Sapphire testnet which you can use: https://explorer.oasis.io/search?q=0x744c272c12D6c2417a0a99C69CaAD3719bc14E1C

## Our Socials
Humpty Dumpty Devs - [@hddevs](https://twitter.com/hddevs) | Charlie - [@mackcee](https://twitter.com/mackcee) | Jack - [@goodestacre](https://twitter.com/goodestacre) | Jordan - [@0xjordang](https://twitter.com/0xjordang) | Vikrant - [@vikr13nt](https://twitter.com/vikr13nt)










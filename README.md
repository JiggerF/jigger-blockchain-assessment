# Coding Challenge QA Engineer
This repository contains a node.js project which deploys solidity contract to a blockchain using Hardhat. Performs post-deployment verification to test a setter and getter function which prints out the value that was set. A json output file is also created as a result of the completed deployment and test.
## Pre-requisite:
- npm ^10.5.2
- node ^20.12.2: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Docker Engine: https://docs.docker.com/engine/install/
## Quick start
Firstly, clone this project into your local and install it's dependencies
```shell
   $ git clone https://github.com/JiggerF/Jigger_Fantonial-qa-assessment.git
   $ cd Jigger_Fantonial-qa-assessment
   $ npm install
```
Verify dependencies are installed, let's compile our solidity contract:
```shell
   $ npx hardhat compile
   Result: Compiled 1 Solidity file successfully (evm target: berlin).
```
Before we deploy our contract to ethereum's testnet Sepolia, we need to provide our keys
1. From the project's root folder, make file copy of `.env.template` to new file `.env`
2. Acquire each keys from the following sources:
   - SEPOLIA_PRIVATE_KEY = Your crypto wallet private keys
   - ALCHEMY_API_KEY = Go to https://alchemy.com, sign up, create a new App in
     its dashboard
3. Replace "XX" values accordingly where `NETWORK` is the testNet name to deploy to <BR>
```shell
  SEPOLIA_PRIVATE_KEY="XX"
  ALCHEMY_API_KEY="XX"
  NETWORK="XX"
```
Now, we can deploy our contract
## Compile, Deploy and Test a Contract
To deploy our contract to a live test network (e.g. Sepolia) we'll use **Docker**
1. From the project's root folder, execute below script
```shell
    $ ./script/deploy-contract.sh
```
2. Deployment status is shown on the console like below:
```shell
    ...
    Compiling contract ...
    Downloading compiler 0.8.6
    Downloading compiler 0.8.6
    Compiled 1 Solidity file successfully (evm target: berlin).
    Deploying contract to a testnet ...
    Deploying the contract ...
    Contract is deployed to address: 0xF35eEc011Be28Cce017F3472E8027336Cc5c06c1
    Calling SetBytes function with value 0x12345678
    Calling getBytes function and retrieved 0x
    {"contractAddress":"0xF35eEc011Be28Cce017F3472E8027336Cc5c06c1","ownerAddress":"0x102fb8782C4e03795FdA365427aC21196203281F","valueSet":"0x12345678"}
    Data has been written to file output.json successfully.
    - end-
```
3. File `output.json` is generated in the project's root folder
```shell
    {"contractAddress":"0x5FbDB2315678afecb367f032d93F642f64180aa3","ownerAddress":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","valueSet":"0x12345678"}
```
### Deploy contract to in-memory for debugging
In order to test the deployment script without deploying to a live test network
1. Set invalid value for env var `NETWORK` in the `docker-compose.yaml` if you're deploying from docker or `.env` if running local
2. If deploying from local, call the deployment script directly
```shell
    npx hardhat run ./scripts/deploy.js
```
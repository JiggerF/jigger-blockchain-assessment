#!/bin/bash -e

TARGET_NETWORK=$(echo $NETWORK | tr '[:upper:]' '[:lower:]')

npx hardhat clean
echo "Compiling contract ..."
npx hardhat compile

if [ "$TARGET_NETWORK" == "sepolia" ]
then
   echo "Deploying contract to a testnet ..."
   npx hardhat run ./scripts/deploy.js --network sepolia
else
  echo "NETWORK unknown, deploying contract in-memory ..."
  npx hardhat run ./scripts/deploy.js
fi
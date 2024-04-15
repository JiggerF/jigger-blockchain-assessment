const { ethers } = require("hardhat")
const fs = require('fs')

const CONTRACT_NAME = "GetterSetter"
const BYTE_VALUE = "0x12345678"
const FILE_PATH = "output.json"

async function writeToFile(deploymentInfo) {
    fs.writeFile(FILE_PATH, JSON.stringify(deploymentInfo), (err) => {
        if (err) {
            console.error('Error writing to file:', err)
        } else {
            console.log(`Data has been written to file ${FILE_PATH} successfully.`)
        }
    })
}

async function main() {
    try {
        // Load the contract
        const contractFactoryItem = await ethers.getContractFactory(CONTRACT_NAME)

        // Deploy the contract
        const getterSetterContract = await contractFactoryItem.deploy()

        // Wait until the contract is fully deployed
        await getterSetterContract.deployTransaction
        let deployedContractAddress = getterSetterContract.target
        console.log(`Contract is deployed to address: ${deployedContractAddress}`)

        // Connect to the deployed contract
        const contractInstance = await contractFactoryItem.attach(deployedContractAddress)

        // Invoke setter and getter function of the contract
        await contractInstance.setBytes(BYTE_VALUE)
        console.log(`Calling SetBytes function with value ${BYTE_VALUE}`)
        console.log(`Calling getBytes function and retrieved ${await contractInstance.getBytes()}`)

        // Get Deployer's wallet
        const [deployer] = await ethers.getSigners()

        // Report deployment result
        let deploymentInfo = {}
        deploymentInfo.contractAddress = deployedContractAddress
        deploymentInfo.ownerAddress = deployer.address
        deploymentInfo.valueSet = BYTE_VALUE

        console.log(JSON.stringify(deploymentInfo))

        // Write result to file
        writeToFile(deploymentInfo)

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()



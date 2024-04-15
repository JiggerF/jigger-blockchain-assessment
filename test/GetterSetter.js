const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("GetterSetter contract", function () {

    it("should get and set Bytes stored value", async function () {

        // Deploy contract
        let byte8Value = "0x12345678"

        const hardhatContract = await ethers.getContractFactory("GetterSetter")
        const contractInstance = await hardhatContract.deploy()
        await contractInstance.waitForDeployment()

        // Interact with the contract
        await contractInstance.setBytes(byte8Value)

        // Assert returned values
        expect(await contractInstance.getBytes()).to.equal(byte8Value)    
    })
})
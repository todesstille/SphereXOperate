const hre = require("hardhat");
require('dotenv').config();
const assert = require('assert');
const SLOTS_MAX = 500;

class Builder {
    constructor(isPoolEngine = true) {
        this.patternStart = "0x000000000000000000000000000000000000000000000000000001";
        this.currentPattern = "0x000000000000000000000000000000000000000000000000000001";
        if (isPoolEngine) {
            this.engineAddress = process.env.POOL_ENGINE;    
        } else {
            this.engineAddress = process.env.CORE_ENGINE;
        }
        this.patterns = [];
    }

    getPatterns() {
        return this.patterns;
    }

    init() {
        this.currentPattern = this.patternStart;
    }

    enter(selector) {
        assert(selector.length == 8);
        const coder = new hre.ethers.utils.AbiCoder();
        const intSelector = hre.ethers.BigNumber.from("0x" + selector);
        const uintPattern = hre.ethers.BigNumber.from(this.currentPattern);
        const encode = coder.encode(["int256", "uint216"], [intSelector, uintPattern]);
        const buffer = Buffer.from(encode.slice(2), "hex");
        const keccak = hre.ethers.utils.keccak256(buffer);
        const bytes27 = "0x" + keccak.slice(2, 56);
        this.currentPattern = bytes27;
    }

    exit(selector) {
        assert(selector.length == 8);
        const coder = new hre.ethers.utils.AbiCoder();
        let intSelector = hre.ethers.BigNumber.from("0x" + selector);
        intSelector = hre.ethers.BigNumber.from(0).sub(intSelector);
        const uintPattern = hre.ethers.BigNumber.from(this.currentPattern);
        const encode = coder.encode(["int256", "uint216"], [intSelector, uintPattern]);
        const buffer = Buffer.from(encode.slice(2), "hex");
        const keccak = hre.ethers.utils.keccak256(buffer);
        const bytes27 = "0x" + keccak.slice(2, 56);
        this.currentPattern = bytes27;

        let patterns = this.patterns;
        if (patterns.indexOf(bytes27) == -1) {
            patterns.push(bytes27);
        }
    }

    getCalldata() {
        const coder = new hre.ethers.utils.AbiCoder();
        let patternsBN = this.patterns.map((x) => hre.ethers.BigNumber.from(x));

        let result = coder.encode(["uint[]"], [patternsBN]);
        let data = "0x04539062" + result.substring(2);

        return data;
    }

    async setPatterns(skip = 0) {
        const [admin] = await hre.ethers.getSigners();
        const coder = new hre.ethers.utils.AbiCoder();
        let patternsBN = this.patterns.map((x) => hre.ethers.BigNumber.from(x));

        let txCounter = 0;
        while (txCounter * SLOTS_MAX < patternsBN.length) {
            if (skip > 0) {
                txCounter++;
                console.log(txCounter, "skipped:");
                skip--;
                continue;
            }
            let block = patternsBN.slice(txCounter * SLOTS_MAX, txCounter * SLOTS_MAX + SLOTS_MAX);
            let result = coder.encode(["uint[]"], [block]);
            let data = "0x04539062" + result.substring(2);
            
            let tx = await admin.sendTransaction({
                value: 0,
                to: this.engineAddress,
                data: data
            });
            let receipt = await tx.wait();
            txCounter++;
            console.log(txCounter, "txHash:", receipt.transactionHash);
        }
    }
}


module.exports = {
    Builder,
};
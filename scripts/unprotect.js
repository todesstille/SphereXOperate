const hre = require("hardhat");
const { Builder } = require("./patterns/builder");

async function main() {
    const [admin] = await hre.ethers.getSigners();
    const poolRegistryAddress = process.env.POOL_REGISTRY;
    
    const coder = new hre.ethers.utils.AbiCoder();
    let result = coder.encode(["string", "bytes4[]"], ["USER_KEEPER", ["0x7be49fe3"]]);
    let data = "0x29809f7d" + result.slice(2);
    let tx = await admin.sendTransaction({
        value: 0,
        to: poolRegistryAddress,
        data: data
    });

    let receipt = await tx.wait();
    console.log("Unprotect unlockNft. txHash:", receipt.transactionHash);

    result = coder.encode(["string", "bytes4[]"], ["TOKEN_SALE_PROPOSAL", ["0x2afaca20"]]);
    data = "0x29809f7d" + result.slice(2);
    tx = await admin.sendTransaction({
        value: 0,
        to: poolRegistryAddress,
        data: data
    });

    receipt = await tx.wait();
    console.log("Unprotect old buy. txHash:", receipt.transactionHash);
    
    result = coder.encode(["string", "bytes4[]"], ["TOKEN_SALE_PROPOSAL", ["0xfe49cff8"]]);
    data = "0xadab6520" + result.slice(2);
    tx = await admin.sendTransaction({
        value: 0,
        to: poolRegistryAddress,
        data: data
    });

    receipt = await tx.wait();
    console.log("Protect new buy. txHash:", receipt.transactionHash);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

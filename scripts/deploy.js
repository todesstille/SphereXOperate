const hre = require("hardhat");
const { Builder } = require("./patterns/builder");

async function main() {
  const builder = new Builder();

  const {addDelegateBatch, addWhiteListBatch, addCreteMultiplierNftBatch, addMulticallVoteBatch, addWithdrawBatch}  = require("./patterns/schemes");
  // addWhiteListBatch(builder, 500);
  // addCreteMultiplierNftBatch(builder, 500);
  addDelegateBatch(builder, 20, 20);
  addMulticallVoteBatch(builder, 20);
  addWithdrawBatch(builder, 20);

  await builder.setPatterns();
  // console.log(builder.getPatterns().length)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");
const { Builder } = require("./patterns/builder");

async function main() {
  const builder = new Builder();

  const {addDelegateBatch, addWhiteListBatch, addCreteMultiplierNftBatch}  = require("./patterns/schemes");
  addDelegateBatch(builder, 21, 21);
  // addWhiteListBatch(builder, 500);
  // addCreteMultiplierNftBatch(builder, 500);

  await builder.setPatterns();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

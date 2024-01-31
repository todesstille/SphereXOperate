const hre = require("hardhat");
const { Builder } = require("./patterns/builder");

async function main() {
  const builder = new Builder();

  const {addDelegateBatch}  = require("./patterns/schemes");
  addDelegateBatch(builder, 21, 21);

  await builder.setPatterns();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
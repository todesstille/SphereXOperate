const hre = require("hardhat");
const { Builder } = require("./patterns/builder");

async function main() {
  const builder = new Builder();

  const {addDelegateBatch}  = require("./patterns/schemes");
  addDelegateBatch(builder, 10, 10);

  // console.log(builder.getPatterns())
  // console.log(builder)
  await builder.setPatterns();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
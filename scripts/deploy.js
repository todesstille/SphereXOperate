const hre = require("hardhat");
const { Builder } = require("./patterns/builder");

async function main() {
  const builder = new Builder();

  const {
    addDelegateBatch, 
    addWhiteListBatch, 
    addMulticallVoteBatch, 
    addWithdrawBatch,
    addModifyMultiplierNftsBatch,
    addCreateProposalAndVoteBatch,
    addExecuteProposalCreationBatch,
    addExecuteCancelVoteBatch,
    addExecuteVoteBatch,
    
    addInjectGPDependenciesBatch,
    addBasicCorePatternsBatch,
    addNewBuyPatternBatch,

  }  = require("./patterns/schemes");
  // addWhiteListBatch(builder, 500);
  // addModifyMultiplierNftsBatch(builder, 0, 500);
  // addModifyMultiplierNftsBatch(builder, 500, 0);
  // addDelegateBatch(builder, 15, 15);
  // addMulticallVoteBatch(builder, 20);
  // addWithdrawBatch(builder, 25);
  // addModifyMultiplierNftsBatch(builder, 50, 50);
  // addCreateProposalAndVoteBatch(builder, 25);
  // addExecuteProposalCreationBatch(builder, 20);
  // addExecuteCancelVoteBatch(builder, 50);
  // addExecuteVoteBatch(builder, 20);

  addInjectGPDependenciesBatch(builder, 100);
  addNewBuyPatternBatch(builder);
  await builder.setPatterns();
  // console.log(builder.getPatterns().length)

  const coreBuilder = new Builder(false);
  
  addBasicCorePatternsBatch(coreBuilder);
  await coreBuilder.setPatterns();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

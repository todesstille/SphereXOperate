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
    addOneLinersBatch,
    
    addInjectGPDependenciesBatch,
    addBasicCorePatternsBatch,

  }  = require("./patterns/schemes");
  // addWhiteListBatch(builder, 500);
  // addModifyMultiplierNftsBatch(builder, 0, 500);
  // addModifyMultiplierNftsBatch(builder, 500, 0);
  // addDelegateBatch(builder, 15, 15);
  // addMulticallVoteBatch(builder, 20);
  // addWithdrawBatch(builder, 25);
  // addModifyMultiplierNftsBatch(builder, 20, 20);
  // addCreateProposalAndVoteBatch(builder, 20);
  // addExecuteProposalCreationBatch(builder, 20);
  // addExecuteCancelVoteBatch(builder, 20);
  // addExecuteVoteBatch(builder, 20);
  addOneLinersBatch(builder);

  // addInjectGPDependenciesBatch(builder, 100);
  await builder.setPatterns();
  // console.log(builder.getPatterns().length)

  // const coreBuilder = new Builder(false);
  
  // addBasicCorePatternsBatch(coreBuilder);
  // await coreBuilder.setPatterns();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

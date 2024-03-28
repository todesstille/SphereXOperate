const assert = require('assert');

function splitIntToBool(n, length) {
    let result = [];
    while (length > 0) {
        result.push((n % 2) == 1)
        n = n >> 1;
        length--;
    }
    return result;
}

function addUnlockTokens(builder, unlockTokenCycles, withUpdate) {
    for (let i = 0; i < unlockTokenCycles; i++) {
        builder.enter("7fde4424"); // GovUserKeeper::unlockTokens
        builder.exit("7fde4424");
    }

    if (withUpdate) {
        builder.enter("5f884296"); // GovUserKeeper::updateMaxTokenLockedAmount
        builder.exit("5f884296");    
    }
}

function addDelegate(builder, cycles1, cycles2, withDepositTokens, withDepositNfts, withUpdate1, withUpdate2) {
    builder.enter("ac9650d8"); // GovPool::multicall

        // both false works as no deposit
        if (withDepositTokens || withDepositNfts) {
            addDeposit(builder, withDepositTokens, withDepositNfts);
        }

        builder.enter("46d0b0b9"); // GovPool::delegate

            addUnlockTokens(builder, cycles1, withUpdate1);
            addUnlockTokens(builder, cycles2, withUpdate2);

            builder.enter("30132f5e"); // GovUserKeeper::updateNftPowers
            builder.exit("30132f5e");

            builder.enter("9161babb"); // GovUserKeeper::delegateTokens
            builder.exit("9161babb");

            builder.exit("46d0b0b9");

    builder.exit("ac9650d8");
}

function addDelegateBatch(builder, a, b) {
    for (let i = 0; i <= a; i++) {
        for (let j = 0; j <= b; j++) {
            for (let k = 0; k < 16; k++) {
                let [withDepositedTokens, withDepositedNfts, withUpdate1, withUpdate2] = splitIntToBool(k, 4)

                builder.init();
                addDelegate(builder, i, j, withDepositedTokens, withDepositedNfts, withUpdate1, withUpdate2);
            }
        }    
    }
}

function addWhiteList(builder, cycles, withValidators) {
    builder.enter("fe0d94c1"); // GovPool::execute

        if (withValidators) {
            builder.enter("430c885a"); // GovValidators::executeExternalProposal
            builder.exit("430c885a");    
        }

        builder.enter("6a6effda"); // TokenSaleProposal::createTiers
        builder.exit("6a6effda");

        if (cycles == 0) { // Early exit if no whitelist
            builder.exit("fe0d94c1");
            return;
        }

        builder.enter("ce6c2d91"); // TokenSaleProposal::addToWhitelist

            for (let i = 0; i < cycles; i++) {
                builder.enter("40c10f19"); // TokenSaleProposal::mint
                builder.exit("40c10f19");
            }

        builder.exit("ce6c2d91");

    builder.exit("fe0d94c1");
}

// ToDo: delete onchain patterns with calling creteWhitelist but with no mints
function addWhiteListBatch(builder, a) {
    for (let i = 0; i <= a; i++) {
        builder.init();
        addWhiteList(builder, i, false);

        builder.init();
        addWhiteList(builder, i, true);
    }
}

function addCancelVote(builder, cycles, withUpdate1, withTokenCancel) {
    builder.enter("bacbe2da"); // GovPool::cancelVote

        addUnlockTokens(builder, cycles, withUpdate1);
        addUnlockTokens(builder, withTokenCancel ? 1 : 0, true);

    builder.exit("bacbe2da");
}

function addVoteInternal(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts) {
    addUnlockTokens(builder, unlockTokenCycles, withUpdate1);

    builder.enter("30132f5e"); // GovUserKeeper::updateNftPowers
    builder.exit("30132f5e");    

    if (withLockTokens) {
        builder.enter("154b3db0"); // GovUserKeeper::lockTokens
        builder.exit("154b3db0");
    }

    if (withLockNfts) {
        builder.enter("3b389164"); // GovUserKeeper::lockNfts
        builder.exit("3b389164");
    }
}

function addVote(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts) {
    builder.enter("544df02c"); // GovPool::vote

        addVoteInternal(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts)

    builder.exit("544df02c");
}

function addCreateProposalAndVote(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts) {
    builder.enter("ee0e5215"); // GovPool::createProposalAndVote()

        addVoteInternal(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts)

    builder.exit("ee0e5215");
}

function addCreateProposalAndVoteBatch(builder, unlockTokenCyclesMax) {
    for (let i = 0; i <= unlockTokenCyclesMax; i++) {
        for (let j = 0; j < 8; j++) {
            let [withUpdate, withLockTokens, withLockNfts] = splitIntToBool(j, 3);
            
            builder.init();
            addCreateProposalAndVote(builder, i, withUpdate, withLockTokens, withLockNfts);
        }
    }
}


function addDeposit(builder, withTokensDeposit, withNftsDeposit) {

    assert(withTokensDeposit || withNftsDeposit);

    builder.enter("de3ab781"); // GovPool::deposit

        if (withTokensDeposit) {
            builder.enter("39dc5ef2"); // GovUserKeeper::depositTokens
            builder.exit("39dc5ef2");    
        }

        if (withNftsDeposit) {
            builder.enter("9693caad"); // GovUserKeeper::depositNfts
            builder.exit("9693caad");
        }

    builder.exit("de3ab781");
}

function addMulticallVote(
    builder, cancelVoteList, depositList, voteList) {

    builder.enter("ac9650d8"); // GovPool::multicall

        if (cancelVoteList.length > 0) {
            // cycles = unlockTokens number
            let [cycles, withUpdate1, withTokenCancel] = cancelVoteList;
            addCancelVote(builder, cycles, withUpdate1, withTokenCancel);
        }

        if (depositList.length > 0) {
            let [withTokensDeposit, withNftsDeposit] = depositList;
            addDeposit(builder, withTokensDeposit, withNftsDeposit);
        }

        if (voteList.length > 0) {
            let [cycles, withUpdate1, withLockTokens, withLockNfts] = voteList;
            addVote(builder, cycles, withUpdate1, withLockTokens, withLockNfts);
        }
    builder.exit("ac9650d8");
}

function addMulticallVoteBatch(builder, unlockTokenMaxNumber) { // CHECK FIRST 2 LOOPS!!!!!
    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        builder.init();
        addCancelVote(builder, i, false, true);

        builder.init();
        addCancelVote(builder, i, true, true);
    }

    for (let i = 1; i < 4; i++) {
        let [withTokensDeposit, withNftsDeposit] = splitIntToBool(i, 2)

        builder.init();
        addDeposit(builder, withTokensDeposit, withNftsDeposit);
    }

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 8; j++) {
            let [withUpdate, areTokensLocked, areNftsLocked] = splitIntToBool(j, 3)

            builder.init();
            addMulticallVote(builder, [], [], [i, withUpdate, areTokensLocked, areNftsLocked]);
        }
    }

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 8; j++) {
            for (let k = 1; k < 4; k++) {
                let [withUpdate, areTokensLocked, areNftsLocked] = splitIntToBool(j, 3);
                let [withTokensDeposit, withNftsDeposit] = splitIntToBool(k, 2)

                builder.init();
                addMulticallVote(builder, [], [withTokensDeposit, withNftsDeposit], [i, withUpdate, areTokensLocked, areNftsLocked]);
            }
        }
    }

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 16; j++) {
            let [withUpdate1, withUpdate2, areTokensLocked, areNftsLocked] = splitIntToBool(j, 4)
            
            builder.init();
            addMulticallVote(builder, [i, withUpdate1, true], [], [0, withUpdate2, areTokensLocked, areNftsLocked])
        }
    }

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 16; j++) {
            for (let k = 1; k < 4; k++) {
                let [withTokensDeposit, withNftsDeposit] = splitIntToBool(k, 2)
                let [withUpdate1, withUpdate2, areTokensLocked, areNftsLocked] = splitIntToBool(j, 4)
            
                builder.init();
                addMulticallVote(builder, [i, withUpdate1, true], [withTokensDeposit, withNftsDeposit], [0, withUpdate2, areTokensLocked, areNftsLocked])
            }
        }
    }
}

function addWithdraw(builder, unlockTokensCycles, withUpdate, withWithdrawTokens, withWithdrawNfts) {
    
    builder.enter("fb8c5ef0"); // GovPool::withdraw

        addUnlockTokens(builder, unlockTokensCycles, withUpdate)

        assert(withWithdrawTokens || withWithdrawNfts)

        if (withWithdrawTokens) {
            builder.enter("5e35359e") // GovUserKeeper::withdrawTokens
            builder.exit("5e35359e")    
        }

        if (withWithdrawNfts) {
            builder.enter("1f96f376") // GovUserKeeper::withdrawNfts
            builder.exit("1f96f376")    
        }

    builder.exit("fb8c5ef0");
}

function addExecuteWithdraw(builder, unlockTokensCycles, withUpdate, withWithdrawTokens, withWithdrawNfts) {
    builder.enter("fe0d94c1"); // GovPool::execute

        addWithdraw(builder, unlockTokensCycles, withUpdate, withWithdrawTokens, withWithdrawNfts);

    builder.exit("fe0d94c1");
}

function addWithdrawBatch(builder, unlockTokensMaxCycles) {
    for (let i = 0; i <= unlockTokensMaxCycles; i++) {
        for (let j = 1; j < 4; j++) {
            let [withWithdrawTokens, withWithdrawNfts] = splitIntToBool(j, 2)
            builder.init();
            addWithdraw(builder, i, false, withWithdrawTokens, withWithdrawNfts);
    
            builder.init();
            addWithdraw(builder, i, true, withWithdrawTokens, withWithdrawNfts);
    
            builder.init();
            addExecuteWithdraw(builder, i, false, withWithdrawTokens, withWithdrawNfts);
    
            builder.init();
            addExecuteWithdraw(builder, i, true, withWithdrawTokens, withWithdrawNfts);
        }
    }
}

function addModifyMultiplierNfts(builder, modifyNumber, mintNumber, withValidators) {
    builder.enter("fe0d94c1"); // GovPool::execute

        if (withValidators) {
            builder.enter("430c885a"); // GovValidators::executeExternalProposal
            builder.exit("430c885a");    
        }

        for (let i = 1; i <= modifyNumber; i++) {
            builder.enter("4ccc2757"); // ERC721Multiplier::changeToken
            builder.exit("4ccc2757");

            builder.enter("162094c4"); // ERC721Multiplier::setTokenURI
            builder.exit("162094c4");
        }

        for (let i = 1; i <= mintNumber; i++) {
            builder.enter("af2d2333"); // ERC721Multiplier::mint
            builder.exit("af2d2333");
        }

    builder.exit("fe0d94c1");
}

function addModifyMultiplierNftsBatch(builder, maxModifyNumber, maxMintNumber) {
    for (let i = 0; i <= maxModifyNumber; i++) {
        for (let j = 0; j <= maxMintNumber; j++) {
            for (let k = 0; k < 2; k++) {
                let [withValidators] = splitIntToBool(k, 1)
    
                builder.init();
                addModifyMultiplierNfts(builder, i, j, withValidators);    
            }
        }
    }
}

function addExecuteProposalCreation(
        builder, 
        withValidators, 
        withTokensDeposit, 
        withNftsDeposit,
        unlockTokenCycles,
        withUpdate1, 
        withLockTokens, 
        withLockNfts
    ) {

    builder.enter("fe0d94c1"); // GovPool::execute

        if (withValidators) {
            builder.enter("430c885a"); // GovValidators::executeExternalProposal
            builder.exit("430c885a");    
        }

        // both false is a marker to not addDeposit at all!!!
        if (withTokensDeposit || withNftsDeposit) {
            addDeposit(builder, withTokensDeposit, withNftsDeposit)
        }

        addCreateProposalAndVote(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts)

    builder.exit("fe0d94c1");
}

function addExecuteProposalCreationBatch(builder, unlockTokensMaxCycles) {
    for (let i = 0; i <= unlockTokensMaxCycles; i++) {
        for (let j = 0; j < 64; j++) {
            let [withValidators, withTokensDeposit, withNftsDeposit, withUpdate1, withLockTokens, withLockNfts] = splitIntToBool(j, 6)

            builder.init();
            addExecuteProposalCreation(
                builder, 
                withValidators, 
                withTokensDeposit,
                withNftsDeposit,
                i,
                withUpdate1, 
                withLockTokens,
                withLockNfts
            )
        }
    }

}

function addExecuteCancelVote(builder, cycles, withUpdate1, withTokenCancel) {
    builder.enter("fe0d94c1"); // GovPool::execute
        addCancelVote(builder, cycles, withUpdate1, withTokenCancel);
    builder.exit("fe0d94c1");
}

function addExecuteCancelVoteBatch(builder, unlockTokensMaxCycles) {
    for (let i = 0; i <= unlockTokensMaxCycles; i++) {
        for (let j = 0; j < 4; j++) {
            let [withUpdate1, withTokenCancel] = splitIntToBool(j, 2)

            builder.init();
            addExecuteCancelVote(builder, i, withUpdate1, withTokenCancel);
        }
    }
}

function addExecuteVote(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts) {
    builder.enter("fe0d94c1"); // GovPool::execute
        addVote(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts);
    builder.exit("fe0d94c1");
}

function addExecuteVoteBatch(builder, unlockTokensMaxCycles) {
    for (let i = 0; i <= unlockTokensMaxCycles; i++) {
        for (let j = 0; j < 8; j++) {
            let [withUpdate1, withLockTokens, withLockNfts] = splitIntToBool(j, 3)

            builder.init();
            addExecuteVote(builder, i, withUpdate1, withLockTokens, withLockNfts);
        }
    }
}

module.exports = {
    addDelegateBatch,
    addWhiteListBatch,
    addMulticallVoteBatch,
    addWithdrawBatch,
    addModifyMultiplierNftsBatch,
    addCreateProposalAndVoteBatch,
    addExecuteProposalCreationBatch,
    addExecuteCancelVoteBatch,
    addExecuteVoteBatch,

    splitIntToBool,

    addDelegate,
    addWhiteList,
    addCancelVote,
    addDeposit,
    addMulticallVote,
    addWithdraw,
    addExecuteWithdraw,
    addModifyMultiplierNfts,
    addCreateProposalAndVote,
    addExecuteProposalCreation,
    addExecuteCancelVote,
    addExecuteVote,
};
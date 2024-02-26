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

function addDelegate(builder, cycles1, cycles2, withDeposit, withUpdate1, withUpdate2) {
    builder.enter("ac9650d8"); // GovPool::multicall

        if (withDeposit) {
            let withTokens = true;
            let withNft = false;
            addDeposit(builder, withTokens, withNft);
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
            for (let k = 0; k < 8; k++) {
                let [withDeposit, withUpdate1, withUpdate2] = splitIntToBool(k, 3)

                builder.init();
                addDelegate(builder, i, j, withDeposit, withUpdate1, withUpdate2);
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

function addCreteMultiplierNft(builder, cycles, withValidators) {
    builder.enter("fe0d94c1"); // GovPool::execute

        if (withValidators) {
            builder.enter("430c885a"); // GovValidators::executeExternalProposal
            builder.exit("430c885a");    
        }

        for (let i = 0; i < cycles; i++) {
            builder.enter("af2d2333"); // ERC721Multiplier::mint
            builder.exit("af2d2333");
        }

    builder.exit("fe0d94c1");
}

// ATTENTION! Empty "execute" is here (maybe plus executeExternalProposal)
function addCreteMultiplierNftBatch(builder, a) {
    for (let i = 0; i <= a; i++) {
        builder.init();
        addCreteMultiplierNft(builder, i, false);

        builder.init();
        addCreteMultiplierNft(builder, i, true);
    }
}

function addCancelVote(builder, cycles, withUpdate1, withTokenCancel) {
    builder.enter("bacbe2da"); // GovPool::cancelVote

        addUnlockTokens(builder, cycles, withUpdate1);
        addUnlockTokens(builder, withTokenCancel ? 1 : 0, true);

    builder.exit("bacbe2da");
}

function addVote(builder, unlockTokenCycles, withUpdate1, withLockTokens, withLockNfts) {
    builder.enter("544df02c"); // GovPool::vote

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

    builder.exit("544df02c");
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

function addMulticallVoteBatch(builder, unlockTokenMaxNumber) {
    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        builder.init();
        addCancelVote(builder, i, false, true);

        builder.init();
        addCancelVote(builder, i, true, true);
    }

    builder.init();
    addDeposit(builder, true, false);

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 4; j++) {
            let [withUpdate, areTokensLocked] = splitIntToBool(j, 2)

            builder.init();
            addMulticallVote(builder, [], [], [i, withUpdate, areTokensLocked, false]);
        }
    }

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 4; j++) {
            let [withUpdate, areTokensLocked] = splitIntToBool(j, 2)

            builder.init();
            addMulticallVote(builder, [], [true, false], [i, withUpdate, areTokensLocked, false]);
        }
    }

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 8; j++) {
            let [withUpdate1, withUpdate2, areTokensLocked] = splitIntToBool(j, 3)
            
            builder.init();
            addMulticallVote(builder, [i, withUpdate1, true], [], [0, withUpdate2, areTokensLocked, false])
        }
    }

    for (let i = 0; i <= unlockTokenMaxNumber; i++) {
        for (let j = 0; j < 8; j++) {
            let [withUpdate1, withUpdate2, areTokensLocked] = splitIntToBool(j, 3)
            
            builder.init();
            addMulticallVote(builder, [i, withUpdate1, true], [true, false], [0, withUpdate2, areTokensLocked, false])
        }
    }
}

function addWithdraw(builder, unlockTokensCycles, withUpdate) {
    
    builder.enter("fb8c5ef0"); // GovPool::withdraw

        addUnlockTokens(builder, unlockTokensCycles, withUpdate)

        builder.enter("5e35359e") // GovUserKeeper::withdrawTokens
        builder.exit("5e35359e")

    builder.exit("fb8c5ef0");
}

function addWithdrawBatch(builder, unlockTokensMaxCycles) {
    for (let i = 0; i <= unlockTokensMaxCycles; i++) {
        builder.init();
        addWithdraw(builder, i, false);

        builder.init();
        addWithdraw(builder, i, true);
    }
}

function addModifyMultiplierNfts(builder, modifyNumber, mintNumber) {
    builder.enter("fe0d94c1"); // GovPool::execute

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
            if (i != 0 || j != 0) {
                builder.init();
                addModifyMultiplierNfts(builder, i, j);    
            }
        }
    }
}

module.exports = {
    addDelegateBatch,
    addWhiteListBatch,
    addCreteMultiplierNftBatch,
    addMulticallVoteBatch,
    addWithdrawBatch,
    addModifyMultiplierNftsBatch,

    splitIntToBool,

    addDelegate,
    addWhiteList,
    addCreteMultiplierNft,
    addCancelVote,
    addDeposit,
    addMulticallVote,
    addWithdraw,
    addModifyMultiplierNfts,
};
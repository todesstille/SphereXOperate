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

function addDelegate(builder, cycles1, cycles2, withDeposit, withUpdate1, withUpdate2) {
    builder.enter("ac9650d8"); // GovPool::multicall

        if (withDeposit) {
            builder.enter("de3ab781") // GovPool::deposit
                builder.enter("39dc5ef2"); // GovUserKeeper::depositTokens
                builder.exit("39dc5ef2");
            builder.exit("de3ab781")
        }

        builder.enter("46d0b0b9"); // GovPool::delegate

            for (let i = 0; i < cycles1; i++) {
                builder.enter("7fde4424"); // GovUserKeeper::unlockTokens
                builder.exit("7fde4424");
            }

            if (withUpdate1) {
                builder.enter("5f884296"); // GovUserKeeper::updateMaxTokenLockedAmount
                builder.exit("5f884296");
            }

            for (let i = 0; i < cycles2; i++) {
                builder.enter("7fde4424"); // GovUserKeeper::unlockTokens
                builder.exit("7fde4424");
            }

            if (withUpdate2) {
                builder.enter("5f884296"); // GovUserKeeper::updateMaxTokenLockedAmount
                builder.exit("5f884296");
            }

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
            builder.enter("af2d2333"); // TokenSaleProposal::mint
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

        for (let i = 0; i < cycles; i++) {
            builder.enter("7fde4424"); // GovUserKeeper::unlockTokens
            builder.exit("7fde4424");
        }

        if (withUpdate1) {
            builder.enter("5f884296"); // GovUserKeeper::updateMaxTokenLockedAmount
            builder.exit("5f884296");    
        }

        if (withTokenCancel) {
            builder.enter("7fde4424"); // GovUserKeeper::unlockTokens
            builder.exit("7fde4424");
        }

        builder.enter("5f884296"); // GovUserKeeper::updateMaxTokenLockedAmount
        builder.exit("5f884296");    

    builder.exit("bacbe2da");
}

function addVote(builder, cycles, withUpdate1, withLockTokens, withLockNfts) {
    builder.enter("544df02c"); // GovPool::vote

        for (let i = 0; i < cycles; i++) {
            builder.enter("7fde4424"); // GovUserKeeper::unlockTokens
            builder.exit("7fde4424");
        }

        if (withUpdate1) {
            builder.enter("5f884296"); // GovUserKeeper::updateMaxTokenLockedAmount
            builder.exit("5f884296");    
        }

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

module.exports = {
    addDelegateBatch,
    addWhiteListBatch,
    addCreteMultiplierNftBatch,

    splitIntToBool,

    addDelegate,
    addWhiteList,
    addCreteMultiplierNft,
    addCancelVote,
    addDeposit,
    addMulticallVote,
};
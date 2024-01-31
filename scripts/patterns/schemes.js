function addDelegate(builder, cycles1, cycles2, withDeposit, withUpdate1, withUpdate2) {
    builder.init();
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
    for (let i = 1; i < a; i++) {
        for (let j = 1; j < b; j++) {
            for (let k = 0; k < 8; k++) {
                let withDeposit = (k % 2) == 1;
                let withUpdate1 = ((k >> 1) % 2) == 1;
                let withUpdate2 = ((k >> 2) % 2) == 1;
                addDelegate(builder, i, j, withDeposit, withUpdate1, withUpdate2);
            }
        }    
    }
}

function addWhiteList(builder, cycles, withValidators) {
    builder.init();

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
        addWhiteList(builder, i, true);
        addWhiteList(builder, i, false);
    }
}

function addCreteMultiplierNft(builder, cycles, withValidators) {
    builder.init();

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
        addCreteMultiplierNft(builder, i, true);
        addCreteMultiplierNft(builder, i, false);
    }
}

module.exports = {
    addDelegateBatch,
    addWhiteListBatch,
    addCreteMultiplierNftBatch,
};
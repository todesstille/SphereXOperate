function addDelegate(builder, cycles1, cycles2) {
    builder.init();
    builder.enter("ac9650d8");

        builder.enter("46d0b0b9"); // delegate

            for (let i = 0; i < cycles1; i++) {
                builder.enter("7fde4424");
                builder.exit("7fde4424");
            }

            builder.enter("5f884296");
            builder.exit("5f884296");

            for (let i = 0; i < cycles2; i++) {
                builder.enter("7fde4424");
                builder.exit("7fde4424");
            }

            builder.enter("5f884296");
            builder.exit("5f884296");

            builder.enter("30132f5e");
            builder.exit("30132f5e");

            builder.enter("9161babb");
            builder.exit("9161babb");

            builder.exit("46d0b0b9");

    builder.exit("ac9650d8");
}

    function addDelegateBatch(builder, a, b) {
        for (let i = 1; i < a; i++) {
            for (let j = 1; j < b; j++) {
                addDelegate(builder, i, j);
            }    
        }
    }

module.exports = {
    addDelegateBatch,
};
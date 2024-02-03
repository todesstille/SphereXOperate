// const hre = require("hardhat");
const { expect } = require("chai");

const { Builder } = require("../scripts/patterns/builder");


describe("Test Builder", function () {

  // beforeEach(async () => {
  //   Create2 = await ethers.getContractFactory("Create2");
  //   create2 = await Create2.deploy();
  // })

  describe("Test general functionality", function () {
    it("Split number to bool", async () => {
      const {splitIntToBool} = require("../scripts/patterns/schemes");
      expect(splitIntToBool(0, 3)).to.deep.equal([false, false, false]);
       expect(splitIntToBool(1, 3)).to.deep.equal([true, false, false]);
      expect(splitIntToBool(2, 3)).to.deep.equal([false, true, false]);
      expect(splitIntToBool(3, 3)).to.deep.equal([true, true, false]);
      expect(splitIntToBool(4, 3)).to.deep.equal([false, false, true]);
      expect(splitIntToBool(5, 3)).to.deep.equal([true, false, true]);
      expect(splitIntToBool(6, 3)).to.deep.equal([false, true, true]);
      expect(splitIntToBool(7, 3)).to.deep.equal([true, true, true]);
    });
  });

  describe("Basic patterns", function () {
    it("Add delegate", async () => {
      let builder = new Builder();
      const {addDelegate} = require("../scripts/patterns/schemes");

      addDelegate(builder, 1, 0, true, true, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000090000000000b9db5f9b4617f949c3b593fba8e48fc74840fcb53b6839e00bf3a2000000000026d78eeca71471f1509c680b84945b9ae69d239cad8da2a0568e0f0000000000e7485b4281e0c6389fb464e8cf6add30efd0a37597f9d14fc29d020000000000d446edcdd6019922d8e077cd004aa1c22dcdcd2615b6f1881a2ef30000000000a4e2608fac2052026b995223dbd57d77eb6f41dbf5463fa4eb58940000000000cb4ec7bfc7f554d6a434dbcdf52d59918ceee1443213d48208d99500000000005bce3d41d0efd740d33c90fcc825bb4ddbca5153a5384d528f7e5a00000000000abd1df85f85ff3b14d9381b175de61a1e6e28ef082981053dff100000000000535b10439a52d997a67bc27ebdb667581652f1b31f70f0d9ea008c");

      builder = new Builder();
      addDelegate(builder, 0, 0, true, false, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000070000000000b9db5f9b4617f949c3b593fba8e48fc74840fcb53b6839e00bf3a2000000000026d78eeca71471f1509c680b84945b9ae69d239cad8da2a0568e0f0000000000f8febd0340903ec6038ceacaf36c5fbe8e85dc6346669bf969cea800000000009a84f293cf30cbecdacaa7e2b4095b1e09b2b2cff367b74bcf1ef10000000000eafc4ed392e16ea66c22ab0a2cdb33e85a501790f35dd756ace0c4000000000062701670ddae791c26ea9a65fbbf390105e4541d1778213364b375000000000098d6b2fda07c5d1062a26c829baced94f9bbee4d4bccf44f56ed99");

      builder = new Builder();
      addDelegate(builder, 0, 0, false, false, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000abec33efa7510756bb646bdbfd1ea2d8b5705208980530683a34860000000000704c09ff65112942848a63603bebd625aeb4a3e255cbd8b2472b900000000000bfdd5a0857c0acbdb9f763e78bb35cf39bd00797aa952405e5151f00000000004e3138b04d1858a7b490c049aace017b9f1bc5d3f9bf879adc1a73");

    });

    it("Add whitelist", async () => {
      let builder = new Builder();
      const {addWhiteList} = require("../scripts/patterns/schemes");
      
      addWhiteList(builder, 2, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000060000000000153270cc7db1f30be2ad8d3ffc9578b26f04931643873dc437f7ef0000000000c1f53d499e0a453a49336f1a2f534fdd88fc67d9b72efb0a46d08b000000000017702179bcda4ff411f929e18f10d3f05c839796727d53d1b56f1e0000000000092c21165d4825b5ec1dfb4753e86a9b43c359309ab19f94ebf4be00000000009f793d532b970bb55a030b78834783e0b8d5bd2e295f8d37fe028300000000004f7f79d534585ace63981ef12053a26ad99dba3e267a4c4ecedf82");

      builder = new Builder();
      addWhiteList(builder, 1, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000cf56c8cff78b00ca7795d4f97c2a351ecedf3cc52e1df77cd5a3750000000000b1e14e7db6391733d3007d0b1397090d66f518acbc74aa35025a87000000000084f3f57613bf3ded0af136455cf693aaa1bc02d96b11e00509d3eb0000000000d3fd4c540f2928e12205c1c35f1353eabe5cce9c9f3a155c3fec7b");

      builder = new Builder();
      addWhiteList(builder, 0, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000cf56c8cff78b00ca7795d4f97c2a351ecedf3cc52e1df77cd5a3750000000000945d04e81eddbfaaaf23bf26e0c4251cf4cf4ec11ce8617132a33d");

      builder = new Builder();
      addWhiteList(builder, 0, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000153270cc7db1f30be2ad8d3ffc9578b26f04931643873dc437f7ef0000000000c1f53d499e0a453a49336f1a2f534fdd88fc67d9b72efb0a46d08b000000000004f877bfe1643146c85d913e8ef85381d12ed25b7742b99cfbffa9");
    });

    it("Add createMultiplierNft", async () => {
      let builder = new Builder();
      const {addCreteMultiplierNft} = require("../scripts/patterns/schemes");
      
      addCreteMultiplierNft(builder, 3, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000581732187b993bf28f5054977032dc5267c0e0fd831c47d6e5e87e00000000000fe1340cdac03ee8fbd6fce1a69b336ad4cfc6d2e5018ad763a7ef0000000000fb2f28f623242959960990688cba5113dd44081a9c78c6ce47ace90000000000cda6830ba59f34e24bcc14ff8c4105c07d9b75e4e5acafc8f5ff20");

      builder = new Builder();
      addCreteMultiplierNft(builder, 2, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000581732187b993bf28f5054977032dc5267c0e0fd831c47d6e5e87e00000000000fe1340cdac03ee8fbd6fce1a69b336ad4cfc6d2e5018ad763a7ef0000000000bd0d88c85c4cbe8ebb674ec2b023c70550f6bb98c9767697aa1746");

      builder = new Builder();
      addCreteMultiplierNft(builder, 1, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000153270cc7db1f30be2ad8d3ffc9578b26f04931643873dc437f7ef00000000009e75a8b9f1cc4083384383017838cb3bd7737ff831c58447abf92a0000000000399ede2ff6a3b56be2f5137e7143f0f4d7186b96cf4c5292bb27be");
    });

    it("Add cancelVote", async () => {
      let builder = new Builder();
      const {addCancelVote} = require("../scripts/patterns/schemes");
      
      addCancelVote(builder, 0, false, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000cc44559ffc75419bfe1f209d071fc0e485649db4bcf697ae4fe8ba00000000009d3c241a4393a17555cea753a272491ccfdfcc97db0dd490f936a1000000000001c040e559554f6ec5d86f2fdcd93e9250dcb6b8d8207cbfab72da");

      builder = new Builder();
      addCancelVote(builder, 0, true, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000c4ac3c16affbcac6702e21612bc1db62a1cf2ed59d0114301a669100000000008232d84431ab8fc318ebb759ded6420aa12bde6a20a7541a60ec9e0000000000d4189f10926ae52cec6b667cc354d55c407205d81ddc153c2a1c11");
    });

    it("Add deposit", async () => {
      let builder = new Builder();
      const {addDeposit} = require("../scripts/patterns/schemes");
      
      addDeposit(builder, true, false);
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000007442a19d4480a6b4dae0403a94d970b973cd7597bbce6256d7b5ef0000000000403b01b6b672635387b97d76161c5ecf50c5f2891bf0d964b9b53e");

      builder = new Builder();
      addDeposit(builder, false, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000e7d9326b8e5c118d9d3220bc15654aa97c313712a619ff0356ee7700000000006f596a72934a9835e620d4e8a1d25d9fb5629903e25d6f89cac489");
    });

    it("Add Multicall Vote", async () => {
      let builder = new Builder();
      const {addMulticallVote} = require("../scripts/patterns/schemes");
      
      addMulticallVote(builder, [], [], [0, true, true, false]);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000050000000000d96bb5e035054be4d19e92ad7b099f210d5b4b03a04337e515ac4c00000000003b0bb3c536536373c12c89e278fb621d8fe3e7ed947361d609684c00000000006dbd5e772b7632047297cd8e81f0a750422f7a5c55ccb7bc05d83d0000000000a28a14c4ea954c2c72837c23d5b935a223c4d4eb4c5dd6ae6ae89a000000000045ca0a63b1bc5eb3bd494958b015f0e24c12bf53775322559edb80");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [1, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000060000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba580000000000c340a1227b0294d35fdf15c3e193663b02b4b4e37e647112ad327e000000000034a2d37271e556d25f4af4e82d795a1946a5fdc905b2e69a6b44450000000000301c613deee1341e728a9ade3363494c6afcadd10f8988d880a8220000000000e3a88428b105b9225e9476077b523c5b6c9f831c85efe166a386b100000000001af9573c7eff00b965de34ddfd62e3446926f7ff4d1a384456ab46");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [true, false], // if tokens depositde, if nfts deposited
        [0, true, true] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000070000000000b9db5f9b4617f949c3b593fba8e48fc74840fcb53b6839e00bf3a2000000000026d78eeca71471f1509c680b84945b9ae69d239cad8da2a0568e0f0000000000cb3bdd7e1049cc9a9617163ae358c693d691b458a46c158b674bd80000000000ebed04769901befd1510350f87dd62816742f27886f420592bb63d0000000000ed30a3db3ba33792fdb05a94c13f7506dfe87916e40188d3908c470000000000a2b2ed05efd844acae5dea93274b9d4af2147085ea8570d54644ab0000000000554df4d1aba0c98665ed37b869eef753b2eecc53e034d6fadcac3a");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, true, false, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000d96bb5e035054be4d19e92ad7b099f210d5b4b03a04337e515ac4c00000000003b0bb3c536536373c12c89e278fb621d8fe3e7ed947361d609684c00000000009bfaddf2a399b761d1c1f13cf4d507f31eb110603e53644d7cc51000000000000295dd60d60d71575e79895e325e076eb59826d83c2a5298727661");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, false, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x0453906200000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004000000000043a42e170ae91f776f020de810ef4f9b3832023cde24fbcbd7f9a200000000004c1775acd84cac7ed57c11662570ad7b17bee192f8c07d9d0b9ad7000000000078b7e50d6f222cac9a80f332ada163c794d804f46dcddcf8fd996400000000009e416e645d8bbbb22e6ced1ef0b07122c2caf66ac6ea8aaa1ac121");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [2, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000070000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba580000000000656742b88d5b0da691a53c1c26248aaae0a7c8b77c0d3cc4990a4b0000000000d28143f2c43b227924b3939a1d2a789cdb8634940a944d56804e520000000000565706a4c8d1d4be417fdd09177a354796cc21baba266cb262e8b0000000000066378090b68db9aac10fd05a937f61827ed8ac1ec6fb7e6447d5b60000000000ca2d1cef9124741175da2d68eaf6eb46b4e41ddd9f3c269ab4b2a60000000000f6a2b1a8ae6974382ae257321a049b84523910a84743f06e910b16");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [true, false], // if tokens depositde, if nfts deposited
        [1, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000080000000000b9db5f9b4617f949c3b593fba8e48fc74840fcb53b6839e00bf3a2000000000026d78eeca71471f1509c680b84945b9ae69d239cad8da2a0568e0f0000000000f9314b36d9c68fcebce7779a6a6561b4c58eb7355020352704835f00000000000cf2a60ec4f2f7d97114f3406fa60c4d92552f75bee1390ec476410000000000a5725270a6f09eb3184e39f47b6769569f4b1cc7a97e0d4e1c328300000000007b4dc1527d297377fa53f700597b8fc3050e2fd33b8c5573d448390000000000e89af51693643aa9c628faf54dae8d4b0c6a56619f742037b202460000000000e01d0057043bc1e8299cd3d42187a8617481597f05f76b0f61f0f8");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [0, false, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000080000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc90000000000b662ab00c6c22024ad34f0b81f698b827278908550e6b0fae33589000000000095ad9962111d57a63a032bac3afed9d2ae7984c1707f7179f4813400000000007e959526e1c85437dc17c93025cfae0f586c5bd82b742b54d392170000000000ca1f8fb672fbb3db8075f459236887b7613a1694593819ceb1d0b40000000000dbc7d0171f72544b6d8796c5a8ee715e914c22505de8785e951c2d0000000000d50f8f02f258f685ef24345fe0cde9a15d4cd9e6724f0b0561cfea");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [0, true, false], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, true, false, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000700000000003f44ff966e4dac59caccd48e1b955073f81e54ceb1f5fb7d5c47c50000000000c5cab2380360e30af686273d9140ca1a6f7e5e16218404282a4bf4000000000012f4ed39138465b2ea55b0b8a83f709db1795f63a6ed40fa2af4fc000000000068cf10d500736a3df7f8e4fcd5c9749fc5319b3ee24a6665e96fce000000000031f806c15945a622124328167704047bf40304d4d205e45e90752e0000000000c0bb53227e0503c894c6bf866cf4664eb42c8dffccb7e5efabc3ee0000000000227cc983219164596ccf9fd4054da612cb10893950fa6225500146");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [0, false, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [true, false], // if tokens depositde, if nfts deposited
        [0, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a0000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc90000000000b662ab00c6c22024ad34f0b81f698b827278908550e6b0fae33589000000000024f8023d33c436933a53243e0064cc563d442540bfa4d00534e4c40000000000333e4d8ac7d4f17ee5978515b0cc244d6c987e9200f425e4588da600000000002f36e4b84afd534e36a3148e648178861d975953c79af7b02146310000000000011438026f9dc6066d0a6e720820ed890c6a689d179f71e278129c0000000000c5da01936ecd2ac1c4e69f5d2660ecb4eaad85e9e36f709303b4ec00000000001134997cedb3484972c683c8a8c62a2b888caf0f655a2d19e30643000000000013fda9a3742ca25fed368844a4ef57869d295de292a2ce73494448");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, true, false, true] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000050000000000d96bb5e035054be4d19e92ad7b099f210d5b4b03a04337e515ac4c00000000003b0bb3c536536373c12c89e278fb621d8fe3e7ed947361d609684c0000000000e0d7e895ebce2434bae5441bb9215739a9d95794ee9ba05406a19400000000000b05c48ffa5da3cdb5618d1f770073cc2ead08a543b915a32a73be00000000003b3261652af55f85ed7defe759e524bfa0d9531e1256fab2879ef5");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [0, false, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, true, true, true] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000090000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc90000000000b662ab00c6c22024ad34f0b81f698b827278908550e6b0fae33589000000000095ad9962111d57a63a032bac3afed9d2ae7984c1707f7179f4813400000000007e959526e1c85437dc17c93025cfae0f586c5bd82b742b54d392170000000000ca1f8fb672fbb3db8075f459236887b7613a1694593819ceb1d0b400000000003c0bc700f90cd2159f8397cec4628cb03947a03a14ea830af851c500000000008c5e650a616ebb068c189f2734920900eed5adc41bb67678d34432000000000024714c9180e6d4c3e70f7f1dace8ba14172e20ae2e09e66fc98826");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [5, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a0000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba580000000000656742b88d5b0da691a53c1c26248aaae0a7c8b77c0d3cc4990a4b00000000000970bdeda4fae2db10ac7988aa60086ced38d7b13eaf7ba763d50000000000001517be611d73e14c74ffe1e06a5dac0527b561f5be83807521a94a00000000000a67b87a1bdbd5727a39119ad60b2e6bcd7171de445e443253fadc0000000000b1fa8a9b6264ce2425e3094344bdd4cf368e40da8304e83d6e273b0000000000b12af466e0b3091df2d991c751a3247c90c5f6f253f7f6fb97e6000000000000b3c6ef5236c810fd8940bf2ae74f3d20d5bd088ff4086fa004330d0000000000a551b2d40e9d010a462947f3c7d2186e09619725c766cc85bc55070000000000f3bd91ab89b87e948e22c282598f1c782754e267b4afb42312c4ee");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [3, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000080000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba580000000000656742b88d5b0da691a53c1c26248aaae0a7c8b77c0d3cc4990a4b00000000000970bdeda4fae2db10ac7988aa60086ced38d7b13eaf7ba763d50000000000003ca8dcd7c5d4e6e725bff7bde0bd83f3b31c82e1cc2206f50649ef00000000005c100c5de346f69a31a8c9a15d819b2a55ede971980a4714a239ff000000000051dd1a32ae2e901eaaf49953a30dddb30e4d623250328470d2c44c0000000000709829752b26f3c4c389e5dbff249ea2a84620f64ed1a88e33781a0000000000d1fe9a7d7d8a1e3d2c8f4f7433375c2494476d33177185ceb3a902");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [true, false], // if tokens depositde, if nfts deposited
        [0, false, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000060000000000b9db5f9b4617f949c3b593fba8e48fc74840fcb53b6839e00bf3a2000000000026d78eeca71471f1509c680b84945b9ae69d239cad8da2a0568e0f0000000000c0f5c715215b4aa11e16e5261d0540c42e840c325f131a9e5d61d40000000000053e7d2f0cf19e1a7c2b45dc3f01cc2accbb7b72eb8a2cc8e4781a0000000000344a25a5a696340291ac5a3c7a4ae90e976a23ca52a6520c3e62fd000000000043dee3012973e96e727d0ae9ea818ddaa7dfe996bfb1352a53d316");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [1, false, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000050000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba58000000000013319b83a4540e3f3028476664dc5a11bf98bbd1fe0fb66f35cfdb0000000000136fb0ef4121a85c7189f387dcc18626666ac39733b82f22ddddfa000000000047e3f5ab709afd11688183617056b43a1c5c26d750a5616cfd349a000000000080e7cce6470bf7d6933d26540966eaa4b5147c5d3c4b36da194135");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [0, false, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000080000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc90000000000b662ab00c6c22024ad34f0b81f698b827278908550e6b0fae33589000000000095ad9962111d57a63a032bac3afed9d2ae7984c1707f7179f4813400000000007e959526e1c85437dc17c93025cfae0f586c5bd82b742b54d392170000000000ca1f8fb672fbb3db8075f459236887b7613a1694593819ceb1d0b40000000000dbc7d0171f72544b6d8796c5a8ee715e914c22505de8785e951c2d0000000000d50f8f02f258f685ef24345fe0cde9a15d4cd9e6724f0b0561cfea");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [1, true, false, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000050000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba580000000000c340a1227b0294d35fdf15c3e193663b02b4b4e37e647112ad327e000000000034a2d37271e556d25f4af4e82d795a1946a5fdc905b2e69a6b4445000000000031ae5b2478d9a0692c3dede89083c55f12c6018e149d5112a6665f0000000000f9debb496f526677059d3961772acedce7797b12323ef57e761e31");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [0, false, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, false, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000070000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc90000000000b662ab00c6c22024ad34f0b81f698b827278908550e6b0fae335890000000000b7d01a87555dafe126bfb5acfb3bc7f4bd028bb9041c099a89e7a30000000000fc4d882cc599a0a1637cfea5d283c7fdb34db3a7b6a96d43eaef94000000000042b9126d0902eca20057056aa90c50350387a62c1b2466d7c791fd000000000075bbf380cc3717b2f94c2bdefbfdcaa2c8c9d3680c803489661195");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [2, false, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000060000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba580000000000656742b88d5b0da691a53c1c26248aaae0a7c8b77c0d3cc4990a4b00000000000cce30f427a3dc72c4c86ab21418263158ca70e81ef09b36929e8a000000000071748e7f4cfa8dfc28bd5ff463b6d0db42d19655417be52b0d57de0000000000895d647473ac69307b973b402fbf0cf5b1e64fbef0e00d53ac8dff00000000000fb3aad0f6b7576f3c9088ea94b090b264b1cb3961a3b5381fffa6");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [4, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000090000000000eac551ded6900963a9d23df844f4d1971c2ec26faaf71b4dadba580000000000656742b88d5b0da691a53c1c26248aaae0a7c8b77c0d3cc4990a4b00000000000970bdeda4fae2db10ac7988aa60086ced38d7b13eaf7ba763d50000000000001517be611d73e14c74ffe1e06a5dac0527b561f5be83807521a94a0000000000d5788d69d6e3cfe25f7dd386fe45087a5c9d03582fcc8d3c392ecb0000000000cdad60f733ef830d10ab0d8995d55910cf65bcc371420c5b286de100000000004e5407a3fd80cff528abcc5729205ba5e882e97d1e312e017d0ac200000000006cdb6745e24bb830fd5a95b4fb67723a1c6888f5370b944c63d9250000000000e0ee2605bdcb76ec3412760130f714d91d2f68a10427eb350d97d5");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [false, false, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [true, false], // if tokens depositde, if nfts deposited
        [0, false, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000090000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc90000000000b662ab00c6c22024ad34f0b81f698b827278908550e6b0fae33589000000000024f8023d33c436933a53243e0064cc563d442540bfa4d00534e4c40000000000333e4d8ac7d4f17ee5978515b0cc244d6c987e9200f425e4588da6000000000018c0fb23fbbbc286de4fe26e2de067dd2e163bb21560b8c10b2ba70000000000857f00a3029afd57872d041e90650a708494e79bb3d0c0ef8f12a50000000000aabb9df81c1f94f3b9b85fba20e461793a1421d3b3da889886347100000000000978c90239209e27cd896bbf17b945ccc1a6ffbc0f1f0939298736");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [1, true, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, false, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000090000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc9000000000043ae123d9154f943c065cb7ceb4196b267cc67c775919d45d068d00000000000434e7499c69a29276117148984bec2955acd761952c1f285cbc0c60000000000668a04d23e66d3d90904454194301ef20cc7c0a33ad8c1fde854800000000000de5fd389dc415fd50b0e5188985dca2e85db198e4a23e688629b1800000000006c25bb2b5d8c872ba596a6697543283cf1d67a3a33e4b8051b9ab9000000000099c6d6689acfaee821f1ad048c677d81c882a4f3b5a3258f1b09f800000000000b5b9af872f892a30f7c7b2b8c18337cce5a5dfcb8d9e90de2afc9");

      builder = new Builder();
      addMulticallVote(
        builder, 
        [1, true, true], // number of unlockTokens, ifUpdateMax, ifUnlocksLastToken, !!!  ALWAYS UPDATES MAX
        [], // if tokens depositde, if nfts deposited
        [0, true, true, false] // number of unlock tokens, if updates max, if tokenLocked, if nfts locked
      );
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000a0000000000f754e17f810c6384c1c484aabad4d7a14fc374439a93c37dca740700000000003a88ece81a466da8aa7a551c9fecd77a1b760fae8141ab87619bc9000000000043ae123d9154f943c065cb7ceb4196b267cc67c775919d45d068d00000000000434e7499c69a29276117148984bec2955acd761952c1f285cbc0c60000000000668a04d23e66d3d90904454194301ef20cc7c0a33ad8c1fde854800000000000e01da221102b06ef7284065faf5163e412d1c88cf9da825fa5c0fa00000000006c0a3d7ba1cfa4b215cce8dff8084e60d13e6f03ebfd9afe14469c0000000000831475c79452aa5cdaef039d7c958dd4b202a83da854e2518d9768000000000099d4a97f1885e03b5d930cb1b7cfc209d459ac9c1577203e698ad00000000000d9444d2f9dcd9e4d08749a00cea82b8bc8533ed32da2c7520a66e1");

    });      
  });

  describe("Batch patterns", function () {
    it("Batch delegate", async () => {
      let builder = new Builder();
      const {addDelegate, addDelegateBatch} = require("../scripts/patterns/schemes");
      addDelegateBatch(builder, 3, 2);
      let patterns = builder.getPatterns();

      let b = new Builder();
      addDelegate(b, 0, 0, false, false, false);
      let p = b.getPatterns()
      let lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.not.equal(-1);

      b = new Builder();
      addDelegate(b, 3, 2, true, true, true);
      p = b.getPatterns()
      lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.equal(patterns.length - 1);
    });

    it("Batch whitelist", async () => {
      let builder = new Builder();
      const {addWhiteList, addWhiteListBatch} = require("../scripts/patterns/schemes");
      addWhiteListBatch(builder, 5);
      let patterns = builder.getPatterns();

      let b = new Builder();
      addWhiteList(b, 0, false);
      let p = b.getPatterns()
      let lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.not.equal(-1);

      b = new Builder();
      addWhiteList(b, 5, true);
      p = b.getPatterns()
      lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.equal(patterns.length - 1);
    });

    it("Batch CreteMultiplierNft", async () => {
      let builder = new Builder();
      const {addCreteMultiplierNft, addCreteMultiplierNftBatch} = require("../scripts/patterns/schemes");
      addCreteMultiplierNftBatch(builder, 5);
      let patterns = builder.getPatterns();

      let b = new Builder();
      addCreteMultiplierNft(b, 0, false);
      let p = b.getPatterns()
      let lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.not.equal(-1);

      b = new Builder();
      addCreteMultiplierNft(b, 5, true);
      p = b.getPatterns()
      lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.equal(patterns.length - 1);
    });
  });

});


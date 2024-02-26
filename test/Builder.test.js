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
      const {addModifyMultiplierNfts} = require("../scripts/patterns/schemes");
      
      addModifyMultiplierNfts(builder, 0, 3, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000040000000000581732187b993bf28f5054977032dc5267c0e0fd831c47d6e5e87e00000000000fe1340cdac03ee8fbd6fce1a69b336ad4cfc6d2e5018ad763a7ef0000000000fb2f28f623242959960990688cba5113dd44081a9c78c6ce47ace90000000000cda6830ba59f34e24bcc14ff8c4105c07d9b75e4e5acafc8f5ff20");

      builder = new Builder();
      addModifyMultiplierNfts(builder, 0, 2, false);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000581732187b993bf28f5054977032dc5267c0e0fd831c47d6e5e87e00000000000fe1340cdac03ee8fbd6fce1a69b336ad4cfc6d2e5018ad763a7ef0000000000bd0d88c85c4cbe8ebb674ec2b023c70550f6bb98c9767697aa1746");

      builder = new Builder();
      addModifyMultiplierNfts(builder, 0, 1, true);
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

    it("Add Withdraw", async () => {
      let builder = new Builder();
      const {addWithdraw} = require("../scripts/patterns/schemes");
      
      addWithdraw(builder, 1, true);
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000400000000001beaa12b112ad7273f4fad0563d02a592077c5d1b0321e2cd17c4a0000000000cc4f96fb7ae10446662787abb8d81ae51d836e89e406120dd24a1600000000001e230ef997ded2829d5aca4aa4c6af9182b23fcf2ee8c3355bde200000000000a705944023e1858ffa14d314c3efe280274411aac9b71db2c20e2c");

      builder = new Builder();
      addWithdraw(builder, 0, true);
      expect(builder.getCalldata()).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030000000000eba34e54bc46e93b1d6d94b21aaa33451fefd75b909df427b2e19c0000000000f932ba65786f56c52db6654f4cc0ede6c7b871ba9c257eba854d5d000000000031f7c23ff27c5c768ed392c422fea3c14bf02c2bbbaaf77d07324a");

      builder = new Builder();
      addWithdraw(builder, 0, false);
      expect(builder.getCalldata()).to.equal("0x0453906200000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000096c8c7eab6455b8510c4fe7c43c585cdf0a4c6d5227cdaf5dc0d2000000000003023cf1b2a42523ba6a82ea9279eba9f8cea7d26fddfc4de4a155c");

      builder = new Builder();
      addWithdraw(builder, 1, false);
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000300000000001beaa12b112ad7273f4fad0563d02a592077c5d1b0321e2cd17c4a0000000000a4990c54ac7fc065800bcc3b48a9ef02140cbc3f965098b3027f7000000000007882ac6000b49366235e9979b784fd0bf4d22c5a539675310bde05");

      builder = new Builder();
      addWithdraw(builder, 3, true);
      expect(builder.getCalldata()).to.equal("0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000600000000001beaa12b112ad7273f4fad0563d02a592077c5d1b0321e2cd17c4a000000000053d6de97341e9469b921364d023569fde0ab75910a5847896e624300000000004ffa6732aa46645d17411bc7455d66bce0d7f7b93e884716a4d77f0000000000bf7b90679a8f9a4e739bd6b8914cb699e0e969813b5157e42d1d8300000000008c71e2eba1d498db0cbc5eeea5d853aa82fac9dc4860321e5932dc00000000005aa257f99054e1c2ca58a9de7f2b11748a12e628dc7cfe9931f12e");
    });

    it("Add Modify Multiplier Nft", async () => {
      let builder = new Builder();
      const {addModifyMultiplierNfts} = require("../scripts/patterns/schemes");
      
      addModifyMultiplierNfts(builder, 1, 0);
      expect(builder.getCalldata()).to.equal("0x0453906200000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000064f8954f6d0ec70b98772b4bea3e3e7057dd4bf20ad9d0ae50a161000000000043181ec787881a28872026dcd4c23c1de7898fdd41c9a366aa0b4b00000000005611060799a13f628e97829c54e5d12922373c4f32d971c84578a7");
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
      const {addModifyMultiplierNfts, addModifyMultiplierNftsBatch} = require("../scripts/patterns/schemes");
      addModifyMultiplierNftsBatch(builder, 0, 5);
      let patterns = builder.getPatterns();

      let b = new Builder();
      addModifyMultiplierNfts(b, 0, 0, false);
      let p = b.getPatterns()
      let lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.not.equal(-1);

      b = new Builder();
      addModifyMultiplierNfts(b, 0, 5, true);
      p = b.getPatterns()
      lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.equal(patterns.length - 1);
    });

    it("Batch MulticallVote", async () => {
      let builder = new Builder();
      const {addMulticallVoteBatch, addMulticallVote} = require("../scripts/patterns/schemes");
      addMulticallVoteBatch(builder, 5);
      let patterns = builder.getPatterns();

      let b
      let workingPatterns = 
        [
          [[], [], [1, true, true, false]],
          [[], [], [0, true, false, false]],
          [[], [], [0, false, true, false]],
          [[], [], [2, true, true, false]],
          [[], [true, false], [1, true, true, false]],
          [[0, false, true], [], [0, true, true, false]],
          [[0, false, true], [true, false], [0, true, true, false]],
          [[], [], [5, true, true, false]],
          [[], [], [3, true, true, false]],
          [[], [true, false], [0, false, true, false]],
          [[], [], [1, false, true, false]],
          [[0, false, true], [], [0, true, true, false]],
          [[], [], [1, true, false, false]],
          [[0, false, true], [], [0, false, true, false]],
          [[], [], [2, false, true, false]],
          [[], [], [4, true, true, false]],
          [[false, false, true], [true, false], [0, false, true, false]],
          [[1, true, true], [], [0, false, true, false]],
          [[1, true, true], [], [0, true, true, false]]
        ];
      for (workingPattern of workingPatterns) {
        b = new Builder();
        addMulticallVote(
          b, 
          workingPattern[0],
          workingPattern[1],
          workingPattern[2],
        );
        let testPatterns = b.getPatterns()
        for (testPattern of testPatterns) {
          expect(patterns.indexOf(testPattern)).to.not.equal(-1);
        }  
      }
    });

    it("Batch Withdraw", async () => {
      let builder = new Builder();
      const {addWithdraw, addWithdrawBatch} = require("../scripts/patterns/schemes");
      addWithdrawBatch(builder, 10);
      let patterns = builder.getPatterns();

      let b
      let workingPatterns = 
        [
          [0, true],
          [1, true],
          [0, false],
          [1, false],
          [3, true]
        ];
      for (workingPattern of workingPatterns) {
        b = new Builder();
        addWithdraw(
          b, 
          workingPattern[0],
          workingPattern[1]
        );
        let testPatterns = b.getPatterns()
        for (testPattern of testPatterns) {
          expect(patterns.indexOf(testPattern)).to.not.equal(-1);
        }  
      }

      b = new Builder();
      addWithdraw(b, 0, false);
      let p = b.getPatterns()
      let lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.not.equal(-1);

      b = new Builder();
      addWithdraw(b, 10, true);
      p = b.getPatterns()
      lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.equal(patterns.length - 1);

    });

    it("Batch Modify Multiplier", async () => {
      let builder = new Builder();
      const {addModifyMultiplierNftsBatch, addModifyMultiplierNfts} = require("../scripts/patterns/schemes");
      addModifyMultiplierNftsBatch(builder, 10, 10);
      let patterns = builder.getPatterns();

      let b = new Builder();
      addModifyMultiplierNfts(b, 1, 0, false);
      p = b.getPatterns()
      lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.not.equal(-1);

      b = new Builder();
      addModifyMultiplierNfts(b, 10, 10, true);
      p = b.getPatterns()
      lastPattern = p[p.length - 1];
      expect(patterns.indexOf(lastPattern)).to.equal(patterns.length - 1);
    });
  });

  describe("Batch compare function result with predefined string", function () {
    it("Compare batch delegate", async () => {
      let builder = new Builder();
      const {addDelegate, addDelegateBatch} = require("../scripts/patterns/schemes");
      addDelegateBatch(builder, 1, 1);
      let calldata = builder.getCalldata();
      expect(calldata).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000780000000000abec33efa7510756bb646bdbfd1ea2d8b5705208980530683a34860000000000704c09ff65112942848a63603bebd625aeb4a3e255cbd8b2472b900000000000bfdd5a0857c0acbdb9f763e78bb35cf39bd00797aa952405e5151f00000000004e3138b04d1858a7b490c049aace017b9f1bc5d3f9bf879adc1a730000000000b9db5f9b4617f949c3b593fba8e48fc74840fcb53b6839e00bf3a2000000000026d78eeca71471f1509c680b84945b9ae69d239cad8da2a0568e0f0000000000906cd4242846f5ee8c5a21d106b6c6fccaf6c0b7345ceca6ff0e13000000000081ead554b1601b62e9163a36c543d76d29cbedaa31659df7daf0750000000000c9a7a62dd12a47d3c8e965f8906693954104099b185cf44cb9b61a000000000000645f8c4b3b9e571f7b3db3b65bd1dc96184ff103564401395e6400000000001943f703ad0c6ed655a74c41ba6c92933dd549cb2afaef49042d6a0000000000161553bef4b7807f86c20d0ae9162d43546a88065774ea1154b6600000000000c0d6c934e193fcc4ddf40521ac6d1c1f4ff08784514fa5bcc0637b0000000000cda689893c28a36d45f90d9fb14307e802a92b62a39ea192ec9d93000000000018f02ca4b75fc6ebacd5fb002e650176a33d948716f19782adc2400000000000f8febd0340903ec6038ceacaf36c5fbe8e85dc6346669bf969cea800000000009a84f293cf30cbecdacaa7e2b4095b1e09b2b2cff367b74bcf1ef10000000000eafc4ed392e16ea66c22ab0a2cdb33e85a501790f35dd756ace0c4000000000062701670ddae791c26ea9a65fbbf390105e4541d1778213364b375000000000098d6b2fda07c5d1062a26c829baced94f9bbee4d4bccf44f56ed990000000000af17535635b21e7fc551003ac3cd962c2ac60259341d8483799cde00000000003ec971a9e3e72f1c3b2d1487449d6fc72de3a97202b4fc67e6a92300000000002a13c6674d16fa1bbcd96a81bf793a25ebc044fbf52e2614c0d3f200000000006ca6cf856dae357ca1966bb9248ec86faecf8046596831ca433cd70000000000197e2abf5da4bb41f84f6c3023ea936e27299b3fea32a134d9e9970000000000a3c974ea659cde1f40818bff95a9f5647ae19ae0d2acab22a6c2e50000000000d38fab1689d404a4290ae1b5e608b4a91b6b46e0b3b3214d8b6add0000000000e7a21b0eb655cc4538e924a90efecd3abdfe88b18398c20993ac56000000000033223fa17811260bfab5d4cdb73a8dbbeeb997aafdc5a36ed243c0000000000016c290caa60db32a3faebf40b49fa3bf6884b714fcca382cb7e66e0000000000fa458d645d284d5e414339e2de9053f3ee071e061b7581b82859450000000000e7c4c97672a5c9b8600e231e405592365276132748ce659a45778900000000004024faba1ff0aa9a43a771e0082c08b5a0ab25624582ff0c310f250000000000d794419fbc359497d7964543ed33f02e5ebf4d75246ba5cd53ad10000000000042198ba5973f3e84baa42898522bf1ba55c4d5c512302935cd1b7b0000000000e7485b4281e0c6389fb464e8cf6add30efd0a37597f9d14fc29d02000000000096cc97273ff154e0d71b6ea137b07ed7ed4d7235f5b3b7eefbdbe70000000000edf996c2ffb2c0010a411074912263e51b7b571d8af71d40d39d9e000000000017835cb19f8b6c0a43f91acda36e8d2e81e44dcf528ea967864dab0000000000a04965d0666b1bc01e7f5d83dc4a85250b1d34bfe2bbe77b5eeef90000000000bb64a0059860accccee05700345457dd7a3862bb318cfed6adc8e60000000000e3deb78d196b9bc858c4ec3da8434356d7f9d0fcad322c945d27920000000000816559a6e67fa1b0d103a74f31628bcb5afa55554fffa19d8aea960000000000e68cae66e4beb20a4da83596e27488462ae9448af3c71634fd0434000000000059e22ebe9bd8223a927c8cf51e7256ece9519fcc2a51641552d2340000000000f70a6654a9cd65d47899402e11ff33e6effeda7c036aeee45622ba000000000077724b80b9f53a92071f35d034499e56d371324180618741e568a50000000000e920e42ac718d65ab3feafa762f12b52467d0411e38211a1cdc147000000000095342ced806457da2df69da179588c209d2f7c061e70a18148ce7c0000000000a467528455766c238391f72577a63db360399a8a03828c88dc04c8000000000045d578151f2164c84bcbb713d242e27a0e9524b9b5bf44e17670860000000000d3aa8a50ece5d87403d6e69b418840c2a0da4e2b17c970af88dee8000000000065ac99698f5ba1fb2c74508f37bf6e54e9481938fbc48e6763520600000000005edec6cbdc01fd4ccf153a2f55de743da56db48e557633eb1cb0e0000000000056ed024af8540c4900edce922acd70528f9dcadca8b7f5fcc264e60000000000d446edcdd6019922d8e077cd004aa1c22dcdcd2615b6f1881a2ef300000000001b2d66daf4e1e635b107323b8ebe6c7283292fa39924f8b9a58cd700000000007570cc04eef35851c5bce59755a479c46c50b1cb833c2005c7fccf00000000009c7c9adc6aae28cc1110b9af31394cad360e586d0f42884d0890a2000000000043c8ddc39f449442ee72b6699d3537beda8acfc5e8a4fcf74120f70000000000bbd8122e96b3e2ae588c2ae7cc80aeaeec3ff5edafc2c4ed5d94c00000000000a4f0ff61af2ae3ccc39a2127bf7a471a47c23633d43dd2dcdf73ec0000000000d6974352f8707ea3895c79ca1046032c37b0ca0588734b23134ceb0000000000e7a24bf07e6e49be1d14aa8d76afbfad1487224c0d540a6edeec2f0000000000fc73d567f03b6779f0fec51ee55dcb0dac84816a51ae5ac3e62c6d0000000000faa8327dac02fce8ac2e1bc2926bfab869496c5606faad5753f4490000000000ab54c5ea0eac3e69ed006c26ab3da319026fafe72988de92c27728000000000085bc72cdff11c71638775ea973d050fb663eb3a9b2b0b86f2b732200000000000961a21e45ad30762ada0100eaa8c2c3270928047ae8573bab9daf000000000079905ffad540bf6a58d7cab6955dfbff074e70894edbb72569d3a800000000000cfb5a6164a552ccf7257c6568d392ae067adae3d6b3cdfaf7862d0000000000c86c5a97f9210e6fe41b994fe2f4b4a7295f350534a78cf6a54a9a0000000000ec2002afae44c8f0c77d975139949843bbb9681ae57d42e49162890000000000423ed1cae05e3706d08816abe2993f11076d4cb1723b612368039700000000006e3ff3d85fc2391be245d47cc35b1461bd79e3c89dea659619ff770000000000a4e2608fac2052026b995223dbd57d77eb6f41dbf5463fa4eb58940000000000cb4ec7bfc7f554d6a434dbcdf52d59918ceee1443213d48208d99500000000005bce3d41d0efd740d33c90fcc825bb4ddbca5153a5384d528f7e5a00000000000abd1df85f85ff3b14d9381b175de61a1e6e28ef082981053dff100000000000535b10439a52d997a67bc27ebdb667581652f1b31f70f0d9ea008c00000000009012b905c085ef2e31d5b13be0541da1392ff39e6de826cc022da2000000000071d1ce0abe55e2b392e674423ebe74bfb83988ba759847d9cf4bd70000000000eb1b25e12f50d5d7e57015649021931e0ef905cdf451eef7e29f0400000000007ec23e121f0d2802eef4be8d9aef3fc8d35069b9ef2ba80cac413d0000000000c369da6166c93936411a31566e2467e0503a6fbf46d8bc9a59ddb0000000000072c30000d78b47075c260c3c26714e34a3890267e27af2a92dfb390000000000054e59008a6f24c786eee71d4ff9912417c198d2fa5fe84f8e456c000000000093a54a34ab205ad3073c96400aa7c01faee2fa4af6bb99f7c122ff000000000093ac10f386bcb15bfcf0077ac5db078fc428b87b740a1bddb109410000000000a5b50bd284f85e3428cfc63455393e278ef3dec6d085f337a1103a000000000099c37858183be0d1c68fe0ff801ab7ebf290ac32bf30f1d716d91f00000000002a6b02eae1fdb8d8ddfc7634d0841b32ef2009601a6d67d731777e0000000000cbf132596a2b23ac3f89f9049d91b331837504987a4045107c4df8000000000013696e2b78503bce215816fc561ebb04f4c465510ce1091ef833d90000000000047217112688a4a2eeee02980b956cdb1d4fce671fa74936ea14a10000000000304d14bbf2f1925e4b4b31041f4d15c4f3539c70c74005d26a1f3b0000000000eb4af4ce1ddcf809085de81c550fb3378b2652eaa51ce8bbfc59590000000000c254798f49e20b3bba1afb91300c00981f6467e10f32dbf8a863250000000000d72db4ab9c1b164295850301e04975016e9261b5794da301734c61000000000046961732201c44d60612ed886ee4afb4f563f7df91cadd8da5962700000000008c8955a2e4e6eda9225f3d75af620e9ab7bca09bce83321e040b020000000000393f322ba19735e1c575639d99d671f35bea7f671e7550a5e01e5800000000000c9e498915a99a44c0d3221f9b4cd789b36f5ab006927f40be62db0000000000a39040c257edef40287a3b57447e52a6832d33f8376b22024ed08a00000000002283108d6ae0e066f146548474827e60f265a4ddbc01d227819d640000000000aae022d30006d1838ef1bd43af7dd93f71502bc300b18a3779f00b00000000007ae5d4d508fada4e6c1da8521aa84cecf0b4d266a7c84d6c0b6c800000000000bd446c83132ae0016d7d03a2025b56d0957242ad5bca1f00f99b42000000000043ccd4463af9785c6e31e4f17260631d4d113799f0468c5296fac7000000000038a88bdbec24770a817cff8d9209c844ee3df504e612558aebd23e00000000009922cfc5f78d14dfad981001fda9a9c7d1c5f3e46d8ba85e7037ae00000000007539504c174339bee5e3771953f1666c2e0b22ea6eaa81b4b0ce6400000000006509a2379338bb731e9c157223873441c0d5a0f6caee17f741ec800000000000c5b235a38e9ba0eb78f34fa457c3c060f5e622f79ad10619dabb8c0000000000d4722a1626c61355c9e266fbd12c703bb3ea40783b658c897c53b80000000000ed46759aba9c248b7435a6ba3ef4ef5af72dbc5d25e2da301358ee00000000008197b5b02a419e973c2daf2303049170b29c95919811ec92c6d63200000000004972550ab1719a7935c63404501f7560ba081c34c7ee4ff880b62200000000003d3c14d85d2edc8ebf4099e63760231cf677dc358da5fbb172598e0000000000805edacdff9d57342753a1a41f83f3a316a02ec380dd94312be293");
      
    })
    it("Compare batch whitelist", async () => {
      let builder = new Builder();
      const {addWhiteList, addWhiteListBatch} = require("../scripts/patterns/schemes");
      addWhiteListBatch(builder, 5);
      let calldata = builder.getCalldata();
      expect(calldata).to.equal("0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000230000000000cf56c8cff78b00ca7795d4f97c2a351ecedf3cc52e1df77cd5a3750000000000945d04e81eddbfaaaf23bf26e0c4251cf4cf4ec11ce8617132a33d0000000000153270cc7db1f30be2ad8d3ffc9578b26f04931643873dc437f7ef0000000000c1f53d499e0a453a49336f1a2f534fdd88fc67d9b72efb0a46d08b000000000004f877bfe1643146c85d913e8ef85381d12ed25b7742b99cfbffa90000000000b1e14e7db6391733d3007d0b1397090d66f518acbc74aa35025a87000000000084f3f57613bf3ded0af136455cf693aaa1bc02d96b11e00509d3eb0000000000d3fd4c540f2928e12205c1c35f1353eabe5cce9c9f3a155c3fec7b000000000017702179bcda4ff411f929e18f10d3f05c839796727d53d1b56f1e00000000004b4bb5b57c465e71a7be4a522d904bbf3a06b723997aa5a18920410000000000d6154220b20bd85de1eee036f158461373c31a9a9861262f1f8a2c000000000067242584cc60ee0ea419a0421fa1bb7945af7d4c0cda8bdaeeb9eb00000000004562cded303b39c38101723101f0fb5c9e3c23f22c25ff1cc25aac00000000000c74f0083a14bf9f12cad036b227051f2d23e47618276dfe1c5d510000000000092c21165d4825b5ec1dfb4753e86a9b43c359309ab19f94ebf4be00000000009f793d532b970bb55a030b78834783e0b8d5bd2e295f8d37fe028300000000004f7f79d534585ace63981ef12053a26ad99dba3e267a4c4ecedf820000000000bedd056d603d9fae0cec922d169572fe1d78e2f1337f2d89f2b3380000000000df783885fa005ee5cb4f82f91d5d78c4ca40c79b7c293df300f6eb000000000057037a770be5c13525e59c3e73e62a60b17fb2455c1a8dd0ea979100000000007773cbab6e0b2f6c2055361a5457684d9f96a94912056a5c47b1f40000000000d50a0510cbe3e20506797002d684c5cf51acc94e6dc1d3051a28f70000000000db4095d2a7b80e988aacceac392343bd2b064c7eca307165e7ea3700000000001b5598f3cd30899edfe31a52dc8a08c39417602b6414d84285ab140000000000becf68435a120ca1e1e3adc098165e55851958319bddbf60bda0d90000000000767cfe2d3afdae8a570c13c28e6f500547fa73dcd36f5c0aeeae840000000000749610b6f0634f781faee437e09d629443ba30df0040bfe79bbb97000000000021fe9e0c4584c87a634b43a1dd3c853015f3d0bfe2b456b0c95c52000000000068f2dfa24f3ad1a237b5e0fd7fc16060783d4c5a59f695f97ed8b300000000007beccd1913bb2be985d67361f93c8f233e920d57a51b7422a47fd400000000001626152d5dab0e50fa1c05a446b186752e771d4c8a946b0598b52f0000000000042157d6b53e518acea390822f217f13c51c677b67b0b54fa35150000000000045e57011e553bc4c77a2df8de02c5044bffb20e47d8e78b5d7c76a0000000000d738f66ddee3979765c15acafbae2d32d0035222065e7b0c8bc4ac00000000007e73ae0a901514369f32233b723f9bbe3f78d7414f4bec53088f0a");      
    })
  });

});


var EphKeys = artifacts.require("./EphKeys.sol");
const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  solidityNode: 'https://api.trongrid.io'
});


module.exports = async function (deployer, network) {
  if (network === 'shasta') {
    console.log("Deploying EphPublicKey contract...");
    try {
      await deployer.deploy(EphKeys);
      const eph = await EphKeys.deployed();
      const cloak = eph.address;
      console.log('Contract address',tronWeb.address.fromHex(cloak))

    } catch (error) {
      console.error("Error deploying EphPublicKey contract:", error);
    }
  }
};


//TJBeQh58L9nLzkamyemu3A5GZgTafVHdeF
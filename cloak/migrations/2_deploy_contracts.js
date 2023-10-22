var Logs = artifacts.require("./Logs.sol");
var safeMath = artifacts.require("./SafeMath.sol");
const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  solidityNode: 'https://api.trongrid.io'
});


module.exports = async function (deployer, network) {
  if (network === 'shasta') {
    console.log("Deploying  contract...");

    try {
      await deployer.deploy(safeMath);
      const safemath = await safeMath.deployed();
      const math = safemath.address;
      console.log('Contract address',tronWeb.address.fromHex(math))

    } catch (error) {
      console.error("Error deploying safeMath lib:", error);
    }

    try {
      deployer.link(safeMath, Logs);
      await deployer.deploy(Logs);
      const logs = await Logs.deployed();
      const cloak = logs.address;
      console.log('Contract address',tronWeb.address.fromHex(cloak))

    } catch (error) {
      console.error("Error deploying logs contract:", error);
    }
  }
};

//TMErpKVAG1PT6mZkrqqUkrqujhSbAQhb6b


//TMD1Mv1jv4q8b9Y9fhEUfqZ2VESWPDznjj
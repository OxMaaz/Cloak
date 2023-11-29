var Logs = artifacts.require("./Logs.sol");
var safeMath = artifacts.require("./SafeMath.sol");
// var RelayWithdraw = artifacts.require("./RelayWithdraw.sol");
const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',

});


module.exports = async function (deployer, network) {
  if (network === 'mainnet') {
    console.log("Deploying  contract...");

    try {
      await deployer.deploy(safeMath);
      const safemath = await safeMath.deployed();
      const math = safemath.address;
      console.log('Contract address', tronWeb.address.fromHex(math))

    } catch (error) {
      console.error("Error deploying safeMath lib:", error);
    }

    try {
      deployer.link(safeMath, Logs);
      await deployer.deploy(Logs);
      const logs = await Logs.deployed();
      const cloak = logs.address;
      console.log('Contract address', tronWeb.address.fromHex(cloak))

    } catch (error) {
      console.error("Error deploying logs contract:", error);
    }
  }



  // console.log("Deploying  contract 2...");

  // try {
  //   await deployer.deploy(RelayWithdraw);
  //   const relay = await RelayWithdraw.deployed();
  //   const math = relay.address;
  //   console.log('Contract address', tronWeb.address.fromHex(math))

  // }
  // catch (error) {
  //   console.error("Error deploying safeMath lib:", error);
  // }


};


// Contract address TFTJSiZh16mQiHzo41Ckpb3NhVBj4YpDPZ
// Relay address THBHwaBXnJgcg6fboHnTZe3BA5MMew3Pa3

//Mainnet
//TV2FftnJS83Prrpa1kYWpaJjSzeLqksFjX
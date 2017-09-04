//var ConvertLib = artifacts.require("./ConvertLib.sol");
var Meeting = artifacts.require("./Meeting.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  //deployer.deploy(MetaCoin);
  //deployer.link(ConvertLib, Meeting);
  deployer.deploy(Meeting);
};

const SharedStructs = artifacts.require("SharedStructs");
const Functionality = artifacts.require("Functionality");
const ApiDirectory = artifacts.require("ApiDirectory");

module.exports = function (deployer) {
  deployer.deploy(SharedStructs);
  deployer.deploy(Functionality);
  deployer.link(SharedStructs, ApiDirectory);
  deployer.link(Functionality,ApiDirectory);
  deployer.deploy(ApiDirectory);
};
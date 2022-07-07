
const Banking = artifacts.require('Banking');

module.exports = async function (deployer) {

    await deployer.deploy(Banking);

}

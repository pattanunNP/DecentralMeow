
const Banking = artifacts.require('Banking');

module.exports = async function (deployer) {

    await deployer.deploy(Banking,"0xEd83c3ecd2DE6d81DcbDF173e32c1748a14d162a");

}

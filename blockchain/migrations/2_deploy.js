
const Banking = artifacts.require('Banking');

module.exports = async function (deployer) {

    await deployer.deploy(Banking, "0x90526189fd3334a762BdDEc82B9ac15E96D1A8dB", "0xEd83c3ecd2DE6d81DcbDF173e32c1748a14d162a");

}


const Banking = artifacts.require("Banking");

/*

*/

contract("Banking", async (accounts) => {


    it("should create a bank account", async () => {
        const Bank = await Banking.new();
        var user1 = await accounts[1];
        var user2 = await accounts[2];
        await Bank.createAccount(user1, "test1");
        await Bank.createAccount(user2, "test2");
        await Bank.createAccount(user2, "test3");



    })
    it("should get all user acccount", async () => {
        const Bank = await Banking.new();

        var user1 = await accounts[1];
        var user2 = await accounts[2];
        await Bank.createAccount(user1, "test1");
        await Bank.createAccount(user2, "test2");
        await Bank.createAccount(user2, "test3");
        await Bank.createAccount(user1, "test4");


        const user1_accounts = await Bank.getUserAccounts(user1);
        const user2_accounts = await Bank.getUserAccounts(user2);


        console.log("ACCOUNT:", user1_accounts.length, user2_accounts.length);
        console.log("USER1_ACCOUNT:", user1_accounts);
        console.log("USER2_ACCOUNT:", user2_accounts);
        assert.equal(user1_accounts.length, 4);
        assert.equal(user2_accounts.length, 4);
    })

})
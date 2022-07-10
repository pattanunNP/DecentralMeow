
const Banking = artifacts.require("Banking");




contract("Banking", async (accounts) => {

    before(async () => {
        this.Banking = await Banking.deployed();
    })

    it("should create a bank account", async () => {

        var user1 = await accounts[1];
        var user2 = await accounts[2];
        await this.Banking.createAccount("test1", { from: user1 });
        await this.Banking.createAccount("test2", { from: user2 });
        await this.Banking.createAccount("test3", { from: user1 });



    })
    it("should get all user acccount", async () => {

        var user1 = await accounts[1];
        var user2 = await accounts[2];


        const user1_accounts = await this.Banking.getUserAccounts.call({ from: user1 });
        const user2_accounts = await this.Banking.getUserAccounts.call({ from: user2 });

        assert.equal(user1_accounts.includes("test1"), true);
        assert.equal(user1_accounts.includes("test3"), true);
        assert.equal(user2_accounts.includes("test2"), true);

    })
    it("shold get account info", async () => {

        var user1 = await accounts[1];
        var user2 = await accounts[2];

        const user1_accounts = await this.Banking.getUserAccounts.call({ from: user1 });
        const user2_accounts = await this.Banking.getUserAccounts.call({ from: user2 });

        const user1_account_info = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        assert.equal(user1_account_info.name, "test1");
        assert.equal(user2_account_info.name, "test2");

    })
    it("should get account balance", async () => {

        var user1 = await accounts[1];
        var user2 = await accounts[2];

        const user1_accounts = await this.Banking.getUserAccounts.call({ from: user1 });
        const user2_accounts = await this.Banking.getUserAccounts.call({ from: user2 });

        const user1_account_info = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        assert.equal(user1_account_info._balance, 0);

        assert.equal(user2_account_info._balance, 0);

    })
    it("should deposit money", async () => {

        var user1 = await accounts[1];
        var user2 = await accounts[2];

        const user1_accounts = await this.Banking.getUserAccounts.call({ from: user1 });
        const user2_accounts = await this.Banking.getUserAccounts.call({ from: user2 });

        const user1_account_info_before = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info_before = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        await this.Banking.deposit(user1_accounts[0], { from: user1, value: web3.utils.toWei("1", "ether") });
        await this.Banking.deposit(user2_accounts[0], { from: user2, value: web3.utils.toWei("1", "ether") });

        const user1_account_info = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        assert.equal(user1_account_info_before._balance, 0);
        assert.equal(user2_account_info_before._balance, 0);
        assert.equal(user1_account_info._balance, web3.utils.toWei("1", "ether"));
        assert.equal(user2_account_info._balance, web3.utils.toWei("1", "ether"));

    }
    )
    it("should withdraw money", async () => {
        var user1 = await accounts[1];
        var user2 = await accounts[2];


        const user1_accounts = await this.Banking.getUserAccounts.call({ from: user1 });
        const user2_accounts = await this.Banking.getUserAccounts.call({ from: user2 });



        const user1_account_info_before = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info_before = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        await this.Banking.withdraw(user1_accounts[0], web3.utils.toWei("1", "ether"), { from: user1 });
        await this.Banking.withdraw(user2_accounts[0], web3.utils.toWei("1", "ether"), { from: user2 });

        const user1_account_info = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        assert.equal(user1_account_info_before._balance, web3.utils.toWei("1", "ether"));
        assert.equal(user2_account_info_before._balance, web3.utils.toWei("1", "ether"));
        assert.equal(user1_account_info._balance, 0);
        assert.equal(user2_account_info._balance, 0);


    })
    it("should transfer money to same owner", async () => {
        var user1 = await accounts[1];
        var user2 = await accounts[2];

        const user1_accounts = await this.Banking.getUserAccounts.call({ from: user1 });

        const user1_account_info_before = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info_before = await this.Banking.getAccountInfo.call(user1_accounts[1], { from: user2 });

        await this.Banking.deposit(user1_accounts[0], { from: user1, value: web3.utils.toWei("5", "ether") });

        await this.Banking.transfer(user1_accounts[0], user1_accounts[1], web3.utils.toWei("1", "ether"), { from: user1 });

        const user1_account_info = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });


        assert.equal(user1_account_info_before._balance, web3.utils.toWei("1", "ether"));
        assert.equal(user2_account_info_before._balance, web3.utils.toWei("1", "ether"));
        assert.equal(user1_account_info._balance, 0);
        assert.equal(user2_account_info._balance, web3.utils.toWei("1", "ether"));


    })
    it("should transfer money to different owner", async () => {
        var user1 = await accounts[1];
        var user2 = await accounts[2];

        const user1_accounts = await this.Banking.getUserAccounts.call({ from: user1 });
        const user2_accounts = await this.Banking.getUserAccounts.call({ from: user2 });

        const user1_account_info_before = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info_before = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        await this.Banking.deposit(user1_accounts[0], { from: user1, value: web3.utils.toWei("5", "ether") });

        await this.Banking.transfer(user1_accounts[0], user2_accounts[0], web3.utils.toWei("1", "ether"), { from: user1 });

        const user1_account_info = await this.Banking.getAccountInfo.call(user1_accounts[0], { from: user1 });
        const user2_account_info = await this.Banking.getAccountInfo.call(user2_accounts[0], { from: user2 });

        assert.equal(user1_account_info_before._balance, web3.utils.toWei("1", "ether"));
        assert.equal(user2_account_info_before._balance, web3.utils.toWei("1", "ether"));
        assert.equal(user1_account_info._balance, 0);
        assert.equal(user2_account_info._balance, web3.utils.toWei("1", "ether"));
     })

})
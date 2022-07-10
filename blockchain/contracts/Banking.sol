// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Banking {
    address private owner;
    address private bank;

    uint256 private serialNumber = 0;
    uint256 private transacNum = 0;
    uint256 private bankBalance = 0;

    struct Account {
        string name;
        uint256 serial;
        uint256 createAt;
        address creator;
        uint256 _balance;
        bool doesExist;
    }
    //Defining a struct to store transaction record
    struct Transaction {
        uint256 transacNum;
        uint256 currentBalance;
        uint256 amountTransacted;
        uint256 createdAt;
        string transacType;
        uint256 accountSerialNumber;
    }

    mapping(uint256 => Transaction) private transactions;
    mapping(string => bool) private accountNameExists;
    mapping(string => Account) private nameAccountRecord;
    mapping(address => string[]) private accountNameRecord;

    constructor(address owner_address, address bank_address) {
        owner = owner_address;
        bank = bank_address;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the smart contract owner!");
        _;
    }

    event TransactionCompleted(
        address indexed _creator,
        uint256 _amount,
        uint256 _transacNumber,
        uint256 _currentAccountSerial,
        bytes32 _transactionType
    );

    function checkExistAccount(string memory _name)
        public
        view
        returns (bool _isExist)
    {
        return nameAccountRecord[_name].doesExist;
    }

    function createAccount(string memory _name) public payable {
        require(
            !nameAccountRecord[_name].doesExist == true,
            "Account name already exists"
        );

        address _creator = msg.sender;

        serialNumber++;
        //// Create a new account and store it in the accounts mapping.
        nameAccountRecord[_name] = Account(
            _name,
            serialNumber,
            block.timestamp,
            _creator,
            msg.value,
            true
        );

        accountNameRecord[_creator].push(_name);

        transacNum++; /// increment the transaction number
        // // Create a new transaction new account and store it in the transactions mapping.
        transactions[transacNum] = Transaction(
            transacNum,
            msg.value,
            msg.value,
            block.timestamp,
            "NewAccount",
            serialNumber
        );
        emit TransactionCompleted(
            msg.sender,
            msg.value,
            transacNum,
            serialNumber,
            "NewAccount"
        );
        // emit the event for new account creation
        accountNameExists[_name] = true;
        bankBalance += msg.value;
    }

    function getUserAccounts() public view returns (string[] memory) {
        return accountNameRecord[msg.sender];
    }

    function getAccountInfo(string memory _name)
        public
        view
        returns (Account memory)
    {
        return nameAccountRecord[_name];
    }

    function deposit(string memory _name) public payable {
        // Function for deposit fund to our accounts with _name
        require(msg.value > 0, "deposit fund can't be zero");

        nameAccountRecord[_name]._balance += msg.value; // add money to user account

        serialNumber++;

        transacNum++; /// increment the transaction number

        emit TransactionCompleted(
            msg.sender,
            msg.value,
            transacNum,
            serialNumber,
            "Deposit"
        );

        bankBalance += msg.value;
    }

    function withdraw(string memory _name, uint256 amount) public {
        // Function for withdraw fund to owner wallet

        require(
            amount > 0 && amount <= nameAccountRecord[_name]._balance,
            "insufficient funds"
        );

        payable(msg.sender).transfer(amount);

        nameAccountRecord[_name]._balance -= amount;

        serialNumber++;
        transacNum++; /// increment the transaction number

        emit TransactionCompleted(
            msg.sender,
            amount,
            transacNum,
            serialNumber,
            "Withdraw"
        );
        bankBalance -= amount;
    }

    function transfer(
        string memory from_name,
        string memory to_name,
        uint256 amount
    ) public {
        // Function for withdraw fund to owner wallet

        uint256 deduct = (amount * 1) / 100;

        require(
            amount > 0 && amount <= nameAccountRecord[from_name]._balance,
            "insufficient funds to transfer"
        );
        require(
            nameAccountRecord[from_name].creator == msg.sender,
            "Don't have permission"
        );

        if (
            nameAccountRecord[from_name].creator ==
            nameAccountRecord[to_name].creator
        ) {
            nameAccountRecord[from_name]._balance -= amount;
            nameAccountRecord[to_name]._balance += amount;
        } else {
            // send to another account deduct 1%
            nameAccountRecord[from_name]._balance -= amount;
            nameAccountRecord[to_name]._balance += (amount - deduct);
            payable(bank).transfer(deduct);
        }

        serialNumber++;
        transacNum++; /// increment the transaction number

        emit TransactionCompleted(
            msg.sender,
            amount,
            transacNum,
            serialNumber,
            "transfer success"
        );
    }

    function withdrawBank(uint256 amount) public onlyOwner {
        // Function for withdraw fund to owner wallet

        require(amount > 0 && amount <= bankBalance, "insufficient funds");

        payable(msg.sender).transfer(amount);

        bankBalance -= amount;

        serialNumber++;
        transacNum++; /// increment the transaction number

        emit TransactionCompleted(
            msg.sender,
            amount,
            transacNum,
            serialNumber,
            "Withdraw from bank"
        );
    }

    function getBankBalance() public view returns (uint256 _balance) {
        /// Function for get Bank Balance
        return bankBalance;
    }

    function getSerialNumber() public view returns (uint256 _serialNumber) {
        /// Function for get serialNumber
        return serialNumber;
    }

    function getTransectionNumber() public view returns (uint256 _transacNum) {
        /// Function for get transsecNumber
        return transacNum;
    }
}

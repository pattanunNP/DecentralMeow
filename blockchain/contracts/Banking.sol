// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Banking {
    uint256 public serialNumber = 0;
    uint256 public transacNum = 0;
    uint256 public bankBalance = 0;

    struct Account {
        uint256 serial;
        uint256 createAt;
        address creator;
        string _name;
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

    mapping(uint256 => Transaction) public transactions;
    mapping(string => bool) public accountNameExists;
    mapping(address => Account[]) public accountAddrRecord;

    string[] public accountNames;

    event AccountCreated(
        address indexed _creator,
        uint256 _serialNumber,
        bytes32 _name,
        bytes32 _location,
        uint256 _createdAt,
        uint256 _balance
    );

    event TransactionCompleted(
        address indexed _creator,
        uint256 _amount,
        uint256 _transacNumber,
        uint256 _currentAccountSerial,
        bytes32 _transactionType
    );

    function createAccount(string memory _name) public payable {
        require(!accountNameExists[_name], "Account name already exists");

        address _creator = msg.sender;
        accountNames.push(_name);
        serialNumber++;
        //// Create a new account and store it in the accounts mapping.
        accountAddrRecord[_creator].push(
            Account(
                serialNumber,
                block.timestamp,
                _creator,
                _name,
                msg.value,
                true
            )
        );

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
            _creator,
            0,
            transacNum,
            serialNumber,
            "NewAccount"
        ); // emit the event for new account creation
        accountNameExists[_name] = true;
        bankBalance += msg.value;
    }

    function getUserAccounts() public view returns (Account[] memory) {
        return accountAddrRecord[msg.sender];
    }
}

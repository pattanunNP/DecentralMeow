import Web3 from "web3";
import BankingContract from "../../contracts/Banking.json";
export const contract_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_address",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_transacNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_currentAccountSerial",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "_transactionType",
        type: "bytes32",
      },
    ],
    name: "TransactionCompleted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "checkExistAccount",
    outputs: [
      {
        internalType: "bool",
        name: "_isExist",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "createAccount",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "getUserAccounts",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getAccountInfo",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "serial",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createAt",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_balance",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "doesExist",
            type: "bool",
          },
        ],
        internalType: "struct Banking.Account",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "from_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "to_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBankBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "_balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getSerialNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "_serialNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getTransectionNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "_transacNum",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

export const getContract = async () => {
  const deployedNetwork = BankingContract.networks["5777"];
  const web3 = new Web3(window.ethereum);
  var contract = new web3.eth.Contract(
    contract_abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

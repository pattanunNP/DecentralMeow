import { getContract } from "@components/contract/contract";
import { Navbar } from "@components/navbar";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import web3 from "web3";

type Deposit = {
  amount: number;
  account_name: string;
};
type Withdraw = {
  amount: number;
  account_name: string;
};
type transfer = {
  amount: number;
  from_account_name: string;
  to_account_name: string;
  transection_fee: number;
};
type Account = {
  name: string;
  _balance: number;
  createAt: number;
};

const MyAccount: NextPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isFee, setIsFee] = useState(false);
  const [deposit, setDeposit] = useState<Deposit>({
    amount: 0,
    account_name: "",
  });
  const [withdraw, setWithdraw] = useState<Withdraw>({
    amount: 0,
    account_name: "",
  });
  const [transfer, setTransfer] = useState<transfer>({
    amount: 0,
    from_account_name: "",
    to_account_name: "",
    transection_fee: 0,
  });

  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);
  let [isOpen3, setIsOpen3] = useState(false);

  const getAccounts = async (address: string) => {
    const accounts = [];
    const myContract = await getContract();

    const response = await myContract.methods
      .getUserAccounts()
      .call({ from: address });

    if (response.length > 0) {
      for (const account of response) {
        const response = await myContract.methods
          .getAccountInfo(account)
          .call();
        console.log(response);
        accounts.push({ ...response, account });
      }
    }

    setAccounts(accounts as any);
  };
  const depoositMoney = async (account_name: string, amount: number) => {
    if ((window as any).ethereum) {
      const { selectedAddress } = (window as any).ethereum;
      const overrides = {
        from: selectedAddress,
        value: web3.utils.toWei(String(amount), "ether"),
      };
      const myContract = await getContract();

      await myContract.methods
        .deposit(account_name)
        .send(overrides)
        .then((res: any) => {
          console.log(res);
          setIsOpen(false);
          toast.success("Successfully deposited");
        });
    }
  };
  const withdrawMoney = async (account_name: string, amount: number) => {
    if ((window as any).ethereum) {
      const { selectedAddress } = (window as any).ethereum;
      const overrides = {
        from: selectedAddress,
      };
      const myContract = await getContract();
      const amount_wei = web3.utils.toWei(String(amount), "ether");
      await myContract.methods
        .withdraw(account_name, amount_wei)
        .send(overrides)
        .then((res: any) => {
          console.log(res);
          setIsOpen2(false);
          toast.success("Successfully withdrew");
        });
    }
  };

  const transferMoney = async (
    from_account_name: string,
    to_account_name: string,
    amount: number
  ) => {
    if ((window as any).ethereum) {
      const { selectedAddress } = (window as any).ethereum;
      const overrides = {
        from: selectedAddress,
      };
      const myContract = await getContract();
      const amount_wei = web3.utils.toWei(String(amount), "ether");
      await myContract.methods
        .transfer(from_account_name, to_account_name, amount_wei)
        .send(overrides)
        .then((res: any) => {
          console.log(res);
          setIsOpen3(false);
          toast.success("Successfully transferred");
        });
    }
  };
  const checkOwenership = async (account_name: string) => {
    const myContract = await getContract();
    const response = await myContract.methods.getUserAccounts().call();
    if (response.includes(account_name)) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (transfer.to_account_name) {
      checkOwenership(transfer.to_account_name).then((res: any) => {
        if (res) {
          setIsFee(false);
        } else {
          setIsFee(true);
        }
      });
    }
  }, [transfer.to_account_name]);
  useEffect(() => {
    getAccounts((window as any).ethereum.selectedAddress);
  }, []);

  useEffect(() => {
    (window as any).ethereum.on("accountsChanged", async () => {
      getAccounts((window as any).ethereum.selectedAddress);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    setDeposit({ ...deposit, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    setWithdraw({ ...withdraw, [e.target.name]: e.target.value });
  };
  const handleChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    setTransfer({ ...transfer, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="bg-gradient-to-r from-violet-dark  to-violet-light h-screen">
        <Navbar />

        <section id="create_accout" className="mx-5 p-2 flex z-0 ">
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              {/* Container to center the panel */}
              <div className="flex min-h-full items-center justify-center">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="p-5 mx-auto max-w-sm rounded bg-white w-96">
                  <Dialog.Title className="text-xl">Deposit Money</Dialog.Title>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row space-x-4">
                        <h1>To: {deposit.account_name}</h1>
                      </div>

                      <div className="flex flex-row space-x-4">
                        <input
                          type="text"
                          placeholder="amount (ETH)"
                          className="p-1"
                          name="amount"
                          value={deposit.amount}
                          onChange={handleChange}
                        />{" "}
                        <p>ETH</p>
                      </div>

                      <button
                        onClick={() =>
                          depoositMoney(deposit.account_name, deposit.amount)
                        }
                        className="p-1 bg-green-400 text-white rounded-full disabled:bg-gray-400"
                      >
                        {" "}
                        Deposit{" "}
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="p-1 bg-red-400 text-white rounded-full"
                      >
                        {" "}
                        Cancel{" "}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
          <Dialog
            open={isOpen2}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              {/* Container to center the panel */}
              <div className="flex min-h-full items-center justify-center">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="p-5 mx-auto max-w-sm rounded bg-white w-96">
                  <Dialog.Title className="text-3xl font-bold">
                    Withdraw Money
                  </Dialog.Title>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row space-x-4">
                        <h1 className="text-xl ">
                          From: {withdraw.account_name}
                        </h1>
                      </div>

                      <div className="flex flex-row space-x-4">
                        <input
                          type="text"
                          placeholder="amount (ETH)"
                          className="p-1"
                          name="amount"
                          value={withdraw.amount}
                          onChange={handleChange2}
                        />{" "}
                        <p>ETH</p>
                      </div>

                      <button
                        onClick={() =>
                          withdrawMoney(withdraw.account_name, withdraw.amount)
                        }
                        className="p-1 bg-green-400 text-white rounded-full disabled:bg-gray-400"
                      >
                        {" "}
                        Withdraw{" "}
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen2(false);
                        }}
                        className="p-1 bg-red-400 text-white rounded-full"
                      >
                        {" "}
                        Cancel{" "}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>

          <Dialog
            open={isOpen3}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Full-screen scrollable container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              {/* Container to center the panel */}
              <div className="flex min-h-full items-center justify-center">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="p-5 mx-auto max-w-sm rounded bg-white w-96">
                  <Dialog.Title className="text-3xl font-bold">
                    Transfer Money
                  </Dialog.Title>
                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col space-x-4">
                        <h1>From: {transfer.from_account_name}</h1>
                      </div>
                      <div className="flex flex-col space-x-4">
                        <h1>To:</h1>
                        <input
                          type="text"
                          placeholder="to account name"
                          className="p-1"
                          name="to_account_name"
                          value={transfer.to_account_name}
                          onChange={handleChange3}
                        />
                      </div>

                      <div className="flex flex-row space-x-4">
                        <input
                          type="text"
                          placeholder="amount (ETH)"
                          className="p-1"
                          name="amount"
                          value={transfer.amount}
                          onChange={handleChange3}
                        />{" "}
                        <p>ETH</p>
                      </div>
                      <div className="flex flex-row space-x-5">
                        {transfer.to_account_name !== "" && isFee ? (
                          <p className="text-red-400 font-bold">
                            You will transfer money to another account service
                            fee 1% Receive:
                            {transfer.amount - transfer.amount * 0.01} ETH
                          </p>
                        ) : (
                          <p className="font-bold">
                            Receive: {transfer.amount} ETH
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          transferMoney(
                            transfer.from_account_name,
                            transfer.to_account_name,
                            transfer.amount
                          )
                        }
                        className="p-1 bg-green-400 text-white rounded-full disabled:bg-gray-400"
                      >
                        {" "}
                        Transfer{" "}
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen3(false);
                        }}
                        className="p-1 bg-red-400 text-white rounded-full"
                      >
                        {" "}
                        Cancel{" "}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
          <div className="flex w-full flex-col">
            <h1 className="mx-10 text-white font-bold">My Account:</h1>
            <div
              className="my-5 container p-2 mx-5  rounded-xl shadow-sm border border-opacity-30 border-r-0 border-b-0 bg-opacity-10 bg-white relative z-2 shadow-blue-100
					overflow-x-auto overflow-y-auto"
            >
              <div className="p-5 flex flex-col w-full justify-center">
                <table className="w-full table-auto text-white">
                  <tbody className="p-1 justify-center">
                    {accounts.length > 0 ? (
                      <div>
                        {accounts.map((account, index) => (
                          <tr
                            key={index}
                            className="flex p-2 bg-none hover:bg-white hover:bg-opacity-5 h-16 space-x-20 align-middle justify-between items-center"
                          >
                            <td className="text-lg">{account.name}</td>
                            <td className="font-bold">
                              {account._balance / 1000000000000000000}&nbsp;ETH
                            </td>
                            <td className="font-bold">
                              {new Date(account.createAt * 1000).toLocaleString(
                                "en-TH"
                              )}
                            </td>
                            <td className="flex flex-row space-x-4">
                              <button
                                onClick={() => {
                                  setDeposit({
                                    ...deposit,
                                    account_name: account.name,
                                  });
                                  setIsOpen(true);
                                }}
                                className="flex flex-row p-1 bg-green-400 rounded-full align-middle w-32 space-x-2 justify-center"
                              >
                                <Image
                                  src="/images/piggy-bank.png"
                                  width={25}
                                  height={25}
                                  alt="Logo"
                                  className="rounded-full bg-white"
                                />
                                <p className="font-bold">Deposit</p>
                              </button>
                              <button
                                onClick={() => {
                                  setWithdraw({
                                    ...withdraw,
                                    account_name: account.name,
                                  });
                                  setIsOpen2(true);
                                }}
                                className="flex flex-row p-1 bg-red-400 rounded-full align-middle w-32 space-x-2 justify-center"
                              >
                                <Image
                                  src="/images/withdraw.png"
                                  width={25}
                                  height={25}
                                  alt="Logo"
                                  className="rounded-full bg-white"
                                />

                                <p className="font-bold">Withdraw</p>
                              </button>
                              <button
                                onClick={() => {
                                  setTransfer({
                                    ...transfer,
                                    from_account_name: account.name,
                                  });
                                  setIsOpen3(true);
                                }}
                                className="flex flex-row p-1 bg-amber-400 rounded-full align-middle w-36 space-x-2 justify-center"
                              >
                                <Image
                                  src="/images/data-transfer.png"
                                  width={25}
                                  height={25}
                                  alt="Logo"
                                  className="rounded-full bg-white"
                                />
                                <p className="font-bold">Transfer</p>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center">
                        No Accounts create accout fist!{" "}
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-5 container p-2 mx-5  rounded-xl shadow-sm border border-opacity-30 border-r-0 border-b-0 bg-opacity-10 bg-white relative z-2 shadow-blue-100">
              <div className="flex flex-col space-y-6 justify-center items-center">
                <div className="flex w-full h-32 border-4 border-white border-dashed justify-center">
                  <div className="align-middle p-10">
                    <Link href="/createaccount">
                      <p className="text-xl items-center text-white font-medium hover:text-pink-400">
                        + Create Your Bank account
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default MyAccount;

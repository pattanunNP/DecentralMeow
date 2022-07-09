import { getContract } from "@components/contract/contract";
import { Navbar } from "@components/navbar";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MyAccount: NextPage = () => {
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    const accounts = [];
    const myContract = await getContract();

    const response = await myContract.methods.getUserAccounts().call();
    console.log(response);
    if (response.length > 0) {
      for (const account of response) {
        const response = await myContract.methods
          .getAccountInfo(account)
          .call();
        console.log(response);
        accounts.push({ ...response, account });
      }
    }

    setAccounts(accounts);
  };
  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <div className="bg-gradient-to-r from-violet-dark  to-violet-light h-screen">
        <Navbar />

        <section id="create_accout" className="mx-5 p-2 flex z-0 ">
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
                              {account._balance}&nbsp;ETH
                            </td>
                            <td className="font-bold">
                              {new Date(account.createAt * 1000).toLocaleString(
                                "en-TH"
                              )}
                            </td>
                            <td className="flex flex-row space-x-4">
                              <button className="flex flex-row p-1 bg-green-400 rounded-full align-middle w-32 space-x-2 justify-center">
                                <Image
                                  src="/images/piggy-bank.png"
                                  width={25}
                                  height={25}
                                  alt="Logo"
                                  className="rounded-full bg-white"
                                />
                                <p className="font-bold">Deposit</p>
                              </button>
                              <button className="flex flex-row p-1 bg-red-400 rounded-full align-middle w-32 space-x-2 justify-center">
                                <Image
                                  src="/images/withdraw.png"
                                  width={25}
                                  height={25}
                                  alt="Logo"
                                  className="rounded-full bg-white"
                                />

                                <p className="font-bold">Withdraw</p>
                              </button>
                              <button className="flex flex-row p-1 bg-amber-400 rounded-full align-middle w-36 space-x-2 justify-center">
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
                      <div className="text-center">No Accounts</div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-5 container p-2 mx-5  rounded-xl shadow-sm border border-opacity-30 border-r-0 border-b-0 bg-opacity-10 bg-white relative z-2 shadow-blue-100">
              <div className="flex flex-col space-y-6 justify-center items-center">
                <div className="flex w-full h-32 border-4 border-white border-dashed justify-center">
                  <div className="align-middle p-10">
                    <Link
                      href="/createaccount"
                      className="text-xl items-center text-white font-medium hover:text-pink-400"
                    >
                      + Create Your Bank account
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

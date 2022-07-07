import { Navbar } from "@components/navbar";
import type { NextPage } from "next";

const MyAccount: NextPage = () => {
  const accounts = [
    {
      name: "test_1",
      balance: 0,
      symbol: "ETH",
    },
    {
      name: "test_2",
      balance: 0,
      symbol: "ETH",
    },
  ];
  return (
    <div className="w-screen min-h-screen">
      <div className="bg-gradient-to-r from-violet-dark  to-violet-light h-screen">
        <Navbar />

        <section id="create_accout" className="mx-5 p-2 flex z-0">
          <div className="flex w-full flex-col">
            <h1 className="mx-10 text-white font-bold">My Account:</h1>
            <div
              className="my-5 container p-2 mx-5  rounded-xl shadow-sm border border-opacity-30 border-r-0 border-b-0 bg-opacity-10 bg-white relative z-2 shadow-blue-100
					overflow-x-auto"
            >
              <div className="p-5 flex flex-col w-full justify-center">
                <table className="w-full table-auto text-white">
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody className="p-1 justify-center">
                    {accounts.map((account, index) => (
                      <tr
                        key={index}
                        className="p-2 bg-none hover:bg-white hover:bg-opacity-5 h-16 space-x-10 align-middle justify-center"
                      >
                        <td className="text-lg">{MyAccount.name}</td>
                        <td className="font-bold">
                          {account.balance}&nbsp;{account.symbol}
                        </td>
                        <td className="flex flex-row space-x-4">
                          <button className="flex flex-row p-1 bg-green-400 rounded-full align-middle w-32 space-x-2 justify-center">
                            <img
                              alt="deposit"
                              src="images/piggy-bank.png"
                              className="w-6 bg-white p-1 rounded-full"
                            />
                            <p className="font-bold">Deposit</p>
                          </button>
                          <button className="flex flex-row p-1 bg-red-400 rounded-full align-middle w-32 space-x-2 justify-center">
                            <img
                              alt="deposit"
                              src="images/withdraw.png"
                              className="w-6 bg-white p-1 rounded-full"
                            />
                            <p className="font-bold">Withdraw</p>
                          </button>
                          <button className="flex flex-row p-1 bg-amber-400 rounded-full align-middle w-36 space-x-2 justify-center">
                            <img
                              alt="deposit"
                              src="images/data-transfer.png"
                              className="w-6 bg-white p-1 rounded-full"
                            />
                            <p className="font-bold">Transfer</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-5 container p-2 mx-5  rounded-xl shadow-sm border border-opacity-30 border-r-0 border-b-0 bg-opacity-10 bg-white relative z-2 shadow-blue-100">
              <div className="flex flex-col space-y-6 justify-center items-center">
                <div className="flex w-full h-32 border-4 border-white border-dashed justify-center">
                  <div className="align-middle p-10">
                    <a
                      href="/createaccount"
                      className="text-xl items-center text-white font-medium hover:text-pink-400"
                    >
                      + Create Your Bank account
                    </a>
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

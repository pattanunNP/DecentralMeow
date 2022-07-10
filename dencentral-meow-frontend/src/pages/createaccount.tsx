import { Navbar } from "@components/navbar";
import type { NextPage } from "next";
import { getContract } from "@components/contract/contract";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { AiFillCheckCircle } from "react-icons/ai";
import toast from "react-hot-toast";
const CreateAcount: NextPage = () => {
  const [account_name, setAccount_name] = useState("");
  const [isExist, setIsExist] = useState(false);

  const checkNameExist = async (name: string) => {
    try {
      const myContract = await getContract();

      const response = await myContract.methods.checkExistAccount(name).call();

      setIsExist(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const createAccount = async (name: string) => {
    try {
      if ((window as any).ethereum) {
        const { selectedAddress } = (window as any).ethereum;
        const overrides = {
          from: selectedAddress,
        };
        const myContract = await getContract();

        await myContract.methods
          .createAccount(name)
          .send(overrides)
          .then((res:any) => {
            console.log(res);

            toast.success("Successfully created account");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    setAccount_name(e.target.value);
  };

  useEffect(() => {
    if (account_name) {
      checkNameExist(account_name);
    }
  }, [account_name]);

  return (
    <div className="w-screen min-h-screen">
      <div className="bg-gradient-to-r from-violet-dark  to-violet-light h-screen w-screen">
        <Navbar />

        <section id="create_accout" className="mx-10 p-2 flex z-0">
          <div className="flex w-full flex-col">
            <h1 className="mx-10 text-white font-bold">Create Your Account:</h1>

            <div className="my-5 container p-2 mx-5 h-48 rounded-xl shadow-sm border border-opacity-30 border-r-0 border-b-0 bg-opacity-10 bg-white relative z-2 shadow-blue-100">
              <div className="flex flex-col space-y-6 justify-center items-center ">
                <div className="flex flex-row space-x-5">
                  <h1 className="text-zinc-50 text-lg font-semibold">
                    Account Name:
                  </h1>
                  <input
                    type="text"
                    placeholder="account name:"
                    className="flex p-1 w-auto rounded-md"
                    name="account_name"
                    id="account_name"
                    value={account_name}
                    onChange={handleChange}
                  />
                  {account_name !== "" && !isExist ? (
                    <AiFillCheckCircle size={25} className="text-green-400" />
                  ) : (
                    <ImCross size={25} className="text-red-400" />
                  )}
                </div>

                <div className="flex flex-row">
                  <button
                    disabled={account_name === "" || isExist}
                    onClick={() => createAccount(account_name)}
                    className="bg-pink-400 text-white p-1.5 rounded-full disabled:bg-slate-500"
                  >
                    {" "}
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateAcount;

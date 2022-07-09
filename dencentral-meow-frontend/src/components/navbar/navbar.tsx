import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const Navigation: FC = () => {
  const [web3Library, setWeb3Library] = useState();
  const [web3Account, setWeb3Account] = useState();

  async function connect() {
    console.log("connecting");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account);
      setWeb3Account(account);

      console.log("library");

      // toast.success("Successfully connected to Metamask");
    } catch (ex) {
      console.log(ex);
      toast.error("Failed to connect to Metamask");
    }
  }
  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <div className="z-10 flex h-12 w-full bg-violet-dark sha">
        <div className="flex w-full items-center  justify-between">
          <Link href="/" passHref>
            <div className="mx-10 font-Kanit text-xl font-bold text-brown-500">
              <Image
                src="/images/pawprint-2.png"
                width={35}
                height={35}
                alt="Logo"
                className="rounded-full"
              />
            </div>
          </Link>
          <Toaster />
          <h1 className="hidden font-Kanit text-xl font-bold text-white md:block">
            Decentral Meow
          </h1>
          <Link href="/myaccount" passHref>
            <h1 className="font-Kanit font-bold text-gray-200 hover:text-white">
              My Account
            </h1>
          </Link>

          <div className="mx-10 flex w-auto hover:bg-white flex-row items-center space-x-4 rounded-full border-2 py-1 px-1 font-Kanit">
            <button
              onClick={connect}
              className="flex justify-start w-auto items-center text-white hover:text-violet-dark truncate ..."
            >
              {web3Account ? (
                <p className="text-sm">Connected to {web3Account}</p>
              ) : (
                <p className="text-sm">Connect Wallet</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

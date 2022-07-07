import { FC } from "react";

const Navbar: FC = () => {
  

  return (
    <section className="py-4  bg-violet-800 z-20">
      <div className="max-w-screen-xl mx-auto ">
        <div className="flex flex-row j space-x-24 px-5">
          <div className="flex flex-col px-10 ">
            <a className="flex flex-row space-x-2" href="/">
              <img alt="logo" className="w-8" src="images/pawprint-2.png" />
              <h1 className=" text-xl font-bold text-white">Decentral Meow</h1>
              <h1 className="text-white font-bold">X</h1>
              <img
                alt="logo"
                className="w-16 bg-white"
                src="images/scb10x.png"
              />
            </a>
          </div>
          <div className="flex flex-col">
            <a
              href="/myaccount"
              className="p-1 text-lg text-white hover:text-zinc-50 font-Kanit"
            >
              My Accounts
            </a>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Navbar;

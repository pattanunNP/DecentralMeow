import { Navbar } from "@components/navbar";
import type { NextPage } from "next";
import Card from "@components/card";

const CreateAcount: NextPage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="bg-gradient-to-r from-violet-dark  to-violet-light h-screen">
        <Navbar />

        <section id="create_accout" className="mx-10 p-2 flex z-0">
          <div className="flex w-full flex-col">
            <h1 className="mx-10 text-white font-bold">Create Your Account:</h1>
            <Card>
              <div className="my-5 container p-2 mx-5 h-48 rounded-xl shadow-sm border border-opacity-30 border-r-0 border-b-0 bg-opacity-10 bg-white relative z-2 shadow-blue-100">
                <div className="flex flex-col space-y-6 justify-center items-center ">
                  <div className="flex flex-row space-x-5">
                    <h1 className="flex text-zinc-50 text-xl font-semibold">
                      Account Name:
                    </h1>
                    <input
                      type="flex text"
                      placeholder="account name:"
                      className="p-1 w-64 rounded-md"
                    />
                  </div>
                  <div className="flex flex-row">
                    <button className="bg-pink-400 text-white p-1.5 rounded-full">
                      {" "}
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreateAcount;

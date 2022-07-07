import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="w-full min-h-screen">
          <div className="bg-gradient-to-r from-violet-dark via-purple-500 to-violet-light h-screen">
            <section className="py-4  bg-white bg-opacity-10 shadow-md z-20 border-white border-2 border-t-0 border-x-0 border-opacity-20">
              <div className="max-w-screen-xl mx-auto ">
                <div className="flex flex-row justify-between space-x-24 px-5">
                  <div className="flex flex-col px-10 ">
                    <a className="flex flex-row space-x-2" href="/">
                      <img alt="logo" className="w-8" src="images/pawprint-2.png" />
                      <h1 className=" text-xl font-bold text-white">
                        Decentral Meow
                      </h1>
                      <h1 className="text-white font-bold">X</h1>
                      <img
                        alt="logo"
                        className="w-16 bg-white"
                        src="images/scb10x.png"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section id="hero" className="mx-10 my-20 p-2 flex z-0 ">
              <div className="flex flex-row space-x-10">
                <img
                  className="h-96"
                  alt="server"
                  src="images/server-room-rack-blockcha.png"
                />
                <div className="flex flex-col space-x-1 space-y-4">
                  <h1 className="text-3xl text-white font-bold">
                    Welcome to Decentral Meow
                  </h1>
                  <h3 className="text-lg text-violet-300">
                    The next generatation of DBanking and safe for cats.
                  </h3>
                  <h2 className="text-xl text-white font-semibold">
                    Fully Decentralized | Secure | Privacy
                  </h2>
                  <a
                    href="/myaccount"
                    className="text-pink-500 p-1 bg-white rounded-full w-32 font-semibold items-center align-middle
                         justify-center text-center
                        hover:bg-pink-300 hover:text-white"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

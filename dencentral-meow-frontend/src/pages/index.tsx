import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SaltDiaryDashboard</title>
        <meta name="description" content="SaltDiaryDashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex h-screen w-screen ">
        <div className="flex h-screen w-screen flex-col">
          <div className="z-20 flex h-12 w-screen align-middle shadow-sm shadow-gray-200 ">
            <div className="mx-5 my-2 flex flex-row space-x-4">
              <Link href="/" passHref>
                <div className="ml-10  ">
                  <Image
                    src="/images/pawprint-2.png"
                    width={35}
                    height={35}
                    alt="Logo"
                  />{" "}
                </div>
              </Link>
              <h1 className="flex font-Kanit text-xl font-bold text-lightgreen ">
                Decentral Meow
              </h1>
            </div>
          </div>

          <div className="flex h-screen w-screen justify-center bg-v">
            <div className="relative z-10 w-full max-w-lg">
              <div className="animation-blob animation-delay-4000 absolute top-20 -left-10 h-72 w-72 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter "></div>
              <div className="animation-blob top-15 absolute left-10 h-64 w-64 rounded-full bg-blue-400 opacity-70 mix-blend-multiply blur-xl filter"></div>
              <div className="animation-blob buttom-30 animation-delay-2000 absolute left-40 h-64 w-64 rounded-full bg-amber-200 opacity-70 mix-blend-multiply blur-xl filter"></div>
            </div>
            <div className="z-20 flex flex-col justify-center ">
              <div className="mt-10 flex text-center">
                <h1 className="flex font-Kanit  text-4xl font-bold text-gray-700">
                  WELCOME <br></br>TO <br></br> Decentral Meow
                </h1>
              </div>
              <div className=" my-10 flex justify-center">
                <Link href="/myaccount" passHref>
                  <button className="rounded-full bg-gradient-to-r from-lightgreen to-lightblue px-5 py-2 font-Kanit text-xl text-violet-dark hover:ring-2 hover:ring-emerald-300">
                    Launch App
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative top-0 z-10 w-full max-w-lg">
              <div className="animation-blob animation-delay-4000 absolute top-20 -left-10 h-72 w-72 rounded-full bg-amber-100 opacity-70 mix-blend-multiply blur-xl filter "></div>
              <div className="animation-blob top-25 absolute left-10 h-64 w-64 rounded-full bg-blue-400 opacity-70 mix-blend-multiply blur-xl filter"></div>
              <div className="animation-blob animation-delay-2000 left-50 absolute top-20 h-64 w-64 rounded-full bg-green-400 opacity-70 mix-blend-multiply blur-xl filter"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

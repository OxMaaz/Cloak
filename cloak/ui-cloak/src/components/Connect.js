import React, { useState } from "react";
import { useContext } from "react";
import { CloakContext } from "./Wrapper";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { IoMdHome, IoMdRefresh } from "react-icons/io";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { AiFillFilePdf, AiOutlineCopy } from "react-icons/ai";
import { MdArrowDropDown, MdArrowDropUp, MdOutlineDone } from "react-icons/md";

const Connect = () => {
  const navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  const { connectwallet } = useContext(CloakContext);

  // temp

  const [show, setshow] = useState(false);
  const [isAddrHovered, setIsAddrHovered] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  console.log("connect : ", connectwallet.userBalance);

  const changeChains = async (c) => {
    setshow(!show);
    sessionStorage.setItem("chain", c.name);
    await connectwallet.handleChainChange(c.chainId);
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(
      sessionStorage.getItem("address") || ""
    );
    setAddressCopied(true);
  };

  console.log(addressCopied);

  // Function to handle hover
  const handleMouseEnter = () => {
    setIsAddrHovered(true);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setIsAddrHovered(false);
    setAddressCopied(false);
  };

  return (
    <div className="mx-auto pb-12 pt-4 sm:pt-8">
      <div className="flex justify-between px-4 sm:px-7">
        {/* leftside logo */}
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/")}
        >
          <div className="logo-div flex items-center">
            <img src={logo} alt="" className="logo h-[51px] w-[56px]" />
            <h1 className="montserrat-subheading cursor-pointer text-xl text-[#8098a7] transition-colors ease-linear hover:text-gray-500">
              Cloak
            </h1>
          </div>

          <div className="flex items-center space-x-8">
            <div
              onClick={navigate("/")}
              className="montserrat-subtitle decoration-bgGray ml-9 flex flex-col items-center
              space-x-1 text-[0.8rem] font-bold text-gray-600  underline-offset-8 
               transition-all ease-linear hover:underline sm:ml-14 sm:text-[1.1rem]  md:flex-row md:items-end"
            >
              <IoMdHome size={28} className="text-gray-400 md:self-start " />
              <p className="text-gray-800 sm:inline-block">Home</p>
            </div>
            {/* <div
              onClick={navigate("/")}
              className="montserrat-subtitle ml-6 flex items-center space-x-1 text-[1rem] font-bold text-[#8098a7] decoration-[#FF5757]  underline-offset-8 transition-all ease-linear  hover:font-bold hover:text-gray-800 hover:underline sm:ml-14  sm:text-[1rem]"
            >
              <HiQuestionMarkCircle
                size={28}
                className="self-start text-gray-400 "
              />
              <p className="hidden sm:inline-block">QnA</p>
            </div> */}
            <div
              onClick={() => navigate("/")}
              className="montserrat-subtitle decoration-bgGray ml-2 flex flex-col items-center space-x-1 
               text-[0.8rem]   font-bold
                text-gray-600 underline-offset-8
                 hover:underline sm:ml-14 sm:text-[1.1rem] 
                 md:flex-row md:items-end"
            >
              <AiFillFilePdf
                size={23}
                className="text-gray-400 md:self-start   "
              />
              <p className="hidden text-gray-800 sm:inline-flex ">Read</p>
            </div>
          </div>
        </div>

        {/* rigt side */}
        <div className="flex flex-row items-center space-x-3">
          <div className="hidden items-center space-x-3 lg:flex">
            <p className="text-gray-400 hover:text-gray-600">
              <a href="https://discord.gg/dqCdk5JJ">
                <FaDiscord size={20} />
              </a>
            </p>
            <p className="text-gray-400 hover:text-gray-600">
              <a href="https://github.com/ScriptKiddii/Cloak">
                <FaGithub size={20} />
              </a>
            </p>
            <p className="text-gray-400 hover:text-gray-600">
              <a href="https://twitter.com/TronCloak">
                <FaTwitter size={20} />
              </a>
            </p>
            {sessionStorage.getItem("address") !== null && (
              <div
                className=" montserrat-subtitle border-1 hover:border-highlight rounded-full border border-gray-500
               px-2 text-[0.9rem] font-extrabold text-[#e9edf1] sm:px-4 sm:text-[1rem]"
              >
                <ul className="" onClick={() => setshow(!show)}>
                  <li
                    className="flex w-full cursor-pointer items-center gap-2 rounded-md p-1
                  px-2 text-black sm:px-4 "
                  >
                    {sessionStorage.getItem("chain")}
                    {!show ? (
                      <MdArrowDropDown className="text-[1.4rem]" />
                    ) : (
                      <MdArrowDropUp className="text-[1.4rem]" />
                    )}
                  </li>
                  <div
                    className={`
              ${
                show &&
                `bg-bgGray absolute z-10 ml-1  mt-1 flex flex-col
                 rounded-b-md border-none py-2 text-black shadow-md transition-all ease-in `
              }
            `}
                  >
                    {show &&
                      connectwallet.chainOptions.map((chain) => (
                        <div className=" hover:bg-slate-500">
                          <li
                            className="montserrat-small flex cursor-pointer flex-row-reverse items-center
                           justify-between
                    gap-2 p-1 px-4
                     text-[0.9rem] font-semibold 
                    hover:text-white"
                            key={chain.name}
                            onClick={() => changeChains(chain)}
                          >
                            <img
                              src={chain.symbol}
                              alt=""
                              className="rounded-full object-fill"
                              height={12}
                              width={18}
                            />
                            {chain.name}
                          </li>
                        </div>
                      ))}
                  </div>
                </ul>
              </div>
            )}
          </div>
          {/* Address Bar */}
          <div
            // onClick={copyAddress}
            className="relative flex items-center space-x-1 transition-all ease-in-out"
          >
            <div
              className="flex flex-col-reverse items-end 
            space-x-3 sm:flex-row sm:items-center"
            >
              <p
                // onClick={copyAddress}
                className={`montserrat-small text-[0.8rem] font-semibold text-cyan-500  sm:text-[1rem] md:text-[0.9rem]`}
              >
                {sessionStorage.getItem("address") !== null || false
                  ? connectwallet.userBalance
                  : ""}
              </p>
              <p
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={copyAddress}
                className={`montserrat-small cursor-pointer text-[1rem] font-semibold text-gray-600 sm:text-[1.3rem] md:text-[1rem]`}
              >
                {sessionStorage.getItem("address") !== null || false
                  ? `${sessionStorage
                      .getItem("address")
                      ?.slice(0, 9)}...${sessionStorage
                      .getItem("address")
                      ?.slice(-5)}`
                  : ""}
              </p>
            </div>
            {addressCopied ? (
              <MdOutlineDone
                className={` "text-gray-600 text-[1.1rem] font-bold text-gray-300 `}
              />
            ) : (
              <AiOutlineCopy
                className={`${
                  isAddrHovered ? "inline-flex" : "hidden"
                } "text-gray-600 text-[1.1rem] font-bold text-gray-300 `}
              />
            )}
          </div>
          {sessionStorage.getItem("address") === null || false ? (
            <button
              onClick={connectwallet.connectWallet}
              className="montserrat-subtitle border-1 montserrat-subtitle highlight hover:border-highlight hover:text-highlight mx-auto my-2 mb-4 flex  w-[100%]  
          justify-center space-x-1 rounded-md border border-black px-3 py-1 
          text-center font-bold text-black transition-all  ease-linear hover:shadow-xl"
            >
              {" "}
              connect wallet
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;

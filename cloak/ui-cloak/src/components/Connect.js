import React from "react";
import { useContext } from "react";
import { CloakContext } from "./Wrapper";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { IoMdHome, IoMdRefresh } from "react-icons/io";
import { HiQuestionMarkCircle } from "react-icons/hi";

const Connect = () => {


  const navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  const data = useContext(CloakContext);

  return (
    <div className="mx-auto max-w-[1300px] pb-12 pt-4 sm:pt-8 ">
      <div className="flex justify-between px-4 sm:px-7">
        {/* leftside logo */}
        <div
          className="flex cursor-pointer items-center"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center space-x-1">
            <img src={logo} alt="" className="h-[52px] w-[55px]" />
            <h1 className="montserrat-subheading cursor-pointer text-xl text-[#8098a7] transition-colors ease-linear hover:text-gray-500">
              Cloak
            </h1>
          </div>

          <div className="hidden items-center space-x-4 sm:flex">
            <div
              onClick={navigate("/")}
              className="montserrat-subtitle ml-6 flex items-center space-x-1 text-[1rem] font-bold text-[#8098a7] decoration-[#FF5757]  underline-offset-8 transition-all ease-linear  hover:font-bold hover:text-gray-800 hover:underline sm:ml-14  sm:text-[1rem]"
            >
              <IoMdHome size={28} className="self-start text-gray-400 " />
              <p className="hidden sm:inline-block">Home</p>
            </div>
            <div
              onClick={navigate("/")}
              className="montserrat-subtitle ml-6 flex items-center space-x-1 text-[1rem] font-bold text-[#8098a7] decoration-[#FF5757]  underline-offset-8 transition-all ease-linear  hover:font-bold hover:text-gray-800 hover:underline sm:ml-14  sm:text-[1rem]"
            >
              <HiQuestionMarkCircle
                size={28}
                className="self-start text-gray-400 "
              />
              <p className="hidden sm:inline-block">QnA</p>
            </div>
          </div>
        </div>

        {/* rigt side */}
        <div className="flex flex-row items-center space-x-3">
          <div className="hidden items-center space-x-3 md:flex">
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
          </div>
          <p className="montserrat-small relative left-2 text-[0.7rem] font-semibold text-gray-500 sm:left-0 sm:text-[1rem]">
            {sessionStorage.getItem("address") === false || sessionStorage.getItem("address") === null
              ? ""
              : `${sessionStorage.getItem("address").slice(0, 17)}...`}
          </p>
          <button
            onClick={data.connectwallet}
            className="montserrat-subtitle border-1 rounded-md border-white bg-[#f3eded]
                     p-1 px-2
                     text-[0.8rem] font-extrabold text-[#FF5757] shadow-md shadow-gray-100 hover:bg-[#FF5757] hover:text-[white] hover:shadow-lg  sm:px-4 sm:text-[1rem] "
          >
            {(sessionStorage.getItem("address") === null || sessionStorage.getItem("address") === false) ? "connect wallet": "Connected"}
          </button>
          <IoMdRefresh
            size={25}
            className="cursor-pointer text-gray-400 "
            onClick={refresh}
          />
        </div>
      </div>
    </div>
  );
};

export default Connect;

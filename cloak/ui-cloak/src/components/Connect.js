import React from "react";
import { useContext } from "react";
import { CloakContext } from "./Cloak";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { HiQuestionMarkCircle } from "react-icons/hi";



const Connect= () => {

    const navigate = useNavigate();

    const data = useContext(CloakContext);

    return (
        <div className="max-w-[1190px] mx-auto pt-4 sm:pt-8 pb-12 ">
        <div className="sm:px-7 px-4 flex justify-between">
          {/* leftside logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex space-x-1 items-center">
              <img src={logo} alt="" className="w-[55px] h-[52px]" />
              <h1 className="montserrat-subheading text-xl cursor-pointer text-[#8098a7]">
             Cloak 
              </h1>
            </div>
  
            <div className="flex items-center space-x-4">
              <div
                onClick={navigate("/")}
                className="flex items-end space-x-1 sm:ml-14 ml-6 hover:text-gray-800 text-[#58707e]  montserrat-subtitle underline-offset-8 font-bold hover:underline decoration-[#FF5757]  sm:text-[1rem] text-[0.9rem]"
              >
                <IoMdHome
                  size={28}
                  className="self-start text-gray-400 "
                />
                <p>Home</p>
              </div>
              <div
                onClick={navigate("/")}
                className="flex items-end space-x-1 sm:ml-14 ml-6 hover:text-gray-800 text-[#58707e]  montserrat-subtitle underline-offset-8 font-bold hover:underline decoration-[#FF5757]  sm:text-[1rem] text-[0.9rem]"
              >
                <HiQuestionMarkCircle
                  size={28}
                  className="self-start text-gray-400 "
                />
                <p>QnA</p>
              </div>
            </div>
          </div>

                {/* rigt side */}
                <div className="sm:flex-row flex-co flex space-x-3 items-center">
                    <p className='text-gray-400'><a href="/https://discord.gg/qupF3BrP"><FaDiscord size={20} /></a></p>
                    <p className='text-gray-400'><a href="https://github.com/ScriptKiddii/Cloak"><FaGithub size={20} /></a></p>
                    <p className='text-gray-400'><a href="https://twitter.com/TronCloak"><FaTwitter size={20} /></a></p>
                    <p className="sm:text-[1rem] montserrat-small  text-gray-500  font-semibold text-[0.8rem]">{sessionStorage.getItem('address') === null || false  ? '' : `${sessionStorage.getItem('address').slice(0, 17)}...`}</p>
                    <button onClick={data.connectwallet} 
                        className="montserrat-subtitle border-1 p-1 sm:text-[1rem] text-[0.8rem]
                     text-[#FF5757] bg-[#FDF0EF]
                     shadow-md hover:shadow-lg px-2 sm:px-4 rounded-md hover:bg-[#FF5757] hover:text-[white]  font-extrabold border-white ">
                           {(sessionStorage.getItem('address') !== null || false)   ? 'Connected' : 'Connect wallet'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Connect
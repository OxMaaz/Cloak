import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/IntroLogo.png";
import { Link } from "react-scroll";
import { HiSun } from "react-icons/hi";
import { HiOutlineMoon } from "react-icons/hi";
import { HiMoon } from "react-icons/hi";
import { BiSun } from "react-icons/bi";

const Header = () => {
  const Valid = () => {
    // if(!window.tronWeb){
    //   alert('Please Install Tron Wallet')
    //   return
    // }
    navigate("/cloak");
  };

  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  const navigate = useNavigate();
  return (
    <div className="p-4 bg-[#FF5757] px-7">
      <div className="pb-3 border-b dark:border-gray-800 border-[#FDF0EF] border-b-1 px-5 flex justify-between items-center">
        {/* logo on the left side */}
        <div className="flex items-center">
          <img className="sm:w-20 w-16 font-bold" src={logo} alt="" />
          <h1 className="montserrat-subtitle sm:text-[1.5rem] font-semibold text-[1.2rem] text-[#FDF0EF]">
            Cloak
          </h1>
        </div>
        {/* "how it works" on the right side*/}
        <div className="flex space-x-4 items-center">
          <Link to="faq" spy={true} smooth={true} offset={50}>
            <h4
              className="montserrat-subtitle cursor-pointer sm:text-[1.2rem] font-semibold  hover:font-bold hover:text-white text-[#FDF0EF] "
              onClick={() => navigate("/")}
            >
              FAQ?
            </h4>
          </Link>

          {/* theme button */}
          <div
            onClick={() => setDarkTheme(!darkTheme)}
            className="cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500 bg-[#FF5757] hover:bg-[#fc9393] 
            p-2 rounded-full border dark:border-gray-300 border-gray-200"
          >
            <button className="transition-all theme-btn text-gray-200">
              {darkTheme ? (
                <>
                  <BiSun size={30} className="text-gray-200 light hidden" />
                  <HiSun size={30} className="dark hidden" />
                </>
              ) : (
                <>
                  <HiOutlineMoon size={30} className="light hidden" />
                  <HiMoon size={30} className="dark hidden" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* at the bottom of the logo */}
      <div className="sm:p-16 p-10 flex flex-col items-start space-y-4">
        <h2 className="montserrat-subtitle font-bold sm:text-[1.9rem] text-[1.7rem] text-[#FDF0EF]">
          Stay Anonymous & secure.
        </h2>
        <p className="montserrat-small text-[#FDF0EF] text-left break-words  max-w-[400px]">
          Exchange TRX and tokens with utmost privacy, your address remains a
          secret!.
        </p>
        <div className="pt-1">
          <button
            className="border-1 montserrat-subheading  hover:text-white hover:bg-[#FF5757] hover:shadow-xl p-2 px-4 rounded-full bg-[#FDF0EF] text-[#FF5757] font-semibold hover:border-white border-red-500 border text-lg"
            onClick={Valid}
          >
            Launch app
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

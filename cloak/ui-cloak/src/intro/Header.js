import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/IntroLogo.png";
import { Link } from "react-scroll";

const Header = () => {
  const Valid = () => {
    // if(!window.tronWeb){
    //   alert('Please Install Tron Wallet')
    //   return
    // }
    navigate("/cloak");
  };

  const navigate = useNavigate();
  return (
    <div className="bg-[#FF5757] p-4 px-7">
      <div className="border-b-1 flex items-center justify-between border-b border-[#FDF0EF] px-5 pb-3">
        {/* logo on the left side */}
        <div className="flex items-center">
          <img className="w-16 font-bold sm:w-20" src={logo} alt="" />
          <h1 className="montserrat-subtitle text-[1.2rem] font-semibold text-[#FDF0EF] sm:text-[1.5rem]">
            Cloak
          </h1>
        </div>
        {/* "how it works" on the right side*/}
        <Link to="faq" spy={true} smooth={true} offset={50}>
          <h4
            className="montserrat-subtitle cursor-pointer font-semibold text-[#FDF0EF]  hover:font-bold hover:text-white sm:text-[1.2rem] "
            onClick={() => navigate("/")}
          >
            FAQ?
          </h4>
        </Link>
      </div>
      {/* at the bottom of the logo */}
      <div className="flex flex-col items-start space-y-4 p-10 sm:p-16">
        <h2 className="montserrat-subtitle text-[1.7rem] font-bold text-[#FDF0EF] sm:text-[1.9rem]">
          Stay Anonymous & secure.
        </h2>
        <p className="montserrat-small max-w-[400px] break-words text-left  text-[#FDF0EF]">
          Exchange TRX and tokens with utmost privacy, your address remains a
          secret!.
        </p>
        <div className="pt-1">
          <button
            className="border-1 montserrat-subheading  rounded-full border border-red-500 bg-[#FDF0EF] p-2 px-4 text-lg font-semibold text-[#FF5757] hover:border-white hover:bg-[#FF5757] hover:text-white hover:shadow-xl"
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

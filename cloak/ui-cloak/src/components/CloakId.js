import { Crc } from "../helpers/Crc";
import base58 from "bs58";
import React from "react";
import { useState, useEffect } from "react";
import EllipticCurve from "elliptic";
import { AiOutlineCopy } from "react-icons/ai";
import { downloadFile } from "../helpers/DownloadFile";
import ToolTip from "../helpers/ToopTip";
import { FaFileSignature } from "react-icons/fa";
const ec = new EllipticCurve.ec("secp256k1");
// import bg from '../assets/bg.png';

const CloakId = () => {
  const [cloakid, setcloakid] = useState("");
  const [note, setnote] = useState(false);
  let key;

  const generateCloakId = () => {
    try {
      key = ec.genKeyPair();

      sessionStorage.setItem("DRM key", key.getPrivate().toString(16));
      const spendingkey = ec.keyFromPrivate(
        key.getPrivate().toString(16),
        "hex"
      );

      const data = Uint8Array.from(
        spendingkey.getPublic().encodeCompressed("array")
      );

      const crc = Crc(data);
      const addr = new Uint8Array(data.length + 2);
      addr.set(data);
      addr.set(crc, data.length);
      const id = "T" + base58.encode(addr);
      sessionStorage.setItem("cloak address", id);
      setcloakid(id);
    } catch (e) {
      // console.error(e);

    }
  };

  const revealnot = () => {
    setnote(true);
    setTimeout(() => {
      setnote(false);
    }, 7000);
  };

  const oncopy = () => {
    navigator.clipboard.writeText(cloakid);

    // notyf.success("Copied");

    revealnot();
  };

  const loadDrmKey=()=>{
    const drmkey = sessionStorage.getItem("DRM key");
    // notyf.success("Copied");
    downloadFile(drmkey, "DRM key.txt");
  }

  useEffect(() => {
    generateCloakId();
  }, []);

  return (
    <>
      <div
        // style={{ backgroundImage: `url(${bg})` }}
        className="border-gray flex flex-col items-center rounded-md rounded-t-md border bg-[#e9e9f3] bg-no-repeat object-scale-down p-8 backdrop-blur-lg"
      >
        <div className="flex w-full flex-col items-center space-y-4 border-black  pb-6">
          <h1
            className="montserrat-heading mx-auto bg-clip-text
             text-3xl font-[1000] text-gray-700 sm:text-[2.0rem]
              xl:text-[2.5rem]"
          >
            {" "}
            Attain funds
            <span
              className="hightlightText
            from-orange-300 bg-gradient-to-r to-orange-600 bg-clip-text 
            text-transparent sm:text-[2.1rem] xl:text-[2.6rem]
            "
            >
              {" "}
              Covertly & Securely
            </span>{" "}
            With Tron Cloak
          </h1>
          <p className="montserrat-small text-[0.8rem] font-semibold text-gray-400 sm:text-[1.1rem]">
            Never reveal the signature. Only Share your forus key to receive
            funds.
          </p>
        </div>
        {/* tronCloak */}

        <div className="flex space-x-4">
          <div
            className="mx-3 my-2 flex items-center rounded-md bg-gray-400 bg-opacity-60 p-2 px-2 shadow-gray-300
           hover:shadow-sm sm:mx-0 sm:gap-4 sm:px-3   "
          >
            <p
              className="montserrat-small text-[0.8rem] font-extrabold text-gray-700 
            sm:text-[1rem] "
            >
              <span className="text-md text-[0.9rem] font-extrabold text-gray-800 sm:text-[1.1rem]">
                #tronCloak - 
              </span>{" "}
              {cloakid}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <ToolTip tooltip="Copy Forus Key">
              <AiOutlineCopy
                className="hover:text-highlight cursor-pointer text-2xl font-bold text-gray-700"
                onClick={oncopy}
              />
            </ToolTip>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="montserrat-subtitle border-1 montserrat-subtitle hover:text-highlight hover:border-highlight highlight my-2 mb-4
         rounded-md border border-black p-1 px-6  
         text-center font-semibold text-black transition-all ease-linear hover:border"
            onClick={generateCloakId}
          >
            Generate Fk
          </button>

          <div
            onClick={loadDrmKey}
            className="montserrat-subtitle montserrat-subtitle bg-highlight my-2 mb-4 flex cursor-pointer 
            space-x-2 rounded-md border  border-black p-1  
           px-6 text-center font-semibold text-black
      
            "
          >
            <FaFileSignature className="text-2xl font-bold text-[181b1f]" />
            <ToolTip tooltip="Save Signature Key">
              <span>Signature</span>
            </ToolTip>
          </div>
        </div>
        {/* <div className="my-3 mt-6 flex items-center gap-4 rounded-md bg-[#fceeee] p-2  px-2">
          <p className="montserrat-heading text-[0.8rem] font-semibold  text-gray-500 sm:text-[1rem]">
            <span className="text-md text-[1rem] font-bold text-[#435864] sm:text-[1.1rem]">
              #tronCloak-
            </span>
            {cloakid}
          </p>
          <AiOutlineCopy
            className="cursor-pointer text-2xl font-bold text-gray-500"
            onClick={oncopy}
          />
        </div>

        <button
          className="montserrat-subtitle border-1 montserrat-subtitle my-3 rounded-md   bg-[#FF5757] p-1 px-6 text-center font-semibold text-white  hover:border-white hover:shadow-lg "
          onClick={generateCloakId}
        >
          Generate
        </button> */}
      </div>
      {/* <div className=" m-auto mb-6 w-[80%] "></div> */}
    </>
  );
};

export default CloakId;

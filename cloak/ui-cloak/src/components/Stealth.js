import { Crc } from "../helpers/Crc";
import base58 from "bs58";
import React from "react";
import { useState, useEffect, useContext } from "react";
import EllipticCurve from "elliptic";
import { AiOutlineCopy } from "react-icons/ai";
import { CloakContext } from "./Cloak";
// import { Tokens } from "../helpers/Token";
const ec = new EllipticCurve.ec("secp256k1");

const Stealth = () => {
  const data = useContext(CloakContext);
  let key;

  const [stealthmeta, setstealthmeta] = useState("");
  const [storedspendingkey, setstoredspendingkey] = useState("");
  const [note, setnote] = useState(false);

  const generatestealthmetaaddress = () => {
    try {
      key = ec.genKeyPair();

      const skey = localStorage.setItem(
        "DontRevealMe",
        key.getPrivate().toString(16)
      );
      const spendingkey = ec.keyFromPrivate(
        key.getPrivate().toString(16),
        "hex"
      );
      setstoredspendingkey(skey);

      const data = Uint8Array.from(
        spendingkey.getPublic().encodeCompressed("array")
      );

      const crc = Crc(data);
      const addr = new Uint8Array(data.length + 2);
      addr.set(data);
      addr.set(crc, data.length);
      const M = "T" + base58.encode(addr);
      localStorage.setItem("meta", M);
      setstealthmeta(M);
    } catch (e) {
      console.error(e);
      data.seterror(e);
    }
  };

  const downloadFile = (text) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "DontRevealMe.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const revealnot = () => {
    setnote(true);
    setTimeout(() => {
      setnote(false);
    }, 5000);
  };

  const oncopy = () => {
    navigator.clipboard.writeText(stealthmeta);
    downloadFile(localStorage.getItem("DontRevealMe"));
    revealnot();
  };

  useEffect(() => {
    generatestealthmetaaddress();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-14 rounded-t-md">
        <div className="pb-6 flex flex-col space-y-4 items-center border-b w-full">
          <h1
            className="bg-blac mx-auto md:w-[45%] montserrat-subtitle
            text-gray-500 dark:text-[#ffeeee] md:text-3xl 
            sm:text-4xl text-3xl  font-bold"
          >
            {" "}
            Unlock
            <span
              className="montserrat-subtitle md:text-3xl 
              sm:text-4xl text-3xl font-extrabold text-gray-500 dark:text-[#ffeeee]"
            >
              {" "}
              the true potential of privacy
            </span>{" "}
            with Cloak Protocol
          </h1>

          {note === true && (
            <p className="montserrat-small text-gray-500 font-semibold font-mono w-[60%]">
              Guard the key, unleash the cloak. Never reveal the 'DontRevealMe
              key' , only share your secure 'Cloak address' for confidential
              transactions.{" "}
            </p>
          )}
        </div>

        <div
          className="my-6 flex gap-4 items-center p-2 px-3 rounded-md  bg-[#fceeee]
         dark:bg-[#454647]"
        >
          <div className="montserrat-small  font-semibold text-gray-500 dark:text-gray-300">
            <span className="text-[#384e5a] dark:text-gray-100 font-bold">
              #tronCloak -{" "}
            </span>
            <p className="sm:text-[1rem] text-[0.8rem]">{stealthmeta}</p>
          </div>
          <AiOutlineCopy
            className="font-bold text-2xl text-gray-500 dark:text-gray-300"
            onClick={oncopy}
          />
        </div>

        <button
          className="montserrat-subtitle border-1 p-1 montserrat-subtitle   text-white bg-[#FF5757] hover:shadow-xl px-6 text-center rounded-md  font-semibold   hover:bg-[#FDF0EF] hover:text-[#FF5757]  hover:border-white border-red-500 border"
          onClick={generatestealthmetaaddress}
        >
          Generate
        </button>
      </div>
    </>
  );
};

export default Stealth;

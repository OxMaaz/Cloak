import { Crc } from "../helpers/Crc";
import base58 from "bs58";
import React from "react";
import { useState, useEffect } from "react";
import EllipticCurve from "elliptic";
import { AiOutlineCopy } from "react-icons/ai";
import { downloadFile } from "../helpers/DownloadFile";
const ec = new EllipticCurve.ec("secp256k1");

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
      console.error(e);

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
    const drmkey = sessionStorage.getItem("DRM key")
    downloadFile(drmkey, "DRM key.txt");
    revealnot();
  };

  useEffect(() => {
    generateCloakId();
  }, []);

  return (
    <>
      <div className="mb-6 flex flex-col items-center rounded-t-md p-6">
        <div className="flex w-full flex-col items-center space-y-4 border-b border-gray-200 pb-6">
          <h2
            className="montserrat-subheading mx-auto w-[100%] text-2xl font-extrabold 
      text-gray-500 md:w-[80%] md:text-3xl "
          >
            {" "}
            Experience ultimate privacy with us responsibly pushing boundaries{" "}
          </h2>

          {note === true && (
            <p className="montserrat-small w-[60%] pt-5   font-mono font-semibold text-gray-500">
              Guard the key, unleash the cloak. Never reveal the 'DRM key', only
              share your secure 'Cloak address' for confidential transactions{" "}
            </p>
          )}
        </div>

        <div className="my-3 mt-6 flex items-center gap-4 rounded-md bg-[#fceeee] p-2  px-2">
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
        </button>
      </div>
      <div className=" m-auto mb-6 w-[80%] "></div>
    </>
  );
};

export default CloakId;

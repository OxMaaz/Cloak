import { Crc } from "../helpers/Crc";
import base58 from "bs58";
import React, { useState, useEffect } from "react";
import EllipticCurve from "elliptic";
import { AiOutlineCopy } from "react-icons/ai";
import { FaFileSignature } from "react-icons/fa";
import { toast } from "react-toastify";
import ToolTip from "../helpers/ToopTip";  // Corrected import
import { downloadFile } from "../helpers/DownloadFile";

const ec = new EllipticCurve.ec("secp256k1");

const CloakId = () => {
  const [cloakid, setCloakId] = useState("");
  const [note, setNote] = useState(false);
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
      setCloakId(id);
    } catch (e) {
      console.error(e);
    }
  };

  const revealNote = () => {  // Corrected function name
    setNote(true);
    setTimeout(() => {
      setNote(false);
    }, 7000);
  };

  const onCopy = () => {  // Corrected function name
    navigator.clipboard.writeText(cloakid);
    toast.success('Copied Successfully');  // Moved toast here for better logic flow
    revealNote();
  };

  const loadDrmKey = () => {
    const drmkey = sessionStorage.getItem("DRM key");
    downloadFile(drmkey, "DRM key.txt");
  };

  useEffect(() => {
    generateCloakId();
  }, []);

  return (
    <>
      <div className="border-gray flex flex-col items-center rounded-md rounded-t-md border bg-[#f7ecec] bg-no-repeat object-scale-down p-8">
        <div className="flex w-full flex-col items-center space-y-4 pb-6">
          <h1 className="montserrat-heading mx-auto bg-clip-text text-3xl font-[1000] text-gray-500 sm:text-[2.0rem] xl:text-[2.5rem]">
            {" "}
            Do Fortify
            <span className="text-[#FF5757] bg-clip-text sm:text-[2.1rem] xl:text-[2.6rem]">
              {" "}
              Your Finances
            </span>{" "}
            , Tron Cloak's Way
          </h1>

          {note === true && (
            <p className="montserrat-small text-[0.8rem] font-semibold text-gray-400 sm:text-[1.1rem]">
              Never reveal the ' DRM key ', only share your secure ' Cloak address ' for confidential transactions !!
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="mx-3 my-2 flex items-center rounded-md bg-[#f5d8d8] bg-opacity-60 p-2 px-2 shadow-gray-300 hover:shadow-sm sm:mx-0 sm:gap-4 sm:px-3">
            <p className="montserrat-heading text-[0.8rem] font-extrabold text-gray-700 sm:text-[1rem] ">
              <span className=" montserrat-heading text-md text-[0.9rem] font-extrabold text-gray-600 sm:text-[1.1rem]">
                #tronCloak -
              </span>{" "}
              {cloakid}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <ToolTip tooltip="Copy cloak Address">
              <AiOutlineCopy className="hover:text-highlight cursor-pointer text-2xl font-bold text-gray-700" onClick={onCopy} />
            </ToolTip>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="montserrat-subtitle border-1 montserrat-subtitle bg-[#FF5757] my-2 mb-4 rounded-md border p-1 px-6 text-center font-semibold text-white transition-all ease-linear hover:border"
            onClick={generateCloakId}
          >
            Generate Fk
          </button>

          <div onClick={loadDrmKey} className="montserrat-subtitle montserrat-subtitle bg-highlight my-2 mb-4 flex cursor-pointer space-x-2 rounded-md border  border-black p-1 px-6 text-center font-semibold text-black">
            <FaFileSignature className="text-2xl font-bold text-[181b1f]" />
            <ToolTip tooltip="Save DRM Key">
              <span>DRM Key</span>
            </ToolTip>
          </div>
        </div>
      </div>
    </>
  );
};

export default CloakId;

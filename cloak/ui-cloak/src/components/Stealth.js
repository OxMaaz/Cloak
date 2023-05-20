import { Crc } from "../helpers/Crc";
import base58 from 'bs58';
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import EllipticCurve from 'elliptic';
import { AiOutlineCopy } from "react-icons/ai";
import { CloakContext } from './Cloak';
const ec = new EllipticCurve.ec('secp256k1');


const Stealth = () => {


  const data = useContext(CloakContext);
  const [stealthmeta, setstealthmeta] = useState('')
  const [note, setnote] = useState(false)
  let key;


  const generatestealthmetaaddress = () => {

    try {

      key = ec.genKeyPair();

      sessionStorage.setItem('DRM key', key.getPrivate().toString(16));
      const spendingkey = ec.keyFromPrivate(key.getPrivate().toString(16), 'hex');
  


      const data = Uint8Array.from(
        spendingkey.getPublic().encodeCompressed('array')
      );

      const crc = Crc(data);
      const addr = new Uint8Array(data.length + 2);
      addr.set(data);
      addr.set(crc, data.length);
      const M = 'T' + base58.encode(addr);
      sessionStorage.setItem('cloak address', M);
      setstealthmeta(M);
    }

    catch (e) {
      console.error(e);
      data.seterror(e);
    }

  }

  const downloadFile = (text) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "DRM.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


  const revealnot = () => {
    setnote(true)
    setTimeout(() => {
      setnote(false)

    }, 6000);

  }


  const oncopy = () => {

    navigator.clipboard.writeText(stealthmeta)
    downloadFile(sessionStorage.getItem('DRM key'))
    revealnot()

  }

  useEffect(() => {
    generatestealthmetaaddress();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-6 rounded-t-md ">

        <div className="pb-6 flex flex-col space-y-4 items-center w-full">
          <h2
            className="mx-auto w-full montserrat-subheading text-gray-500 md:text-4xl 
      text-4xl  font-extrabold "
          >  Experience ultimate privacy with 
            <span className="montserrat-subheading md:text-4xl  
      text-4xl font-extrabold  "> us </span> responsibly  pushing boundaries </h2>

          {note === true &&
            <p
              className="montserrat-small text-gray-500 pt-5   font-semibold font-mono w-[60%]">
              Guard the key, unleash the cloak. Never reveal the 'DRM key', only share your secure 'Cloak address' for confidential transactions </p>}
        </div>

        <div className="my-3 flex gap-4 items-center p-2 px-2 rounded-md  bg-[#fceeee]">
          <p className="montserrat-small  font-semibold text-gray-500">
            <span className="text-[#435864] font-semibold">#tronCloak-</span>
            {stealthmeta}</p>
          <AiOutlineCopy className='font-bold text-2xl text-gray-500 cursor-pointer' onClick={oncopy} />
        </div>

        <button
          className="montserrat-subtitle my-3 border-1 p-1 montserrat-subtitle   text-white bg-[#FF5757] hover:shadow-xl px-6 text-center rounded-md  font-semibold   hover:bg-[#FDF0EF] hover:text-[#FF5757]  hover:border-white "
          onClick={generatestealthmetaaddress}>Generate</button>
      </div>
      <div className=" border-b w-[80%] m-auto mb-6 "></div>
    </>
  )
}

export default Stealth



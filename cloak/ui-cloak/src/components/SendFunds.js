import React from "react";
import { Tokens } from "../helpers/Token";
import { useState } from "react";
import { base58, keccak256 } from "ethers/lib/utils.js";
import EllipticCurve from "elliptic";
import { AiOutlineArrowDown } from "react-icons/ai";
import abi from "../build/contracts/EphKeys.json";
import Tron from "../assets/trx.png";
import loading2 from "../assets/loading2.gif";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contractAddress } from "./Wrapper";
import { db } from "../config/firebase.js"
import { collection, addDoc } from "firebase/firestore";
const ec = new EllipticCurve.ec("secp256k1");

const Send = () => {


  const [token, settoken] = useState("");
  const [StealthmetaAddress, setStealthmetaAddress] = useState("");
  const [error, seterror] = useState("");
  const [amount, setamount] = useState("");
  const [show, setshow] = useState(false);
  const [bydefault, setbydefault] = useState("TRX");
  const [bydefaultimg, setbydefaultimg] = useState(Tron);
  const [trxid, settrxid] = useState("");
  const [running, setrunning] = useState(false);
  const [toggleInput, settoggleInput] = useState(false);
  const [buttonInput, setButtonInput] = useState('Transfer');

  //helpers

  const { tronWeb } = window;

  var r;
  var s;
  var a;

  const msgSender = sessionStorage.getItem("address");

  let receipent;

  //middleware functions

  const handleChange = (e) => {
    const value = e.target.value;

    setamount(value.replace(/[^0-9.]/g, ""));
  };

  const handlecloakaddress = (e) => {
    if (
      (e.target.value[0] !== "T" && e.target.value !== "") ||
      e.target.value.length > 48 ||
      e.target.value.length < 47
    ) {
      seterror("Invalid address");
      setTimeout(() => {
        seterror("");
      }, 4000);
    }

    setStealthmetaAddress(e.target.value);
  };

  const handletronweb = () => {
    if (!tronWeb) {
      toast("Please install Tron wallet");
    }
    return;
  };

  const changedefault = (t) => {
    setshow(!show);
    setbydefault(t.name);
    settoken(t.address);
    setbydefaultimg(t.symbol);
    if (t.name === "NFTS") {
      settoggleInput(true);
    } else {
      settoggleInput(false);
    }
  };

  const validation = () => {
    if (StealthmetaAddress === "" && amount === "") {
      seterror("Please enter the address and amount");
      setTimeout(() => {
        seterror("");
      }, 4000);
      return;
    }
  };

  const fetchContract = async () => {
    //checking is tronweb connected
    handletronweb();

    //validating the inputs
    validation();

    //BigInt(value) / BigInt(10 ** 18)
    const instance = await tronWeb.contract().at(token);
    const result = await instance.balanceOf(msgSender).call();
    console.log("balance", result.toNumber(), amount);


    if (amount > result.toNumber()) {
      seterror("Not efficient funds for the transaction");
      toast.error("Not effecicient funds for the transaction");
      setTimeout(() => {
        seterror("");
      }, 4000);
      return;
    } else {
      approve();
    }
  };

  const checkOwner = async () => {
    handletronweb();

    //validating the inputs
    validation();

    let result;
    try {
      const instance = await tronWeb.contract().at(token);
      result = await instance.ownerOf(amount).call();
      console.log('res', tronWeb.address.fromHex(result))

    } catch (e) {
      seterror(e.mesage);
    }

    if (tronWeb.address.fromHex(result) !== msgSender) {
      console.log(tronWeb.address.fromHex(result))
      seterror("You are not the owner of this nft");
      toast.error("You are not the owner of this nft");
      setTimeout(() => {
        seterror("");
      }, 4000);
      return;
    } else {
      approve();
    }
  };

  const initializer = () => {
    var meta;
    var ephPublic;

    const ephKey = ec.genKeyPair();
    ephPublic = ephKey.getPublic();

    try {
      if (StealthmetaAddress.startsWith("T")) {
        const _StealthmetaAddress = StealthmetaAddress.slice(1);
        let decodedID = base58.decode(_StealthmetaAddress);
        const metaAddress = decodedID.subarray(0, 33);
        meta = ec.keyFromPublic(metaAddress, "hex");
      } else {
        seterror("Plz paste the valid address");
      }
    } catch (e) {
      seterror(e.message);
    }

    try {
      const sharedsecret = ephKey.derive(meta.getPublic());
      const hashed = ec.keyFromPrivate(keccak256(sharedsecret.toArray()));
      const publicKey = meta
        .getPublic()
        .add(hashed.getPublic())
        .encode("array", false)
        .splice(1);

      const address = keccak256(publicKey);
      const _HexString = address.substring(address.length - 40, address.length);
      const _Hex = "41" + _HexString;
      receipent = tronWeb.address.fromHex(_Hex);
      // console.log(receipent);

      r = "0x" + ephPublic.getX().toString(16, 64);
      s = "0x" + ephPublic.getY().toString(16, 64);
      a =
        "0x" +
        sharedsecret.toArray()[0].toString(16).padStart(2, "0") +
        sharedsecret.toArray()[31].toString(16);
    } catch (e) {
      console.log("error", e);
    }

    return true;
  };

  const pubkeys = collection(db, "pubKeys");


  const storing = async () => {
    const stored = `T${a.replace("0x", "")}04${r.slice(2)}${s.slice(2)}`
    // console.log(stored)
    try {
      await addDoc(pubkeys, {
        keys: stored,

      });
    } catch (err) {
      console.error(err);
    }
    console.log('storing...')
  }

  const sendTrx = async () => {
    //checking is tronweb connected
    handletronweb();

    //validating the inputs
    validation();

    setrunning(true);

    //calculating stealth address
    initializer();

    //putting ephkeys to firebase


    try {
      const contract = await tronWeb.contract(abi.abi, contractAddress);
      const trx = await contract
        .sendTron(r, s, a, receipent)
        .send({ callValue: tronWeb.toSun(amount) });
      console.log("tron");
      let txId = await tronWeb.trx.getTransaction(trx);
      settrxid("https://shasta.tronscan.org/#/transaction/" + txId.txID);
      console.log("https://shasta.tronscan.org/#/transaction/" + txId.txID)
    } catch (err) {
      seterror(err);
    }
    storing()
    setrunning(false);
  };

  const sendTrc20 = async () => {
    setrunning(true);

    //calculating stealth address
    initializer();


    try {
      const contract = await tronWeb.contract(abi.abi, contractAddress);
      const trx = await contract
        .sendTrc20(r, s, a, token, receipent, amount)
        .send();
      console.log('trc20')
      let txId = await tronWeb.trx.getTransaction(trx);
      console.log("https://shasta.tronscan.org/#/transaction/" + txId.txID);
      settrxid("https://shasta.tronscan.org/#/transaction/" + txId.txID);

    } catch (e) {
      seterror(e.message);
    }
    storing()
    setrunning(false);
  };

  const sendTrc721 = async () => {


    setrunning(true);

    //calculating stealth address
    initializer();


    try {
      const contract = await tronWeb.contract(abi.abi, contractAddress);
      const trx = await contract.sendTrc721(r, s, a, token, receipent, amount).send();
      console.log("trc721");
      let txId = await tronWeb.trx.getTransaction(trx);
      console.log("https://shasta.tronscan.org/#/transaction/" + txId.txID)
      settrxid("https://shasta.tronscan.org/#/transaction/" + txId.txID);

    } catch (e) {
      seterror(e.message);
    }
    storing()
    setrunning(false);
  };


  async function approve() {
    let contract;

    try {
      contract = await tronWeb.contract().at(token);
    } catch (e) {
      seterror(e.message);
    }

    let allowance;

    if (toggleInput === true) {
      try {
        const getapproved = await contract.getApproved(amount).call();
        console.log(tronWeb.address.fromHex(getapproved))
        if (tronWeb.address.fromHex(getapproved) !== contractAddress) {
          try {
            await contract
              .approve(contractAddress, amount)
              .send();
            console.log('approve done')
            setButtonInput('approving...')
            let txId = await tronWeb.trx.getTransaction(approve);
            console.log("https://shasta.tronscan.org/#/transaction/" + txId.txID)
            setButtonInput('Transfer')
            sendTrc721();
          } catch (err) {
            seterror(err.message);
          }
        } else {
          console.log('else done')
          sendTrc721();
        }
      } catch (e) {
        seterror(e.message);
      }
    } else {
      try {
        allowance = await contract.allowance(msgSender, contractAddress).call();
        console.log("allowance", allowance.toNumber());
      } catch (e) {
        seterror(e.message);
      }
      if (amount > allowance.toNumber()) {
        try {
          const approve = await contract
            .approve(contractAddress, amount)
            .send();
          console.log('approve done')
          setButtonInput('approving...')
          let txId = await tronWeb.trx.getTransaction(approve);
          console.log("https://shasta.tronscan.org/#/transaction/" + txId.txID)
          setButtonInput('Transfer')
          sendTrc20();


        } catch (e) {
          seterror(e.message);
        }

      }

      else {
        console.log('else done')
        sendTrc20();
      }

    }
  }

  const opentab = () => {
    if (trxid !== "") {
      window.open(trxid, "_blank");
    }
  };

  setTimeout(() => {
    seterror(" ");
  }, 6000);

  return (
    <div className=" mt-4 flex flex-col items-center space-y-6 ">
      {/* tokens dropdown */}

      <div className="absolute w-[320px] bg-white">
        <ul
          className="rounded-md hover:shadow-md"
          onClick={() => setshow(!show)}
        >
          <li
            className="text-md flex cursor-pointer items-center justify-between space-x-2 rounded-md border 
            border-gray-300 p-3  font-semibold text-gray-500
            transition-all ease-in"
          >
            <div className="flex flex-row items-center justify-around">
              <img src={bydefaultimg} alt="" height={1} width={20} />
              <p className="ml-1">{bydefault}</p>
            </div>
            <AiOutlineArrowDown
              className="float-right"
              color="grey"
              size={18}
            />
          </li>

          <div
            className={
              show === true &&
              `max-h-32 cursor-pointer overflow-y-scroll scrollbar
               scrollbar-track-gray-100 scrollbar-thumb-[#FF5757]
                scrollbar-thumb-rounded-full scrollbar-w-[7px] scrollbar-h-3 `
            }
          >
            {show &&
              Tokens.map((t) => (
                <div className="rounded-md bg-[#ffffff] text-sm hover:shadow-md">
                  <li
                    className="montserrat-small flex cursor-pointer justify-between space-x-8 p-3 px-2
                         font-semibold text-gray-500 transition-all 
                         ease-in hover:bg-[#FF5757] hover:text-white"
                    key={t.name}
                    onClick={() => changedefault(t)}
                  >
                    <p>{t.name}</p>
                    <img src={t.symbol} alt="" height={16} width={20} />
                  </li>
                </div>
              ))}
          </div>
        </ul>
      </div>

      {/* address and amount container */}

      <div className="w-[320px]">
        <div className="mb-3 mt-12 font-extralight text-gray-100">
          {toggleInput === true ? (
            <div
              className="border-1 mb-3 mt-12 flex w-[100%] items-center
                  space-x-2 rounded-md border border-gray-300 bg-[#ffffff] 
                    px-3 py-2 hover:shadow-sm"
            >
              <input
                className="montserrat-subtitle  border-1 w-[100%] rounded-md
               px-2 font-semibold text-gray-600 outline-none"
                type="text"
                onChange={(e) => settoken(e.target.value)}
                placeholder=" Nft token address"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div
          class="border-1 flex w-[100%] items-center
        space-x-2 rounded-md border border-gray-300 bg-[#ffffff] 
          px-3 py-2 hover:shadow-sm"
        >
          <input
            className="montserrat-subtitle border-1 flex-1 rounded-md
            p-1 px-1 text-[0.9rem] font-semibold
            text-gray-600 outline-none"
            type="text"
            value={StealthmetaAddress}
            onChange={handlecloakaddress}
            placeholder=" Receipent's Cloak address"
          />

          {/* Amount*/}

          <input
            className="montserrat-subtitle w-[20%] border-l-2 
            border-gray-300 p-1 px-2 text-center text-[0.9rem] font-semibold
             text-gray-600 outline-none"
            value={amount}
            type="text"
            placeholder=" 0 "
            onChange={handleChange}
          />
        </div>
      </div>
      {/* send button */}

      <div className="  ml-2 pt-2">
        <div
          className=" montserrat-subtitle border-1 flex cursor-pointer  items-center justify-around rounded-md  border border-red-500 bg-[#FF5757] p-1 px-6 text-center  font-semibold  text-white hover:shadow-md"
          onClick={
            token === ""
              ? sendTrx
              : toggleInput === true
                ? checkOwner
                : fetchContract
          }
        >
          <h2 className="">
            {running === true ? (
              <img height={30} width={30} src={loading2} alt="" />
            ) : (
              buttonInput
            )}
          </h2>
        </div>
      </div>
      <div className="pb-4 pt-1">
        <p
          onClick={opentab}
          className="montserrat-subtitle  cursor-pointer font-semibold text-gray-500 underline decoration-[#FF5757] underline-offset-8"
        >
          {trxid !== "" ? trxid.slice(8, 58) : ""}
        </p>
        <p className="montserrat-subtitle  font-semibold text-[#FF5757]">
          {error}
        </p>
      </div>
    </div>
  );
};

export default Send;

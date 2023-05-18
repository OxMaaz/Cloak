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
const ec = new EllipticCurve.ec("secp256k1");

const Send = () => {

  const TRCABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)",
    "function approve(address owner, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) view returns (uint)",
  ];





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


  //helpers
  const contractAddress = "TG94Q4jtD184Bwzf2Pc2kmHz8twvacjyM5";

  const { tronWeb } = window;

  var r;
  var s;
  var a;

  const msgSender = sessionStorage.getItem("address")

  let receipent;


  const handlemetaaddress = (e) => {

    if ((e.target.value[0] !== "T" && e.target.value !== "") ||
      (e.target.value.length > 48 || e.target.value.length < 47)) {
      seterror("Invalid address");
      setTimeout(() => {
        seterror("");
      }, 4000);
    }

    setStealthmetaAddress(e.target.value);
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

      r = "0x" + ephPublic.getX().toString(16, 64);
      s = "0x" + ephPublic.getY().toString(16, 64);
      a = "0x" + sharedsecret.toArray()[0].toString(16).padStart(2, "0");

    } catch (e) {
      console.log("error", e);
    }

    return true;
  };





  const changedefault = (t) => {
    setshow(!show);
    setbydefault(t.name);
    settoken(t.address);
    setbydefaultimg(t.symbol);
    if (t.address === 'nft') {
      settoggleInput(true)
    }
    else{
      settoggleInput(false)
    }

  };

  const fetchContract = async () => {

    const instance = await tronWeb.contract().at(token);
    const result = await instance.balanceOf(msgSender).call();
    console.log('res', result.toString())
    if (result.toString() < amount) {
      seterror("Not effecicient funds for the transaction");
      toast.error("Not effecicient funds for the transaction");
      setTimeout(() => {
        seterror("");
      }, 4000);
      return
    }

  };





  const sendTrx = async () => {

    if (!tronWeb) {
      toast("Please initialze tronlink");
      return;
    }

    if (StealthmetaAddress === "" || amount === "") {
      seterror("Please enter the address and amount");
      setTimeout(() => {
        seterror("");
      }, 4000);
      return;
    }

    setrunning(true);
    initializer();

    console.log("tron");


    try {
      const contract = await tronWeb.contract(abi.abi, contractAddress);
      const trx = await contract.SendTron(r, s, a, receipent).send({ callValue: tronWeb.toSun(amount) });
      let txId = await tronWeb.trx.getTransaction(trx);
      settrxid("https://shasta.tronscan.org/#/transaction/" + txId.txID);
    }
    catch (err) {
      seterror(err)
    }


    setrunning(false);
  };

  const sendTrc20 = async () => {

    if (!tronWeb) {
      toast("Please install Tron wallet");
    }

    if (StealthmetaAddress === "" || amount === "") {
      seterror("Please enter the address and amount");
      setTimeout(() => {
        seterror("");
      }, 4000);
      return;
    }
    setrunning(true);

    fetchContract()

    console.log("trc20");


    try {
      const contract = await tronWeb.contract(abi.abi, contractAddress);
      const trx = await contract.SendTrc20(r, s, a, token, receipent, amount).send();
      let txId = await tronWeb.trx.getTransaction(trx);
      settrxid("https://shasta.tronscan.org/#/transaction/" + txId.txID);
    }
    catch (e) {
      seterror(e.message);
    }

    setrunning(false);
  };

  async function approve() {

    const contract = await tronWeb.contract().at(token);
    const allowance = await contract.allowance(msgSender, contractAddress).call();
    console.log('allowance', allowance.toString())


    if (allowance.toString() < amount) {
      const approve = await contract.approve(contractAddress, amount).send();
      await approve.wait();
      sendTrc20()

    }
    else {
      sendTrc20()
    }

  }


  const opentab = () => {
    if (trxid !== "") {
      window.open(trxid, "_blank");
    }
  };

  return (
    <div className=" flex flex-col items-center space-y-2 mt-4 ">
      {/* tokens dropdown */}

      <div className="absolute w-72 ">
        <ul
          className="hover:shadow-md border border-gray-400 rounded-md"
          onClick={() => setshow(!show)}
        >
          <li className="rounded-md px-2 p-1  text-gray-500 font-semibold   cursor-pointer flex space-x-2  justify-between text-md  border border-gray-400 dark:border-none">
            <div className="flex flex-row   justify-around  items-center">
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
              "max-h-32 overflow-y-scroll scrollbar cursor-pointer     scrollbar-thumb-[#FF5757] scrollbar-w-[7px] scrollbar-h-3 scrollbar-thumb-rounded-full scrollbar-track-gray-100 "
            }
          >
            {show &&
              Tokens.map((t) => (
                <div className="bg-[#fdf4f4]  hover:shadow-md text-sm  ">
                  <li
                    className="px-2 p-3 cursor-pointer text-gray-500 font-semibold
                         hover:bg-[#FF5757] hover:text-white montserrat-small 
                         flex space-x-8 justify-between"
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

      <div className="pt-10  text-gray-100 font-extralight">
        {(toggleInput===true )?
          <input
            className="bg-[#fff7f7]  font-semibold text-gray-700 montserrat-subtitle outline-none border rounded-md p-1 px-2 w-[287px] border-1 border-gray-400"
            type="text"
            onChange={handlemetaaddress}
            placeholder=" Non fungible address"
          /> :<div></div>
        }

      </div>
      <div className="pt-1 flrx-row justify-around  items-center gap-6 flex">
        <input
          className="bg-[#fff7f7]  font-semibold text-gray-700 montserrat-subtitle outline-none border  rounded-md p-1 px-2 w-[300px] border-1 border-gray-400"
          type="text"
          onChange={handlemetaaddress}
          placeholder=" Receipent's Cloak address "
        />


        {/* Amount*/}
        <input
          className="bg-[#fff7f7]  font-semibold text-gray-700 montserrat-subtitle outline-none    p-1 px-2 h-9 w-[60px] border-b border-gray-400"
          value={amount}
          type="text"
          placeholder="0 trx"
          onChange={(e) => setamount(e.target.value)}
        />
      </div>
      {/* send button */}

      <div className="  pt-4 ml-2">
        <div
          className=" cursor-pointer flex justify-around items-center  montserrat-subtitle border-1 p-1  text-white bg-[#FF5757] hover:shadow-xl px-6 text-center rounded-md  font-semibold  border-red-500 border"
          onClick={token === "" ? sendTrx : approve}
        >
          <h2 className="">{running === true ? <img height={30} width={30} src={loading2} alt="" /> : "Transfer"}</h2>

        </div>
      </div>
      <div className="pt-1 pb-4">
        <p
          onClick={opentab}
          className="montserrat-subtitle  text-gray-500 font-semibold underline underline-offset-8 decoration-[#FF5757] cursor-pointer"
        >
          {trxid !== "" ? trxid.slice(8, 58) : ""}
        </p>
        <p className="montserrat-subtitle  text-[#FF5757] font-semibold">
          {error}
        </p>
      </div>

      {/* {console.log(token)} */}
    </div>
  );
};

export default Send;

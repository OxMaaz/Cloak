import { useEffect, useState } from "react";
import { keccak256 } from 'ethers/lib/utils';
import EllipticCurve from "elliptic";
// import { GiKangaroo } from "react-icons/gi";
import { AiOutlineArrowsAlt, AiOutlineCopy, AiOutlineScan, AiOutlineShrink } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
// import kangaroo from "../assets/runningKangaroo.png";
import { downloadFile } from "../helpers/DownloadFile";
import { db } from "../config/firebase.js";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { MdHistory, MdOutlineDone } from "react-icons/md";
import ToolTip from "../helpers/ToopTip";
import abi from "../build/contracts/Logs.json"
import { contractAddress } from "./Wrapper";
import BigNumber from "bignumber.js";
import tronWeb from "tronweb";
const ec = new EllipticCurve.ec("secp256k1");

const Receive = ({ setamountTowithdraw, setmasterkey, handleWithdrawClick, amountTowithdraw }) => {
  const [rootprivatekey, setrootprivatekey] = useState("");
  const [privatekey, setprivatekey] = useState("");
  const [hide, sethide] = useState(true);
  const [err, seterr] = useState(false);
  const [, setreveal] = useState(false);
  const [founded,] = useState("");
  const [iscopied, setiscopied] = useState(false);
  const [id, setId] = useState("");

  var spendingkey;


  let array = [];
  let retrievedArray = [];

  const checkDrm = async (key) => {

    if (key.startsWith('DRM Key : ')) {
      setrootprivatekey(key.replace('DRM Key : ', '').slice(0, 65))
      console.log(rootprivatekey)

    }

  }

  const [init, setInit] = useState(0)
  const [txlist, settxlist] = useState([])
  const [totalLength, setTotalLength] = useState(0)

  const retreivedArray = async () => {
    const contract = await tronWeb.contract(abi.abi, contractAddress);
    const trx = await contract.retrievePubKeys(BigNumber.from(init)).call()
    console.log(trx)
    setTotalLength(await contract.logs().call())
    settxlist(trx)
  }


  useEffect(() => {

    if (totalLength > init) {
      setTimeout(() => {

        setInit(Math.min(totalLength, init + 10));


      }, 750);
      retreivedArray()

    }
    else {
      setInit(0)
    }

  }, [init])

  // useEffect(() => {
  //   retreivedArray()
  // }, [init])

  useEffect(() => {
    retreivedArray()
  }, [])


  console.log(txlist)
  const setwallet = async (key) => {



    const tronWeb = window.tronWeb;
    const privateKey = key;
    console.log(privateKey);

    // Create a TronWeb instance with the private key
    const address = tronWeb.address.fromPrivateKey(privateKey);

    console.log('TRON Address:', address);
    // Get the current address from TronLink


    // Get the balance
    const balanceInSun = await tronWeb.trx.getBalance(address);

    // Convert from Sun to TRX (1 TRX = 1e6 Sun)
    const balance = tronWeb.fromSun(balanceInSun);

    // Set the balance (assuming setamountTowithdraw is a function that sets the balance)
    setamountTowithdraw(balance);




    array.push({
      address: address?.slice(0, 6) + "..." + address?.slice(-4),
      balance: balance,
      key: key,
    });


    // Convert the array to a Set to remove duplicates
    const uniqueSet = new Set(array);

    // Convert the Set back to an array if needed
    const uniqueArray = Array.from(uniqueSet);

    // Store the unique array in sessionStorage
    sessionStorage.setItem("array", JSON.stringify(uniqueArray));


    //getting array

    const retrievedArrayJson = sessionStorage.getItem("array");

    // Parse the JSON string back into an array
    retrievedArray = JSON.parse(retrievedArrayJson);


    //Array.from(new Set(array))
    settrxList(retrievedArray); // storing retreivedArray in RtrxList state

    // console.log("retrievedArray", retrievedArray);


  };

  const pubkeys = collection(db, "pubKeys");
  const MatchingKey = async () => {
    let logs;

    try {
      const data = await getDocs(pubkeys);
      logs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    } catch (err) {
      console.error(err);
      seterr(err.message);
    }
    console.log(logs)

    logs.forEach((e) => {
      const ephPublicKey = ec.keyFromPublic(e.keys.slice(5), "hex");
      const Sharedsecret = spendingkey.derive(ephPublicKey.getPublic()); //
      const Hashedsecret = ec.keyFromPrivate(keccak256(Sharedsecret.toArray()));
      const ss =
        "T" +
        Sharedsecret.toArray()[0].toString(16).padStart(1, "0") +
        Sharedsecret.toArray()[31].toString(16);


      if (ss.toString().slice(1, 5) === e.keys.slice(1, 5).toString()) {
        console.log(ss.toString().slice(1, 5) === e.keys.slice(1, 5).toString())
        setId(e.id);
        const _key = spendingkey.getPrivate().add(Hashedsecret.getPrivate());
        const pk = _key.mod(ec.curve.n);
        setwallet(pk.toString(16, 32));
        setprivatekey(pk.toString(16, 32));
        setreveal(true);
        setrootprivatekey("");

      }
      return;
    });
  };

  const generaterootprivatekey = async () => {
    if (rootprivatekey === "") {
      spendingkey = ec.keyFromPrivate(sessionStorage.getItem("DRM key"), "hex");
    } else {
      spendingkey = ec.keyFromPrivate(rootprivatekey, "hex");
    }

    MatchingKey();


  };

  const removingKey = async () => {
    console.log(id);
    const ephDoc = doc(db, "pubKeys", id);
    await deleteDoc(ephDoc);
  };

  const copykey = () => {
    navigator.clipboard.writeText(privatekey);

    setiscopied("Copied");

    handleWithdrawClick()
     

    downloadFile('#tronprivateKey-' + privatekey, "Cloak-privatekey.txt");

    setmasterkey(privatekey);


    removingKey();
  };

  useEffect(() => {
    if (amountTowithdraw > 0) {
      generaterootprivatekey();
    }

  }, []);


  const [trxList, settrxList] = useState([]); // temp
  const [transactionTab, setTransactionTab] = useState(false); // temp

  return (
    <>
      <div className="mx-auto flex items-center justify-center pt-4">
        <div className="flex w-full justify-end">
          <div className="flex w-full items-center justify-between space-x-1 py-2">
            {trxList && trxList.length > 0 && (
              <h1 className="animate-pulse-2s montserrat-small text-highlight  text-[1rem]  font-semibold">
                <span>{trxList.length}</span> Transaction Found !{" "}
              </h1>
            )}
            <div
              className="flex cursor-pointer items-center space-x-1 
             border-b border-dashed border-gray-400 text-left text-[1rem] text-gray-500"
              onClick={() => setTransactionTab(!transactionTab)}
            >
              <span>
                <MdHistory className="text-[1.2rem] text-inherit" />
              </span>
              <p className="montserrat-small font-semibold  ">
                View Transactions{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {transactionTab ? (
        trxList && trxList.length > 0 ? (
          trxList.map((z) => (
            <div className="text-highlight bg-gray-0 flex justify-between px-6 pt-4">
              <div className="flex flex-col space-y-2">
                <h2 className="montserrat-small text-left font-semibold">
                  Address{" "}
                </h2>
                <p className="text-gray-600">{z.address}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="montserrat-small text-left font-semibold">
                  Balance{" "}
                </h2>
                <p className="text-gray-600">{z.balance}</p>
              </div>
              <div className="montserrat-small flex flex-col items-end justify-center space-y-2 font-semibold">
                <h2 className="text-left">Private key </h2>
                {!iscopied ? (
                  <ToolTip tooltip="Copy Private key">
                    <AiOutlineCopy
                      onClick={() => copykey(z.key)}
                      className={`cursor-pointer text-[1.2rem] font-bold text-[#FF5757] `}
                    />
                  </ToolTip>
                ) : (
                  <MdOutlineDone
                    // onClick={() => copykey(z.key)}
                    className={`text-highlight text-[1.2rem] font-bold text-[#FF5757]`}
                  />
                )}
              </div>
            </div>

          ))
        ) : (
          <h1 className="montserrat-small relative top-5 text-center text-xl font-semibold  text-gray-500">
            No Transactions Recorded !
          </h1>
        )
      ) : (
        <div>
          <div className="flex justify-between space-x-1 py-2">
            {hide !== true && (
              <input
                type="text"
                className="montserrat-subtitle h-[100%] w-[100%]  rounded-md
            border-2 border-gray-500 bg-[#f7f7f7] px-3 py-3 text-[0.9rem]
            font-semibold text-gray-400 outline-none placeholder:text-gray-500 hover:border-cyan-900"
                value={rootprivatekey}
                onChange={(e) => {
                  setrootprivatekey(e.target.value);
                  checkDrm(e.target.value)
                }}
                placeholder="Enter your DRMKey"
              />
            )}
            {hide && (
              <p className="montserrat-small p-1 py-2 font-semibold text-gray-600 ">
                Expand to enter the DRMKey (optional)
              </p>
            )}
            {/* expand icon (toggle of input button) */}
            <div className="flex items-center">
              {hide ? (
                <AiOutlineArrowsAlt
                  className=" cursor-pointer  text-[#a7acb3]"
                  size={25}
                  onClick={() => sethide(!hide)}
                />
              ) : (
                <AiOutlineShrink
                  className="cursor-pointer  text-[#a7acb3]"
                  size={29}
                  onClick={() => sethide(!hide)}
                />
              )}
            </div>
          </div>

          {/* Match key */}
          <div className="mr-4 flex w-full justify-center pt-2 ">
            <button
              onClick={generaterootprivatekey}
              className="montserrat-subtitle border-1 montserrat-subtitle mx-auto my-2 mb-4 flex w-[100%] justify-center space-x-2  
          rounded-md border px-6 py-2 text-center font-bold  bg-[#FF5757]
          text-white transition-all  ease-linear hover:shadow-xl"
            >
              <AiOutlineScan className="text-[1.3rem] text-inherit" />
              <span>Scan</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Receive;

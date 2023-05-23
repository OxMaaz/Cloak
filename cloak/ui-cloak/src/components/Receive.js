import { useState } from "react";
import { keccak256 } from "ethers/lib/utils.js";
import EllipticCurve from "elliptic";
import { GiKangaroo } from "react-icons/gi";
import { AiOutlineArrowsAlt, AiOutlineShrink } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import copy from "../assets/copykey.jpg";
import kangaroo from "../assets/kangaroo.png";
import { downloadFile } from "../helpers/DownloadFile";
import { db } from "../config/firebase.js"
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const ec = new EllipticCurve.ec("secp256k1");

const Receive = () => {


  const [rootprivatekey, setrootprivatekey] = useState("");
  const [privatekey, setprivatekey] = useState("");
  const [hide, sethide] = useState(true);
  const [err, seterr] = useState(false);
  const [reveal, setreveal] = useState(false);
  const [founded, setfounded] = useState("");
  const [iscopied, setiscopied] = useState("Copy");
  const [id, setId] = useState('');
  var spendingkey;


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
      seterr(err.message)
    }



    logs.forEach((e) => {
      const ephPublicKey = ec.keyFromPublic(e.keys.slice(5), "hex");
      const Sharedsecret = spendingkey.derive(ephPublicKey.getPublic()); //
      const Hashedsecret = ec.keyFromPrivate(keccak256(Sharedsecret.toArray()));
      const ss = "T" + Sharedsecret.toArray()[0].toString(16).padStart(1, "0") + Sharedsecret.toArray()[31].toString(16);
      console.log(ss.toString().slice(1, 5), e.keys.slice(1, 5).toString())


      if (ss.toString().slice(1, 5) === e.keys.slice(1, 5).toString()) {
        setId(e.id)
        const _key = spendingkey.getPrivate().add(Hashedsecret.getPrivate());
        const pk = _key.mod(ec.curve.n);
        setprivatekey(pk.toString(16, 32));
        setreveal(true);
        setrootprivatekey("");
        setfounded("Matched");
      }
      return

    })


  }


  const generaterootprivatekey = async () => {


    if (rootprivatekey === "") {
      spendingkey = ec.keyFromPrivate(sessionStorage.getItem("DRM key"), "hex");
    } else {
      spendingkey = ec.keyFromPrivate(rootprivatekey, "hex");
    }

    MatchingKey()


    if (founded === "Matched") {
      toast.success('Matched')
    }

  };


  const removingKey = async () => {
    console.log(id)
    const ephDoc = doc(db, "pubKeys", id);
    await deleteDoc(ephDoc);

  }

  const copykey = () => {
    navigator.clipboard.writeText(privatekey);
    setiscopied("Copied");
    downloadFile(privatekey, "Cloak-privatekey.txt");

    /// remove the key from firebase database

    removingKey()
  };

  return (
    <>
      <div className="ml-4 flex items-center justify-center space-x-4 py-2 ">
        {hide !== true && (
          <div
            className="border-1 flex w-[100%] items-center
          space-x-2 rounded-md border border-gray-300 bg-[#ffffff] 
            px-3 py-2 hover:shadow-sm"
          >
            <input
              type="text"
              className="montserrat-subtitle w-full rounded-md
            px-1 text-[0.9rem] font-semibold text-gray-600
             outline-none"
              value={rootprivatekey}
              onChange={(e) => {
                setrootprivatekey(e.target.value);
              }}
              placeholder="DontRevealMe key (optional)"
            />
          </div>
        )}
        {hide && (
          <p className="montserrat-small ml-6 p-1 px-2 font-semibold text-gray-500 ">
            Expand to enter the saved Key
          </p>
        )}
        {/* expand icon (toggle of input button) */}
        {hide ? (
          <AiOutlineArrowsAlt
            className="cursor-pointer text-gray-500"
            size={22}
            onClick={() => sethide(!hide)}
          />
        ) : (
          <AiOutlineShrink
            className="cursor-pointer text-gray-500"
            size={22}
            onClick={() => sethide(!hide)}
          />
        )}
      </div>

      {/* Match key */}
      <div className="ml-1 flex  items-center justify-center px-2 pt-2 ">
        <div
          className="flex cursor-pointer items-center justify-center space-x-1 rounded-3xl  border-red-500 bg-[#FF5757] p-1 px-6 text-center font-semibold text-[#fff7f7] hover:border-white hover:shadow-md"
          onClick={generaterootprivatekey}
        >
          <GiKangaroo size={30} />
          {/* <h2 className='montserrat-small'>Match</h2> */}
        </div>
      </div>

      {/* message */}
      <div className="p-4  font-semibold text-red-400">
        {reveal === true ? (
          <div className="montserrat-small ml-60  flex justify-center space-x-3">
            <p>{iscopied}</p>
            <img
              height={20}
              width={20}
              src={copy}
              onClick={copykey}
              className="cursor-pointer"
              alt=""
            />
          </div>
        ) : (
          <>
            <div className=" flex items-center justify-center font-semibold text-[#FF5757]">
              {err && <img height={30} width={30} src={kangaroo} alt="" />}{" "}
              <p className="montserrat-subtitle">{err}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Receive;

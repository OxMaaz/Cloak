import { useState, } from 'react'
import { keccak256 } from 'ethers/lib/utils.js';
import EllipticCurve from 'elliptic';
import { GiKangaroo } from "react-icons/gi";
import { AiOutlineArrowsAlt, AiOutlineShrink } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contractAddress } from './Wrapper';
import copy from '../assets/copykey.jpg'
import kangaroo from '../assets/kangaroo.png'
const ec = new EllipticCurve.ec('secp256k1');



const Receive = () => {

  const { tronWeb } = window

  const [rootprivatekey, setrootprivatekey] = useState('')
  const [privatekey, setprivatekey] = useState('')
  const [hide, sethide] = useState(true)
  const [err, seterr] = useState(false)
  const [reveal, setreveal] = useState(false)
  const [founded, setfounded] = useState('matched')
  const [iscopied, setiscopied] = useState('Copy')

  let ephPubKeys = []



  const fetchData = async () => {
    try {
      const contract = await tronWeb.contract().at(contractAddress);
      const limit = await contract.getLimit().call();
      // console.log(limit.toString())

      for (let i = 0; i < limit.toString(); i++) {
        await contract.logs(i).call((err, result) => {
          ephPubKeys.push(`T${result.a.replace('0x', '')}04${result.r.slice(2)}${result.s.slice(2)}`)
          sessionStorage.setItem('ephkeys', JSON.stringify(ephPubKeys))

        });

      }


    } catch (e) {
      console.error(e);
      seterr(e.message)
    }
  }





  const generaterootprivatekey = async () => {

    fetchData();


    var privatekey;
    if (rootprivatekey === '') {
      privatekey = ec.keyFromPrivate(sessionStorage.getItem('DRM key'), 'hex');

    }

    else {
      privatekey = ec.keyFromPrivate(rootprivatekey, 'hex');
    }

    var ephPublicKey;
    var Sharedsecret;
    var Hashedsecret;
    var _sharedSecret;

    const ephkeys = sessionStorage.getItem('ephkeys');
    const registry = JSON.parse(ephkeys);
    console.log('registry', ephPubKeys)

    if (registry === null) {
      toast.error('Problem fetching')
      return
    }

    registry.forEach((z) => {

      ephPublicKey = ec.keyFromPublic(z.slice(5), 'hex');
      Sharedsecret = privatekey.derive(ephPublicKey.getPublic()); // 
      Hashedsecret = ec.keyFromPrivate(keccak256(Sharedsecret.toArray()));
      _sharedSecret = 'T' + Sharedsecret.toArray()[0].toString(16).padStart(1, '0')+Sharedsecret.toArray()[31].toString(16)
      console.log(z.slice(1, 5).toString(), _sharedSecret.toString().slice(1, 5))


      try {
        if (_sharedSecret.toString().slice(1, 5) === z.slice(1, 5).toString()) {
          const _key = privatekey.getPrivate().add(Hashedsecret.getPrivate());
          const pk = _key.mod(ec.curve.n);
          console.log('Private key to open wallet', pk.toString(16, 32))
          setprivatekey(pk.toString(16, 32))
          setreveal(true)
          toast.success('matched')
          setrootprivatekey('')
          setfounded('')

        }
        return

      }

      catch (e) {
        seterr(e.message)
      }

    })

    if (founded === 'matched') {
      seterr(' Oops.. Plz try again')
      setTimeout(() => {
        seterr('')

      }, 3000);

    }




  }

  const copykey = () => {

    navigator.clipboard.writeText(privatekey)
    setiscopied('Copied')
  }

  return (
    <>
      <div className="py-2 flex space-x-4 justify-center items-center ml-4 ">
        {hide !== true && (
          <input
            type="text"
            className="bg-[#fff7f7] ml-5 font-semibold text-gray-700 montserrat-subtitle outline-none border rounded-md p-1 px-2 border-1 border-gray-400 w-[85%]"
            value={rootprivatekey}
            onChange={(e) => {
              setrootprivatekey(e.target.value);
            }}
            placeholder="DontRevealMe key (optional)"
          />
        )}
        {hide && (
          <p className="text-gray-500 p-1 px-2 font-semibold montserrat-small ml-6 ">
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
      <div className="flex justify-center  items-center pt-2 px-2 ml-1 ">
        <div
          className="flex items-center justify-center cursor-pointer space-x-1 border-1 p-1 text-[#fff7f7]  bg-[#FF5757] hover:shadow-xl px-6 text-center rounded-3xl hover:bg-[#FDF0EF] hover:text-[#FF5757] font-semibold hover:border-white border-red-500 border"
          onClick={generaterootprivatekey}
        >
          <GiKangaroo size={30} />
          {/* <h2 className='montserrat-small'>Match</h2> */}
        </div>
      </div>

      {/* message */}
      <div className="p-4  text-red-400 font-semibold">
        {reveal === true ? (
          <div className="flex ml-60  justify-center space-x-3 montserrat-small">
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
            <div className=" flex justify-center items-center text-[#FF5757] font-semibold">{err && <img height={30} width={30} src={kangaroo} alt="" />} <p className='montserrat-subtitle'>{err}</p></div>

          </>
        )}
      </div>




    </>
  )
}

export default Receive
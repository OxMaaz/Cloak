import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { CloakContext } from './Cloak';
import keccak256 from 'keccak256';
import EllipticCurve from 'elliptic';
import { AiOutlineCopy } from "react-icons/ai";
// import tronWeb from 'tronweb';
import { GiKangaroo } from "react-icons/gi";
import { AiOutlineArrowsAlt } from "react-icons/ai";
const ec = new EllipticCurve.ec('secp256k1');



const Receive = () => {


  const { registry } = useContext(CloakContext);
  const [rootspendingkey, setrootspendingkey] = useState('')
  // const [spendingkey, setSpendingkey] = useState('')
  const [privatekey, setprivatekey] = useState('')
  const [hide, sethide] = useState(true)
  const [matching, setmatchingkey] = useState(false)

  const [err, seterr] = useState(false)


  const generaterootspendingkey = () => {
    setmatchingkey(true)

    var Spendingkey;
    if (rootspendingkey === null) {
      const mystoredspendingkey = localStorage.getItem('myKey');
      Spendingkey = ec.keyFromPrivate(mystoredspendingkey, 'hex');
    }



    var ephPublicKey;
    var RSharedsecret;
    var RHashedsecret;
    var _sharedSecret;

    registry.forEach((z) => {

      ephPublicKey = ec.keyFromPublic(z.slice(5), 'hex');
      RSharedsecret = Spendingkey.derive(ephPublicKey.getPublic()); // 
      RHashedsecret = ec.keyFromPrivate(keccak256(RSharedsecret.toArray()));
      _sharedSecret = 'T' + RSharedsecret.toArray()[0].toString(16).padStart(2, '0')

      if (_sharedSecret.toString() === z.slice(2, 4).toString()) {
        const _key = Spendingkey.getPrivate().add(RHashedsecret.getPrivate());
        const pk = _key.mod(ec.curve.n);
        console.log('Private key to open wallet', pk.toString(16, 32))
        setprivatekey(privatekey.toString(16, 32))
        return true

      }

      return




    })

    setmatchingkey(false)
    seterr('Sorry not matched')
    return false
   


  }

  const copykey = () => {
    navigator.clipboard.writeText(privatekey)
  }

  return (
    <>

      {hide !== true &&

        <input style={{border: '1px solid red'}}  type='text'
          value={rootspendingkey}
          onChange={(e) => { setrootspendingkey(e.target.value) }}
          placeholder='Root spending key'
        />
      }
      <AiOutlineArrowsAlt size={30} onClick={() => sethide(!hide)} />
      <p>Match Key</p>
      <GiKangaroo size={40} onClick={generaterootspendingkey} color='red' />

      {matching === true ? <p>Running</p> : false}

      {generaterootspendingkey === true ?
        <>
          <p>CopyPrivateKey</p>
          <AiOutlineCopy size={40} onClick={copykey} />
        </> :
        <p>{err}</p>

      }



    </>
  )
}

export default Receive
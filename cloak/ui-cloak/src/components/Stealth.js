import { Crc } from "../helpers/Crc";
import base58 from 'bs58';
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import EllipticCurve from 'elliptic';
import { AiOutlineCopy } from "react-icons/ai";
import { CloakContext } from './Cloak';
import { Tokens } from "../helpers/Token";
const ec = new EllipticCurve.ec('secp256k1');




const Stealth = () => {

    const { error, seterror } = useContext(CloakContext);

    const [stealthmeta, setstealthmeta] = useState('')
    const [storedspendingkey, setstoredspendingkey] = useState('')
    const [showaddress, setshowaddress] = useState(false)


    const generatestealthmetaaddress = () => {

        setshowaddress(true)

        try {


            let key = ec.genKeyPair();

            setstoredspendingkey(key.getPrivate().toString(16))
            localStorage.setItem('myKey', storedspendingkey);
            const spendingkey = ec.keyFromPrivate(storedspendingkey, 'hex');


            const data = Uint8Array.from(
                spendingkey.getPublic().encodeCompressed('array')
            );

            const crc = Crc(data);
            const addr = new Uint8Array(data.length + 2);
            addr.set(data);
            addr.set(crc, data.length);
            const StealthstealthmetaAddress = 'T' + base58.encode(addr)
            console.log(StealthstealthmetaAddress)
            setstealthmeta(StealthstealthmetaAddress)

        }

        catch (e) {
            console.error(e)
            // seterror(e)
        }

    }

    const downloadFile = (text) => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "DontRevealMe.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }


    const oncopy = () => {

        navigator.clipboard.writeText(stealthmeta)
        downloadFile(storedspendingkey)

    }

    useEffect(() => {

        generatestealthmetaaddress()

    }, [])



    return (

        <div>

            <h1>Cloak Address</h1>

            {Tokens.map((t) => <img src={t.symbol} alt="" height={20} width={20} />)}

            <div>
                <h3>{showaddress === true && `#tronCloak-${stealthmeta}`}</h3>
                <AiOutlineCopy onClick={oncopy} color="red" />
                <button onClick={generatestealthmetaaddress}>Generate</button>
            </div>

            <p>Share this address instead of your wallet address to sender</p>
            {/* <p>{error}</p> */}


        </div>
    )
}

export default Stealth
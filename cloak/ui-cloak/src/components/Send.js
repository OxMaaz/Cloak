import React from 'react'
import { Tokens } from '../helpers/Token'
import base58 from 'bs58';
import { useState } from 'react'
import keccak256 from 'keccak256';
import EllipticCurve from 'elliptic';
import { useContext } from 'react'
import { CloakContext } from './Cloak';
import { Buffer } from 'buffer';


const ec = new EllipticCurve.ec('secp256k1');

// z from eph key
// token address
// amount
// receipent address ie stealth address

const Send = () => {

    const data = useContext(CloakContext);
    const [token, settoken] = useState('')
    const [StealthmetaAddress, setStealthmetaAddress] = useState('')
    const [receipent, setreceipent] = useState('')
    const [zkey, setzkey] = useState('')
    // const [tokenaddress,settokenaddress] = useState('')
    // const [ephKey, setephKey] = useState('')
    // const [meta, setmeta] = useState('')
    // const [hashed, sethashed] = useState('')
    const [secret, setsecret] = useState('')
    const [error, seterror] = useState('')
    const [tron, settron] = useState(true)
    const [amount, setamount] = useState('0.1')


    // const generateEph = () => {
    //     const ephKey = ec.genKeyPair();
    //     ephPublic = ephKey.getPublic();
    //     // setephPublic(ephpublic)

    // }

    // const validateMetaAddress = () => {

    //     try {
    //         if (StealthmetaAddress.startsWith('T')) {
    //             const _StealthmetaAddress = StealthmetaAddress.slice(1)
    //             let decodedID = base58.decode(_StealthmetaAddress);
    //             const meta = decodedID.subarray(0, 33);
    //             const metaAddress = ec.keyFromPublic(meta, 'hex');
    //             setmeta(metaAddress)

    //         }
    //         else {
    //             seterror('Plz paste the valid address')
    //         }
    //     }

    //     catch (e) {
    //         seterror(e.message)
    //     }
    // }

    // const generateSharedSecret = () => {
    //     const sharedsecret = ephKey.derive(meta.getPublic());
    //     const hashedsecret = ec.keyFromPrivate(keccak256(sharedsecret.toArray()));
    //     const ss = 'T' + sharedsecret.toArray()[0].toString(16).padStart(2, '0')
    //     sethashed(hashedsecret)
    //     setsecret(ss)
    // }

    function initializer() {

        var meta;
        // var ephKey;
        var ephPublic;



        const ephKey = ec.genKeyPair();
        ephPublic = ephKey.getPublic();

        try {
            if (StealthmetaAddress.startsWith('T')) {
                const _StealthmetaAddress = StealthmetaAddress.slice(1)
                let decodedID = base58.decode(_StealthmetaAddress);
                const metaAddress = decodedID.subarray(0, 33);
                meta = ec.keyFromPublic(metaAddress, 'hex');
                // setmeta(metaAddress)
                console.log(meta)

            }
            else {
                seterror('Plz paste the valid address')
            }
        }

        catch (e) {
            console.log(e.message)
        }
        try {
            const sharedsecret = ephKey.derive(meta.getPublic());
            console.log(sharedsecret)
            const hashed = ec.keyFromPrivate(keccak256(sharedsecret.toArray()));
            const ss = 'T' + sharedsecret.toArray()[0].toString(16).padStart(2, '0')
            // sethashed(hashedsecret)
            console.log(hashed)
            setsecret(ss)
            console.log(secret)

            const publicKey = meta.getPublic().add(hashed.getPublic()).encode('array', false);
            const address = keccak256(publicKey.splice(1));
            console.log(address)
            const StealthAddress = Buffer.from(address);
            const _HexString = StealthAddress.substring(StealthAddress.length - 40, StealthAddress.length)
            const _Hex = '41' + _HexString
            // setreceipent(tronWeb.address.fromHex(_Hex))
            console.log(_Hex)

        }

        catch (e) {
            console.log('error', e)
        }


        const x = ephPublic.getX().toString(16, 64)
        const y = ephPublic.getY().toString(16, 64)
        const z = `0x${secret}04${x}${y}`
        setzkey(z)

        data.setRegistry([...data.registry, zkey])



    }
    const sendTrx = () => {
        initializer()

    }
    const sendTrc20 = () => {
        initializer()

    }


    // const savetron = (t) => {
    //     settoken(t.address)
    //   console.log(token)
    // }
    return (
        <>

            <select onChange={(e) => settoken(e.target.value)} >
                {Tokens.map((t) =>
                    <option value={t.name}>
                        <p >{t.name}</p>
                        <img src={t.symbol} alt="" height={10} width={10} />
                    </option>
                )}
            </select>
            {console.log(token, StealthmetaAddress, amount)}

            <input  style={{border: '1px solid red'}}  type='text' onChange={(e) => setStealthmetaAddress(e.target.value)} placeholder='Receipent address' />
            <input  style={{border: '1px solid red'}} value={amount} type='text' onChange={(e) => setamount(e.target.value)} />

            <button style={{border: '4px solid red'}} onClick={token === 'TRON' ? sendTrx : sendTrc20}>Send</button>
            {token === 'TRON' ? console.log('tron') : console.log('other')}


            {/* //consoling all errors and success */}
            {/* <p>{error}</p> */}



        </>
    )
}

export default Send
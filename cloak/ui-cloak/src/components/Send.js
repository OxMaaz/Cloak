import React from 'react'
import { Tokens } from '../helpers/Token'
// import base58 from 'bs58';
import { useState } from 'react'
import { base58, keccak256 } from 'ethers/lib/utils.js';
import EllipticCurve from 'elliptic';
import { useContext } from 'react'
import { CloakContext } from './Cloak';





const ec = new EllipticCurve.ec('secp256k1');

// z from eph key
// token address
// amount
// receipent address ie stealth address

const Send = () => {

    const data = useContext(CloakContext);
    const [token, settoken] = useState('')
    const [StealthmetaAddress, setStealthmetaAddress] = useState('')
    // const [receipent, setreceipent] = useState('')
    const [zkey, setzkey] = useState('')
    const [secret, setsecret] = useState('')
    const [error, seterror] = useState('')
    const [amount, setamount] = useState('0.1')



    function initializer() {

        var meta;
        var ephPublic;



        const ephKey = ec.genKeyPair();
        ephPublic = ephKey.getPublic();

        try {
            if (StealthmetaAddress.startsWith('T')) {
                const _StealthmetaAddress = StealthmetaAddress.slice(1)
                let decodedID = base58.decode(_StealthmetaAddress);
                const metaAddress = decodedID.subarray(0, 33);
                meta = ec.keyFromPublic(metaAddress, 'hex');
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
            const hashed = ec.keyFromPrivate(keccak256(sharedsecret.toArray()));
            console.log('hashed', hashed)
            const ss = 'T' + sharedsecret.toArray()[0].toString(16).padStart(2, '0')
            setsecret(ss)
            console.log(secret)
            const publicKey = meta.getPublic().add(hashed.getPublic()).encode('array', false).splice(1)
            const address = keccak256(publicKey);
            console.log('add', address);
            const _HexString = address.substring(address.length - 40, address.length)
            const _Hex = '41' + _HexString
            // // setreceipent(tronWeb.address.fromHex(_Hex))
            console.log('stealth', _Hex)

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
            {console.log('token-address',token,'meta', StealthmetaAddress,'amount' ,amount, 'zkey', zkey)}

            <input style={{ border: '1px solid red' }} type='text' onChange={(e) => setStealthmetaAddress(e.target.value)} placeholder='Receipent address' />
            <input style={{ border: '1px solid red' }} value={amount} type='text' onChange={(e) => setamount(e.target.value)} />

            <button style={{ border: '4px solid red' }} onClick={token === 'TRON' ? sendTrx : sendTrc20}>Send</button>
            {token === 'TRON' ? console.log('tron') : console.log('other')}


            {/* //consoling all errors and success */}
            {/* <p>{error}</p> */}



        </>
    )
}

export default Send
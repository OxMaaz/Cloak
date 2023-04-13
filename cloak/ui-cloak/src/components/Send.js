import React, { useEffect } from 'react'
import { Tokens } from '../helpers/Token'
import BigNumber from 'bignumber.js';
import { useState } from 'react'
import { base58, keccak256 } from 'ethers/lib/utils.js';
import EllipticCurve from 'elliptic';
import { useContext } from 'react'
import { CloakContext } from './Cloak';
import { AiOutlineArrowDown } from "react-icons/ai";
import abi from '../build/contracts/EphKeys.json';
import tronWeb from 'tronweb'
const ec = new EllipticCurve.ec('secp256k1');

// z from eph key
// token address
// amount
// receipent address ie stealth address

const Send = () => {

    const contractAddress = 'TJBeQh58L9nLzkamyemu3A5GZgTafVHdeF'
    var r;
    var s;
    var a;
    const { tronWeb } = window

    const data = useContext(CloakContext);
    const [token, settoken] = useState('')
    const [StealthmetaAddress, setStealthmetaAddress] = useState('')
    // const [receipent, setreceipent] = useState('')
    const [zkey, setzkey] = useState('')
    const [secret, setsecret] = useState('')
    const [error, seterror] = useState('')
    const [amount, setamount] = useState('')
    const [show, setshow] = useState(false)
    const [bydefault, setbydefault] = useState('TRON')
    const [trxid, settrxid] = useState('')
    const [running, setrunning] = useState(false)
    let receipent;




    useEffect(() => {
        if (StealthmetaAddress.startsWith('#tronCloak-')) {
            StealthmetaAddress.replace('#tronCloak-', '')
        }

    }, [StealthmetaAddress])



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
            a = '0x' + sharedsecret.toArray()[0].toString(16).padStart(2, '0')
            setsecret(a)
            console.log(secret)
            const publicKey = meta.getPublic().add(hashed.getPublic()).encode('array', false).splice(1)
            const address = keccak256(publicKey);
            console.log('add', address);
            const _HexString = address.substring(address.length - 40, address.length)
            const _Hex = '41' + _HexString
            receipent = tronWeb.address.fromHex(_Hex)
            console.log('stealth', _Hex)
            console.log('recepeint', receipent)




            r = '0x' + ephPublic.getX().toString(16, 64)
            s = '0x' + ephPublic.getY().toString(16, 64)
            const rs = `04${r.slice(2)}${s.slice(2)}`
            const z = `T${a.replace('0x', '')}04${r.slice(2)}${s.slice(2)}`
            setzkey(z)
            console.log(z, 'z')
            console.log(r, 'r')
            console.log(s, 's')
            console.log(a, 'a')

            data.setRegistry([...data.registry, z])
            // console.log('token-address', token, 'meta', StealthmetaAddress, 'amount', amount, 'zkey', z, "registry", [...data.registry, z], 'abi', abi.abi)


        }

        catch (e) {
            console.log('error', e)
        }



    }

    const changedefault = (t) => {
        setshow(!show)
        setbydefault(t.name)
        settoken(t.address)

    }

    const fetchContract = async () => {
        const instance = await tronWeb.contract().at(token);
        const result = await instance.balanceOf(localStorage.getItem('address')).call();

        try {
            if (new BigNumber(result).toNumber() === 0) {
                alert('You have no tokens')

            }


        }

        catch (err) {
            console.log(err)
        }



    }


    const sendTrx = async () => {

        initializer()
        let contract;
        console.log('tron')

        try {
            contract = await tronWeb.contract(abi.abi, contractAddress);

        }
        catch (e) {
            console.log(e.message)
        }
        setrunning(true)

        try {
            const trx = await contract.SendTron(r, s, a, receipent).send({
                callValue: tronWeb.toSun(amount),
                shouldPollResponse: true
            })
            let trxhash = await tronWeb.trx.getTransaction.txID(trx);
            settrxid('https://shasta.tronscan.org/tx/' + trxhash)

        }
        catch (e) {
            console.log(e.message)
            seterror(e.message)

        }

        setrunning(false)

    }
    const sendTrc20 = async () => {

        fetchContract()

        initializer()
        console.log('trc20')

        let contract;

        try {
            contract = await tronWeb.contract(abi.abi, contractAddress);

        }
        catch (e) {
            console.log(e.message)

        }
        setrunning(true)


        try {
            const trx = await contract.SendTrc20(r, s, a, token, receipent, amount).send({
                callValue: tronWeb.toSun(amount),
                shouldPollResponse: true
            })
            let trxhash = await tronWeb.trx.getTransaction.txID(trx);
            settrxid('https://shasta.tronscan.org/tx/' + trxhash)

        }
        catch (e) {
            console.log(e.message)
            seterror(e.message)

        }

    

        setrunning(false)
    }











    return (
        <div className="flex flex-col items-center space-y-4">


            {/* tokens dropdown */}

            <div >
                <ul >
                    <li style={{ border: '1px solid black', cursor: 'pointer' }}>{bydefault} <AiOutlineArrowDown size={20} onClick={() => setshow(!show)} /></li>
                    {show && Tokens.map((t) =>
                        <li style={{ border: '1px solid black', cursor: 'pointer' }} key={t.name} onClick={() => changedefault(t)} >
                            {t.name}
                            <img src={t.symbol} alt="" height={20} width={20} />
                        </li>
                    )}
                </ul>
            </div>




            <div className="sm:flex-row sm:space-x-5 flex-col items-center gap-5 flex">
                <input
                    // style={{ border: '1px solid red' }}
                    className="outline-none border rounded-md p-1 px-2 border-1 border-gray-400 w-[210px]"
                    type="text"
                    onChange={(e) => setStealthmetaAddress(e.target.value)}
                    placeholder="Receipent address"
                />
                {/* Amount*/}
                <input
                    className="outline-none border rounded-md p-1 px-2 border-1 border-gray-400 w-[110px]"
                    value={amount}
                    type="text"
                    placeholder="Ex: 100trx"
                    onChange={(e) => setamount(e.target.value)}
                />
            </div>
            {/* send button */}

            <button
                className="border-1 p-1 text-white bg-[#FF5757] hover:shadow-xl px-6 text-center rounded-md hover:bg-[#FDF0EF] hover:text-[#FF5757] font-semibold hover:border-white border-red-500 border"
                onClick={token === '' ? sendTrx : sendTrc20}
            >
                Send
            </button>
            <p>{trxid}</p>
            <p>{running ? 'running' : ''}</p>
            <p>{error}</p>
            {token === '' ? console.log('tron') : console.log(token)}

            {/* consoling */}







        </div>
    )
}

export default Send
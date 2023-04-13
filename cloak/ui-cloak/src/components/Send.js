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
import loading from '../assets/loading.gif'
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




    const handlemetaaddress = (e) => {
        if (e.target.value[0] !== 'T' && e.target.value !== '') {
            seterror('Invalid address')
            setTimeout(() => {
                seterror('')
            }, 4000);
        


        }
        setStealthmetaAddress(e.target.value)

    }

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
        setStealthmetaAddress('')
        setamount('')

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

            let trxhash = await tronWeb.trx.getTransaction(trx);
            settrxid('https://shasta.tronscan.org/tx/' + trxhash)
            console.log('https://shasta.tronscan.org/tx/' + trxhash)


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
            setStealthmetaAddress('')
            setamount('')
            let trxhash = await tronWeb.trx.getTransaction(trx);
            settrxid('https://shasta.tronscan.org/tx/' + trxhash)
            console.log('https://shasta.tronscan.org/tx/' + trxhash)


        }
        catch (e) {
            console.log(e.message)
            seterror(e.message)

        }



        setrunning(false)
    }

    return (
        <div className=" flex flex-col items-center space-y-4 mt-4 ">


            {/* tokens dropdown */}

            <div className='absolute w-72 '>
                <ul className='hover:shadow-md border rounded-md' onClick={() => setshow(!show)}>
                    <li className='rounded-md px-2 p-1 text-gray-500 font-semibold   cursor-pointer flex space-x-2  justify-between text-md  border border-gray-400' >
                        <p>{bydefault}</p>
                        <AiOutlineArrowDown className='float-right' color='grey' size={18} />
                    </li>
                    <div className={show === true && 'h-32 overflow-y-scroll'}>
                        {show && Tokens.map((t) =>
                            <div className='bg-[#FFF7F7] hover:shadow-md text-sm '>
                                <li
                                    className='px-2 p-3 cursor-pointer text-gray-500
                         hover:bg-[#FF5757] hover:text-white montserrat-small 
                         flex space-x-8 justify-between' key={t.name} onClick={() => changedefault(t)} >
                                    <p>{t.name}</p>
                                    <img src={t.symbol} alt="" height={16} width={20} />
                                </li>
                            </div>
                        )}
                    </div>
                </ul>
            </div>

            <div className="sm:flex-row pt-12 sm:space-x-5 flex-col items-center gap-5 flex">
                <input
                    // style={{ border: '1px solid red' }}
                    className="bg-[#fffafa] font-semibold text-gray-700 montserrat-subtitle outline-none border rounded-md p-1 px-2 border-1 border-gray-400 w-[210px]"
                    type="text"
                    onChange={handlemetaaddress}
                    placeholder="Receipent address"
                />
                {/* Amount*/}
                <input
                    className="bg-[#fffafa] font-semibold text-gray-700 montserrat-subtitle outline-none border rounded-md p-1 px-2 border-1 border-gray-400 w-[110px]"
                    value={amount}
                    type="text"
                    placeholder="Ex: 100trx"
                    onChange={(e) => setamount(e.target.value)}
                />
            </div>
            {/* send button */}

            <div className=' pt-5 ml-2'>
                <button
                    className="  montserrat-subtitle border-1 p-1  text-white bg-[#FF5757] hover:shadow-xl px-6 text-center rounded-md hover:bg-[#FDF0EF] hover:text-[#FF5757] font-semibold hover:border-white border-red-500 border"
                    onClick={token === '' ? sendTrx : sendTrc20}
                >

                    {running === true ? 'sending' : 'send'}
                </button>
            </div>
            {running === true ? <img height={60} width={60} src={loading} alt="" /> : ''}
            <p>{trxid}</p>
            <p className='montserrat-subtitle text-[#FF5757]'>{error}</p>
            {token === '' ? console.log('tron') : console.log(token)}

            {/* consoling */}
        </div>
    )
}

export default Send
import React, { } from 'react'
import { Tokens } from '../helpers/Token'
import { useState } from 'react'
import { base58, keccak256 } from 'ethers/lib/utils.js';
import EllipticCurve from 'elliptic';
import { AiOutlineArrowDown } from "react-icons/ai";
import abi from '../build/contracts/EphKeys.json';
import tronWeb from 'tronweb'
import loading2 from '../assets/loading2.gif'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ec = new EllipticCurve.ec('secp256k1');




const Send = () => {

    const contractAddress = 'TG94Q4jtD184Bwzf2Pc2kmHz8twvacjyM5'
    const { tronWeb } = window

    var r;
    var s;
    var a;


    const [token, settoken] = useState('')
    const [StealthmetaAddress, setStealthmetaAddress] = useState('')
    const [error, seterror] = useState('')
    const [amount, setamount] = useState('')
    const [show, setshow] = useState(false)
    const [bydefault, setbydefault] = useState('TRX')
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

    const initializer = () => {

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


            }
            else {
                seterror('Plz paste the valid address')
            }
        }

        catch (e) {
            seterror(e.message)
        }
        try {
            const sharedsecret = ephKey.derive(meta.getPublic());
            const hashed = ec.keyFromPrivate(keccak256(sharedsecret.toArray()));
            console.log('hashed', hashed)
            a = '0x' + sharedsecret.toArray()[0].toString(16).padStart(2, '0')
            const publicKey = meta.getPublic().add(hashed.getPublic()).encode('array', false).splice(1)
            const address = keccak256(publicKey);
            const _HexString = address.substring(address.length - 40, address.length)
            const _Hex = '41' + _HexString
            receipent = tronWeb.address.fromHex(_Hex)


            r = '0x' + ephPublic.getX().toString(16, 64)
            s = '0x' + ephPublic.getY().toString(16, 64)


        }

        catch (e) {
            console.log('error', e)
        }

        return true

    }

    const changedefault = (t) => {
        setshow(!show)
        setbydefault(t.name)
        settoken(t.address)

    }

    const fetchContract = async () => {
        const instance = await tronWeb.contract().at(token);
        const result = await instance.balanceOf(localStorage.getItem('address')).call();

        if (result.toString() < amount) {
            seterror('Not effecicient funds for the transaction')
            alert('Not effecicient funds for the transaction')
            setTimeout(() => {
                seterror('')
            }, 4000);
            return false

        }
        return true

    }






    const sendTrx = async () => {
        if (!tronWeb) {
            toast('Please initialze tronlink')
            return
        }

        if (StealthmetaAddress === '' || amount === '') {
            seterror('Please enter the address')
            setTimeout(() => {
                seterror('')
            }, 4000);
            return
        }

        setrunning(true)
        initializer()


        console.log('tron')


        const contract = await tronWeb.contract(abi.abi, contractAddress);
        const trx = await contract.SendTron(r, s, a, receipent).send({
            callValue: tronWeb.toSun(amount),
        })
        let txId = await tronWeb.trx.getTransaction(trx);
        console.log(txId)
        settrxid('https://shasta.tronscan.org/#/transaction/' + txId.txID)



        setrunning(false)

    }


    const sendTrc20 = async () => {
        if (!tronWeb) {
            toast('Please install Tron wallet');
        }

        if (StealthmetaAddress === '' || amount === '') {
            seterror('Please enter the address')
            setTimeout(() => {
                seterror('')
            }, 4000);
            return
        }
        setrunning(true)
        if (fetchContract() !== true) {
            setrunning(false)
            return

        }

        console.log('trc20')


        const contract = await tronWeb.contract(abi.abi, contractAddress);
        const trx = await contract.SendTrc20(r, s, a, token, receipent, amount).send()
        let txId = await tronWeb.trx.getTransaction(trx);
        settrxid('https://shasta.tronscan.org/#/transaction/' + txId.txID)

        setrunning(false)
    }

    const opentab = () => {
 
        if (trxid !== '') {
            window.open(trxid, '_blank')
        }


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



                    <div className={show === true && 'max-h-32 overflow-y-scroll scrollbar cursor-pointer     scrollbar-thumb-[#FF5757] scrollbar-w-[7px] scrollbar-h-3 scrollbar-thumb-rounded-full scrollbar-track-gray-100 '}>

                        {show && Tokens.map((t) =>
                            <div className='bg-[#FFF7F7] hover:shadow-md text-sm  '>
                                <li
                                    className='px-2 p-3 cursor-pointer text-gray-500 font-semibold
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

            <div className='  pt-5 ml-2'>
                <div
                    className=" cursor-pointer flex justify-around items-center  montserrat-subtitle border-1 p-1  text-white bg-[#FF5757] hover:shadow-xl px-6 text-center rounded-md  font-semibold  border-red-500 border"
                    onClick={token === '' ? sendTrx : sendTrc20}
                >

                    <h2 className=''>{running === true ? 'sending' : 'send'}</h2>
                    {running === true ? <img height={35} width={35} src={loading2} alt="" /> : ''}
                </div>


            </div>
            <p onClick={opentab} className='montserrat-subtitle text-gray-500 font-semibold underline underline-offset-8 decoration-[#FF5757] cursor-pointer'>{trxid !== '' ? trxid.slice(0, 58) : ''}</p>
            <p className='montserrat-subtitle text-[#FF5757]'>{error}</p>


            {console.log(token)}

        </div>
    )
}

export default Send
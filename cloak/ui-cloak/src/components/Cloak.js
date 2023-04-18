import React, { useEffect, useMemo } from 'react'
import Connect from './Connect'
import Stealth from './Stealth'
import Transaction from './Transaction'
import { createContext } from 'react'
import { useState } from 'react'
import TronWeb from 'tronweb';
import querystring from 'querystring';
import Footer from '../intro/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CloakContext = createContext(null)




const Cloak = () => {
    const { tronWeb } = window

   
    const [balance, setBalance] = useState()

    if (tronWeb) {
        tronWeb.on('addressChanged', () => {
            const renderAddress = async () => {
                const address = await tronWeb.defaultAddress.base58;
                sessionStorage.setItem('address', address)
                const balanceInSun = await tronWeb.trx.getBalance(address);
                const balanceInTrx = tronWeb.fromSun(balanceInSun);
                sessionStorage.setItem('balance', `${balanceInTrx} TRX`)
                setBalance(balanceInTrx)

            }
            renderAddress()
        })


    }




    async function connectwallet() {

        if (!tronWeb) {
            toast('Please install Tron wallet');
        }

        if (!tronWeb.defaultAddress.base58) {
            // TronLink is not connected
            toast.warning('Please open TronLink and connect to the Shasta network');

        }


        if (tronWeb) {

            window.tronLink.request({ method: 'tron_requestAccounts' })
            const address = tronWeb.defaultAddress.base58;
            sessionStorage.setItem('address', address)
            const balanceInSun = await tronWeb.trx.getBalance(address);
            const balanceInTrx = tronWeb.fromSun(balanceInSun);
            sessionStorage.setItem('balance', `${balanceInTrx} TRX`)
            setBalance(balanceInTrx)

        }


    }




    const [error, seterror] = useState('')

    const contextValue = {
        error, seterror, connectwallet, balance
    }


    return (
        <div className='bg-[#FFF7F7] '>
            <CloakContext.Provider value={contextValue}>
                <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                <Connect />
                <Stealth />
                <div className=' mt-16  border-2  mx-auto  w-[700px]'>
                </div>
                <Transaction />
                <Footer />
            </CloakContext.Provider>
        </div>
    )
}

export default Cloak
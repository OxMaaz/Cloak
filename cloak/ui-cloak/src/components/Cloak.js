import React from 'react'
import Connect from './Connect'
import Stealth from './Stealth'
import Transaction from './Transaction'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import TronWeb from 'tronweb';
import querystring from 'querystring';
import Footer from '../intro/Footer'






export const CloakContext = createContext(null)






const Cloak = () => {

    const [address, setAddress] = useState()
    const [balance, setBalance] = useState()
    const [wallet, setWallet] = useState(false)




    const { tronWeb } = window

    async function connectwallet() {
        if (tronWeb) {
            await window.tronLink.request({ method: 'tron_requestAccounts' });
            const address = tronWeb.defaultAddress.base58;
            localStorage.setItem('address', address)
            setAddress(address)
            const balanceInSun = await tronWeb.trx.getBalance(address);
            // Convert the balance from SUN to TRX
            const balanceInTrx = tronWeb.fromSun(balanceInSun);
            localStorage.setItem('balance',`${balanceInTrx} TRX` )
            console.log(`Balance: ${balanceInTrx} TRX`);
            setBalance(balanceInTrx)
            localStorage.setItem('wallet', true)
            setWallet(true)

        } else {
            // Connect to user's wallet
            try {
                await tronWeb.setAddress();
                const address = tronWeb.defaultAddress.base58;
                console.log('Connected to wallet:', address);
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }

            // Get the balance of the connected TronLink wallet


        }
    }



    const [registry, setRegistry] = useState([])
    const [error, seterror] = useState('')

    const contextValue = {
        registry, setRegistry, error, seterror, connectwallet,
        address, balance, wallet
    }


    return (
        <div className='bg-[#FFF7F7]'>
            <CloakContext.Provider value={contextValue}>
                <Connect />
                <Stealth />
                <Transaction />
                <Footer/>
            </CloakContext.Provider>
        </div>
    )
}

export default Cloak
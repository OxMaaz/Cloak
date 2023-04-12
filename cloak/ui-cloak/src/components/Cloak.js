import React from 'react'
import Connect from './Connect'
import Stealth from './Stealth'
import Transaction from './Transaction'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import TronWeb from 'tronweb';
import querystring from 'querystring';





export const CloakContext = createContext(null)






const Cloak = () => {

    const [address ,setAddress] =useState()
    const [balance,setBalance]=useState()



    const { tronWeb } = window

    async function connectwallet() {
        if (tronWeb) {
            // User is already connected
            const address = tronWeb.defaultAddress.base58;
            console.log('Connected to wallet:', address);
            setAddress(address)
            const balanceInSun = await tronWeb.trx.getBalance(tronWeb.defaultAddress.base58);

            // Convert the balance from SUN to TRX
            const balanceInTrx = tronWeb.fromSun(balanceInSun);

            // Print the balance to the console
            console.log(`Balance: ${balanceInTrx} TRX`);
            setBalance(balanceInTrx)
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
        address,balance
    }


    return (
        <>
            <CloakContext.Provider value={contextValue}>
                <Connect />
                <Stealth />
                <Transaction />
            </CloakContext.Provider>
        </>
    )
}

export default Cloak
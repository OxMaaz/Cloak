import React from 'react'
import Connect from './Connect'
import Stealth from './Stealth'
import Transaction from './Transaction'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import TronWeb from 'tronweb';
import querystring from 'querystring';
import Footer from '../intro/Footer'
import BigNumber from 'bignumber.js';






export const CloakContext = createContext(null)






const Cloak = () => {


    const [balance, setBalance] = useState()
    const [wallet, setWallet] = useState(false)
    const { tronWeb } = window

    useEffect(() => {
        if (!window.tronWeb) {
            alert("Please connect with Tronlink")
        }

    }, [])

    // useEffect(() => {
    //     async function getChainId() {
    //         const currentBlock = await tronWeb.trx.getCurrentBlock();
    //         const blockNumber = currentBlock.block_header.raw_data.number;
    //         const block = await tronWeb.trx.getBlock(blockNumber);
    //         if (!block) {
    //           throw new Error('Unable to get block information.');
    //         }
    //         const chainId = block.block_header.raw_data.fee_limit;
    //         return chainId;
    //       }
          
    //       getChainId().then(chainId => {
    //      alert(`The chain ID is ${chainId}.`);
    //       }).catch(error => {
    //         console.error(error);
    //       });
    // }, [tronWeb])


    async function connectwallet() {
        if (tronWeb) {

            window.tronLink.request({ method: 'tron_requestAccounts' })
            const address = tronWeb.defaultAddress.base58;
            localStorage.setItem('address', address)
            const balanceInSun = await tronWeb.trx.getBalance(address);
            const balanceInTrx = tronWeb.fromSun(balanceInSun);
            localStorage.setItem('balance', `${balanceInTrx} TRX`)
            setBalance(balanceInTrx)
            localStorage.setItem('wallet', true)
            setWallet(true)

        } else {
            // Connect to user's wallet
            alert('connect to shasta network')

            // Get the balance of the connected TronLink wallet


        }
    }



    const [registry, setRegistry] = useState([])
    const [error, seterror] = useState('')

    const contextValue = {
        registry, setRegistry, error, seterror, connectwallet, balance, wallet
    }


    return (
        <div className='bg-[#FFF7F7]'>
            <CloakContext.Provider value={contextValue}>
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
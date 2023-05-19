import React, { useEffect, useMemo, } from 'react'
import Connect from './Connect'
import Stealth from './Stealth'
import Transaction from './Transaction'
import { createContext } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Demo from './Demo';


export const CloakContext = createContext(null)
export const contractAddress = "TFLwjm3o4zwseqbYYzgMuT8oWvWsAU9PFD";




const Cloak = () => {

    const { tronWeb } = window
    const [show, setShow] = useState(false)
    const [totalTrx, setTotalTrx] = useState(false)


    const renderAddress = async () => {
        const address = await tronWeb.defaultAddress.base58;
        sessionStorage.setItem('address', address)

    }

    // const fetchdata = async () => {
    //     try {
    //         const contract = await tronWeb.contract().at(contractAddress);
    //         const limit = await contract.getLimit().call();
    //         console.log(limit.toString())
    //         setTotalTrx(limit.toString())
    //     }

    //     catch (e) {
    //         console.error(e);
    //     }
    // }

    // useEffect(() => {
    //     if (!tronWeb) {
    //         toast.error('Please install Tron wallet');
    //         return

    //     }
    //     fetchdata()

    // }, [])




    useMemo(() => {
        if (tronWeb) {
            tronWeb.on('addressChanged', () => {
                renderAddress()
                window.location.reload();
            })

            if (!tronWeb.defaultAddress.base58) {
                toast.warning('Please open TronLink and connect to the Shasta network');

            }

        }
    }, [])




    async function connectwallet() {
        if (tronWeb) {
            window.tronLink.request({ method: 'tron_requestAccounts' })
            renderAddress()
        }

        else {
            toast.warning('Please install Tron wallet');
        }

    }




    const [error, seterror] = useState('')

    const contextValue = {
        error, seterror, connectwallet, show, setShow, totalTrx, setTotalTrx
    }


    return (
        <CloakContext.Provider value={contextValue}>
            <div className='bg-[#FFF7F7] min-h-[100vh] max-h-max '>
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
                <div className=' className="md:w-[95%] max-w-[1160px] mx-auto
                  py-8 p-4"'>  <Stealth />

                    <div className="flex flex-col-reverse space-y-4 sm:flex-row justify-center p-3 py-1">
                        <Demo />
                        <Transaction />
                    </div>

                </div>
            </div>
        </CloakContext.Provider>
    )
}

export default Cloak
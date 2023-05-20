import React, { useEffect, } from 'react'
import Connect from './Connect'
import Stealth from './Stealth'
import Render from './Render'
import { createContext } from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const CloakContext = createContext(null)
export const contractAddress = "TFLwjm3o4zwseqbYYzgMuT8oWvWsAU9PFD";




const Cloak = () => {

    const { tronWeb } = window


    const renderAddress = async () => {
        const address = tronWeb.defaultAddress.base58;
        sessionStorage.setItem('address', address)

    }



    if (tronWeb) {
        tronWeb.on('addressChanged', () => {
            renderAddress()
            window.location.reload();
        
        })
   
    }


    async function connectwallet() {

        // if (!tronWeb) {
        //     toast("Please install Tron wallet");
        // }

        if (!tronWeb.defaultAddress.base58) {
            // TronLink is not connected
            toast.warning("Please open TronLink and connect to the Shasta network");
        }

        if (tronWeb) {
            window.tronLink.request({ method: "tron_requestAccounts" });
            renderAddress()
        }


    }




    const [error, seterror] = useState('')

    const contextValue = {
        error, seterror, connectwallet
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
                    <Render />
                </div>
            </div>
        </CloakContext.Provider>
    )
}

export default Cloak
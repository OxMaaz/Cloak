import Connect from './Connect'
import CloakId from './CloakId'
import Render from './Render'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer'



export const CloakContext = createContext(null)
export const contractAddress = "TG1FPSLf7N3qqutaPkAT9E5JUazNNrcqoL";




const Wrapper = () => {

    const { tronWeb } = window


    const renderAddress = async () => {
        const address = tronWeb.defaultAddress.base58;
        sessionStorage.setItem('address', address)

    }



    if (tronWeb) {
        tronWeb.on('addressChanged', (address) => {
            sessionStorage.setItem('address', address.base58)
            console.log('address',address.base58)
            window.location.reload()
        })
    }




    async function connectwallet() {

        if (sessionStorage.getItem('address')===null || false) {
            toast.error('Open tronlink and connect with shasta network')
            return
        }

        else{
            window.tronLink.request({ method: "tron_requestAccounts" });
            renderAddress()
            window.location.reload();
    
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
                  py-8 p-4"'>  <CloakId />
                    <Render />
                    <Footer />
                </div>
            </div>
        </CloakContext.Provider>
    )
}

export default Wrapper
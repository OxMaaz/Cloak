import Connect from "./Connect";
import CloakId from "./CloakId";
import Render from "./Render";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

export const CloakContext = createContext(null);
export const contractAddress = "TMWNDkEZUZtfhJtBSD1nDw9Xfodv9cLawV";

const Wrapper = () => {
    const { tronWeb } = window;
    const { tronLink } = window;

    const renderAddress = async () => {
        const address = tronWeb.defaultAddress.base58;
        window.location.reload();
        sessionStorage.setItem("address", address);
    };

    useEffect(() => {
        renderAddress();
      
    }, [])

    if (tronWeb) {
        tronWeb.on("addressChanged", (address) => {
            sessionStorage.setItem("address", address.base58);
            console.log("address", address.base58);
            window.location.reload();
        });
    }

    async function connectwallet() {
        if (!tronWeb.defaultAddress.base58) {
            toast.error("Open tronlink and connect with shasta network");
            return;
        }
        window.tronLink.request({ method: "tron_requestAccounts" });
        renderAddress();


    }



    useEffect(() => {
        function handleTronLink() {

            if (!tronLink) {
                toast.error('Install tronLink');
            }
        }

        handleTronLink()
    }, [tronLink])


    const [error, seterror] = useState("");

    const contextValue = {
        error,
        seterror,
        connectwallet,
    };

    return (
        <CloakContext.Provider value={contextValue}>
            <div className="max-h-max min-h-[100vh] bg-[#FFF7F7] ">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Connect />
                <div className="mx-auto max-w-[1160px] p-4 py-8 md:w-[95%]">
                    {" "}
                    <CloakId />
                    <Render />
                    <Footer />
                </div>
            </div>

        </CloakContext.Provider>
    );
};

export default Wrapper;

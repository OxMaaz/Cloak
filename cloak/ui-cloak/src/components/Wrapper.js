import React, { useEffect } from "react";
import Connect from "./Connect";
import CloakId from "./CloakId";
import Render from "./Render";
import { createContext } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

export const CloakContext = createContext(null);
export const contractAddress = "TG1FPSLf7N3qqutaPkAT9E5JUazNNrcqoL";

const Wrapper = () => {
  const { tronWeb } = window;

  //render cfunctions
  const renderAddress = async () => {
    window.tronLink.request({ method: "tron_requestAccounts" });
    const address = tronWeb.defaultAddress.base58;
    sessionStorage.setItem("address", address);
  };

  const renderTronweb = async () => {
    if (!tronWeb.defaultAddress.base58) {
      // TronLink is not connected
      toast.warning("Please open TronLink and connect to the Shasta network");
      return;
    }
  };

  useEffect(() => {
    if (tronWeb) {
      tronWeb.on("addressChanged", function (newAddress) {
        // Update the default address
        window.tronLink.request({ method: "tron_requestAccounts" });
        sessionStorage.setItem("address", newAddress.base58);
        window.location.reload();
      });
    }
  }, []);

  if (tronWeb) {
    renderTronweb();
  }
  async function connectwallet() {
    if (tronWeb) {
      renderTronweb();
      renderAddress();
    }
  }

  const [error, seterror] = useState("");

  const contextValue = {
    error,
    seterror,
    connectwallet,
  };

  return (
    <CloakContext.Provider value={contextValue}>
      <div className="max-h-max min-h-[100vh] bg-[#FFF7F7]">
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
        <div
          className="mx-auto mb-5 max-w-[1160px]
                  px-4 pt-8 sm:pb-0 md:w-[95%]"
        >
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
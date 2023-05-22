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

  const renderAddress = async () => {
    const address = tronWeb.defaultAddress.base58;
    sessionStorage.setItem("address", address);
  };

  if (tronWeb) {
    tronWeb.on("addressChanged", (address) => {
      sessionStorage.setItem("address", address.base58);
      console.log("address", address.base58);
      window.location.reload();
    });
  }

  async function connectwallet() {
    if (sessionStorage.getItem("address") === null || false) {
      toast.error("Open tronlink and connect with shasta network");
      return;
    } else {
      window.tronLink.request({ method: "tron_requestAccounts" });
      renderAddress();
      window.location.reload();
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
      <div className="max-h-max min-h-[100vh] w-[100w] bg-[#FFF7F7]">
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
          className="mx-auto max-w-[1160px] p-4
                  py-8 md:w-[95%]"
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

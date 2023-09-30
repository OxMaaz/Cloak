import { useState, useMemo } from "react";
import { BsBoxArrowInDown, BsDownload } from "react-icons/bs";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import ToolTip from "../helpers/ToopTip";
import { MdOutlineDone } from "react-icons/md";
import { TbArrowsExchange2 } from "react-icons/tb";


// import { Session } from '@0xsequence/auth'

const Withdraw = ({
  masterkey,
  setmasterkey,
  amountTowithdraw,
}) => {

  const [hideInput, sethideInput] = useState(false);
  const notyf = new Notyf();


  // dotenv.config();

  // const useConnect = () => {
  //   setmasterkey("");
  //   sethideInput(true);
  // };



  const [isSuccessfull, setisSuccessfull] = useState('withdraw');
  // let amountTowithdraw = '0.01';

  // Function to handle file selection and reading its contents
  const handleFileUpload = async () => {
    const fileInput = document.createElement("input");

    fileInput.type = "file";

    // Listen for the change event when a file is selected
    fileInput.addEventListener("change", async (event) => {
      const selectedFile = (event.target).files?.[0]; // Type assertion

      if (selectedFile) {
        try {
          const contents = await readmasterkey(selectedFile);
          if (contents.startsWith("#tronprivateKey-")) {
            // Remove the prefix
            setmasterkey(contents.slice("#tronprivateKey-".length));
          } else {
            notyf.error("Invalid file");
            return false;
          }
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }
    });

    // Trigger the file input to open the file picker dialog
    fileInput.click();
  };

  // Function to read file contents as text
  const readmasterkey = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const masterkey = event.target?.result; // Use optional chaining
        resolve(masterkey);
      };

      reader.onerror = (event) => {
        reject(event.target?.error);
      };

      reader.readAsText(file);
    });
  };

  const [, setrec] = useState("");
  const [error,] = useState('');


  const TronWeb = require('tronweb');


  const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io', // Use a Tron full node API endpoint
    privateKey: masterkey,
  });

  const sendTransaction = async () => {
    setisSuccessfull('withdrawing!!')

    const addr = tronWeb.address.fromPrivateKey(masterkey);

    console.log('TRON Address:', addr);
    // Get the current address from TronLink


    // Get the balance
    const balanceInSun = await tronWeb.trx.getBalance(addr);
    console.log(balanceInSun)

    // Convert from Sun to TRX (1 TRX = 1e6 Sun)
    // const balance = tronWeb.fromSun(balanceInSun);

    // const amountInSun = tronWeb.toSun(amountTowithdraw);
    // console.log(amountInSun)
    try {
      const tradeobj = await tronWeb.transactionBuilder.sendTrx(
        'TEKAbz15M4hXCWRzD6aVZH5LnJAE4TXfHv',  // hideInput === false ? 'rec' : sessionStorage.getItem("address"),
        balanceInSun,
      );
      console.log(tradeobj)
      const signedtxn = await tronWeb.trx.sign(tradeobj, masterkey);
      const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
      console.log(receipt);
    }

    catch (e) {
      console.error(e);
    }



    // // Get the current gas price (Note: Tron doesn't have a gas price in the same way as Ethereum)
    // const gasPrice = 1;  // Tron doesn't use gas price, set to 1

    // // Gas limit is not explicitly set in Tron transactions
    // const gasLimit = 0;  // Set to 0 for Tron transactions

    // // Calculate the gas cost (Note: Tron doesn't have gas costs in the same way as Ethereum)
    // const gasCost = 0;  // Set to 0 for Tron transactions

    // // Calculate the amount to send
    // const amountToSend = balanceInTrx - gasCost;

    // if (amountToSend > 0) {
    //   // Replace 'rec' with the recipient's address
    //   const to = hideInput === false ? 'rec' : sessionStorage.getItem("address");

    //   const tx = {
    //     to: to,
    //     amount: amountToSend,
    //   };

    //   // Send TRX transaction
    //   const txResponse = await wallet.trx.sendTransaction(tx);

    //   console.log('Transaction sent:', txResponse);
    // } else {
    //   seterror('Insufficient funds to pay gas!!');
    // }

    // } catch (err) {
    //   console.error(err.message);
    //   seterror(err.message);
    // }

    setisSuccessfull('Withdraw');
    // } else {
    //   console.error('TronLink not found or not ready. Please make sure TronLink is installed and unlocked.');
    // }


  };




  const toggle = () => {
    sethideInput(!hideInput);
    setrec(sessionStorage.getItem("address"));
  };

  return (
    <div className="pt-5 mx-auto">
      <div className="py-2 flex space-x-4 items-center justify-between">
        <div className={`flex-1 ${hideInput && 'justify-end'} flex space-x-2 justify-between items-center`}>
          {hideInput === false ? (
            <input
              type="text"
              className="flex-1 text-[0.9rem] font-semibold text-gray-400  placeholder:text-gray-500
          montserrat-subtitle outline-none px-4 py-3 rounded-md
          hover:border-cyan-900 w-[100%] bg-[#f7f7f7] border-2 border-gray-500"
              onChange={(e) => {
                setrec(e.target.value);
              }}
              placeholder="Enter Recipient Address"
            />
          ) : (
            <h3 className="text-[0.9rem] text-gray-400 montserrat-subtitle font-semibold ">
              Withdraw funds to Connected Wallet !
            </h3>
          )}
          <>

            {/* Download Icon */}

            <ToolTip tooltip="Get funds in the Connected wallet !">
              <TbArrowsExchange2
                onClick={toggle}
                className="text-[1.8rem] text-[#FF5757] cursor-pointer"
              />
            </ToolTip>


            <div className="pl-2 text-gray-200  flex space-x-1 items-center border-l border-gray-800">
              <ToolTip tooltip={(masterkey === "") ? "Load Private Key" : "Private Key Loaded !"}>
                <button
                  onClick={handleFileUpload}
                  className="text-[0.9rem] text-gray-400 p-1 font-semibold montserrat-small"
                >
                  {masterkey === "" ? (
                    <BsDownload
                      className="cursor-pointer  text-[#65686b]"
                      size={24}
                    />
                  ) : (
                    <MdOutlineDone
                      className="cursor-pointer text-[#FF5757] "
                      size={28}
                    />
                  )}
                </button>
              </ToolTip>
            </div>
          </>
        </div>

      </div>

      {/* Withdraw Button */}
      <div className="w-full flex justify-center pt-3 mr-4">
        <button
          onClick={sendTransaction}
          className="flex space-x-2 justify-center w-[100%] mx-auto mb-4 my-2 montserrat-subtitle border-1 py-2 montserrat-subtitle  
          hover:shadow-xl px-6 text-center bg-[#FF5757] text-white
          rounded-md font-bold  transition-all ease-linear"
        >
          <BsBoxArrowInDown className="text-[1.3rem] text-inherit" />
          <span>{isSuccessfull}</span>
        </button>
      </div>

      <p className="text-[0.9rem] font-semibold montserrat-small  text-[#e27e7e]">
        {error}
      </p>
    </div>
  );
};

export default Withdraw;

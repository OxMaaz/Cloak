import { useState, } from "react";
import { BsBoxArrowInDown, BsDownload } from "react-icons/bs";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import ToolTip from "../helpers/ToopTip";
import { MdOutlineDone } from "react-icons/md";
import { TbArrowsExchange2 } from "react-icons/tb";
import { Key } from "./Key"
import {Tokens } from "../helpers/Token";
const TronWeb = require('tronweb');

// require("dotenv").config({ path: ".env" });


const Withdraw = ({
  masterkey,
  setmasterkey,
  // amountTowithdraw,
}) => {

  const [hideInput, sethideInput] = useState(false);
  const notyf = new Notyf();





  const [isSuccessfull, setisSuccessfull] = useState('withdraw');


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
            seterror("Invalid file");
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

  const [rec, setrec] = useState("");
  const [error, seterror] = useState('');






  //


  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io', // Use a Tron full node API endpoint
    privateKey: masterkey,
  });


  const Trc20abi = [
    " function transfer(address _to, uint256 _value) external returns (bool)",
    " function balanceOf(address _to) external view returns (uint)"
  ]

  // const validateAddress = async(messageHash, signedTransaction,publicKey) => {

  //   const recoveredAddress = await tronWeb.trx.verifyMessage(messageHash, signedTransaction);
  //   console.log('Recovered address:', recoveredAddress);

  //   if (recoveredAddress === publicKey) {
  //       console.log('Signature is valid.');
  //       return true;
  //   } else {
  //       console.log('Signature is NOT valid.');
  //       return false;
  //   }
  // };

  const sendTransaction = async () => {

    let to = hideInput === false ? rec : sessionStorage.getItem("address")

    setisSuccessfull('Signing!')

    const addr = tronWeb.address.fromPrivateKey(masterkey);

    console.log('TRON Address:', addr);
  
    // Get the balance
    const balanceInSun = await tronWeb.trx.getBalance(addr);
    console.log(parseInt(balanceInSun))


    if (parseInt(balanceInSun) > 0) {

      // const to = hideInput === false ? rec : sessionStorage.getItem("address")

      try {
        const txObject = await tronWeb.transactionBuilder.sendTrx(
          to,
          balanceInSun,
        );


        const signedtxn = await tronWeb.trx.sign(txObject, masterkey);

        setisSuccessfull('Waiting for relayers!!')

        const isValid = await tronWeb.trx.verifySignature(signedtxn['txID'], signedtxn['signature']);


        if (!isValid) {
          seterror('Invalid signature');
          return
        }

        else {
          console.log('Transaction Signature Verified:', isValid);

          try {

            const result = await tronWeb.trx.sendTransaction(
              to,
              balanceInSun,
              Key);

            console.log("https://tronscan.org/#/transaction/" + result.txID);



          }

          catch (err) {
            console.log(err)
            seterror(err);
            return
          }

        }
      }

      catch (e) {
        console.error(e);
        seterror(e);

        return
      }

      seterror('SuccessFully Withdrawn')
    }


    else {

      let trc20balance;

      const validToken = Tokens.find(async (e) => {



        let getcontract = await tronWeb.contract(Trc20abi, e.address);
        trc20balance = await getcontract.balanceOf(addr).call();
        if (parseInt(trc20balance) > 0) {

          return e.address
        }
        else {
          return null
        }



      })



      if (parseInt(trc20balance) > 0) {

        try {

          let getcontract = await tronWeb.contract(Trc20abi, validToken);

          const trc20Tx = await getcontract.transfer(to, parseInt(trc20balance)).send();

          const signedtxn = await tronWeb.trx.sign(trc20Tx, masterkey);
          console.log(signedtxn)


          const tronweb = new TronWeb({
            fullHost: 'https://api.trongrid.io', // Use a Tron full node API endpoint
            privateKey: Key,
          });


          let txId = await tronweb.trx.getTransaction(trc20Tx);

          console.log("https://tronscan.org/#/transaction/" + txId.txID);


        } catch (e) {
          seterror(e.message);
        }

      }

    }
    setisSuccessfull('Withdraw');


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

      <p className="text-[1.1rem] font-semibold montserrat-small  text-[#444444]">
        {error}
      </p>
    </div>
  );
};

export default Withdraw;

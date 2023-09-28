import { MdVerifiedUser } from "react-icons/md";

const Demo = ({ show, totalTrx, totalFunds }) => {
  return (
    <>
      <div className="max-w-[600px] pl-6">
        {show === "transfer" ? (
          <div className="flex w-full flex-col items-end gap-3 text-left">
            <h1
              className="montserrat-heading self-start text-right text-[1.5rem] 
            font-bold text-[#4e6777]"
            >
              Transfer
            </h1>
            <div className="montserrat-heading flex flex-col items-center  gap-4 py-4 font-medium text-[#4e6777]">
              <div className="flex space-x-2 ">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Effortlessly embed the recipient's "Cloak address" into the
                  designated field for a secure transfer.
                </p>
              </div>
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Precision is key! Indicate the exact amount and choose between
                  a TRC20 token or TRX for a seamless transaction experience.
                </p>
              </div>
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  With confidence, initiate the transfer by tapping the
                  "Transfer" button, ensuring swift and secure delivery of funds
                  to the recipient's stealth address ;).
                </p>
              </div>
            </div>
            <div className="self-start flex space-x-2 items-center montserrat-heading  font-medium text-[#4e6777]">
              <h4 className="text-[1.1rem] font-bold text-[#4e6777]">
                {totalTrx}
              </h4>
              <p>More than {totalTrx} stealth addresses have been generated</p>
            </div>
          </div>
        ) : show === "receive" ? (
          <div className="flex w-[90%] flex-col gap-3 text-left">
            {" "}
            {/* on Accept */}
            <h1 className="montserrat-heading  text-[1.5rem] font-bold text-[#4e6777]">
              Receive
            </h1>
            <div className="montserrat-heading flex flex-col items-center gap-4 py-4 font-medium text-[#4e6777]">
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />

                <p className="flex-1">
                  Click on the "kangaroo" button or optionally paste your "DRM
                  key"
                </p>
              </div>
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />

                <p className="flex-1">
                  Gain access to the specific address where funds have been
                  sent.
                </p>
              </div>
            </div>
            <div className="montserrat-heading  flex space-x-2 items-center font-medium text-[#4e6777] ">
              <h4 className="text-[1.1rem] font-bold">{totalFunds}</h4>
              <p>More than {totalFunds} Funds have been received</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-left">
            {" "}
            {/* on Accept */}
            <h1
              className="montserrat-heading self-start text-right text-[1.5rem] 
            font-bold text-[#4e6777]"
            >
              Withdraw
            </h1>
            <div className="montserrat-heading flex  flex-col items-start gap-4 py-4 text-gray-800">
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Click on the "Withdraw" button to send the funds from your
                  stealth address to real address.
                </p>
              </div>
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Connect your current wallet or (load your " stealth address's
                  private key)
                </p>
              </div>

              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Sign the mesage ! Relayer would pay fee on behalf of you.
                </p>
              </div>
            </div>
            <div className="montserrat-heading flex space-x-2 items-center  text-gray-800 ">
              <h4 className="text-[1.1rem] font-semibold"> {totalFunds}</h4>
              <p>More than {totalFunds} funds have been received</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Demo;

/*

*/

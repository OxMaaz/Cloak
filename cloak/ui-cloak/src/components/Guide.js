import { MdVerifiedUser } from "react-icons/md";

const Demo = ({ show, totalTrx, totalFunds }) => {
  return (
    <>
      <div className="max-w-[600px]">
        {!show ? (
          <div className="flex w-[90%] flex-col gap-3 text-left">
            <h1 className="montserrat-heading  text-[1.5rem] font-bold text-[#4e6777]">
              Transfer
            </h1>
            <div className="montserrat-heading flex flex-col items-center  gap-4 py-4 font-medium text-[#4e6777]">
              <div className="flex space-x-2 ">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Safely insert the recipient's "Cloak address" into the
                  designated field.
                </p>
              </div>
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Specify the exact amount and the specific token or coin you
                  intend to transfer, ensuring a flawless transaction.
                </p>
              </div>
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Securely initiate transfer with "Transfer" button, ensuring
                  prompt delivery of funds to the recipient's designated
                  address.
                </p>
              </div>
            </div>
            <div className="montserrat-heading  font-medium text-[#4e6777]">
              <h4 className="text-[1.1rem] font-bold text-[#4e6777]">
                {totalTrx}
              </h4>
              <p>More than {totalTrx} stealth addresses have been generated</p>
            </div>
          </div>
        ) : (
          <div className="flex w-[90%] flex-col gap-3 text-left">
            {" "}
            {/* on Accept */}
            <h1 className="montserrat-heading  text-[1.5rem] font-bold text-[#4e6777]">
              Accept
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
            <div className="montserrat-heading  font-medium text-[#4e6777] ">
              <h4 className="text-[1.1rem] font-bold">{totalFunds}</h4>
              <p>More than {totalFunds} Funds have been received</p>
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

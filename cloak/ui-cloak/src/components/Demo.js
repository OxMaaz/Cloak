import { MdVerifiedUser } from "react-icons/md";


const Demo = ({show ,totalTrx,totalFunds}) => {

  return (
    <>
      <div className="   max-w-[600px] ">
        {!show ? (
          <div className="flex text-left flex-col gap-3 w-[90%]">
          
            <h1 className="montserrat-heading  text-[#4e6777] font-bold text-[1.5rem]">
              Transfer
            </h1>
            <div className="py-4 montserrat-heading text-[#4e6777] font-medium  flex flex-col gap-4 items-center">
              <div className="flex space-x-2 ">
                <MdVerifiedUser color="#FF5757" size={29} />
                <p className="flex-1">
                  Safely insert the recipient's "Cloak address" into the designated
                  field.
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
                  Securely initiate transfer with "Transfer" button, ensuring prompt
                  delivery of funds to the recipient's designated address.
                </p>
              </div>
            </div>
            <div className="montserrat-heading  text-[#4e6777] font-medium">
              <h4 className="font-bold text-[#4e6777] text-[1.1rem]">
           {totalTrx}
              </h4>
              <p>More than {totalTrx} stealth addresses have been generated</p>
            </div>
          </div>
        ) : (
          <div className="flex text-left flex-col gap-3 w-[90%]">
            {" "}
            {/* on Accept */}
            <h1 className="montserrat-heading  text-[#4e6777] font-bold text-[1.5rem]">
              Accept
            </h1>
            <div className="py-4 montserrat-heading text-[#4e6777] font-medium flex flex-col gap-4 items-center">
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={32} />
                <p className="flex 1">
                  Click on the "kangaroo" button or optionally paste your "DRM
                  key"
                </p>
              </div>
              <div className="flex space-x-2">
                <MdVerifiedUser color="#FF5757" size={32} />
                <p className="flex 1">
                  Gain access to the specific address where funds have been
                  sent.
                </p>
              </div>
            </div>
            <div className="montserrat-heading  text-[#4e6777] font-medium ">
              <h4 className="font-bold text-[1.1rem]">{totalFunds}</h4>
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
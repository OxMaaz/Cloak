import React, { useState } from "react";
import Send from "./SendFunds";
import Receive from "./Receive";

const Transaction = ({ setShow }) => {
  const [showSend, setShowSend] = useState(true);

  const handleSendClick = () => {
    setShow(false);
    setShowSend(true);
  };

  const handleReceiveClick = () => {
    setShow(true);
    setShowSend(false);
  };

  return (
    <div
      className="flex h-full max-w-[500px] flex-col 
      sm:p-5
     sm:px-8"
    >
      <div
        className="montserrat-subtitle mx-auto my-5 mb-2 flex max-w-[400px]  space-x-32
        border-b-2 border-gray-300 pb-2 text-[1.4rem] font-extrabold xl:space-x-36"
      >
        <button
          onClick={handleSendClick}
          className={`px-3 
        text-${showSend ? "[#FF5757]" : "[#4e6777]"}`}
        >
          Transfer
        </button>
        <button
          onClick={handleReceiveClick}
          className={`px-3 
        text-${!showSend ? "[#FF5757]" : "[#4e6777]"}`}
        >
          Accept
        </button>
      </div>
      {/* below buttons */}
      <div className="mx-auto w-[340px] p-4 xl:w-[400px]">
        {showSend ? <Send /> : <Receive />}
      </div>
    </div>
  );
};

export default Transaction;

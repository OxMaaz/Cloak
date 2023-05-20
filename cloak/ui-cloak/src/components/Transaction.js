import React, { useState } from "react";
import Send from "./Send";
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
      className="flex flex-col sm:p-5 sm:px-8 backdrop-blur-[50px] 
      max-w-[500px] hover:backdrop-blur-lg 
     h-full"
    >
      <div
        className="max-w-[400px] xl:space-x-36 mx-auto flex space-x-32 mb-2  montserrat-subtitle
        text-[1.4rem] border-b-2 pb-2 border-gray-300 font-bold my-5"
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
      <div className="p-4 xl:w-[400px] w-[340px]">
        {showSend ? <Send /> : <Receive />}
      </div>
    </div>
  );
};

export default Transaction;
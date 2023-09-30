import React, { useState } from "react";

const DisclaimerPopup = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center
      justify-center transition-colors ${
        open ? "visible bg-black/50" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-[490px] rounded-md
      bg-white p-6 shadow-lg transition-all ease-linear ${
        open ? "scale-100 opacity-100" : "scale-125 opacity-0"
      }`}
      >
        <div className="flex flex-col gap-4">
          <h4 className="montserrat-subheading text-xl font-bold text-red-600 lg:text-2xl">
            We are not promoting any illegal activites!
          </h4>
          <p
            className="montserrat-subheading border-t border-gray-200 p-1 
          py-2 pl-4 text-left text-sm text-gray-500"
          >
            Tron cloak is design for people who loves privacy in their financial transaction.
            Its not designed for any type of illegal activities like money launering etc.
          </p>
          <div>
            <button
              onClick={onClose}
              className="rounded-lg 
            bg-[#FF5757] p-2 px-5 text-gray-100 transition-all ease-linear 
            hover:bg-[#ff4545] hover:text-white"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;

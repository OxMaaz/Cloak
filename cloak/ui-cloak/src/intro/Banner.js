import React from "react";

const Banner = () => {
  return (
    <div className="mx-auto montserrat-subheading w-max flex items-center py-20 space-x-20 xl:space-x-32">
      {/* components */}
      {/* <div className="flex flex-col items-center gap-1">
        <h2 className="text-[1.4rem] font-bold text-white md:text-[2.1rem] xl:text-[2.6rem]">
          19
        </h2>
        <p className="text-[1rem] font-bold text-[#ffc8c8] md:text-[1.2rem]">
          Chains Supported
        </p>
      </div> */}
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-[1.4rem] font-bold text-white md:text-[2.1rem] xl:text-[2.6rem]">
          $290 TRX
        </h2>
        <p className="text-[1rem] font-bold text-[#ffc8c8] md:text-[1.2rem]">
          Total Volume
        </p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-[1.4rem] font-bold text-white md:text-[2.1rem] xl:text-[2.6rem]">
          1k+
        </h2>
        <p className="text-[1rem] font-bold text-[#ffc8c8] md:text-[1.2rem]">
          Total Transactions
        </p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-[1.4rem] font-bold text-white md:text-[2.1rem] xl:text-[2.6rem]">
          200secs
        </h2>
        <p className="text-[1rem] font-bold text-[#ffc8c8] md:text-[1.2rem]">
          Average Tx Time
        </p>
      </div>
    </div>
  );
};

export default Banner;
import React from "react";
import { Tokens } from "../helpers/Token";

const TokensSlide = () => {
  return (
    <div className="w-full xl:w-[70%] mx-auto pb-12 pt-8">
      {/* <marquee> */}
      <h1 className='xl:text-[3.1rem] text-[1.7rem] montserrat-subheading pb-7
       text-gray-900'>Tokens Supported</h1>
      <div className='marquee w-full'>
        <div className="flex w-full items-center overflow-clip space-x-3">
          {Tokens.map(({ symbol, name }, id) => (
            <div
              key={id}
              className="ml-4 flex min-w-max items-center space-x-2
               rounded-full bg-black/60 px-4 py-2 overflow-clip"
            >
              <img
                src={symbol}
                alt="token"
                className="h-[30px] w-[30px] rounded-full"
              />
              <p className="montserrat-subheading text-gray-200 sm:text-[1.1rem] xl:text-[1.4rem]">
                {name}
              </p>
            </div>
          ))}
        </div>
        </div>
      {/* </marquee> */}
    </div>
  );
};

export default TokensSlide;
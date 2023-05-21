import React from "react";
// import ReactPlayer from 'react-player';
import ReactPlayer from "react-player/lazy";

const Tutorial = () => {
  return (
    <>
      <div
        id="howitworks"
        className="flex flex-col items-center justify-center py-10"
      >
        <h1
          className="montserrat-heading
           py-4 text-3xl font-semibold text-gray-600"
        >
          See how it works
        </h1>
        <div className="mx-auto mb-4 border-b border-[#ff8080] pb-2 sm:w-[550px] "></div>
        <div className="flex h-[300px] w-full justify-center py-5 md:h-[580px] xl:w-[60%]">
          <ReactPlayer
            width="90%"
            height="95%"
            controls={true}
            url="https://youtu.be/MlRNRg_JSkc"
          />
        </div>
      </div>
    </>
  );
};

export default Tutorial;

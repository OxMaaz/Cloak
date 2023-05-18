import React from 'react'
import Send from './Send'
import Receive from './Receive'
import { useState } from 'react'

const Transaction = () => {
  const [show, setShow] = useState(false)
  return (
    <div
      className="flex flex-col sm:p-5 sm:px-8 backdrop-blur-[50px] hover:backdrop-blur-lg
   h-full"
    >
      <div
        className="max-w-[400px] xl:space-x-36 mx-auto flex space-x-32 mb-2  montserrat-subtitle
      text-[1.4rem] border-b-2 pb-2 border-gray-300 font-bold"
      >
        <h4
          className={` montserrat-subtitle text-3xl cursor-pointer font-bold ml-7 text-gray-500 hover:text-[#FF5757] 
            }`}
          onClick={() => setShow(false)}
        >
          Send
        </h4>
        <h4
          className={`  montserrat-subtitle text-3xl cursor-pointer font-bold hover:text-gray-500 text-[#FF5757] 
            }`}
          onClick={() => setShow(true)}
        >
          Accept
        </h4>
      </div>
      <div className="">{show === false ? <Send /> : <Receive />}</div>
    </div>
  )
}

export default Transaction

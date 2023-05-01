import React from 'react'
import Send from './Send'
import Receive from './Receive'
import { useState } from 'react'

const Transaction = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col pt-2 space-y-4 ">
      <div className="flex font-semibold space-x-16 mx-auto border-b pb-2 border-gray-300">
        <h4
          className={` montserrat-subheading text-4xl cursor-pointer ml-7 text-gray-500 hover:text-[#FF5757] 
            }`}
          onClick={() => setShow(false)}
        >
          Send
        </h4>
        <h4
          className={`  montserrat-subheading text-4xl cursor-pointer hover:text-gray-500 text-[#FF5757] 
            }`}
          onClick={() => setShow(true)}
        >
          Receive
        </h4>
      </div>
      <div className="">{show === false ? <Send /> : <Receive />}</div>
    </div>
  )
}

export default Transaction

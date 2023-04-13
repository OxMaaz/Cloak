import React from 'react'
import Send from './Send'
import Receive from './Receive'
import { useState } from 'react'

const Transaction = () => {
    const [show, setShow] = useState(false)
    return (
        <div className="flex flex-col pt-6 space-y-6 mt-8">
        <div className="flex font-semibold space-x-16 mx-auto">
          <h4
            className={`montserrat-subheading text-4xl cursor-pointer ml-7 hover:text-[#FF5757] ${
              !show ? 'underline decoration-white underline-offset-2' : 'no-underline'
            }`}
            onClick={() => setShow(false)}
          >
            Send
          </h4>
          <h4
            className={`montserrat-subheading text-4xl cursor-pointer hover:text-black text-[#FF5757] ${
              show ? 'underline decoration-white underline-offset-2' : 'no-underline'
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

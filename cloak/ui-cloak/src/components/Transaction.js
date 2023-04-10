import React from 'react'
import Send from './Send'
import Receive from './Receive'
import { useState } from 'react'

const Transaction = () => {
    const [show, setShow] = useState(false)
    return (
        <div>

            <h4 onClick={() => setShow(false)}>Send</h4>
            <h4 onClick={() => setShow(true)}>Receive</h4>
            {show===false ? <Send /> : <Receive />}

        </div>
    )
}

export default Transaction

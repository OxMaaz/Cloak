import React from 'react'
import { useContext } from 'react'
import { CloakContext } from './Cloak';

const Connect = () => {

    const { } = useContext(CloakContext);
    return (
        <div>

            {/* leftside logo */}

            <h1>Cloak</h1>


            {/* rigt side */}

            <p>Balance</p>
            <p>Address</p>


            <button>Connect</button>
        </div>
    )
}

export default Connect
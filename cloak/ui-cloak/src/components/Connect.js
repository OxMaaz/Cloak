import React from 'react'
import { useContext } from 'react'
import { CloakContext } from './Cloak';

const Connect = () => {

    const data = useContext(CloakContext);
    return (
        <div>

            {/* leftside logo */}

            <h1>Cloak</h1>


            {/* rigt side */}

            <p>{data.balance}</p>
            <p>{data.address}</p>


            <button style={{ border: '1px solid red' }} onClick={data.connectwallet} >{localStorage.getItem('wallet') ? 'connected' : 'connect Wallet'}</button>
        </div>
    )
}

export default Connect
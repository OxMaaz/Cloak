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

            <p>{localStorage.getItem('address')}</p>
            <p>{localStorage.getItem('balance')}</p>


            <button style={{ border: '1px solid red' }} onClick={data.connectwallet} >{localStorage.getItem('wallet') && localStorage.getItem('address') ? 'connected' : 'connect Wallet'}</button>
        </div>
    )
}

export default Connect
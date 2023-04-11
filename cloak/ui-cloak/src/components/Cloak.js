import React from 'react'
import Connect from './Connect'
import Stealth from './Stealth'
import Transaction from './Transaction'
import { createContext } from 'react'
import { useState } from 'react'



export const CloakContext = createContext(null)




const Cloak = () => {


    const [registry, setRegistry] = useState([])
    const [error,seterror] = useState('')

    const contextValue = {
        registry,setRegistry,error,seterror
        }


    return (
        <>
            <CloakContext.Provider value={contextValue}>
                <Connect />
                <Stealth />
                <Transaction />
            </CloakContext.Provider>
        </>
    )
}

export default Cloak
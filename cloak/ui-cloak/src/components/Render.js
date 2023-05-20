import React from 'react'
import Transaction from './Transaction'
import Demo from './Demo';
import { useState ,useEffect } from 'react';

const Render = () => {
    const contractAddress = "TFLwjm3o4zwseqbYYzgMuT8oWvWsAU9PFD";
    const [show, setShow] = useState(false)
    const [totalTrx, setTotalTrx] = useState(false)

    const {tronWeb} = window

    const fetchdata = async () => {
        try {
            const contract = await tronWeb.contract().at(contractAddress);
            const limit = await contract.getLimit().call();
            // console.log(limit.toString())
            setTotalTrx(limit.toString())
        }

        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (tronWeb) {
            fetchdata()
        }
     

    }, [])

    return (
        <div className="flex flex-col-reverse space-y-4 sm:flex-row justify-center p-3 py-1">
            <Demo totalTrx={totalTrx}  show={show}  />
            <Transaction setShow={setShow} />
        </div>
    )
}

export default Render

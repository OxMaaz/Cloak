import React from 'react'
import Transaction from './Transaction'
import Guide from './Guide';
import {contractAddress}  from './Wrapper';
import { useState ,useEffect } from 'react';

const Render = () => {

    const [show, setShow] = useState(false)
    const [totalTrx, setTotalTrx] = useState('')
    const [totalFunds, setTotalFunds] = useState('')

    const {tronWeb} = window

    const fetchdata = async () => {
        try {
            const contract = await tronWeb.contract().at(contractAddress);
            const limit = await contract.getLimit().call();
            const funds = await contract.getTotalFunds().call();
            setTotalTrx(limit.toString())
            setTotalFunds(((tronWeb.fromSun(funds.toNumber()))))
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (tronWeb) {
            fetchdata()
        }    

    }, [show])

    return (
        <div className="flex flex-col-reverse space-y-4 sm:flex-row justify-center p-3 py-1">
            <Guide totalTrx={totalTrx}  show={show} totalFunds={totalFunds}  />
            <Transaction setShow={setShow} />
        </div>
    )
}

export default Render

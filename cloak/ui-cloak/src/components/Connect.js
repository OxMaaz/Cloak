import React from 'react'
import { useContext } from 'react'
import { CloakContext } from './Cloak';
import logo from '../assets/logo.png'

const Connect = () => {

    const data = useContext(CloakContext);
    return (
        <div className="sm:p-8 p-3 pb-12 ">
          <div className="sm:px-7 flex justify-between">
            {/* leftside logo */}
            <div>
              <img className="sm:w-25 w-24 font-bold" src={logo} alt="" />
            </div>
            {/* rigt side */}
            <div className="sm:flex-row flex-co flex space-x-3 items-center">
              <p className="text-[1rem] font-semibold">{localStorage.getItem('balance')}</p>
              <p className="sm:text-[1rem] text-[0.8rem]">{localStorage.getItem('address')===null ? '' :`${localStorage.getItem('address').slice(0,12)}...`}</p>
              <button onClick={data.connectwallet}  className="border-1 p-1 sm:text-[1rem] text-[0.8rem] text-white bg-[#FF5757] hover:shadow-xl px-2 sm:px-4 rounded-md hover:bg-[#FDF0EF] hover:text-[#FF5757] font-semibold hover:border-white border-red-500 border">
              { localStorage.getItem('address')===null && localStorage.getItem('balance')===null ? 'connect Wallet' : 'Connected'}
              </button>
            </div>
          </div>
        </div>
      );
}

export default Connect


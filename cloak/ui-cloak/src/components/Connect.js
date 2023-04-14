import React from 'react'
import { useContext } from 'react'
import { CloakContext } from './Cloak';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Container from '../intro/Container'

const Connect = () => {

  const navigate = useNavigate();

  const data = useContext(CloakContext);
  return (
    <div className="sm:p-8 p-3 pb-12 ">
      <div className="sm:px-7 flex justify-between">
        {/* leftside logo */}
        <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
          <img className="sm:w-20 w-16 font-bold" src={logo} alt="" />
          <p onClick={navigate(Container)} className='ml-14 text-gray-700 montserrat-subtitle underline-offset-8 font-semibold underline decoration-[#FF5757]  text-[1.1rem]'>Home</p>
        </div>
        
        {/* rigt side */}
        <div className="sm:flex-row flex-co flex space-x-3 items-center">
          <p className="text-[1rem]  text-gray-500   font-semibold">{localStorage.getItem('address') !== null ? localStorage.getItem('balance') : ''}</p>
          <p className="sm:text-[1rem]  text-gray-500  font-medium text-[0.8rem]">{localStorage.getItem('address') === null || false ? '' : `${localStorage.getItem('address').slice(0, 12)}...`}</p>
          <button onClick={data.connectwallet} className="montserrat-subtitle border-1 p-1 sm:text-[1rem] text-[0.8rem] hover:text-white hover:bg-[#FF5757] shadow-xl px-2 sm:px-4 rounded-md bg-[#FDF0EF] text-[#FF5757] font-semibold border-white hover:border-red-500 border">
            {localStorage.getItem('address') === null && localStorage.getItem('balance') === null  ? 'connect wallet' : 'Connected'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Connect


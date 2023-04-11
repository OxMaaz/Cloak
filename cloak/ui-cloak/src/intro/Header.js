import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/header-whiten.png';

const Header = () => {

  const navigate = useNavigate();
  return (
    <div className='p-4 bg-[#FF5757] px-7'>
      <div className='pb-3 border-b border-[#FDF0EF] border-b-1 px-5 flex justify-between items-center'>
        {/* logo on the left side */}
        <div className='flex items-center'>
          <img
            className='sm:w-20 w-16 font-bold' 
            src={logo} 
            alt='' />
          <h1 className='sm:text-[1.5rem] font-semibold text-[1.2rem] text-[#FDF0EF]'>Cloak</h1>
        </div>
        {/* "how it works" on the right side*/}
        <h4 className='cursor-pointer sm:text-[1.2rem] font-semibold underline-offset-4 underline text-[1rem] hover:font-bold hover:text-white text-[#FDF0EF] ' onClick={() => navigate('/')}>How it works?</h4>

      </div>
        {/* at the bottom of the logo */}
        <div className='sm:p-16 p-10 flex flex-col items-start space-y-4'>
          <h2 className='font-bold sm:text-[1.5rem] text-[1.2rem] text-[#FDF0EF]'>Stay Anonymous.</h2>
          <p className='text-[#FDF0EF] text-left break-words  max-w-[400px]'>Share crypto without revealing your actual address.</p>
          <div className='pt-1'>
            <button className='border-1 p-1 hover:text-white hover:bg-[#FF5757] hover:shadow-xl px-4 rounded-full bg-[#FDF0EF] text-[#FF5757] font-semibold hover:border-white border-red-500 border' onClick={() => navigate('/cloak')}>Launch app</button>
          </div>
        </div>
    </div>
  )
}

export default Header

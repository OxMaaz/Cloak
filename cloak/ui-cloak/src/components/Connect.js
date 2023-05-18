import React from 'react'
import { useContext } from 'react'
import { CloakContext } from './Cloak';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import Container from '../intro/Container'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';



const Connect= () => {

    const navigate = useNavigate();

    const data = useContext(CloakContext);

    return (
        <div className="max-w-[1090px] mx-auto pt-4 sm:pt-8 pb-12 ">
            <div className="sm:px-7 px-4 flex justify-between">
                {/* leftside logo */}
                <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
                    <div className='flex space-x-1 items-center'>
                        <img
                            src={logo}
                            alt=''
                            className='w-[55px] h-[52px]'
                        />
                        <h1 className='montserrat-subtitle font-bold sm:text-[1.3rem]  text-[1.1rem] text-[#6c8492]'>Cloak</h1>
                    </div>

                    <p onClick={navigate(Container)} className='sm:ml-14 ml-6 text-[#58707e] montserrat-subtitle underline-offset-8 font-bold underline decoration-[#FF5757]  text-[1.1rem]'>Home</p>
                    <p  className='sm:ml-14 ml-6 text-[#58707e] montserrat-subtitle underline-offset-8 font-bold underline decoration-[#FF5757]  text-[1.1rem]'>QnA</p>

                </div>

                {/* rigt side */}
                <div className="sm:flex-row flex-co flex space-x-3 items-center">
                    <p className='text-gray-400'><a href="/https://discord.gg/qupF3BrP"><FaDiscord size={20} /></a></p>
                    <p className='text-gray-400'><a href="https://github.com/ScriptKiddii/Cloak"><FaGithub size={20} /></a></p>
                    <p className='text-gray-400'><a href="https://twitter.com/TronCloak"><FaTwitter size={20} /></a></p>
                    <p className="sm:text-[1rem] montserrat-small  text-gray-500  font-semibold text-[0.8rem]">{sessionStorage.getItem('address') === null || false  ? '' : `${sessionStorage.getItem('address').slice(0, 17)}...`}</p>
                    <button onClick={data.connectwallet} 
                        className="montserrat-subtitle border-1 p-1 sm:text-[1rem] text-[0.8rem]
                     text-[#FF5757] bg-[#FDF0EF]
                     shadow-md hover:shadow-lg px-2 sm:px-4 rounded-md hover:bg-[#FF5757] hover:text-[white] font-bold border-white ">
                           {(sessionStorage.getItem('address') !== null || false)   ? 'Connected' : 'Connect wallet'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Connect
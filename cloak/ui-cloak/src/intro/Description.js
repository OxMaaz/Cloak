import React from 'react';
import descriptionimage from '../assets/descriptionImage.jpg';
import {MdOutlineSecurity, MdPrivacyTip} from 'react-icons/md';
import {AiOutlineTransaction} from 'react-icons/ai';
import {BsCurrencyExchange} from 'react-icons/bs';

const Description = () => {
  return (
    <div className='bg-[#FDF0EF] p-10 px-8'>

    <div className='flex items-start flex-col px-4'>
      {/* Heading */}
      <h2 className='self-left font-semibold text-2xl text-black'>How it works?</h2>

      {/* image */}
      <div className='flex flex-col xl:items-center xl:flex-row-reverse xl:justify-between'>
      <div className='md:mx-auto p-4 py-10'>
        <img
          className='w-[789px] rounded-[1rem] outline-none' 
          src={descriptionimage} 
          alt='' />
      </div>

      {/* paragraph */}
      <div class="xl:w-[40%] flex flex-col p-8 break-words">
        <ul class="list-disc list-inside space-y-6">
          <li className="mb-2 text-left text-gray-600">
            <span className="font-semibold text-black break-words">Step 1: </span> 
            Charlotte generates a root spending key and a unique stealth meta-address using cryptographic algorithms. The meta-address is used as a secret key here.
          </li>
          <li class="mb-2 text-left text-gray-600">
          <span class="font-semibold text-black">Step 2: </span> William looks up the stealth meta-address and generates a one-time-use ephemeral key. The sender combines this key with the meta-address to create a unique and anonymous stealth address, which is used to send assets to the first user.
          </li>
          <li class="mb-2 text-left text-gray-600">
            <span class="font-semibold text-black">Step 3: </span> William then publishes his ephemeral public key on the Tron network, allowing Charlotte to scan it for new keys. Charlotte periodically scans the registry for new keys and uses the root spending key to generate stealth addresses associated with her.
          </li>
          <li class="mb-2 text-left text-gray-600">
            <span class="font-semibold text-black">Step 4: </span> If Charlotte matches assets associated with a stealth address generated using a public key from the registry, she can compute the spending key for that address and claim the assets. The one-time-use keys used to generate the stealth addresses are discarded to ensure privacy and security.
          </li>
        </ul>
      </div>

    </div> 
    <h3 className='p-8 border border-t-1 border-gray-400 font-semibold text-[1.1rem] text-[#f13a3a] text-center'>
        In summary, Cloak uses cryptographic algorithms and one-time-use keys to create anonymous and secure public addresses for transactions on the blockchain. These addresses can also be associated with domain names through Name Services and can be generated and claimed using ephemeral keys and public key registries.
      </h3>
      </div>
      

{/* Features */}

<div class="rounded-lg p-8">
  <div class="mx-auto">
    <h2 class="text-2xl font-semibold mb-4 underline-offset-4 border-b-2 pb-2 border-[#ff8080]">Features</h2>
    <div class="sm:p-6 mx-auto max-w-[1100px] px-15 p-6 grid grid-cols-2 gap-8">
      <div class="col-span-2 md:col-span-1">
        <div class="bg-white shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full">
          <div className='flex space-x-2 items-center justify-center'>
            <MdPrivacyTip className='text-xl mb-2' />
            <h3 class="text-xl text-black font-semibold mb-2">Privacy</h3>
          </div>
          <p class="text-gray-600">Stealth addresses allow the receiver of a transaction to generate a unique, one-time address for each transaction, which is not linked to their permanent public address on the blockchain. This helps to protect their privacy and prevent their transactions from being traced.</p>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        
        <div class="bg-white shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full">
        <div className='flex space-x-2 items-center justify-center'>
            <MdOutlineSecurity className='text-xl mb-2' />
            <h3 class="text-xl font-semibold mb-2">Security</h3>
          </div>
          <p class="text-gray-700">Stealth addresses provide an extra layer of security by making it difficult for anyone other than the intended recipient to know the destination of the transaction. This is because the stealth address is derived from a secret key known only to the recipient, making it effectively "hidden" from anyone else.</p>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="bg-white shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full">
        <div className='flex space-x-2 items-center justify-center'>
            <AiOutlineTransaction className='text-xl mb-2' />
            <h3 class="text-xl font-semibold mb-2">Uniqueness</h3>
          </div>
          <p class="text-gray-700">Each stealth address generated by a recipient is unique to a particular transaction, making it difficult for anyone to link multiple transactions together or perform analysis on them.</p>
        </div>
      </div>
      <div class="col-span-2 md:col-span-1">
        <div class="bg-white shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full">
        <div className='flex space-x-2 items-center justify-center'>
            <BsCurrencyExchange className='text-xl mb-2' />
            <h3 class="text-xl font-semibold mb-2">Compatibility</h3>
          </div>
          <p class="text-gray-700">Stealth addresses are compatible with many different cryptocurrencies and blockchains, including Bitcoin, Ethereum, and Tron. This makes them a versatile solution for anyone looking to protect their privacy and security when sending and receiving cryptocurrency transactions.</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>


  )
}

export default Description

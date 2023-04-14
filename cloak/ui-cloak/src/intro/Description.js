import React from 'react'
// import { MdOutlinePrivacyTip, MdSecurity, MdAlarmOn, MdThumbUpOffAlt } from "react-icons/md";
import descriptionimage from '../assets/descriptionImage.jpg';
import { MdOutlineSecurity, MdPrivacyTip } from 'react-icons/md';
import { AiOutlineTransaction } from 'react-icons/ai';
import { BsCurrencyExchange } from 'react-icons/bs';


const Description = () => {
  return (
    <div className='bg-[white] p-10 px-8 montserrat-medium'>

      <div className='flex items-start flex-col px-4'>
        {/* Heading */}
        <h2 className='montserrat-heading font-semibold self-left text-3xl text-black'>How it works ?</h2>


        {/* image */}
        <div className='flex flex-col xl:items-center xl:flex-row-reverse xl:justify-between'>
          <div className='md:mx-auto p-4 py-10'>
            <img
              className='w-[789px] rounded-[1rem] outline-none'
              src={descriptionimage}
              alt='' />
          </div>

          {/* paragraph */}
          <div class="xl:w-[40%] flex flex-col p-8 break-words montserrat-subheading">
            <ul class="list-disc list-inside space-y-6">
              <li className="mb-2 text-left text-gray-600">
                <span className="font-semibold text-black break-words">Step 1 : </span>
                Generate a unique cloak address by clicking the "generate" button. The DontRevealMe key generated will serve as your secret key, so be sure to save it in a secure location.
              </li>
              <li class="mb-2 text-left text-gray-600">
                <span class="font-semibold text-black">Step 2 : </span> Send the cloak address to the intended sender.
              </li>
              <li class="mb-2 text-left text-gray-600">
                <span class="font-semibold text-black">Step 3 : </span> The sender will create an address from your cloak address and send funds to it using the "send" button.
              </li>
              <li class="mb-2 text-left text-gray-600">
                <span class="font-semibold text-black">Step 4 : </span> After the funds have been sent, click on "match" or paste your secret key (optional) to retrieve your private key and access the specific address on which the funds have been sent.
              </li>
              <li class="mb-2 text-left text-gray-600">
                <span class="font-semibold text-black">Summary : </span> By following these steps, you can easily and securely transfer funds using our app. Should you have any queries or concerns, please do not hesitate to contact us by our discord for assistance..
              </li>
            </ul>
          </div>


          {/* properties */}


        </div>

      </div>


      {/* Features */}

      <div class="rounded-lg p-8">
        <div class="mx-auto">
          <h2 class="montserrat-heading text-3xl font-semibold mb-4 mt-4 underline-offset-5 border-b-2 pb-2 border-[#ff8080]">Features</h2>
          <div class="sm:p-6 cursor-default mx-auto max-w-[1100px] px-15 p-6 grid grid-cols-2 gap-8">
            <div class="col-span-2 md:col-span-1 ">
              <div class="bg-white  shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full ">
                <div className='flex space-x-2 items-center justify-center '>
                  <MdPrivacyTip color='#ff8080' className='text-xl mb-2 ' />
                  <h3 class="montserrat-subheading text-xl text-black font-semibold mb-2">Privacy</h3>
                </div>
                <p class=" text-gray-950 montserrat-heading">Cloak app prioritizes user privacy by generating a unique cloak address for every transaction, thereby making it difficult to track or trace the transaction history of a particular user. Since the cloak address is not linked to any personal information, it allows users to maintain anonymity while transacting on the app. Moreover, users can choose to keep their secret key private, which adds an extra layer of privacy to their transactions.
                  .</p>
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">

              <div class="bg-white shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full">
                <div className='flex space-x-2 items-center justify-center'>
                  <MdOutlineSecurity color='#ff8080' className='text-xl mb-2' />
                  <h3 class="montserrat-subheading text-xl font-semibold mb-2">Security</h3>
                </div>
                <p class=" text-gray-950 montserrat-heading">Cloak app employs robust security measures to ensure that users' funds and information are safe. The random number generated during the cloak address creation serves as a secret key, which only the user has access to. This secret key is needed to access the private key associated with a particular transaction, making it nearly impossible for anyone else to access it. Additionally, the app uses encryption to protect the user's data and funds from hackers or unauthorized access..</p>
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">
              <div class="bg-white shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full">
                <div className='flex space-x-2 items-center justify-center'>
                  <AiOutlineTransaction color='#ff8080' className='text-xl mb-2' />

                  <h3 class="montserrat-subheading text-xl font-semibold mb-2">Ease to use</h3>

             

                </div>
                <p class="text-gray-950 montserrat-heading">Cloak app is designed to be user-friendly, with a simple and intuitive interface that allows users to generate, send, and match cloak addresses in one click. The app's step-by-step guide makes it easy for users to navigate and transact on the platform. Moreover, the app provides real-time updates on the status of a transaction, allowing users to track the progress of their transactions in real-time..</p>
              </div>
            </div>
            <div class="col-span-2 md:col-span-1">
              <div class="bg-white shadow-md hover:shadow-lg rounded-lg p-10 space-y-4 h-full">
                <div className='flex space-x-2 items-center justify-center'>
                  <BsCurrencyExchange color='#ff8080' className='text-xl mb-2' />

                  <h3 class="montserrat-subheading text-xl font-semibold mb-2">Scalability</h3>

               

                </div>
                <p class=" text-gray-950 montserrat-heading">Cloak app allows for fast and seamless transactions, with funds being sent and received almost instantly. This means that users do not have to wait for an extended period to access their funds or complete a transaction, making it an ideal option for those who require quick and efficient transactions..</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div >

  )
}

export default Description

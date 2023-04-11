import React from 'react';
import { FaDiscord, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
  <div class="p-4 bg-[#FFF7F7] ">
    <ul class="flex justify-center space-x-4">
      <li class="p-2"><a href="/"><FaDiscord className='text-[#5751ff]' /></a></li>
      <li class="p-2"><a href="/"><FaGithub /></a></li>
      <li class="p-2"><a href="/"><FaEnvelope className='text-[#fd2e4a]' /></a></li>
    </ul>
  </div>
  )
}

export default Footer
import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div class=" bg-[#FF5757]  pb-4">
      <ul class="flex justify-center space-x-4">
        <li class="p-2">
          <a href="https://discord.gg/dqCdk5JJ">
            <FaDiscord size={24} className="text-white hover:text-gray-700" />
          </a>
        </li>
        <li class="p-2">
          <a href="https://github.com/ScriptKiddii/Cloak">
            <FaGithub size={24} className="text-white hover:text-gray-700" />
          </a>
        </li>
        <li class="p-2">
          <a href="https://twitter.com/TronCloak">
            <FaTwitter size={24} className="text-white hover:text-gray-700" />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Footer;

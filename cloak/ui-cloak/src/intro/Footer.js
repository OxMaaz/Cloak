import React from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div class="dark:bg-[#1d1d1d] p-4">
      <ul class="flex justify-center space-x-4">
        <li class="p-2">
          <a href="/">
            <FaDiscord
              size={24}
              className="text-gray-500 hover:text-[#FF5757]"
            />
          </a>
        </li>
        <li class="p-2">
          <a href="https://github.com/ScriptKiddii/Cloak">
            <FaGithub
              size={24}
              className="text-gray-500 hover:text-[#FF5757]"
            />
          </a>
        </li>
        <li class="p-2">
          <a href="https://twitter.com/TronCloak">
            <FaTwitter
              size={24}
              className="text-gray-500 hover:text-[#FF5757]"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Footer;

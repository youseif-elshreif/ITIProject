import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Media Links */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            <a
              href="https://github.com/youseif-elshreif"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <FaGithub className="text-xl" />
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/youseif-elshreif"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
              <FaLinkedin className="text-xl" />
              <span className="text-sm">LinkedIn</span>
            </a>

            <a
              href="https://www.instagram.com/youseifelshreif/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-pink-400 transition-colors duration-200"
            >
              <FaInstagram className="text-xl" />
              <span className="text-sm">Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/youseif.elshreif"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-600 transition-colors duration-200"
            >
              <FaFacebook className="text-xl" />
              <span className="text-sm">Facebook</span>
            </a>

            <a
              href="https://wa.me/201277906691"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              <FaWhatsapp className="text-xl" />
              <span className="text-sm">whatsapp</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-gray-700 pt-4 w-full">
            <p className="text-sm text-gray-300">
              &copy; 2025 TodoApp. All rights reserved to{" "}
              <span className="text-white font-medium">Youseif Elshreif</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

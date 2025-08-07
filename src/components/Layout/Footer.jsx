import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            &copy; 2025 TodoApp. All rights reserved to{" "}
            <a
              href="https://www.facebook.com/youseif.elshreif"
              className="text-gray-300 hover:text-white underline "
            >
              Youseif Elshreif
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

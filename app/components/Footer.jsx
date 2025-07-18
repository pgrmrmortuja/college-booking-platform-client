"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Site Name */}
          <div className="text-2xl font-bold">Campus</div>

          {/* Middle - Navigation Links */}
          <div className="flex space-x-6 text-sm">
            <a href="/" className="hover:text-blue-400 transition duration-300">Home</a>
            <a href="/about" className="hover:text-blue-400 transition duration-300">About</a>
            <a href="/blogs" className="hover:text-blue-400 transition duration-300">All Blogs</a>
          </div>

          {/* Right - Social Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 text-lg">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 text-lg">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400 text-lg">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-500 text-lg">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} Campus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
"use client";

import { FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const { user, logOut } = useContext(AuthContext);


  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MyBlogSite
            </Link>
          </div>

          {/* Middle: Menu (Desktop) */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link href="/all-blogs" className="text-gray-700 hover:text-blue-500">
              All Blogs
            </Link>
            {
              user && (
                <Link href="/add-blogs" className="text-gray-700 hover:text-blue-500">
                  Add Blogs
                </Link>
              )
            }
            {
              user && (
                <Link href="/my-blogs" className="text-gray-700 hover:text-blue-500">
                  My Blogs
                </Link>
              )
            }
            
          </div>

          {/* Right: Profile/Login */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <FaUserCircle className="text-2xl text-gray-600" />
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm border border-red-500 text-red-600 rounded hover:bg-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <FaUserCircle className="text-2xl text-gray-600" />
                <Link href="/login">
                  <button className="px-3 py-1 text-sm border border-blue-500 rounded hover:bg-blue-100">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link href="/" className="block text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="block text-gray-700 hover:text-blue-500">
            About
          </Link>
          <Link href="/blogs" className="block text-gray-700 hover:text-blue-500">
            All Blogs
          </Link>

          <div className="flex items-center gap-3 pt-2">
            <FaUserCircle className="text-xl text-gray-600" />
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm border border-red-500 px-3 py-1 rounded text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-sm border border-blue-500 px-3 py-1 rounded hover:bg-blue-100">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

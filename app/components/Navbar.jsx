"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import userIcon from "../../public/user.png";
import { GiModernCity } from "react-icons/gi";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";


const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);
  const router = useRouter();

  const goToProfile = () => {
    setTimeout(() => {
      router.push("/Profile");
    }, 100);
  };

  // Theme state with localStorage
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Active link detection
  const linkClass = (path) =>
    router.pathname === path
      ? "p-2 text-pink-700 rounded-lg hover:bg-transparent font-bold text-lg"
      : "p-2 rounded-lg hover:bg-transparent hover:text-pink-500 hover:bg-pink-300 font-bold text-lg text-black";

  const links = (
    <>
      <Link href="/" className={linkClass("/")}>Home</Link>
      <Link href="/College" className={linkClass("/College")}>Colleges</Link>
      <Link href="/Admission" className={linkClass("/Admission")}>Admission</Link>
      {
        user && (
          <Link href="/my-college" className={linkClass("/my-college")}>My College</Link>
        )
      }
      {
        user && (
          <Link href="/Profile" className={linkClass("/Profile")}>My Profile</Link>
        )
      }

    </>
  );

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };


  return (
    <nav className="bg-pink-300 bg-opacity-30 z-50 sticky top-0 w-full">
      <div className="navbar container mx-auto px-4">
        {/* Start Section */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden" role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <div
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] shadow rounded-box w-52 bg-pink-100"
            >
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <div>
                    {/* sun icon */}
                    <svg
                      className="swap-off h-10 w-10 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                  </div>
                ) : (
                  <div>
                    {/* moon icon */}
                    <svg
                      className="swap-on h-10 w-10 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </div>
                )}
              </button>

              {links}

              <div className="mb-2">
                {user && user?.email ? (
                  <button
                    onClick={handleLogout}
                    className="btn text-black btn-neutral w-full bg-pink-500 rounded-lg border-none hover:bg-pink-700"

                  >
                    Logout
                  </button>
                ) : (
                  <div>
                    <Link
                      href="/login"
                      className="btn btn-neutral bg-pink-500 rounded-lg border-none text-black hover:bg-pink-700 mr-2"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="btn btn-neutral bg-pink-500 rounded-lg border-none text-black hover:bg-pink-700"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link href="/"
            className="flex justify-center items-center gap-2">
            <GiModernCity className="text-xl md:text-2xl text-pink-600" />
            <span className="text-xl md:text-2xl text-pink-600 font-semibold">Campus</span>
          </Link>
        </div>

        {/* Center Section */}
        <div className="navbar-center hidden lg:flex">
          <div className="menu menu-horizontal px-1 space-x-4">
            {links}

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}

            >
              {theme === 'dark' ? (
                <div>
                  {/* sun icon */}
                  <svg
                    className="swap-off h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                </div>
              ) : (
                <div>
                  {/* moon icon */}
                  <svg
                    className="swap-on h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* End Section */}
        <div className="navbar-end">
          <div className="dropdown">
            <div tabIndex={0} className="m-1">
              {user && user?.email ? (
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="m-1">
                    <img
                      className="w-10 h-10 rounded-full border-2 border-pink-500"
                      src={user?.photoURL}
                      alt="User Avatar"
                    />
                  </div>
                  {/* Dropdown Menu */}
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <button onClick={goToProfile} className="w-full text-left">
                        My Profile
                      </button>
                    </li>
                  </ul>
                </div>

              ) : (
                <img
                  className=" w-10 h-10 rounded-full"
                  src={userIcon}
                  alt="Default Avatar"
                />
              )}
            </div>
          </div>

          <div className="hidden lg:ml-2 lg:flex lg:items-center lg:gap-3">
            {user && user?.email ? (
              <button
                onClick={handleLogout}
                className="btn btn-neutral bg-pink-500 rounded-lg border-none text-black hover:bg-pink-700"
                data-tooltip-id="my-tooltip"
              >
                Logout
              </button>
            ) : (
              <div>
                <Link
                  href="/login"
                  className="btn btn-neutral bg-pink-500 rounded-lg border-none hover:bg-pink-700 text-black mr-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-neutral bg-pink-500 rounded-lg border-none hover:bg-pink-700 text-black"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>


      </div>
    </nav>

  );
};

export default Navbar;


import React, { useState, useRef } from 'react';
import "./Navbar.css";
import Logo from "../../assets/symbol.png";
import Search from "../../assets/search1.svg";
import Arrow from "../../assets/arrow-down.svg";
import searchwt from "../../assets/search.svg";
import addButton from "../../assets/addButton.png";
import favorite from "../../assets/favorite.svg";
import comment from "../../assets/comment.svg";
import avatar from "../../assets/avatar.png";
import bell from "../../assets/bell.svg";

import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { userAuth } from "../Context/Auth";

const Navbar = ({ toggleModal }) => {
  const { user } = userAuth();
  const [showLogout, setShowLogout] = useState(false);
  const timeoutRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="flex items-center gap-4 px-6 py-4 shadow-md bg-slate-100 fixed w-full z-50">
      <Link to={'/'}>
        <img src={Logo} alt="Logo" className="w-12 shrink-0" />
      </Link>

      <div className="relative hidden md:flex items-center w-[150px] md:w-[250px] lg:w-[270px]">
        <img src={Search} alt="Search Icon" className="absolute left-2 top-1/2 -translate-y-1/2 w-5" />
        <input
          type="text"
          placeholder="Search city, area or locality..."
          className="w-full pl-8 pr-8 py-2 border-2 border-black rounded-md focus:outline-none focus:border-teal-300 placeholder:text-ellipsis"
        />
        <img src={Arrow} alt="Dropdown" className="absolute right-2 top-1/2 -translate-y-1/2 w-5 cursor-pointer" />
      </div>

      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Find Cars, Mobiles Phones, and More..."
          className="w-full py-2 pl-3 pr-12 border-2 border-black rounded-md focus:outline-none focus:border-teal-300 placeholder:text-ellipsis"
        />
        <div className="absolute top-0 right-0 h-full w-12 bg-[#002f34] flex items-center justify-center rounded-e-md">
          <img src={searchwt} alt="Search Icon" className="w-5 filter invert" />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-3 shrink-0">
        <p className="font-bold">English</p>
        <img src={Arrow} alt="Language Dropdown" className="w-5 cursor-pointer" />
      </div>

      {user ? (
        <>
          <img src={favorite} alt="Favorite" className="w-6 h-6 p-1 hover:bg-[#b0d5fd] rounded-full cursor-pointer" />
          <img src={comment} alt="Comment" className="w-6 h-6 p-1 hover:bg-[#b0d5fd] rounded-full cursor-pointer" />
          <img src={bell} alt="Bell" className="w-6 h-6 p-1 hover:bg-[#b0d5fd] rounded-full cursor-pointer" />

          <div
            className="relative"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setShowLogout(true);
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setShowLogout(false);
              }, 200);
            }}
          >
            <img
              src={avatar}
              alt="User"
              className="w-8 h-8 rounded-full cursor-pointer border"
            />
            {showLogout && (
              <div
                className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-28 text-center z-50"
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setShowLogout(true);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => {
                    setShowLogout(false);
                  }, 200);
                }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <p
          onClick={toggleModal}
          className="cursor-pointer text-blue-600 hover:underline"
        >
          Login
        </p>
      )}


      {user ? (
        <Link to="/sell">
          <img
            src={addButton}
            alt="Add Product"
            className="w-20 h-10 cursor-pointer hover:opacity-80"
          />
        </Link>
      ) : (
        <img
          src={addButton}
          alt="Add Product"
          className="w-20 h-10 cursor-pointer hover:opacity-80"
          onClick={toggleModal}
        />
      )}
    </nav>
  );
};

export default Navbar;

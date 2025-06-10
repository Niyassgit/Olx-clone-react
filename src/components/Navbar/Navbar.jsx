import React from 'react'
import "./Navbar.css"
import Logo from "../../assets/symbol.png"
import Search from "../../assets/search1.svg"
import Arrow from "../../assets/arrow-down.svg"
import searchwt from "../../assets/search.svg"


const Navbar = (props) => {
  const {toggleModal,toggleSellModal}=props
  return (
    <nav className="flex items-center gap-4 px-4 py-2 shadow-md bg-slate-100 fixed w-full z-50 overflow-x-auto ">
      
      <img src={Logo} alt="Logo" className="w-12 shrink-0" />

      <div className="relative hidden md:flex items-center w-[150px] md:w-[250px] lg:w-[270px]">
        <img src={Search} alt="Search Icon" className="absolute left-2 top-1/2 -translate-y-1/2 w-5" />
        <input
          type="text"
          placeholder="Search city, area or locality..."
          className="w-full pl-8 pr-8 py-2 border-2 border-black rounded-md focus:outline-none focus:border-teal-300 placeholder:text-ellipsis"
        />
        <img src={Arrow} alt="Dropdown" className="absolute right-2 top-1/2 -translate-y-1/2 w-5 cursor-pointer" />
      </div>

      <div className="relative flex-1 max-w-[500px]">
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
      <p onClick={toggleModal}>Login</p>
      <p onClick={toggleSellModal}>Sell</p>
    </nav>
  )
}

export default Navbar

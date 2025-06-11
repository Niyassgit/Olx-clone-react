import React from 'react'
import foot from "../../src/assets/footerImg.png"
const Footer = () => {
  return (
      <div className='mt-30'>
        <img src={foot} alt="" />
        <div className='bg-[#004896] h-10 flex justify-end items-end'>
          <h1 className='text-white p-4 text-xs '>All rights reserved © 2006-2025 OLX</h1>
      </div>
      </div>
  )
}

export default Footer

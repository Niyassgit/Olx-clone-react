import React, { useState, useEffect } from 'react';
import guitar from '../../assets/guita.png';
import phone from '../../assets/phone.png';
import google from '../../assets/google.png';
import love from "../../assets/love.png";
import avatar from "../../assets/avatar.png";
import close from '../../assets/close.svg'
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../Firebase/Firebase'


const Login = ({ status, toggleModal }) => {
  if (!status) return null;
  
  const handleClick=async()=>{
    try {
      console.log('clicked');
     const result= await signInWithPopup(auth,provider);
      toggleModal();
      console.log("User",result.user);

    } catch (error) {
      console.error(error)
    }
  }
  const slides = [
    {
      image: guitar,
      text: "Help us become one of the safest places to buy and sell",
    },
    {
      image: love,
      text: "Close deals from the comfort of your home.",
    },
    {
      image: avatar,
      text: "Keep all your favourites in one place.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);

    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length])

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={toggleModal}
    >

      <div className="fixed inset-0 bg-zinc-400 bg-opacity-75 transition-opacity" aria-hidden="true"></div>


      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

          <div
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
            style={{ width: "400px", height: "600px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white px-6 pt-5 pb-6 sm:p-6 sm:pb-4">

              <div className="flex justify-end">
                <img
                  src={close}
                  alt="Close"
                  className="w-6 h-6 cursor-pointer"
                  onClick={toggleModal}
                />
              </div>


              <div className="text-center transition-all duration-500 ease-in-out">
                <img
                  src={slides[currentSlide].image}
                  alt="Slide"
                  className="w-24 h-24 mx-auto"
                />
                <p className="text-base font-medium mt-5">
                  {slides[currentSlide].text}
                </p>

             
                <div className="flex justify-center mt-4 gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === currentSlide
                        ? 'bg-teal-600'
                        : 'bg-gray-300'
                        }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>

                <div className="flex border-2 border-black rounded items-center gap-2 mt-4 p-3 h-12 cursor-pointer hover:bg-gray-100">
                  <img src={phone} alt="Phone Icon" className="w-5 h-5" />
                  <h1 className="text-sm font-bold">Login with Phone Number</h1>
                </div>

                <div className="flex items-center gap-20 mt-4 border rounded border-gray-400 h-12 cursor-pointer hover:border-blue-600 hover:bg-blue-50">
                  <img src={google} alt="Google Icon" className="w-5 h-5 ml-3" />
                  <h1 className="text-sm font-medium" onClick={handleClick}>Continue with Google</h1>
                </div>

                <h1 className="text-center mt-4 font-semibold">OR</h1>
                <h1 className="text-center mt-4 font-bold underline cursor-pointer">
                  Login with Email
                </h1>


                <h1 className="text-center mt-20 text-xs">
                  All your personal details are safe with us.
                </h1>
                <h1 className="text-center mt-4 text-xs">
                  If you continue, you are accepting OLX's
                  <br />
                  <span className="text-blue-600">Terms and Conditions and Privacy Policy</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;

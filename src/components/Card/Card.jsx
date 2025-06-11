import React from 'react';
import { Link } from 'react-router-dom';
import favorite from "../../assets/favorite.svg"
const Card = ({ items }) => {
  return (
    <div className='p-4 sm:px-8 md:px-16 lg:px-24 min-h-screen'>
      <h1 className='text-2xl text-[#002f34] font-semibold mb-4'>Fresh recommendations</h1>

      <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {items && items.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
            <div
              className='relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer'
            >
              {/* Favorite Icon */}
              <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-sm z-10">
                <img src={favorite} alt="Favorite" className="w-4 h-4" />
              </div>

              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-full h-48 object-cover rounded-t-lg'
                />
              )}

              <div className='p-3'>
                <h2 className='text-[#002f34] text-lg font-bold'>₹{item.price}</h2>
                <p className='text-gray-500 text-sm'>{item.category}</p>
                <p className='text-sm mt-1 line-clamp-1'>{item.title}</p>
                <p className='text-gray-400 text-xs mt-2'>Kochi • Today</p>
              </div>
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
};

export default Card;

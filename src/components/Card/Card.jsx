import React from 'react'
const Card = ({ items }) => {
  return (
    <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
      <h1 style={{ color: "#002f34" }} className='text-2xl'>Fresh recommendations</h1>
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
        {items && items.map((item) => (
          <div
            key={item.id}
            className='relative w-full h-96 rounded-md border border-gray-300 bg-gray-50 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow'
          >
            {/* ✅ Display the Cloudinary image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-48 object-cover'
              />
            )}

            <div className="p-4">
              <h1 style={{ color: "#002f34" }} className='font-bold text-xl mb-1'>₹{item.price}</h1>
              <p className='text-sm text-gray-600'>{item.category}</p>
              <p className='text-md mt-2 font-medium'>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card

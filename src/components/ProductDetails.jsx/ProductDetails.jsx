import React from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import { useItemContext } from '../Context/Item';
import Navbar from '../Navbar/Navbar';

const ProductDetails = () => {

  const {id}=useParams();
  const {items}=useItemContext();
  const navigate=useNavigate();
  const product=items?.find(item=>String(item.id)===id);
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className='p-10'>Product not found</div>
      </>
    );
  }


 return (
  <>
  <Navbar />

  <div className="bg-gray-100 min-h-screen p-4 md:p-10">
    <button className="text-blue-600 mb-4" onClick={() => navigate(-1)}>← Back</button>

    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
      {/* Left Section - Product Image and Description */}
      <div className="md:col-span-2 bg-white rounded shadow p-4">
        <img src={product.image} alt={product.title} className="w-full object-contain h-96 rounded" />

        <div className="py-4 border-b">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-xl text-green-600 mt-2">₹{product.price}</p>
          <p className="text-gray-600 text-sm mt-1">Category: {product.category}</p>
        </div>

        <div className="py-4">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      {/* Right Section - Seller Info */}
      <div className="bg-white rounded shadow p-4 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Seller Details</h2>
          <div className="mt-2 flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">John Doe</p>
              <button className="text-blue-600 text-sm mt-1 hover:underline">View Profile</button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Contact</h3>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Chat with Seller</button>
          <button className="w-full border border-blue-600 text-blue-600 py-2 rounded mt-2 hover:bg-blue-50">
            Call Seller
          </button>
        </div>

        <div>
          <h3 className="text-lg font-medium">Location</h3>
          <p className="text-gray-700">Bangalore, Karnataka</p>
          <img
            src="https://via.placeholder.com/300x150?text=Map+Placeholder"
            alt="map"
            className="w-full mt-2 rounded"
          />
        </div>
      </div>
    </div>
  </div>
  </>
);

}

export default ProductDetails

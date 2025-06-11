import { collection, addDoc } from 'firebase/firestore';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchFromFireStore, fireStore } from '../Firebase/Firebase';
import uploadImageToCloudinary from '../Cloudinary/imageUpload';
import { ProductContext } from '../Context/productContext';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer'
import { serverTimestamp } from 'firebase/firestore';

const Sell = ({ setItems ,toggleModal}) => {
  const { setProductData } = useContext(ProductContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productName, setName] = useState('');
  const [productPrice, setPrice] = useState('');
  const [productCategory, setCategory] = useState('no-category');
  const [productDescription, setDescription] = useState('');

  const navigate = useNavigate(); 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setSelectedImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage || !productName || !productDescription || !productPrice) {
      alert('Please fill all the fields');
      return;
    }

    const newData = {
      title: productName.trim(),
      image: selectedImage,
      category: productCategory.trim(),
      description: productDescription.trim(),
      price: parseFloat(productPrice),
      createdAt:serverTimestamp()
    };

    try {
      await addDoc(collection(fireStore, 'Products'), newData);
      setProductData(newData);
      setItems?.(newData); 

      alert('Product added successfully!');

      setSelectedImage(null);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('no-category');

      navigate('/'); 
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      alert('Failed to save product.');
    }
  };

  return (

  <>
  <Navbar toggleModal={toggleModal}/>

  <div className="min-h-screen bg-gray-100 py-6 px-4 pt-20">
    <div className="bg-white py-4 px-6 shadow-sm mb-6 flex justify-center">
      <h1 className="text-2xl font-semibold text-gray-800">Post Your Ad</h1>
    </div>

    <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md p-6 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 border border-gray-300 rounded-md h-72">
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" className="object-contain h-full w-full rounded" />
        ) : (
          <span className="text-gray-500 text-lg">Image Preview</span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input type="file" onChange={handleImageChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" value={productName} onChange={(e) => setName(e.target.value)} placeholder="e.g. Yamaha Helmet" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price (INR)</label>
          <input type="number" value={productPrice} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 2500" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" value={productCategory} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Helmets" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea value={productDescription} onChange={(e) => setDescription(e.target.value)} placeholder="Write details about your item" className="mt-1 w-full p-2 border border-gray-300 rounded-md resize-none" rows={4}></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Post Now
        </button>
      </form>
    </div>
  </div>
  <Footer/>
  </>

  );
};

export default Sell;

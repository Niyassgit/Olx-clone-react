import { collection } from 'firebase/firestore';
import React,{useState,useContext} from 'react'
import { fetchFromFireStore, fireStore } from '../Firebase/Firebase';
import uploadImageToCloudinary from '../Cloudinary/imageUpload';
import { ProductContext } from '../Context/productContext';
import { addDoc } from 'firebase/firestore';


const Sell = (props) => {
  const {toggleSellModal,status}=props

  const { setProductData}=useContext(ProductContext);
  const [selectedImage,setSelectedImage]=useState(null)
  const[productName,setName]=useState("");
  const [productPrice,setPrice]=useState(1.00)
  const [productCategory,setCategory]=useState('no-category');
  const[productDescription,setDescription]=useState('')

const handleImageChange= async(e)=>{
  const file=e.target.files[0];
  if(file){
    try {
      const imageUrl=await uploadImageToCloudinary(file);
      setSelectedImage(imageUrl);
    } catch (error) {
      console.error("Error iploading image:",error);

    }
  }
}

const handleSubmit=async(e)=>{
  e.preventDefault()

  console.log(selectedImage ,productName ,productDescription ,productPrice);

  if(!selectedImage || !productName || !productDescription || !productPrice){
    alert('Please fill all the fields');
    return
  }
  const trimmedName=productName.trim()
  const trimmedDesc=productDescription.trim();
  const trimmedCategory=productCategory.trim();
    const newData = {
            title: trimmedName,
            image: selectedImage,
            category: trimmedCategory,
            description: trimmedDesc,
            price:productPrice
        }
        console.log(newData);

  try {


    await addDoc(collection (fireStore,'Products'),newData);
       setProductData(newData)
    alert("Image added successfully");
        setSelectedImage(null);
            setName('');
            setDescription('');
            setPrice(1.00);
  } catch (error) {
        console.error("Error saving to Firestore:", error);
    alert("Failed to save product.");

  }

}
  
  return (
    <div className="sell">
      <div className="navbar w-full flex px-4 py-[10px] gap-4 items-center bg-gray-100 text-emerald-900 shadow-md justify-center" >
        <h1 className='font-bold text-3xl stroked-text stroke-slate-50'>POST YOUR PRODUCT</h1>
      </div>

      <div className="main">
        <div className="sell flex justify-between mr-10 ml-40 items-center p-4">
          <div className="image-container flex my-4 border-gray-400 bg-gray-300 h-100 w-130 mr-10 justify-center items-center">
            {selectedImage ? <img src={selectedImage} alt='Selected' className='w-crop h-fit object-cover'/> : <h1 className='items-center font-medium text-gray-700 text-2xl'>Preview</h1>}
          </div>

          <form className='flex flex-col gap-4 w-1/3'>
          <input type="file" placeholder='' onChange={handleImageChange} className='border-2 border-gray-400 bg-gray-500 rounded-md p-2 outline-none' />
          
          <input  type='text' onChange={(e)=>setName(e.target.value)} placeholder='Product Name' className='border-2 border-gray-400 bg-gray-500 rounded-md p-2 outline-none' />
          <input type="text" onChange={(e)=>setPrice(e.target.value)} placeholder='Product Price' className='border-2 border-gray-400 rounded-md p-2 outline-none' />
          <input type="text" onChange={(e)=>setCategory(e.target.value)} placeholder='Product Category' className='border-2 border-gray-400 rounded-md p-2 outline-none' />
           <input type="text" onChange={(e)=>setDescription(e.target.value)}  placeholder='Product Description' className='border-2 border-gray-400 rounded-md p-2 h-25 outline-none' />
           <button type='submit' onClick={handleSubmit} className='bg-blue-500 text-white py-2 ronded-md cursor-pointer'>Sell Item</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Sell

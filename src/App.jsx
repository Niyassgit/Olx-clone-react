import { useState } from 'react';
import './App.css'
import Home from "../src/components/Home/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails.jsx/ProductDetails';
import Sell from './components/Sell/Sell';
import Login from './components/Login/Login';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal(!openModal);
  return (
    <>
      <Router>
        <Login toggleModal={toggleModal} status={openModal} />
        <Routes>
          <Route path="/" element={<Home toggleModal={toggleModal} openModal={openModal} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/sell" element={<Sell toggleModal={toggleModal} />} />
        </Routes>
      </Router>
    </>
  )

}

export default App

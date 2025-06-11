import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Sell from '../../components/Sell/Sell';
import Card from '../Card/Card';
import { useItemContext } from '../Context/Item';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { fireStore } from '../Firebase/Firebase';
import Footer from '../Footer';

const Home = ({ toggleModal, openModal }) => {
  const [addedItems, setAddedItems] = useState([]);

  const itemsCtx = useItemContext();

  useEffect(() => {
    const getItems = async () => {
      try {
        const q = query(collection(fireStore, 'Products'), orderBy('createdAt', 'desc'));
        const res = await getDocs(q);

        const data2 = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        const formattedData = data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          price: Math.floor(item.price * 83),
          image: item.image
        }));
        const combinedData = [...data2, ...formattedData]

        itemsCtx?.setItems(combinedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getItems();
  }, [addedItems]);

  return (
    <div>
      <Navbar toggleModal={toggleModal} />
      <Login toggleModal={toggleModal} status={openModal} />
      <div className="pt-20">
        <Card items={itemsCtx.items} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

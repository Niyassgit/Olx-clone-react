import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from '../Navbar/Navbar'
import Login from '../Login/Login'
import Sell from "../../components/Sell/Sell"
import Card from '../Card/Card'
import { fetchFromFireStore } from '../Firebase/Firebase'
import { useItemContext } from '../Context/Item'



const Home = () => {

  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);

  const toggleSellModal = () => {
    console.log('called')
    setModalSell(!openModalSell);
  }
  const toggleModal = () => {
    setModal(!openModal)
  }

  const itemsCtx = useItemContext();

  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFireStore()
      itemsCtx?.setItems(datas)
    }

    getItems();
  }, []);
  useEffect(() => {
    console.log('updated items:', itemsCtx.items)
  }, [])
  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleSellModal={toggleSellModal} />
      <Login toggleModal={toggleModal} status={openModal} />
      <div className="pt-20">

        <div className="pt-10">
          {
            openModalSell
              ? <Sell toggleSellModal={toggleSellModal} status={openModalSell} setItems={itemsCtx.setItems} />
              : <Card items={itemsCtx.items} />
          }
        </div>
      </div>
    </div>
  )
}

export default Home

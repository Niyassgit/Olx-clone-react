import { collection,getDocs } from 'firebase/firestore';
import {createContext,useContext,useEffect,useState} from 'react';
import { fireStore} from '../Firebase/Firebase';


const Context=createContext(null);

export const useItemContext=()=>useContext(Context)


export const ItemContextProvider=({children})=>{
    const[items,setItems]=useState(null);

    useEffect(()=>{
        const fetchItemsFromFireStore =async()=>{
            try {
                
                const productCollection=collection(fireStore,"Products");
                const ProductSnapShot=await getDocs(productCollection)
                const productsList=ProductSnapShot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setItems(productsList)
            } catch (error) {
                console.log("error fetching products,",error)
            }
        }
        fetchItemsFromFireStore();
    },[]);

    return(
        <>
        <Context.Provider value={{items,setItems}}>
      {children}

        </Context.Provider>
        
        </>
    )
}
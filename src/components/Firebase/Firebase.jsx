import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore,getDocs} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQ1FpmRihImVpZPo-MgCuL8IvtZyxtS38",
  authDomain: "olx-clone-a9b83.firebaseapp.com",
  projectId: "olx-clone-a9b83",
  storageBucket: "olx-clone-a9b83.firebasestorage.app",
  messagingSenderId: "191976604453",
  appId: "1:191976604453:web:e9ea1a8735aad09ed050cc"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
const storage=getStorage()
const fireStore=getFirestore()

const fetchFromFireStore=async()=>{
    try {
        
        const productsCollection =collection(fireStore,'products')
        const productSnapshot= await getDocs(productsCollection)
        const productList=productSnapshot.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }))
        console.log('fetched products from FireStore',productList)
        return productList;
    } catch (error) {
        console.error('error fetching products from Firestore:',error)
        return[]
        
    }
}

export{
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFireStore
}
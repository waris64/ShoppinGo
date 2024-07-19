// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWsOcfz5_BArAssGDoVtBppBhPvcsvjvQ",
  authDomain: "shoppinggo-cddb3.firebaseapp.com",
  projectId: "shoppinggo-cddb3",
  storageBucket : "shoppinggo-cddb3.appspot.com",
  messagingSenderId: "4594573367",
  appId: "1:4594573367:web:e0f229bcc742f7b4951fb2",
  databaseURL:" https://shoppinggo-cddb3-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export{fireDB,auth}
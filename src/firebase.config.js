import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWsOcfz5_BArAssGDoVtBppBhPvcsvjvQ",
    authDomain: "shoppinggo-cddb3.firebaseapp.com",
    databaseURL: "https://shoppinggo-cddb3-default-rtdb.firebaseio.com",
    projectId: "shoppinggo-cddb3",
    storageBucket: "shoppinggo-cddb3.appspot.com",
    messagingSenderId: "4594573367",
    appId: "1:4594573367:web:e0f229bcc742f7b4951fb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDB = getFirestore(app);

export { auth, fireDB };

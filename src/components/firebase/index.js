import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBm_MtZ9IzdJrMX4I58P1ULB8VhvC14fa8",
    authDomain: "todoappredux-fbc26.firebaseapp.com",
    projectId: "todoappredux-fbc26",
    storageBucket: "todoappredux-fbc26.appspot.com",
    messagingSenderId: "847472896392",
    appId: "1:847472896392:web:e7e827a71fe46ec245723d",
    measurementId: "G-DBKTF9HLZQ"
  };
  

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);




  


  
  
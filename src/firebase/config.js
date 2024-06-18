
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT0LaCA7shg_guRyryYVoznui_pKCaAPM",
  authDomain: "react-olx-8076b.firebaseapp.com",
  projectId: "react-olx-8076b",
  storageBucket: "react-olx-8076b.appspot.com",
  messagingSenderId: "124316984208",
  appId: "1:124316984208:web:9ec88d9995a7bfd8118915"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db = getFirestore(app)
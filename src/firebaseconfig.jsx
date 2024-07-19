// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnOREx5CEGnu7HtN70qiqzb0liO8hcgWo",
  authDomain: "malikale-safaris.firebaseapp.com",
  databaseURL: "https://malikale-safaris-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "malikale-safaris",
  storageBucket: "malikale-safaris.appspot.com",
  messagingSenderId: "423363299364",
  appId: "1:423363299364:web:b96415f5b6c23ac0f370b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
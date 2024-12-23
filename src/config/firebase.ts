// Import the functions you need from the SDKs you need
import {  initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvo7B-sxStogSSRoHGHO8rrIY4wdmntr4",
    authDomain: "movieapp-c0fcc.firebaseapp.com",
    projectId: "movieapp-c0fcc",
    storageBucket: "movieapp-c0fcc.firebasestorage.app",
    messagingSenderId: "941022984669",
    appId: "1:941022984669:web:f9d5f830a54e325a019e34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, { 
    persistence: getReactNativePersistence(AsyncStorage)
})


export const auth = getAuth(app);
export const db = getFirestore(app);



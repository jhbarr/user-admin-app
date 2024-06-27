// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoFTukAozMJOpSZHIwZfYg-s4woz90QmA",
  authDomain: "admin-user-app-7298f.firebaseapp.com",
  projectId: "admin-user-app-7298f",
  storageBucket: "admin-user-app-7298f.appspot.com",
  messagingSenderId: "5068928949",
  appId: "1:5068928949:web:dd6a55d9475c5c8514cbfc"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// const auth = getAuth(firebase);

export { firebase, auth, getAuth }
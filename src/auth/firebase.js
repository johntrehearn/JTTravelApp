// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword } from "firebase/auth";

import {addDoc, getFirestore, collection} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "countries-react-7e9b3.firebaseapp.com",
  projectId: "countries-react-7e9b3",
  storageBucket: "countries-react-7e9b3.appspot.com",
  messagingSenderId: "679922191367",
  appId: "1:679922191367:web:e9beb6060b483e524eeea2"
};

// Initialize Firebase changes here

export const app = initializeApp(firebaseConfig);

// Here we get the auth and firestore services from firebase

const auth = getAuth(app);

// Here we get the firestore service from firebase
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {

    // Here we create a new user with email and password in firebase
   const res = await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;

   // Here we add the user to the users database (collection in firestore)
   await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
   });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }

};

export const loginWithEmailAndPassword = async (email, password) => {
  try{
    //below this is googles function name
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  } 
  
};

export const logout = () => {
  auth.signOut();
};

export {registerWithEmailAndPassword, auth, db};
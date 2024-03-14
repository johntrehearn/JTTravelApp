import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../auth/firebase";
import WelcomeUser from './WelcomeUser';



const Home = () => {


  return (
    <div>
      <h1>Home</h1>
      <WelcomeUser />
    </div>
  );
};

export default Home;

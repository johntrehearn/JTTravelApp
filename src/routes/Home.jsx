import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../auth/firebase";
import WelcomeUser from './WelcomeUser';
import IMAGES from '../images/images';




const Home = () => {


  return (
    <div className='landingPage'>
      <h1>JT Travel Planner</h1>
      <img src={IMAGES.boat} width={500}></img>
      <WelcomeUser />
      <h2>Save your favourites and mark your visited countries</h2>
    </div>
  );
};

export default Home;

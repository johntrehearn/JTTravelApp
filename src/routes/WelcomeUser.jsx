import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../auth/firebase";

const WelcomeUser = () => {

    const [user] = useAuthState(auth);

    const [name, setName] = useState();

    useEffect(() => {
        const getUserData = async () => {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const name = doc.data().name;
                setName(name);
            });
        };

        if (user) {
            getUserData();
        }
    }, [user]);

    return (
        <div>
            <h1>{name ? `Thank you for logging in ${name}` : "Please log in for the full experiance"}</h1>
        </div>
    );
};

export default WelcomeUser;

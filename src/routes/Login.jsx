import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const login = () => {
    loginWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) console.log("User Info:", user);
    if (user) navigate("/countries");
  }, [user, loading]);

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={login}>Login</Button>
    </div>
  );
};

export default Login;

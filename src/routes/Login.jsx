import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        loginWithEmailAndPassword(email, password);

    }

    useEffect(() => {
        if (loading) return;
        if (user) console.log("User Info:", user);
        if (user) navigate('/countries');
    }, [user, loading]);

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={login}>login</Button>
        </div>
    );
};


export default Login;
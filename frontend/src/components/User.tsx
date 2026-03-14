import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export function Login() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div className="text-center mt-5">
            <h1>Sign in</h1>
            <Button onClick={handleLogin} variant="primary">
                Sign in with Google
            </Button>
        </div>
    )
}

export function Logout() {

    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {

        await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        setUser(null);

        window.location.href = '/';
    };

    return (
        <Button onClick={handleLogout} variant="secondary" size="lg">
            Logout
        </Button>
    )
}

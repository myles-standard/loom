import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

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
        <div onClick={handleLogout} className=" text-decoration-none text-secondary">
            Log out
        </div>
    );
}

export default Logout;

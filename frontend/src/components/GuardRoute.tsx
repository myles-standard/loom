import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

/**
 * A route component that guards access to protected routes based on user authentication status.
 * @returns {JSX.Element} The guarded route component.
 */
function GuardedRoute() {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div className="loading">Loading</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default GuardedRoute;

import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Login from '../auth/Login';
import Logout from '../auth/Logout';

function Topbar() {

    const { user, loading } = useContext(UserContext);

    function handleAvatarError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        const target = e.target as HTMLImageElement;
        target.src = `https://ui-avatars.com/api/?name=${user?.displayName || 'Guest'}`;
    }

    if (loading) {
        return (
            <div className="topbar border-bottom border-secondary-subtle d-flex justify-content-between align-items-center px-3 py-2">
                <div className="user-info">
                    <span className="user-name">Loading...</span>
                </div>
                <div className="auth-buttons">
                    {/* Show nothing or a loading spinner during auth check */}
                </div>
            </div>
        );
    }

    return (
        <div className="topbar border-bottom border-secondary-subtle d-flex justify-content-between align-items-center px-3 py-2">
            <div className="user-info">
                {user?.avatar && (
                    <img
                        src={user.avatar}
                        alt="profile"
                        className="profile-pic"
                        referrerPolicy="no-referrer"
                        onError={handleAvatarError}
                    />
                )}
                <span className="user-name">{user?.displayName || 'Guest'}</span>
            </div>
            <div className="auth-buttons">
                {user ? <Logout /> : <Login />}
            </div>
        </div>
    )
}

export default Topbar;

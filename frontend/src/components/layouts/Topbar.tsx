import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Spinner from 'react-bootstrap/Spinner';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
import Dropdown from 'react-bootstrap/Dropdown';
import { CaretDownFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import Nav from 'react-bootstrap/Nav';
import { APP_NAME } from '../../config/constants';

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
                    <span className="user-display-name loading">Loading</span>
                </div>
                <div className="auth-buttons">
                    <Spinner size="sm" className="me-2" animation="border" />
                </div>
            </div>
        );
    }

    return (
        <div className="topbar border-bottom border-secondary-subtle d-flex justify-content-between align-items-center px-3 py-2">
            <Nav.Link
                as={Link}
                to={ROUTES.dashboard}
                className="d-flex justify-content-between align-items-center"
            >
                <div className="text-nowrap fs-4 font-subtle-grey-1">{APP_NAME}</div>
            </Nav.Link>
            <div className="user-info">
                <Dropdown className="">
                    {user?.avatar && (
                        <>
                            <Dropdown.Toggle
                                className="d-flex align-items-center avatar-button border-0 bg-transparent p-0 m-0"
                                type="button"
                                id="dropdownMenuButton"
                            >
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    className="user-avatar m-1"
                                    referrerPolicy="no-referrer"
                                    onError={handleAvatarError}
                                />
                                <span className="user-display-name truncate m-1 d-none d-md-block text-dark">
                                    {user?.displayName || 'Guest'}
                                </span>
                                <CaretDownFill className="ms-1 text-secondary caret" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
                                <Dropdown.Item>{user ? <Logout /> : <Login />}</Dropdown.Item>
                            </Dropdown.Menu>
                        </>
                    )}
                </Dropdown>
            </div>
        </div>
    );
}

export default Topbar;

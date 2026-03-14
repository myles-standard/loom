import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Spinner from "react-bootstrap/Spinner";
import Login from "../auth/Login";
import Logout from "../auth/Logout";

function Topbar() {
  const { user, loading } = useContext(UserContext);

  function handleAvatarError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const target = e.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?name=${user?.displayName || "Guest"}`;
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
      <div className="user-info d-flex align-items-center">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            className="user-avatar m-1"
            referrerPolicy="no-referrer"
            onError={handleAvatarError}
          />
        )}
        <span className="user-display-name truncate m-1 d-none d-md-block">
          {user?.displayName || "Guest"}
        </span>
      </div>
      <div className="auth-buttons">{user ? <Logout /> : <Login />}</div>
    </div>
  );
}

export default Topbar;

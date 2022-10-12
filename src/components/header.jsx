import argentBankLogo from "../assets/img/argentBankLogo.png";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useStore } from "react-redux";

import {
  selectIsAuthenticatedUser,
  selectUserFirstName,
} from "../utils/selectors";

import { logout } from "../features/auth";

function Header() {
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser);
  const userFirstName = useSelector(selectUserFirstName);

  const store = useStore();
  const navigate = useNavigate();

  return (
    <header className="component header">
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        {isAuthenticatedUser ? (
          <div>
            <NavLink to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userFirstName}
            </NavLink>
            <NavLink
              to="/"
              className="main-nav-item"
              onClick={(event) => {
                event.preventDefault();
                logout(store);
                navigate("/");
              }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

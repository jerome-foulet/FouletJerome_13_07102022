import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { selectIsAuthenticatedUser } from "../utils/selectors";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    document.title = "Argent Bank - Login Page";
  }, []);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  //const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser);
  const isAuthenticatedUser = useSelector((state) => state.isAuthenticatedUser);

  useEffect(() => {
    if (isAuthenticatedUser) {
      navigate("/profile");
    }
  }, [isAuthenticatedUser, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/*<!-- PLACEHOLDER DUE TO STATIC SITE -->*/}
          <button
            className="sign-in-button"
            onClick={(event) => {
              event.preventDefault();
              dispatch({ type: "loginUser" });
            }}
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;

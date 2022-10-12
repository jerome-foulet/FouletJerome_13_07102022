import { useEffect } from "react";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../features/auth";

function Login() {
  useEffect(() => {
    document.title = "Argent Bank - Login Page";
  }, []);

  const store = useStore();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (
      await postLogin(store, {
        userEmail: event.target.userEmail.value,
        userPassword: event.target.userPassword.value,
      })
    ) {
      navigate("/profile");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="userEmail">Email</label>
            <input
              name="userEmail"
              type="text"
              id="userEmail"
              defaultValue="tony@stark.com"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              name="userPassword"
              type="password"
              id="password"
              defaultValue="password123"
            />
          </div>
          <div className="input-remember">
            <input name="remember-me" type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;

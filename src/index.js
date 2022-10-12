import ReactDOM from "react-dom/client";
import "./utils/style/index.css";

import Header from "./components/header";
import Footer from "./components/footer";

import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./utils/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  </Provider>
);

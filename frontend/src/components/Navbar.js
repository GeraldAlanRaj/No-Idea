import { Outlet, Link } from "react-router-dom";
import "../styles/Navbar.css";
import logoImage from "../assets/Logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navdiv">
        <div className="logo">
          <img className="Logo" src={logoImage} alt="logo" />
        </div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;

import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logoImage from "../assets/Logo.png";
import Profile from "../pages/Profile";
import "../styles/components/Navbar.css";

const Navbar = ({ triggerNutritionRefresh }) => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navdiv">
          <div className="logo">
            <img className="Logo" src={logoImage} alt="logo" />
          </div>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li>
              <button className="profile-button" onClick={toggleProfile}>Profile</button>
            </li>
          </ul>
        </div>
      </div>
      {showProfile && (
        <Profile 
          onClose={toggleProfile} 
          triggerNutritionRefresh={triggerNutritionRefresh} 
        />
      )}
      <Outlet />
    </div>
  );
};

export default Navbar;

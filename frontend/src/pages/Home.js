import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Move useNavigate inside the component

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Navigate after removing token
  };

  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

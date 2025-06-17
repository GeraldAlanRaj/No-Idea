import React, { useState } from "react";
import instance from "../utils/axiosInterceptor";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login-page-image.jpg";
import logoImage from "../assets/Logo.png";
import "../styles/pages/Login.css"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await instance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="Login">
      <div className="Login_Form_Section">
      <div className="Login_Form">
      <img className="Logo" src={logoImage} alt="logo" />
      <h2>WELCOME BACK</h2>
      <p>Welcome Back! Please enter your details.</p>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Sign In</button>
      <button className="Google_button">Sign in with Google</button>
      <Link to="/signup">Don't have an account? Sign up for free</Link>
      </div>
      </div>
      <div className="Login_Image">
      <img src={loginImage} alt="login" />
      </div>
    </div>
  );
};

export default Login;

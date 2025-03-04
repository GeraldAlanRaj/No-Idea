import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import SignUpImage from "../assets/signup-page-image.jpg";
import logoImage from "../assets/Logo.png";



const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let errors = [];
    if (!username.trim()) errors.push("Username is required");
    if (!email.trim()) errors.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Invalid email format");
    if (!phone.trim()) errors.push("Phone number is required");
    else if (!/^\d{10}$/.test(phone)) errors.push("Phone number must be 10 digits");
    if (!password.trim()) errors.push("Password is required");
    else if (password.length < 6) errors.push("Password must be at least 6 characters");
    
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    
    try {
      await axios.post("http://localhost:5001/api/auth/signup", { username, email, phone, password });
      navigate("/login");
    } catch (err) {
      alert("Error signing up");
    }
  };

  return (

    <div className="Signup">
      <div className="Signup_Form_Section">
      <div className="Signup_Form">
        <img className="Logo" src={logoImage} alt="logo" />
        <h2>Create an Account</h2>
        <p>Get Healthier Today!</p>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
        <button className="Google_Button">Sign up with Google</button>
        </div>
      </div>
      <div className="Signup_Image">
            <img src={SignUpImage} alt="SignUp" />
      </div>
    </div>
  );
};

export default Signup;

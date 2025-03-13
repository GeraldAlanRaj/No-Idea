import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/pages/Profile.css"

const Profile = ({ onClose }) => {

    const[age, setAge] = useState();
    const[height, setHeight] = useState();
    const[weight, setWeight] = useState();
    const [gender, setGender] = useState("");
    const[activity, setActivity] = useState("");

    const handle_radio = (e) => {
      setGender(e.target.value);
    };

    const handle_selectbox = (e) => {
      setActivity(e.target.value);
    };

    
    const navigate = useNavigate(); // Move useNavigate inside the component

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Navigate after removing token
    };
    
    const getUsernameFromToken = () => {
      const token = localStorage.getItem("token");
      if (!token) return null;
    
      try {
        const base64Url = token.split(".")[1];
        if (!base64Url) return null;
    
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedData = JSON.parse(atob(base64));
    
        return decodedData.username; // Now it should return the username!
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    };
    

    const username = getUsernameFromToken();
  
    return (
      <div className="profile-sidebar">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>User Profile</h2>
        <p>Hi! {username}</p>


        <div className="User-Details">
        <input type="number" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="number" placeholder="Enter Height" value={height} onChange={(e) => setHeight(e.target.value)} />
        <input type="number" placeholder="Enter Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <div>
        <label>
          <input type="radio" value="Male" checked={gender === "Male"} onChange={handle_radio} />
          Male
        </label>
        <label>
          <input type="radio" value="Female" checked={gender === "Female"} onChange={handle_radio} />
          Female
        </label>
        </div>
        <div>
        <select value={activity} onChange={handle_selectbox}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        </div>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };
  
  export default Profile;
  


  /*
  To pass the details from the profile page to home page

  import React, { createContext, useContext } from "react";

// Create Context
const MyContext = createContext();

const Parent = ({ children }) => {
  const value = "Hello from Parent!";
  return (
    <MyContext.Provider value={value}>
      {children} {// No need to explicitly pass props }
      </MyContext.Provider>
    );
  };
  
  const Child = () => {
    const message = useContext(MyContext); // Receive the prop
    return <div>{message}</div>;
  };
  
  export default function App() {
    return (
      <Parent>
        <Child />
      </Parent>
    );
  }
  

  */
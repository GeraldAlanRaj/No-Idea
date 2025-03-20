import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Profile.css";
import jwtDecoder from "../components/JWT_Decoder";

const Profile = ({ onClose }) => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");

  const username = jwtDecoder.getUsernameFromToken();
  const userId = jwtDecoder.getUserIdFromToken();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/profile/${userId}`);
        if (res.status === 200) {
          const userProfile = res.data;
          setAge(userProfile.age || "");
          setHeight(userProfile.height || "");
          setWeight(userProfile.weight || "");
          setGender(userProfile.gender || "");
          setActivity(userProfile.activity || "");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdate = async () => {
    if (!age || !height || !weight || !gender || !activity) {
      alert("Please fill out all fields before updating.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5001/api/profile/update/${userId}`, {
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        gender,
        activity,
      });

      if (res.status === 200) {
        alert("Profile updated successfully");
        console.log("Updated User Data:", res.data);
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile");
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-sidebar">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>User Profile</h2>
      <p>Hi! {username}</p>

      <div className="User-Details">
        <div className="Age">
        <label>Age :
        <input 
          type="number" 
          placeholder={age ? age : "Enter Age"} 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          min="1"
        />
        </label>
        </div>
        <div className="Height">
        <label>Height :
        <input 
          type="number" 
          placeholder={height ? height : "Enter Height (cm)"} 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
          min="1"
        />
        </label>
        </div>
        <div className="Weight">
        <label>Weight :
        <input 
          type="number" 
          placeholder={weight ? weight : "Enter Weight (kg)"} 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
          min="1"
        />
        </label>
        </div>
        <div className="Gender">
          <label>Gender :
          <label>
            <input type="radio" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
            Male
          </label>
          <label>
            <input type="radio" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
            Female
          </label>
          </label>
        </div>
        <div className="Acitivity-Level">
          <label>Activity Level :
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="">Select Activity Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          </label>
        </div>

        <button className="Update-button" onClick={handleUpdate}>Update Details</button>
      </div>

      <button className="Logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

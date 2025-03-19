import React, { useState } from "react";
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

  //Decode the userId and userName from the JWT Token
  const username = jwtDecoder.getUsernameFromToken();
  const userId = jwtDecoder.getUserIdFromToken();

  const handleUpdate = async () => {
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5001/api/users/update/${userId}`, {
        age: Number(age) || 0, // Convert safely
        height: Number(height) || 0,
        weight: Number(weight) || 0,
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

  const handle_radio = (e) => setGender(e.target.value);
  const handle_selectbox = (e) => setActivity(e.target.value);

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
            <option value="">Select Activity Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button onClick={handleUpdate}>Update Details</button>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

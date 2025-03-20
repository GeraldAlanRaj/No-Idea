import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecoder from "../components/JWT_Decoder";
import "../styles/components/User_Details.css";

const Details = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");

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
          setGoal(userProfile.goal || "");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdate = async () => {
    if (!age || !height || !weight || !gender || !activity || !goal) {
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
        goal,
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

  return(
    <div className="User-Details">
        <h2>User Profile</h2>
        <p>Hi! {username}</p>
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
          <label>Activity :
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="">Select Activity Level</option>
            <option value="BMR">Basal Metabolic Rate</option>
            <option value="Sedentary">Little or no Exercise</option>
            <option value="Light">Exercise 1-3 times/week</option>
            <option value="Moderate">Exercise 4-5 times/week</option>
            <option value="Active">Daily Exercise or itense Exercise 3-4 times/week</option>
            <option value="Very Active">Intense Exercise 6-7 times/week</option>
            <option value="Extra Active">Very Intense Exercise Daily</option>
          </select>
          </label>
        </div>

        <div className="Goal">
          <label>Goal :
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="">Select Your Goal</option>
            <option value="Maintain Weight">Maintain Weight</option>
            <option value="Mild Weight Loss">Mild Weight loss of 0.25 kg per week</option>
            <option value="Moderate Weight Loss">Moderate Weight loss of 0.5 kg per week</option>
            <option value="Extreme Weight Loss">Extreme Weight loss of 1 kg per week</option>
            <option value="Mild Weight Gain">Mild Weight gain of 1 kg per week</option>
            <option value="Moderate Weight Gain">Moderate Weight gain of 1 kg per week</option>
            <option value="Moderate Weight Gain">Extreme Weight gain of 1 kg per week</option>
          </select>
          </label>
        </div>

        <button className="Update-button" onClick={handleUpdate}>Update Details</button>
      </div>
  );

}

export default Details;
import React, { useEffect, useState } from "react";
import axios from "axios";

const CalorieMacroCalculator = ({ userId, refreshTrigger }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:5001/api/profile/${userId}/details-with-calories`);
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching nutrition data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, refreshTrigger]); // Refresh when refreshTrigger changes

  if (loading) return <p>Loading nutrition info...</p>;
  if (!userData) return <p>No user data available.</p>;

  const { calories, macros } = userData.nutrition;

  return (
    <div className="calorie-macro-container">
      <h2 className="text-xl font-semibold mb-2">Daily Nutrition Summary</h2>
      <p><strong>Calories:</strong> {calories} kcal</p>
      <ul className="list-disc ml-6 mt-2">
        <li><strong>Carbohydrates:</strong> {macros.carbs} g</li>
        <li><strong>Protein:</strong> {macros.protein} g</li>
        <li><strong>Fat:</strong> {macros.fat} g</li>
        <li><strong>Fiber:</strong> {macros.fiber} g</li>
      </ul>
    </div>
  );
};

export default CalorieMacroCalculator;
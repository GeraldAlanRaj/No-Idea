import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import instance from '../../utils/axiosInterceptor';
import '../../styles/components/visualization/CalorieVisualization.css';

const calorieColors = ['#D3D3D3', '#4B4B4B'];

const CalorieVisualization = ({ userId, date, refreshTrigger, history_date }) => {
  const [required, setRequired] = useState(null);
  const [taken, setTaken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await instance.get(
          `http://localhost:5001/api/profile/${userId}/details-with-calories`
        );
        const takenRes = await instance.get(
          `http://localhost:5001/api/foodtrack/daily-totals?userId=${userId}&date=${date}`
        );
        setRequired(profileRes.data.nutrition);
        setTaken(takenRes.data);
      } catch (err) {
        console.error('Error fetching nutrition data:', err);
      }
    };

    if (userId && date) {
      fetchData();
    }
  }, [userId, date, refreshTrigger, history_date]);

  if (!required || !taken)
    return <p className="text-center mt-6">Loading nutrition data...</p>;

  const calorieData = [
    { name: 'Taken', value: parseFloat((taken.calories || 0).toFixed(2)) },
    { name: 'Remaining', value: parseFloat(Math.max((required.calories || 0) - (taken.calories || 0), 0).toFixed(2)) }
  ];

  return (
    <div className="calorie-chart">
      <div className="left-section">
        <PieChart width={250} height={250}>
          <Pie
            data={calorieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {calorieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={calorieColors[index % calorieColors.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>

      <div className="right-section">
        <p><strong>{(taken.calories || 0).toFixed(2)}</strong> kcal taken</p>
        <p>of <strong>{(required.calories || 0).toFixed(2)}</strong> kcal required</p>
      </div>
    </div>
  );
};

export default CalorieVisualization;

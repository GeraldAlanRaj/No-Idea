import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import instance from '../utils/axiosInterceptor';


const calorieColors = ['#00C49F', '#FF8042'];
const macroColors = {
  protein: '#8884d8',
  carbs: '#82ca9d',
  fat: '#ffc658',
  fiber: '#ff7f50'
};

const CalorieVisualization = ({ userId, date, food }) => {
  const [required, setRequired] = useState(null);
  const [taken, setTaken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await instance.get(`http://localhost:5001/api/profile/${userId}/details-with-calories`);
        const takenRes = await instance.get(`http://localhost:5001/api/foodtrack/daily-totals?userId=${userId}&date=${date}`);
        setRequired(profileRes.data.nutrition);
        setTaken(takenRes.data);
      } catch (err) {
        console.error('Error fetching nutrition data:', err);
      }
    };

    if (userId && date) {
      fetchData();
    }
  }, [food]);

  if (!required || !taken) return <p className="text-center mt-6">Loading nutrition data...</p>;

  const calorieData = [
    { name: 'Required', value: required.calories },
    { name: 'Taken', value: taken.calories },
  ];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Donut Chart */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2">Calorie Intake</h2>
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
              <Cell key={`cell-${index}`} fill={calorieColors[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        <p className="mt-2 text-center">
          {taken.calories} kcal taken of {required.calories} kcal
        </p>
      </div>
    </div>
  );
};

export default CalorieVisualization;

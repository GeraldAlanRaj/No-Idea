import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import instance from '../utils/axiosInterceptor';

const COLORS = ['#00C49F', '#FF8042'];
const macroColors = {
  protein: '#8884d8',
  carbs: '#82ca9d',
  fat: '#ffc658',
  fiber: '#ff7f50'
};

const NutritionVisualization = ({ userId, date, food }) => {
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
  }, [userId, date]);

  const getPercentage = (macro) => {
    if (!required || !taken) return 0;
    const req = required.macros[macro];
    const tk = taken[macro] || 0;
    return Math.min((tk / req) * 100, 100);
  };

  if (!required || !taken) return <p className="text-center mt-6">Loading nutrition data...</p>;

  const calorieData = [
    { name: 'Required', value: required.calories },
    { name: 'Taken', value: taken.calories },
  ];

  const macros = ['protein', 'carbs', 'fat', 'fiber'];

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
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        <p className="mt-2 text-center">
          {taken.calories} kcal taken of {required.calories} kcal
        </p>
      </div>

      {/* Macro Progress Bars */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Macronutrients</h2>
        {macros.map((macro) => (
          <div key={macro}>
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize">{macro}</span>
              <span>
                {taken[macro] || 0}g / {required.macros[macro]}g
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${getPercentage(macro)}%`,
                  backgroundColor: macroColors[macro]
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionVisualization;

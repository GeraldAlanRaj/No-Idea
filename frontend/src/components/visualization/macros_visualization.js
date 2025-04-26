import { Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import instance from '../../utils/axiosInterceptor'
  
  const macroColors = {
    protein: '#8884d8',
    carbs: '#82ca9d',
    fat: '#ffc658',
    fiber: '#ff7f50'
  };
  
  const MacrosVisualization = ({ userId, date, foods, refreshTrigger }) => {
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
    }, [userId, date, foods, refreshTrigger]);
  
    const getPercentage = (macro) => {
      if (!required || !taken) return 0;
      const req = required.macros[macro];
      const tk = taken[macro] || 0;
      if (!req || req === 0) return 0;
      return Math.min((tk / req) * 100, 100);
    };
  
    if (!required || !taken)
      return <p className="text-center mt-6">Loading nutrition data...</p>;
  
    const macros = ['protein', 'carbs', 'fat', 'fiber'];
  
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Macronutrient Comparison
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                {
                  name: 'Protein',
                  Required: required.macros.protein,
                  Taken: taken.protein || 0
                },
                {
                  name: 'Carbs',
                  Required: required.macros.carbs,
                  Taken: taken.carbs || 0
                },
                {
                  name: 'Fat',
                  Required: required.macros.fat,
                  Taken: taken.fat || 0
                },
                {
                  name: 'Fiber',
                  Required: required.macros.fiber,
                  Taken: taken.fiber || 0
                }
              ]}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value} g`} />
              <Legend />
              <Bar dataKey="Required" fill="#8884d8" />
              <Bar dataKey="Taken" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
  
          <div className="mt-4 text-sm text-center">
            {macros.map((macro) => (
              <p key={macro}>
                {macro.charAt(0).toUpperCase() + macro.slice(1)}: {getPercentage(macro).toFixed(1)}%
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default MacrosVisualization;
  
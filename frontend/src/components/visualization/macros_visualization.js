import { Legend, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';
import instance from '../../utils/axiosInterceptor';
import '../../styles/components/visualization/MacroVisualization.css';

const MacrosVisualization = ({ userId, date, refreshTrigger, history_date }) => {
  const [required, setRequired] = useState(null);
  const [taken, setTaken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await instance.get(
          `/profile/${userId}/details-with-calories`
        );
        const takenRes = await instance.get(
          `/foodtrack/daily-totals?userId=${userId}&date=${date}`
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
    <div className="calorie-chart">
      <div className="left-section">
        <ResponsiveContainer width={450} height={300}>
          <BarChart
            data={[
              {
                name: 'Protein',
                Required: parseFloat((required.macros.protein || 0).toFixed(2)),
                Taken: parseFloat((taken.protein || 0).toFixed(2)),
              },
              {
                name: 'Carbs',
                Required: parseFloat((required.macros.carbs || 0).toFixed(2)),
                Taken: parseFloat((taken.carbs || 0).toFixed(2)),
              },
              {
                name: 'Fat',
                Required: parseFloat((required.macros.fat || 0).toFixed(2)),
                Taken: parseFloat((taken.fat || 0).toFixed(2)),
              },
              {
                name: 'Fiber',
                Required: parseFloat((required.macros.fiber || 0).toFixed(2)),
                Taken: parseFloat((taken.fiber || 0).toFixed(2)),
              },
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} g`} />
            <Legend />
            <Bar dataKey="Required" fill="#D3D3D3" />
            <Bar dataKey="Taken" fill="#4B4B4B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="right-section">
        <h2>Macronutrient Percentages</h2>
        {macros.map((macro) => (
          <p key={macro}>
            {macro.charAt(0).toUpperCase() + macro.slice(1)}: {getPercentage(macro).toFixed(1)}%
          </p>
        ))}
      </div>
    </div>
  );
};

export default MacrosVisualization;

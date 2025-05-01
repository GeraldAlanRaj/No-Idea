import React, { useState, useEffect, useCallback } from 'react';
import instance from '../../utils/axiosInterceptor';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalorieVisualization from '../visualization/calorie_visualization';
import MacrosVisualization from '../visualization/macros_visualization';

function FoodHistory({ userId, refreshTrigger, setRefreshTrigger, history_date, setHistoryDate }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = useCallback(async (selectedDate) => {
    // Use local date formatting to avoid timezone issues
    const formattedDate = selectedDate.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
    try {
      const res = await instance.get(
        `/foodtrack/history?userId=${userId}&date=${formattedDate}`
      );
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch history');
    }
  }, [userId]);

  const handleDateChange = (newDate) => {
    if (newDate instanceof Date && !isNaN(newDate)) {
      setHistoryDate(newDate);        
      fetchHistory(newDate);
      setRefreshTrigger(prev => prev + 1); // Trigger the refresh
    }
  };

  useEffect(() => {
    if (history_date) {
      fetchHistory(history_date);
    }
  }, [history_date, fetchHistory]);

  return (
    <div>
      <h2>View Food History</h2>

      <Calendar
        onChange={handleDateChange}
        value={history_date}
      />

      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            {item.mealType} - {item.foodName} - {item.calories.toFixed(1)} cal
          </li>
        ))}
      </ul>

      {/* Visualizations for the selected date */}
      {history_date && (
        <div>
          <CalorieVisualization
            userId={userId}
            date={history_date.toLocaleDateString('en-CA')}
            refreshTrigger={refreshTrigger}
            history_date={history_date}
          />
          <MacrosVisualization
            userId={userId}
            date={history_date.toLocaleDateString('en-CA')}
            refreshTrigger={refreshTrigger}
            history_date={history_date}
          />
        </div>
      )}
    </div>
  );
}

export default FoodHistory;

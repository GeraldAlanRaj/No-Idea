import React, { useState } from 'react';
import instance from '../../utils/axiosInterceptor';
import JWT_Decoder from '../JWT_Decoder';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function FoodHistory() {
  const [date, setDate] = useState(new Date());
  const [history, setHistory] = useState([]);

  const fetchHistory = async (selectedDate) => {
    const userId = JWT_Decoder.getUserIdFromToken();
    const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    try {
      const res = await instance.get(`/foodtrack/history?userId=${userId}&date=${formattedDate}`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch history');
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchHistory(newDate); // Fetch history when the date is changed
  };

  return (
    <div>
      <h2>View Food History</h2>

      {/* Display Calendar */}
      <Calendar
        onChange={handleDateChange}
        value={date}
      />

      {/* Display history */}
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            {item.mealType} - {item.foodName} - {item.calories.toFixed(1)} cal
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodHistory;

import React, { useState } from 'react';
import instance from '../../utils/axiosInterceptor';
import JWT_Decoder from '../JWT_Decoder';

function FoodHistory() {
  const [date, setDate] = useState('');
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const userId = JWT_Decoder.getUserIdFromToken();
    try {
      const res = await instance.get(`/foodtrack/history?userId=${userId}&date=${date}`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch history');
    }
  };

  return (
    <div>
      <h2>View Food History</h2>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button onClick={fetchHistory}>Fetch</button>

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

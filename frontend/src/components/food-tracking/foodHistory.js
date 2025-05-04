import React, { useState, useEffect, useCallback, useRef } from 'react';
import instance from '../../utils/axiosInterceptor';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalorieVisualization from '../visualization/calorie_visualization';
import MacrosVisualization from '../visualization/macros_visualization';
import '../../styles/components/food-tracking/foodhistory.css';

function FoodHistory({ userId, refreshTrigger, setRefreshTrigger, history_date, setHistoryDate }) {
  const [history, setHistory] = useState([]);
  const chartRef = useRef(null);

  const fetchHistory = useCallback(async (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString('en-CA');
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
      setRefreshTrigger(prev => prev + 1);
    }
  };
  
  
  useEffect(() => {
    if (history_date) {
      fetchHistory(history_date);
    }
  }, [history_date, fetchHistory]);

  return (
    <div>
      <h1 className='Food-History-Title'>
        <span style={{ color: "white" }}>View </span>
        <span style={{ color: "#454545" }}>Food </span>
        <span style={{ color: "white" }}>History</span>
      </h1>

      <div className='Food-History-Container'>
        <div className='history-left'>
          <Calendar
            onChange={handleDateChange}
            value={history_date}
          />

          <div className='history-list'>
            <ul>
              {history.map((item, idx) => (
                <li key={idx}>
                  {item.mealType} - {item.foodName} - {item.calories.toFixed(1)} cal
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='history-right' ref={chartRef}>
          {history_date ? (
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
          ) : (
            <p>Please select a date to view your food history visualizations.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodHistory;

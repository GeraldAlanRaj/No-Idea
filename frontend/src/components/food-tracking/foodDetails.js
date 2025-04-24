import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosInterceptor';
import JWT_Decoder from '../JWT_Decoder';
import dayjs from 'dayjs';

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [method, setMethod] = useState('serving');
  const [mealType, setMealType] = useState('breakfast');
  const [currentCalculation, setCurrentCalculation] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  });

  const userId = JWT_Decoder.getUserIdFromToken();
  const date = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    const fetchDailyTotals = async () => {
      try {
        const response = await instance.get(`/foodtrack/daily-totals`, {
          params: { userId, date },
        });
        setCurrentCalculation(response.data);
      } catch (error) {
        console.error("Error fetching daily totals:", error);
      }
    };

    fetchDailyTotals();
  }, [userId, date]);

  useEffect(() => {
    instance.get(`/foods/${id}`).then(res => setFood(res.data));
  }, [id]);

  const handleAdd = async () => {
    try {
      await instance.post('/foodtrack/add', {
        userId,
        foodId: food._id,
        quantity,
        method,
        mealType,
      });
      alert('Food added!');

      // Refetch totals after adding food
      const response = await instance.get(`/foodtrack/daily-totals`, {
        params: { userId, date },
      });
      setCurrentCalculation(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to add food');
    }
  };

  if (!food) return <div>Loading...</div>;

  const displayValues = method === 'serving' ? food.perServing : food.per100g;

  return (
    <div>
      <h2>{food.name}</h2>
      <p>Calories: {displayValues.calories}</p>
      <p>Protein: {displayValues.protein}</p>
      <p>Carbs: {displayValues.carbs}</p>
      <p>Fat: {displayValues.fat}</p>
      <p>Fiber: {displayValues.fiber}</p>

      <label>Quantity:</label>
      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
        min="1"
      />

      <label>Method:</label>
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option value="serving">Per Serving</option>
        <option value="100g">Per 100g</option>
      </select>

      <label>Meal Type:</label>
      <select value={mealType} onChange={e => setMealType(e.target.value)}>
        <option>breakfast</option>
        <option>lunch</option>
        <option>snack</option>
        <option>dinner</option>
      </select>

      <button onClick={handleAdd}>Add Food</button>

      <div>
        <h3>Today's Totals:</h3>
        <ul>
          <li>Calories: {currentCalculation.calories}</li>
          <li>Protein: {currentCalculation.protein}</li>
          <li>Carbs: {currentCalculation.carbs}</li>
          <li>Fat: {currentCalculation.fat}</li>
          <li>Fiber: {currentCalculation.fiber}</li>
        </ul>
      </div>
    </div>
  );
};

export default FoodDetail;

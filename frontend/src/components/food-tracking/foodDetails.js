import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../utils/axiosInterceptor';
import JWT_Decoder from '../JWT_Decoder';
import '../../styles/components/food-tracking/foodDetails.css';
import Navbar from '../Navbar';

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [method, setMethod] = useState('serving');
  const [mealType, setMealType] = useState('breakfast');

  const userId = JWT_Decoder.getUserIdFromToken();
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
    } catch (error) {
      console.error(error);
      alert('Failed to add food');
    }
  };

  if (!food) return <div>Loading...</div>;

  const displayValues = method === 'serving' ? food.perServing : food.per100g;

  return (
    <div className='Food-Details-Container'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='Food-Details-Header'>
        <div className="food-details-image">
          <img src={`${process.env.REACT_APP_API_URL}/uploads/${food.imageurl}`} alt={food.title} className="food-image" />
        </div>
        <div className='Food-Details-Info'>
          <h2>{food.name}</h2>
          <p>Calories: {displayValues.calories}</p>
          <p>Protein: {displayValues.protein}</p>
          <p>Carbs: {displayValues.carbs}</p>
          <p>Fat: {displayValues.fat}</p>
          <p>Fiber: {displayValues.fiber}</p>
          <p>Serving Size: {displayValues.servingSize} g</p>
        </div>
      </div>

      <div className='Food-Details-Form'>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Method:</label>
          <select value={method} onChange={e => setMethod(e.target.value)}>
            <option value="serving">Per Serving</option>
            <option value="100g">Per 100g</option>
          </select>
        </div>

        <div className="form-group">
          <label>Meal Type:</label>
          <select value={mealType} onChange={e => setMealType(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="snack">Snack</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        <button onClick={handleAdd}>Add Food</button>
      </div>
    </div>
  );
};

export default FoodDetail;

import { useNavigate } from "react-router-dom";
import "../../styles/components/food-tracking/foodCard.css"

const FoodCard = ({ food }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/food/${food._id}`);
  };

  return (
    <div className="food-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <h3 className="food-name">{food.name}</h3>
      <img
        src={`http://localhost:5001/uploads/${food.imageurl}`}
        alt={food.name}
        className="food-image"
      />
    </div>
  );
};

export default FoodCard;

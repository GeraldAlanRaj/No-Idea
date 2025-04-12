import { useNavigate } from "react-router-dom";
import "../styles/pages/Profile.css";
import Details from "../components/User_Details";

const Profile = ({ onClose, triggerNutritionRefresh }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-sidebar">
      <button className="close-btn" onClick={onClose}>X</button>
      <Details onProfileUpdate={triggerNutritionRefresh} /> {/* ✅ Pass the prop */}
      <button className="Logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

import { useNavigate } from "react-router-dom";

const Profile = ({ onClose }) => {
    
    const navigate = useNavigate(); // Move useNavigate inside the component

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Navigate after removing token
    };
  
    return (
      <div className="profile-sidebar">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>User Profile</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };
  
  export default Profile;
  
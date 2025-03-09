import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate(); // Move useNavigate inside the component

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Navigate after removing token
    };

    return(
        <div className="Profile-Container">
            <Navbar />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
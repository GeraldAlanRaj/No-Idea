import Navbar from "../components/Navbar";
import aboutUsImage from "../assets/aboutus-page-image.jpg";
import staff1 from "../assets/staff1.png";
import staff2 from "../assets/staff2.png";
import { useNavigate } from "react-router-dom";
import StaffCard from "../components/StaffCard";
import "../styles/pages/AboutUs.css"

const About = (token) => {    

      const navigate = useNavigate();
      const handleSignup = async () => {
          navigate("/contact");
      };


    return (
        <div className="About-Container">
        <div className="Navbar">
            <Navbar />
        </div>
        <div className="About-Body">
        <div className="About-Content-1">
        <div className="About-Text">
            <h1>
            <span style={{ color: "white" }}>Get To Know</span>
            <span style={{ color: "#454545" }}> About Us</span>
            </h1>
            <br></br>
            <h2>Empowering you to reach your fitness goals with personalized training and expert support.</h2>
            <br></br>
            <h2>We're dedicated to empowering you to reach your fitness goals with personalized training, expert guidance, and a community that supports every step of the way.</h2>
            <button onClick={handleSignup}>Contact Us</button>
        </div>
        <div className="About-Image">
            <img src={aboutUsImage} alt="aboutus" />
        </div>
        </div>
        <div className="About-Content-2">
            <div className="About-Foot-Text">
            <h1>
            <span style={{ color: "white" }}>Meet</span>
            <span style={{ color: "#454545" }}> Our Team</span>
            </h1>
                <h2>Meet our team of passionate fitness experts, each committed to helping you achieve your goals through personalized guidance, support, and motivation every step of the way.</h2>
            </div>
            <div className="Teammate Section">
                <StaffCard image = {staff1}/>
                <StaffCard image = {staff2}/>
                <StaffCard image = {staff1}/>
                <StaffCard image = {staff2}/>
            </div>
        </div>
        </div>
        </div>
    );
};      
export default About;
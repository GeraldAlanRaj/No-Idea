import Navbar from "../components/Navbar";
import Email from "../components/Mailjs";
import mailImage from "../assets/Mail.png";
import locationImage from '../assets/Location.png';
import phoneImage from '../assets/Phone.png';
import "../styles/pages/Contact.css"

const Contact = () => { 
  return (
    <div className="Contact-Container">
      <div className="Navbar">
        <Navbar />
      </div>

      <div className="Contact-Body">
        <div className="Header">
          <h1>Get in Touch!</h1>
          <h2>Contact us for more assitance</h2>
        </div>
        <div className="Middle">
          <div className="Mail_Id">
            <img src={mailImage} alt="mail" />
            <h2>noidea.fitness@gmail.com</h2>
          </div>    
          <div className="Phone_No">
            <img src={phoneImage} alt="phone" />
            <h2>123-456</h2>
          </div>    
          <div className="Location">
            <img src={locationImage} alt="location" />
            <h2>ABC,DEF</h2>
          </div>    
        </div>
        <div className="Footer">
          <Email />
        </div>
      </div>
    </div>
  );
}
export default Contact;
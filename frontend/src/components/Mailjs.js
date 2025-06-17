import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/components/Mailjs.css"

const MailForm = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    email_id: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.from_name || !formData.email_id || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    const templateParams = {
      from_name: formData.from_name,
      email_id: formData.email_id,
      message: formData.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_MAIL_JS_SERVICE_ID, // Replace with your EmailJS service ID
        process.env.REACT_APP_MAIL_JS_TEMPLATE_ID, // Replace with your EmailJS template ID
        templateParams,
        process.env.REACT_APP_MAIL_JS_SPUBLIC_KEY // Replace with your EmailJS user/public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
          setFormData({ from_name: "", email_id: "", message: "" });
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Email sending failed. Try again.");
        }
      );
  };

  return (
    <div className="Email_Sender">
      <div className="Email_Form">
      <div className="Left_Section">
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          value={formData.from_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email_id"
          placeholder="Your Email"
          value={formData.email_id}
          onChange={handleChange}
          required
        />
        </div>
        <div className="Right_Section">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        ></textarea>
        </div>
        </div>
        <div className="Form_Footer"> 
        <button onClick={handleSubmit}>
          Submit
        </button>
        </div>
    </div>
  );
};

export default MailForm;

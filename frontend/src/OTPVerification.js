import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState(["", "", "", "", "", ""]); // Array to hold each digit of OTP
  const inputRefs = useRef([]); // Refs to manage focus between input boxes

  // Function to handle changes in OTP input boxes
  const handleChange = (index, value) => {
    if (value.length > 1) {
      return; // Prevent entering more than one character in each box
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to the next input box
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Function to handle form submission (e.g., OTP validation)
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the OTP (for demo purposes, just navigate to success page)
    navigate("/success");
  };

  // Create an array of 6 input boxes for OTP digits
  const otpInputs = Array.from({ length: 6 }, (_, index) => (
    <input
      key={index}
      type="text"
      maxLength={1}
      value={otp[index]}
      onChange={(e) => handleChange(index, e.target.value)}
      ref={(el) => (inputRefs.current[index] = el)}
      style={{
        width: "30px",
        height: "30px",
        margin: "5px",
        textAlign: "center",
        fontSize: "16px",
      }}
    />
  ));

  return (
    <div className="OTP-verification-container" style={styles.container}>
      <h3>Enter OTP</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.otpContainer}>{otpInputs}</div>
        <button type="submit" className="btn btn-primary mt-3 ">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Full viewport height
  },
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
};

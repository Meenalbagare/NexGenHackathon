import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform authentication logic here (e.g., validate credentials)
    //CREATE FETCH API : IF ITS YES GO TO DASHBOARD USING AUTHENTICATION
    // For demo purposes, navigate to OTP verification upon successful authentication
    navigate("/verify-otp");
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{authMode === "signin" ? "Sign In" : "Sign Up"}</h3>
          <div className="text-center">
            {authMode === "signin" ? (
              <p>
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </p>
            )}
          </div>
          {authMode === "signup" && (
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input type="text" className="form-control mt-1" placeholder="e.g. Jane Doe" />
            </div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input type="email" className="form-control mt-1" placeholder="Enter email" />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" placeholder="Enter password" />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

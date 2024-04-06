// import logo from './logo.svg';
import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import "bootstrap/dist/css/bootstrap.min.css";
import OTPVerification from "./OTPVerification";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;

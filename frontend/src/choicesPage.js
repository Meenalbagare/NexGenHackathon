import React from "react";
import { useNavigate } from "react-router-dom";
import "./choicesPage.css";
const ChoicesPage = () => {
  const navigate = useNavigate();

  const handleMentorClick = () => {
    navigate("/dashboard");
  };

  const handlePracticeQuestionsClick = () => {
    navigate("/practice-questions");
  };

    return (
    <div className="container">
      <div className="box questions" onClick={handleMentorClick}>24/7 mentor</div>
      <div className="box tutoring" onClick={handlePracticeQuestionsClick}>Practice Questions</div>
    </div>
  );
};


export default ChoicesPage;

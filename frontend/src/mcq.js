import React, { useState } from "react";
import "./mcq.css"; // Import CSS for styling

const MCQ = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: "Paris",
      reasoning: "Paris is the capital of France."
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      correctAnswer: "Mars",
      reasoning: "Mars is called the Red Planet due to its reddish appearance."
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
      correctAnswer: "Leonardo da Vinci",
      reasoning: "The Mona Lisa was painted by Leonardo da Vinci."
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowFeedback(true);
    const isCorrectAnswer = option === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(isCorrectAnswer);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption("");
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    setSelectedOption("");
    setShowFeedback(false);
    setIsCorrect(false);
  };

  return (
    <div className="mcq-container">
      <div className="question">
        <h2>{questions[currentQuestionIndex].question}</h2>
      </div>
      <div className="options">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <div key={index} className="option" onClick={() => handleOptionSelect(option)}>
            {option}
          </div>
        ))}
      </div>
      {showFeedback && (
        <div className={`feedback ${isCorrect ? "correct" : "wrong"}`}>
          {isCorrect ? "Correct!" : "Wrong!"}
          <p>{questions[currentQuestionIndex].reasoning}</p>
        </div>
      )}
      <div className="navigation">
        <button disabled={currentQuestionIndex === 0} onClick={handlePreviousQuestion}>
          Previous
        </button>
        <button disabled={currentQuestionIndex === questions.length - 1} onClick={handleNextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MCQ;

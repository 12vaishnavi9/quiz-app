import React, { useState, useEffect } from "react";
import "../styles/Quiz.css";
import axios from "axios";
import Timer from "../AnswerTimer/Timer";
import { useAuth } from "../context/Auth";
import Login from "./Login";
import Result from "./Result";
import { useAnswer } from "../context/Answer";
import Checkout from "./Checkout";

const Quiz = () => {
  // Accessing authentication context
  const [auth, setAuth] = useAuth();

  // State variables for managing quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [resetTimer, setResetTimer] = useState(true);
  const [answers, setAnswers] = useAnswer();
  const [id, setId] = useState("");

  useEffect(() => {
    // Fetching questions from the server
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/questions`);
        setQuestions(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Function to handle option click
  const handleOptionClick = (index, id) => {
    setAnswerIndex(index);
    setId(id);
  };

  // Function to handle timeout
  const handleTimeout = () => {
    setAnswers(prevAnswers => [...prevAnswers, { question_id: id, ans: answerIndex }]);
    setAnswerIndex(null);
    setId("");
    setCurrentQuestionIndex(curr => curr + 1);
    setResetTimer(false);
    setTimeout(() => {
      setResetTimer(true);
    });
  };

  return (
    <>
      {auth?.token ? (
        <div className="bodyyy">
          <div className="quiz-container">
            {currentQuestionIndex < 16 ? (
              <>
                {resetTimer && <Timer whenTimeUp={handleTimeout} />}
                <span className="active-question-no">{currentQuestionIndex + 1}</span>
                <span className="total-question">/16</span>
                {questions.length > 0 && (
                  <>
                    <h2>{questions[currentQuestionIndex].questionText}</h2>
                    <ul>
                      {questions[currentQuestionIndex].options.map((option, index) => (
                        <li
                          key={index}
                          className={`unselected ${index === answerIndex ? "selected" : ""}`}
                          onClick={() => handleOptionClick(index, questions[currentQuestionIndex]._id)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              <Checkout />
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Quiz;

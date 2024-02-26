import React, { useEffect, useState } from "react";
import "../styles/Result.css";
import { useAuth } from "../context/Auth";
import { useAnswer } from "../context/Answer";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Result = ({ lastVal }) => {
  // State variables for result scores and flags
  const [flag, setFlag] = useState(false);
  const [AuthoritativeScore, setAuthoritativeScore] = useState(0);
  const [DemocraticScore, setDemocraticScore] = useState(0);
  const [FacilitativeScore, setFacilitativeScore] = useState(0);
  const [SituationalScore, setSituationalScore] = useState(0);
  const [TotalAnswered, setTotalAnswered] = useState(0);
  const navigate = useNavigate();

  // Accessing authentication context
  const [auth, setAuth] = useAuth();

  // Accessing answers from context
  const [answers, setAnswers] = useAnswer();

  // Function to handle logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
      id: null
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  useEffect(() => {
    if (flag === false) {
      // Calculate scores and total answered questions when flag is false
      const answersData = localStorage.getItem("dataa");
      const parsedAnswersData = JSON.parse(answersData);

      let total = 0;
      let authoritativeScore = 0;
      let democraticScore = 0;
      let facilitativeScore = 0;
      let situationalScore = 0;

      for (let index = 0; index < 16; index++) {
        const answer = parsedAnswersData[index];
        if (answer && answer.ans !== null) {
          total++;

          if (index === 3 || index === 5 || index === 11 || index === 13) {
            authoritativeScore += answer.ans;
          } else if (index === 0 || index === 7 || index === 10 || index === 12) {
            democraticScore += answer.ans;
          } else if (index === 1 || index === 6 || index === 8 || index === 15) {
            facilitativeScore += answer.ans;
          } else {
            situationalScore += answer.ans;
          }
        }
      }

      setTotalAnswered(total);
      setAuthoritativeScore(authoritativeScore);
      setDemocraticScore(democraticScore);
      setFacilitativeScore(facilitativeScore);
      setSituationalScore(situationalScore);
      setFlag(true);

      // Sending results to the server
      const res = axios.post(`${process.env.REACT_APP_API}/api/insert-result`, {
        userID: auth?.user?.id,
        total,
        authoritativeScore,
        democraticScore,
        facilitativeScore,
        situationalScore
      });
    }
  }, [flag, auth]);

  return (
    <>
      {flag === false ? (
        // Render congratulations message and button to see results if flag is false
        <>
          <div className="finall">
            <p>Congratulations!!!</p>
            <br></br> <p>Click below button to see results.</p>
            <br></br>
            <button className='Finish' onClick={() => setFlag(true)}>See Results</button>
          </div>
        </>
      ) : (
        // Render results if flag is true
        <>
          <div className="result">
            <h3>Result</h3>
            <p>
              Total Questions: <span>16</span>
            </p>
            <p>
              Total Answered: <span>{TotalAnswered}</span>
            </p>
            <p>
              Total Authoritative: <span>{AuthoritativeScore}</span>
            </p>
            <p>
              Total Democratic: <span>{DemocraticScore}</span>
            </p>
            <p>
              Total Facilitative: <span>{FacilitativeScore}</span>
            </p>
            <p>
              Total Situational: <span>{SituationalScore}</span>
            </p>
            <br></br>
            {/* Button to logout */}
            <button onClick={handleLogout} className='Finish'>Logout</button>
          </div>
        </>
      )}
    </>
  )
}

export default Result;

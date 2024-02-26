import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/App.css";

const Main = () => {
    // Accessing authentication context and navigation hook
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    // State variables for user ID and flag
    const [userID, setUserID] = useState("");
    const [flag, setFlag] = useState(false);

    // Function to handle form submission
    const handleSubmit = () => {
        if (auth?.user?.id === userID) {
            // Redirect to quiz page if user ID is correct
            navigate("/quiz");
        } else {
            // Display error message if user ID is incorrect
            toast.error("Enter correct userID");
        }
    }

    return (
        <>
            {
                // Render quiz information and user input form if user is authenticated
                auth?.token ? (
                    <>
                        <div className="quiz-container">
                            <h1 className="title text-light">Quiz Application</h1>
                            <br></br>
                            <ol>
                                <li>You will be asked 16 questions one after another.</li>
                                <li>Points will be awarded for each question.</li>
                                <li>Each question has 4 options. You can choose only one option.</li>
                                <li>You can change answer before the timer of 30 seconds expires.</li>
                                <li>After finishing the quiz, you will be redirected to a payment page to perform the payment.</li>
                                <li>The quiz result will be declared upon the successful completion of payment.</li>
                            </ol>
                            <br></br>
                            {/* User ID input form */}
                            <form id="form">
                                <input className="userid"
                                    type="text" placeholder="Enter your user id" value={userID} onChange={(e) => setUserID(e.target.value)} />
                            </form>
                            {/* Button to start quiz */}
                            <div className="start">
                                <button className="Finish" onClick={handleSubmit}>Start Quiz</button>
                            </div>
                        </div>
                    </>
                ) : (
                        // Render login component if user is not authenticated
                        <Login />
                    )
            }
        </>
    )
}

export default Main;

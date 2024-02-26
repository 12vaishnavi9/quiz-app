import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { useAnswer } from "../context/Answer";
import "../styles/CheckOut.css";
import Login from "./Login";

const Checkout = () => {
    // State variables from context
    const [answers, setAnswers] = useAnswer();
    const [auth, setAuth] = useAuth();
    
    // Extracting user ID from authentication context
    const userID = auth?.user?.id;

    // Flag to ensure post request is sent only once
    let flag = true;

    useEffect(() => {
        // Filtering out answers with null or default values
        const [, ...remainingAnswers] = answers;
        const remainingAnswersCleaned = remainingAnswers.filter(answer => (
            (answer.question_id !== null || [0, 1, 2, 3, null].includes(answer.ans) && answer.ans !== null)
        ));

        // Checking if post request has already been made
        if (flag === true) {
            // Sending remaining answers to the server
            const res = axios.post(`${process.env.REACT_APP_API}/api/answer`, {
                userID,
                answers: remainingAnswersCleaned
            });
            // Storing cleaned answers in local storage
            localStorage.setItem("dataa", JSON.stringify(remainingAnswersCleaned));
            // Updating flag to prevent redundant requests
            flag = false;
        }
    }, []);

    // Function to handle payment initiation
    const checkoutHandler = async (amount) => {
        // Getting Razorpay API key from the server
        const { data: { key } } = await axios.get(`${process.env.REACT_APP_API}/api/getkey`);

        // Initiating payment with Razorpay
        const { data: { order } } = await axios.post(`${process.env.REACT_APP_API}/api/payment/initiate`, {
            amount,
            userId: auth?.user?.id
        });

        // Configuring payment options for Razorpay
        const options = {
            key,
            amount: amount,
            callback_url: `${process.env.REACT_APP_API}/api/payment/verify`,
            currency: "INR",
            order_id: order.id,
            name: "Nexiara",
            prefill: {
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#4A4A4A"
            },
        };

        // Creating a new instance of Razorpay and opening payment modal
        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <>
            {
                // Checking if user is authenticated
                auth?.token ? (
                    <>
                        <div className="resultt">
                            <p>Congratulations, you are just left with one step.</p>
                            {/* Button to initiate payment */}
                            <button className="Finish" onClick={() => checkoutHandler(100)}>Pay Now</button>
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

export default Checkout;

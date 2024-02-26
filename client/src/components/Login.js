import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Auth.css";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // Accessing authentication context and navigation hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login request to the server
      const res = await axios.post(`${process.env.REACT_APP_API}/api/login`, { email, password });
      if (res.data.success) {
        // If login is successful, update authentication context and navigate to home page
        setAuth({ ...auth, user: res.data.user, token: res.data.token, id: res.data.user.user_id });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success("Login Successful");
        navigate("/");
      } else {
        // If login is unsuccessful, display error message
        toast.error(res.data.message)
      }
    } catch (err) {
      // Handle server errors
      console.log("error", err);
      toast.error("Something Went Wrong")
    }
  }

  return (
    <>
      {
        // Render login form only if user is not authenticated
        auth?.token ? (
          null
        ) : (
            <>
              {/* Login form */}
              <div className="bodyyy">
                <div className="wrapper">
                  <form action="" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {/* Email input field */}
                    <div className="input-box">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ color: "white" }}
                        required
                      />
                      <FaUser className="icon" />
                    </div>
                    {/* Password input field */}
                    <div className="input-box">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        name="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ color: "white" }}
                        required
                      />
                      <FaLock className="icon" />
                    </div>
                    {/* Login button */}
                    <button type="submit">Login</button>
                    {/* Link to register page */}
                    <div className="register-link">
                      <p>
                        Don't have an account?{" "}
                        <NavLink to="/register">
                          <a href="#">Register</a>
                        </NavLink>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )
      }
    </>
  )
};

export default Login;

import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Auth.css";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { toast } from "react-toastify";

const Register = () => {
  // Accessing authentication context
  const [auth, setAuth] = useAuth();

  // Navigation hook
  const navigate = useNavigate();

  // State variables for user registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_id, setUser_id] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/register`, { user_id, email, password });
      if (!res.data.success) {
        // Display error message if registration is unsuccessful
        toast.error(res.data.message);
      }
      if (res.data.success) {
        // Display success message if registration is successful and redirect to login page
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      // Handle server errors
      console.log("error", err);
      toast.error("Something went wrong, try selecting another user id");
    }
  }

  return (
    <>
      {
        // Render registration form if user is not authenticated
        auth?.token ? (
          null
        ) : (
          <>
            <div className="bodyyy">
              <div className="wrapper">
                <form action="" onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  {/* User ID input field */}
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Enter your userID"
                      name="user_id"
                      value={user_id}
                      onChange={(e) => setUser_id(e.target.value)}
                      style={{ color: 'white' }}
                      required
                    />
                    <FaUser className="icon" />
                  </div>
                  {/* Email input field */}
                  <div className="input-box">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ color: 'white' }}
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
                      style={{ color: 'white' }}
                      required
                    />
                    <FaLock className="icon" />
                  </div>
                  {/* Register button */}
                  <button type="submit">Register</button>
                  {/* Link to login page */}
                  <div className="register-link">
                    <p>
                      Already have an account?{" "}
                      <NavLink to="/login">
                        <a href="#">Login</a>
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

export default Register;

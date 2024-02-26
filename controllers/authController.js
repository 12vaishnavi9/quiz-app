import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import Jwt from "jsonwebtoken";

// Controller function for user registration
export const registerController = async (req, res) => {
  try {
    const { user_id, email, password } = req.body;

    // Check if user is already registered by checking if the email exists in the database
    const checkUser = await userModel.findOne({ email });

    // If user is already registered, send a response indicating that the email is already in use
    if (checkUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered email, please login!",
      });
    }

    // Hash the password for security before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Create a new user instance with the hashed password and save it to the database
    const user = await new userModel({
      user_id,
      email,
      password: hashedPassword,
    }).save();

    // Send a success response with the newly registered user's details
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    // Send an error response if there's an error during registration
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      err,
    });
  }
};

// Controller function for user login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await userModel.findOne({ email });

    // If user is not found, send a response indicating that the email is not registered
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // If email is registered, compare the provided password with the hashed password in the database
    const match = await comparePassword(password, user.password);

    // If passwords don't match, send a response indicating incorrect password
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Incorrect Password",
      });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send a success response with the user's details and token for authentication
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        email: user.email,
        id: user.user_id,
      },
      token,
      id: user.user_id,
    });
  } catch (err) {
    console.log(err);
    // Send an error response if there's an error during login
    res.status(500).send({
      success: false,
      message: "Error in login",
      err,
    });
  }
};

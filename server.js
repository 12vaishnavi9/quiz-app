import express from "express"; // Importing Express.js framework
import dotenv from "dotenv"; // Importing dotenv for environment variables
import connectDB from "./config/db.js"; // Importing database connection function
import authRoute from "./routes/authRoute.js"; // Importing authentication routes
import questionRoute from "./routes/questionRoute.js"; // Importing question routes
import userAnswerRoute from "./routes/userAnswerRoute.js"; // Importing user answer routes
import paymentRoute from "./routes/paymentRoute.js"; // Importing payment routes
import resultRoute from "./routes/resultRoute.js"; // Importing result routes
import cors from "cors"; // Importing CORS middleware
import Razorpay from "razorpay"; // Importing Razorpay for payment processing

dotenv.config(); // Loading environment variables from .env file

// Creating a new instance of Razorpay for payment processing
export const instance = new Razorpay({
    key_id: process.env.KEY_ID, // Razorpay API key ID from environment variables
    key_secret: process.env.KEY_SECRET // Razorpay API key secret from environment variables
});

const app = express(); // Creating Express app
connectDB(); // Connecting to the database
app.use(express.static('public')); // Serving static files from the 'public' directory

app.use(cors()); // Using CORS middleware to allow cross-origin requests
app.use(express.json()); // Parsing JSON bodies of requests
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies of requests

// Routing middleware for authentication endpoints
app.use('/api', authRoute);
// Routing middleware for question endpoints
app.use('/api', questionRoute);
// Routing middleware for user answer endpoints
app.use('/api', userAnswerRoute);
// Routing middleware for payment endpoints
app.use('/api/payment', paymentRoute);
// Routing middleware for result endpoints
app.use('/api', resultRoute);

// Endpoint for getting Razorpay API key ID
app.get("/api/getkey", (req, res) => {
    res.status(200).json({ key: process.env.KEY_ID }); // Sending Razorpay API key ID as JSON response
});

const PORT = process.env.PORT || 8080; // Setting the port for the server
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`); // Starting the server and logging the port
});

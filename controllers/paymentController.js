import { instance } from "../server.js"; // Importing the instance from the server file
import crypto from "crypto"; // Importing the crypto module for cryptographic functions
import Payment from "../models/paymentSchema.js"; // Importing the Payment model/schema

// Controller function for initializing payment checkout
export const checkout = async (req, res) => {
  try {
    // Setting up payment options
    const options = {
      amount: Number(req.body.amount * 100), // Converting amount to the smallest currency unit (in this case, paisa)
      currency: 'INR' // Setting currency to Indian Rupee
    };

    // Creating a new order using the payment instance
    const order = await instance.orders.create(options);

    // Sending success response with the created order details
    res.status(200).json({
      success: true,
      message: "success",
      order
    });
  } catch (err) {
    console.log(err);
    // Sending error response in case of any error during payment initialization
    res.status(500).send({
      success: false,
      message: "Error in payment initialization",
      err
    });
  }
};

// Controller function for verifying payment
export const paymentVerifyController = async (req, res) => {
  try {
    // Extracting required data from request body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    // Generating expected signature for verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET) // Creating HMAC using the secret key
      .update(body.toString())
      .digest("hex");

    // Checking if the signature matches the expected signature
    const isAuth = expectedSignature === razorpay_signature;

    if (isAuth) {
      // If authentication is successful, create a new payment entry in the database
      await Payment.create({
        paymentID: razorpay_payment_id,
        orderID: razorpay_order_id,
        signature: razorpay_signature,
        userID: userId
      });

      // Redirecting to success page with payment reference ID
      res.redirect(`http://localhost:3000/payment/success?reference=${razorpay_payment_id}`);
    } else {
      // If authentication fails, sending a response indicating failure
      res.status(200).json({
        success: false,
        message: "Invalid signature"
      });
    }
  } catch (err) {
    console.log(err);
    // Sending error response in case of any error during payment verification
    res.status(500).send({
      success: false,
      message: "Error in payment verification",
      err
    });
  }
};

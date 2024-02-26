import Answer from "../models/userAnswerSchema.js"; // Importing the Answer model/schema

// Controller function for saving user answers
export const answersController = async (req, res) => {
    try {
        const { userID, answers } = req.body; // Extracting userID and answers from the request body

        // Creating a new Answer document with the provided userID and answers and saving it to the database
        const user = await new Answer({ userID, answers }).save();

        // Sending success response with the saved Answer document
        res.status(201).send({
            success: true,
            message: "Answer Saved Successfully",
            user
        });
    } catch (err) {
        console.log(err);
        // Sending error response in case of any error during saving answers
        res.status(500).send({
            success: false,
            message: 'Error in saving answers',
            err
        });
    }
}

// Controller function for fetching user answers
export const getAnswers = async (req, res) => {
    try {
        const { userID } = req.body; // Extracting userID from the request body

        // Fetching answers from the database based on the provided userID
        const getData = await Answer.find({ userID });

        // Sending success response with the fetched answers
        res.status(200).send({
            success: true,
            message: "Answers Fetched successfully",
            getData
        });
    } catch (err) {
        console.log(err);
        // Sending error response in case of any error during fetching answers
        res.status(500).send({
            success: false,
            message: "Error",
            err
        });
    }
}

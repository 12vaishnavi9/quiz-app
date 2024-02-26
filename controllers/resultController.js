import Result from "../models/resultSchema.js"; // Importing the Result model/schema

// Controller function for fetching results
export const getResult = async (req, res) => {
    try {
        // Fetching all results from the database
        const data = await Result.find();

        // Sending success response with the fetched results
        res.status(200).send({
            success: true,
            message: "Result Fetched successfully",
            data
        });
    } catch (err) {
        console.log(err);
        // Sending error response in case of any error during fetching results
        res.status(500).send({
            success: false,
            message: "Error in fetching Result",
            err
        });
    }
};

// Controller function for inserting new result
export const insertResult = async (req, res) => {
    try {
        // Extracting data from the request body
        const { userID, total, authoritativeScore, democraticScore, facilitativeScore, situationalScore } = req.body;

        // Creating a new result with the provided data and saving it to the database
        const results = await new Result({
            userID,
            TotalAnswered: total,
            AuthoritativeScore: authoritativeScore,
            DemocraticScore: democraticScore,
            FacilitativeScore: facilitativeScore,
            SituationalScore: situationalScore
        }).save();

        // Sending success response with the inserted result
        res.status(201).send({
            success: true,
            message: "Result inserted Successfully",
            results
        });
    } catch (err) {
        console.log(err);
        // Sending error response in case of any error during inserting result
        res.status(500).send({
            success: false,
            message: 'Error in Inserting Result',
            err
        });
    }
};

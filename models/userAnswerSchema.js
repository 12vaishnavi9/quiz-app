import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema({
    userID: {
      type: String,
      // required: true
    },
    answers: [{
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions',
        required: true
      },
      ans: {
        type: Number,
        required: true
      }
    }]
  });
  
 export default mongoose.model('userAnswers', userAnswerSchema);

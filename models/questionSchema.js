import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
       questionText:{
        type:String,
       },
       options:{
        type:Array
       }
    },{timestamps:true}
)

export default mongoose.model('questions',questionSchema);

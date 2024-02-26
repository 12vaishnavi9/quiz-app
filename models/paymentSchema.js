import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
       userID:{
        type:String
       },
       paymentID:{
        type:String,
        required:true
       },
       orderID:{
        type:String,
        required:true
       },
       signature:{
        type:String,
        required:true
       },
       amount:{
        type:Number,
        default:100,
        required:true
       },
       status:{
        type:Boolean,
        default:true,
        required:true
       }
    },{timestamps:true}
)

export default mongoose.model('Payment',paymentSchema);
